// script/markers.js

document.addEventListener("DOMContentLoaded", function () {
  let map;
  let markersLayer = [];
  let markersByCategory = {};
  let visibleMarkers = new Set();
  let polygonTooltip = null;
  let sitePolygons = {};
  let mapSourcesAdded = false;

  async function initializeMap() {
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
      zoom: 7,
      center: [123.8854, 10.3157], // coordinates [lng, lat]
      pitch: 0,
      maxZoom: 18,
      maxPitch: 85,
      bearing: 0,
      interactive: true,
      scrollZoom: true,
      boxZoom: true,
      dragRotate: true,
      dragPan: true,
      keyboard: true,
      doubleClickZoom: true,
      touchZoomRotate: true,
      touchPitch: true,
      cooperativeGestures: false,
      fadeDuration: 300,
      preserveDrawingBuffer: false,
      antialias: false,
      failIfMajorPerformanceCaveat: false,
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

    // Store map globally
    window.map = map;

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

  function createMarkers() {
    if (!mapMarkers || !mapSourcesAdded) {
      console.warn('createMarkers: mapMarkers or map not ready');
      return;
    }

    console.log("Creating markers and polygons with MapLibre GL JS");

    mapMarkers.forEach((category) => {
      const categoryId = category.id;
      markersByCategory[categoryId] = {};

      category.sites.forEach((site) => {
        const subcategory = window.getSubcategoryKey(site.subcategory);

        if (!markersByCategory[categoryId][subcategory]) {
          markersByCategory[categoryId][subcategory] = [];
        }
        
        // Add polygon if it exists
        if (site.polygon) {
          addSitePolygon(site, category);
        }
      });
    });
    
  }

  function addSitePolygon(site, category) {
    if (!site.polygon || map.getSource('polygon-' + site.id)) {
      return; // Skip if no polygon or already exists
    }
    
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
          siteName: site.name
        }
      }
    });

    // Add fill layer with cursor pointer
    map.addLayer({
      id: 'polygon-fill-' + site.id,
      type: 'fill',
      source: 'polygon-' + site.id,
      layout: {
        'visibility': 'none'  // ADD THIS LINE
      },
      paint: {
        'fill-color': '#0d6efd',
        'fill-opacity': 0.3
      }
    });

    // Add outline layer
    map.addLayer({
      id: 'polygon-outline-' + site.id,
      type: 'line',
      source: 'polygon-' + site.id,
      layout: {
        'visibility': 'none'  // ADD THIS LINE
      },
      paint: {
        'line-color': '#0d6efd',
        'line-width': 2
      }
    });

    // ADD CLICK EVENT for polygon fill layer
    map.on('click', 'polygon-fill-' + site.id, function(e) {
      e.preventDefault();
      showSiteDetails(site, category);
      zoomToMarker(site.location);
    });

    // ADD CLICK EVENT for polygon outline layer
    map.on('click', 'polygon-outline-' + site.id, function(e) {
      e.preventDefault();
      showSiteDetails(site, category);
      zoomToMarker(site.location);
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

  function removeSitePolygon(siteId) {
    // Hide tooltip if it's showing for this polygon
    hidePolygonTooltip();
    
    // Remove event listeners
    if (map.getLayer('polygon-fill-' + siteId)) {
      map.off('click', 'polygon-fill-' + siteId);
      map.off('mouseenter', 'polygon-fill-' + siteId);
      map.off('mouseleave', 'polygon-fill-' + siteId);
      map.off('mousemove', 'polygon-fill-' + siteId); // ADD THIS LINE
      map.removeLayer('polygon-fill-' + siteId);
    }
    
    if (map.getLayer('polygon-outline-' + siteId)) {
      map.off('click', 'polygon-outline-' + siteId);
      map.removeLayer('polygon-outline-' + siteId);
    }
    
    if (map.getSource('polygon-' + siteId)) {
      map.removeSource('polygon-' + siteId);
    }
    
    delete sitePolygons[siteId];
  }

  function setPolygonVisibility(siteId, isVisible) {
    const visibility = isVisible ? 'visible' : 'none';
    
    // Check if layers exist before trying to set visibility
    const fillLayerId = 'polygon-fill-' + siteId;
    const outlineLayerId = 'polygon-outline-' + siteId;
    
    if (map.getLayer(fillLayerId)) {
      map.setLayoutProperty(fillLayerId, 'visibility', visibility);
    } else {
      console.warn(`Layer ${fillLayerId} not found`);
    }
    
    if (map.getLayer(outlineLayerId)) {
      map.setLayoutProperty(outlineLayerId, 'visibility', visibility);
    } else {
      console.warn(`Layer ${outlineLayerId} not found`);
    }
  }

  function calculateLiveFeedPosition() {
    const header = document.querySelector("header");
    const sidebar = document.querySelector(".sidebar");
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

  function showSiteDetails(site, category) {
    if (window.showInfoDrawer) {
      window.showInfoDrawer(site, category);
    }

    const sideWrapper = document.querySelector(".side-wrapper");
    if (sideWrapper) {
      sideWrapper.classList.add("active");
    }
  }

  function zoomToMarker(location) {
    // Convert to [lng, lat] format for MapLibre
    const lngLat = [location[1], location[0]];
    map.easeTo({
      center: lngLat,
      zoom: 15,
      duration: 3000,
    });
  }

  function updateMarkersForCheckbox(checkboxId, isChecked) {
    const allCategories = Object.keys(markersByCategory);
    
    // Handle site-specific checkboxes (individual sites)
    if (checkboxId.startsWith("site-")) {
      const siteId = checkboxId.replace("site-", "");
      setPolygonVisibility(siteId, isChecked);
      return;
    }

    // Build category master checkboxes mapping
    const categoryMasterCheckboxes = {};
    const layersContent = document.getElementById('layers-content');
    if (layersContent) {
      const categoryItems = layersContent.querySelectorAll('.category-content-section-item');
      categoryItems.forEach(item => {
        const input = item.querySelector('input[type="checkbox"]');
        if (input && input.id) {
          const categoryId = input.id.replace('all-', '');
          categoryMasterCheckboxes[input.id] = categoryId;
        }
      });
    }

    // Handle category master checkboxes (e.g., "all-economic-zone")
    if (categoryMasterCheckboxes[checkboxId]) {
      const categoryId = categoryMasterCheckboxes[checkboxId];
      
      // Find all sites in this category and toggle their polygon visibility
      if (window.mapMarkers) {
        window.mapMarkers.forEach((category) => {
          if (category.id === categoryId) {
            category.sites.forEach((site) => {
              if (site.polygon) {
                setPolygonVisibility(site.id, isChecked);
              }
            });
          }
        });
      }
      return;
    }

    // Handle subcategory checkboxes (e.g., "clark-freeport", "bgc-corporate")
    // This handles both the direct subcategory checkboxes AND checkboxes from dropdowns
    if (window.mapMarkers) {
      let foundMatch = false;
      
      window.mapMarkers.forEach((category) => {
        category.sites.forEach((site) => {
          const subcategory = window.getSubcategoryKey(site.subcategory);
          
          // Check if this checkbox matches the site's subcategory
          if (subcategory === checkboxId && site.polygon) {
            setPolygonVisibility(site.id, isChecked);
            foundMatch = true;
          }
        });
      });
      
      if (foundMatch) {
        return;
      }
    }
  }

  function findSiteById(siteId) {
    let foundSite = null;
    let foundCategory = null;

    if (mapMarkers) {
      mapMarkers.forEach((category) => {
        const site = category.sites.find((s) => s.id === siteId);
        if (site) {
          foundSite = site;
          foundCategory = category;
        }
      });
    }

    return { site: foundSite, category: foundCategory };
  }

  function zoomToSiteById(siteId) {
    const { site, category } = findSiteById(siteId);

    if (site && category) {
      const location = site.location;
      const lngLat = [location[1], location[0]];

      map.easeTo({
        center: lngLat,
        zoom: 15,
        duration: 2000,
      });

      return true;
    }

    return false;
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

  window.filterMarkers = {
    updateMarkersForCheckbox,
  };

  window.mapDebug = {
    calculateLiveFeedPosition,
    findSiteById,
    zoomToSiteById,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initializeMap();
    });
  } else {
    initializeMap();
  }
});
