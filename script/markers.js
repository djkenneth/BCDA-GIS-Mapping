// script/markers.js

document.addEventListener("DOMContentLoaded", function () {

  // ============================================================================
  // GLOBAL VARIABLES
  // ============================================================================

  let map;
  let markersLayer = [];
  let markersByCategory = {};
  let visibleMarkers = new Set();
  let polygonTooltip = null;
  let sitePolygons = {};
  let mapSourcesAdded = false;

  // ============================================================================
  // MAP INITIALIZATION
  // ============================================================================

  async function initializeMap() {
    const defaultCenter = [120.9842, 14.5995]; // Philippines center
    const defaultZoom = 6;

    // Initialize MapLibre GL map with interaction handlers enabled
    map = await new maplibregl.Map({
      container: "map",
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "&copy; OpenStreetMap Contributors",
            maxzoom: 19,
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
          },
        ],
        sky: {},
      },
      zoom: defaultZoom,
      center: defaultCenter,
    });

    // Add navigation controls
    map.addControl(
      new maplibregl.NavigationControl({
        visualizePitch: true,
        showZoom: true,
        showCompass: true,
      })
    );

    // Add scale control
    map.addControl(
      new maplibregl.ScaleControl({
        maxWidth: 80,
        unit: "metric",
      }),
      "bottom-left"
    );

    map.on("load", function () {
      console.log("MapLibre map loaded successfully");
      mapSourcesAdded = true;
      createMarkers();
    });

    // Add error handling
    map.on("error", function (e) {
      console.error("MapLibre GL JS error:", e);
    });
  }

  // ============================================================================
  // MARKER CREATION
  // ============================================================================

  function createMarkers() {
    if (!categories || !subcategories || !sites || !mapSourcesAdded) {
      console.warn('createMarkers: Data or map not ready');
      return;
    }

    // Initialize marker storage by category
    categories.forEach(category => {
      markersByCategory[category.id] = {};
    });

    // Create polygons for all sites that have polygon data
    sites.forEach(site => {
      if (site.polygon) {
        addSitePolygon(site);
      }
    });
  }

  // ============================================================================
  // POLYGON MANAGEMENT
  // ============================================================================

  function addSitePolygon(site, category) {
    if (!site.polygon || map.getSource('polygon-' + site.id)) {
      return; // Skip if no polygon or already exists
    }

    const _category = getCategoryById(site.category);
    const subcategory = getSubcategoryById(site.subcategory);
    
    // Add GeoJSON source for this site's polygon
    map.addSource('polygon-' + site.id, {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [site.polygon]
        },
        properties: {
          siteId: site.id,
          siteName: site.name,
          category: _category?.name || '',
          subcategory: subcategory?.title || ''
        }
      }
    });

    const fillColor = subcategory?.color || _category?.displayInfo?.color || '#0d6efd';

    // Add fill layer with cursor pointer
    map.addLayer({
      id: 'polygon-fill-' + site.id,
      type: 'fill',
      source: 'polygon-' + site.id,
      layout: {
        'visibility': 'none'
      },
      paint: {
        'fill-color': fillColor,
        'fill-opacity': 0.3
      }
    });

    // Add outline layer
    map.addLayer({
      id: 'polygon-outline-' + site.id,
      type: 'line',
      source: 'polygon-' + site.id,
      layout: {
        'visibility': 'none'
      },
      paint: {
        'line-color': fillColor,
        'line-width': 2
      }
    });

    // Add click event for polygon
    map.on('click', 'polygon-fill-' + site.id, function(e) {
      // Zoom to site
      zoomToSite(site.id);
      
      // Show site details
      showSiteDetails(site, _category, subcategory);
      
      // Highlight clicked polygon
      map.setPaintProperty('polygon-fill-' + site.id, 'fill-opacity', 0.6);
      
      // Reset other polygons
      Object.keys(sitePolygons).forEach(siteId => {
        if (siteId !== site.id.toString()) {
          map.setPaintProperty('polygon-fill-' + siteId, 'fill-opacity', 0.3);
        }
      });
    });

    // Polygon hover events - show tooltip and highlight
    map.on('mouseenter', 'polygon-fill-' + site.id, function(e) {
      map.getCanvas().style.cursor = 'pointer';
      
      // Highlight polygon
      map.setPaintProperty('polygon-fill-' + site.id, 'fill-color', '#0056d8ff');
      map.setPaintProperty('polygon-fill-' + site.id, 'fill-opacity', 0.5);
      map.setPaintProperty('polygon-outline-' + site.id, 'line-width', 3);
      
      // Show tooltip
      showPolygonTooltip(e, site);
    });

    map.on('mouseleave', 'polygon-fill-' + site.id, function() {
      map.getCanvas().style.cursor = '';
      
      // Remove highlight
      map.setPaintProperty('polygon-fill-' + site.id, 'fill-color', '#0d6efd');
      map.setPaintProperty('polygon-fill-' + site.id, 'fill-opacity', 0.3);
      map.setPaintProperty('polygon-outline-' + site.id, 'line-width', 2);
      
      // Hide tooltip
      hidePolygonTooltip();
    });

    map.on('mousemove', 'polygon-fill-' + site.id, function(e) {
      if (polygonTooltip) {
        updatePolygonTooltipPosition(e);
      }
    });

    sitePolygons[site.id] = { site, category };
  }

  function setPolygonVisibility(siteId, isVisible) {
    const visibility = isVisible ? 'visible' : 'none';

    // Check if polygon exists in sitePolygons before trying to set visibility
    if (!sitePolygons[siteId]) {
      // Silently skip - this site doesn't have a polygon
      return;
    }
    
    // Check if layers exist before trying to set visibility
    const fillLayerId = 'polygon-fill-' + siteId;
    const outlineLayerId = 'polygon-outline-' + siteId;
    
    if (map.getLayer(fillLayerId)) {
      map.setPaintProperty(fillLayerId, 'fill-opacity', isVisible ? 0.3 : 0);
      map.setLayoutProperty(fillLayerId, 'visibility', visibility);
    }
    
    if (map.getLayer(outlineLayerId)) {
      map.setLayoutProperty(outlineLayerId, 'visibility', visibility);
    }
  }

  // ============================================================================
  // CHECKBOX HANDLING
  // ============================================================================

  function calculateLiveFeedPosition() {
    const header = document.querySelector("header");
    const sidebarContent = document.querySelector(".sidebar-content.visible");

    let topPosition = 248;
    let leftPosition = 80;

    if (header && header.classList.contains("collapsed")) {
      topPosition = 20;
    }

    if (sidebarContent) {
      leftPosition = 380;
    }

    return {
      x: leftPosition,
      y: topPosition,
    };
  }

  function updateMarkersForCheckbox(checkboxId, isChecked) {
    // Handle "All" checkbox
    if (checkboxId === 'all') {
      sites.forEach(site => {
        if (site.polygon) {
          setPolygonVisibility(site.id, isChecked);
        }
      });
      return;
    }

    // Handle category checkboxes
    if (checkboxId.startsWith('category-')) {
      const categoryId = parseInt(checkboxId.replace('category-', ''));
      const categorySites = getSitesByCategoryId(categoryId);
      
      categorySites.forEach(site => {
        if (site.polygon) {
          setPolygonVisibility(site.id, isChecked);
        }
      });
      return;
    }

    // Handle subcategory checkboxes
    if (checkboxId.startsWith('subcategory-')) {
      const subcategoryId = parseInt(checkboxId.replace('subcategory-', ''));
      const subcategorySites = getSitesBySubcategoryId(subcategoryId);
      
      subcategorySites.forEach(site => {
        if (site.polygon) {
          setPolygonVisibility(site.id, isChecked);
        }
      });
      return;
    }

    // Handle individual site checkboxes
    if (checkboxId.startsWith('site-')) {
      const siteId = parseInt(checkboxId.replace('site-', ''));
      setPolygonVisibility(siteId, isChecked);
      return;
    }
  }

  // ============================================================================
  // SITE DETAILS
  // ============================================================================

  function showSiteDetails(site, category, subcategory) {
    if (window.showInfoDrawer) {
      window.showInfoDrawer(site, category, subcategory);
    }

    const sideWrapper = document.querySelector(".side-wrapper");
    if (sideWrapper) {
      sideWrapper.classList.add("active");
    }
  }

  function zoomToSite(siteId) {
    const site = getSiteById(siteId);
    if (!site || !site.location) return;

    // Convert to [lng, lat] format for MapLibre
    const lngLat = [site.location[1], site.location[0]];
    map.easeTo({
      center: lngLat,
      zoom: 15,
      duration: 3000,
    });

    // Show site details
    const category = getCategoryById(site.category);
    showSiteDetails(site, category);
  }

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  function calculateLiveFeedPosition() {
    const header = document.querySelector("header");
    const sidebarContent = document.querySelector(".sidebar-content.visible");

    let topPosition = 248;
    let leftPosition = 80;

    if (header && header.classList.contains("collapsed")) {
      topPosition = 20;
    }

    if (sidebarContent) {
      leftPosition = 380;
    }

    return {
      x: leftPosition,
      y: topPosition,
    };
  }

  function showPolygonTooltip(e, site) {
    // Remove existing tooltip if any
    hidePolygonTooltip();
    
    // Create tooltip element
    polygonTooltip = document.createElement('div');
    polygonTooltip.className = 'polygon-tooltip';
    polygonTooltip.innerHTML = `
      <div class="polygon-tooltip-header">${site.name}</div>
      <div class="polygon-tooltip-description">${site.description || 'No description available'}</div>
      <div class="polygon-tooltip-footer">
        <span class="polygon-tooltip-lot">${site.lotSize}</span>
        <span class="polygon-tooltip-employees">${site.employees} employees</span>
      </div>
    `;
    
    // Add to map container
    map.getContainer().appendChild(polygonTooltip);
    
    // Position tooltip
    updatePolygonTooltipPosition(e);
    
    // Fade in animation
    setTimeout(() => {
      polygonTooltip.classList.add('visible');
    }, 10);
  }

  function hidePolygonTooltip() {
    if (polygonTooltip) {
      polygonTooltip.classList.remove('visible');
      setTimeout(() => {
        if (polygonTooltip && polygonTooltip.parentNode) {
          polygonTooltip.parentNode.removeChild(polygonTooltip);
        }
        polygonTooltip = null;
      }, 200);
    }
  }

  function updatePolygonTooltipPosition(e) {
    if (!polygonTooltip) return;
    
    const x = e.point.x;
    const y = e.point.y;
    
    // Offset from cursor
    const offsetX = 15;
    const offsetY = 15;
    
    // Get map container dimensions
    const mapContainer = map.getContainer();
    const mapWidth = mapContainer.offsetWidth;
    const mapHeight = mapContainer.offsetHeight;
    
    // Get tooltip dimensions
    const tooltipWidth = polygonTooltip.offsetWidth;
    const tooltipHeight = polygonTooltip.offsetHeight;
    
    // Calculate position
    let left = x + offsetX;
    let top = y + offsetY;
    
    // Adjust if tooltip goes off right edge
    if (left + tooltipWidth > mapWidth - 20) {
      left = x - tooltipWidth - offsetX;
    }
    
    // Adjust if tooltip goes off bottom edge
    if (top + tooltipHeight > mapHeight - 20) {
      top = y - tooltipHeight - offsetY;
    }
    
    // Ensure tooltip stays within bounds
    left = Math.max(10, Math.min(left, mapWidth - tooltipWidth - 10));
    top = Math.max(10, Math.min(top, mapHeight - tooltipHeight - 10));
    
    polygonTooltip.style.left = left + 'px';
    polygonTooltip.style.top = top + 'px';
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  document.addEventListener("DOMContentLoaded", function () {
    initializeMap();
  });

  // ============================================================================
  // WINDOW EXPORTS
  // ============================================================================

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initializeMap();
    });
  } else {
    initializeMap();
  }

  window.map = map;
  window.initializeMap = initializeMap;
  window.createMarkers = createMarkers;
  window.updateMarkersForCheckbox = updateMarkersForCheckbox;
  window.zoomToSite = zoomToSite;
  window.showSiteDetails = showSiteDetails;
  window.setPolygonVisibility = setPolygonVisibility;
  window.mapDebug = {
    calculateLiveFeedPosition,
    findSiteById,
  };
});
