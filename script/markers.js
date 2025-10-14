// script/markers.js

document.addEventListener("DOMContentLoaded", function () {
  let map;
  let markersLayer = [];
  let markersByCategory = {};
  let visibleMarkers = new Set();
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
    if (!mapMarkers || !mapSourcesAdded) return;

    console.log("Creating markers with MapLibre GL JS");

    mapMarkers.forEach((category) => {
      const categoryId = category.id;
      markersByCategory[categoryId] = {};

      category.sites.forEach((site) => {
        const subcategory = window.getSubcategoryKey(site.subcategory);

        if (!markersByCategory[categoryId][subcategory]) {
          markersByCategory[categoryId][subcategory] = [];
        }

        const sitePolygon = addSitePolygon(site);

        // Add click event
        sitePolygon.addEventListener("click", function (e) {
          showSiteDetails(site, category);
          zoomToMarker(site.location);
        });
      });
    });
  }

  function addSitePolygon(site) {
    if (!site.polygon || !map.getSource('polygon-' + site.id)) {
      // Add GeoJSON source for this site's polygon
      map.addSource('polygon-' + site.id, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [site.polygon]
          }
        }
      });

      // Add fill layer
      map.addLayer({
        id: 'polygon-fill-' + site.id,
        type: 'fill',
        source: 'polygon-' + site.id,
        paint: {
          'fill-color': '#fa5454ff',
          'fill-opacity': 0.3
        }
      });

      // Add outline layer
      map.addLayer({
        id: 'polygon-outline-' + site.id,
        type: 'line',
        source: 'polygon-' + site.id,
        paint: {
          'line-color': '#ff0f0fff',
          'line-width': 2
        }
      });

      sitePolygons[site.id] = true;

      return map;
    }
  }

  function removeSitePolygon(siteId) {
    if (map.getLayer('polygon-fill-' + siteId)) {
      map.removeLayer('polygon-fill-' + siteId);
    }
    if (map.getLayer('polygon-outline-' + siteId)) {
      map.removeLayer('polygon-outline-' + siteId);
    }
    if (map.getSource('polygon-' + siteId)) {
      map.removeSource('polygon-' + siteId);
    }
    delete sitePolygons[siteId];
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

    if (categoryMasterCheckboxes[checkboxId]) {

      const categoryId = categoryMasterCheckboxes[checkboxId];
      if (markersByCategory[categoryId]) {
        Object.values(markersByCategory[categoryId]).forEach(
          (subcategoryMarkers) => {
            subcategoryMarkers.forEach((marker) => {

              if (isChecked) {
                markersLayer.push(marker);
                marker.addTo(map);
                visibleMarkers.add(marker);
              } else {
                const index = markersLayer.indexOf(marker);
                if (index > -1) markersLayer.splice(index, 1);
                marker.remove();
                visibleMarkers.delete(marker);
              }
            });
          }
        );
      }
      return;
    }

    if (checkboxId.startsWith("site-")) {
      const siteId = checkboxId.replace("site-", "");
      
      let foundMarker = null;
      
      allCategories.forEach(categoryId => {
        if (markersByCategory[categoryId] && !foundMarker) {
          Object.values(markersByCategory[categoryId]).forEach(subcategoryMarkers => {
            subcategoryMarkers.forEach(marker => {
              if (marker._siteData && marker._siteData.site.id === siteId) {
                foundMarker = marker;
              }
            });
          });
        }
      });
      
      if (foundMarker) {
        if (isChecked) {
          if (!markersLayer.includes(foundMarker)) {
            markersLayer.push(foundMarker);
          }
          foundMarker.addTo(map);
          visibleMarkers.add(foundMarker);
          addSitePolygon(foundMarker._siteData.site);
        } else {
          const index = markersLayer.indexOf(foundMarker);
          if (index > -1) markersLayer.splice(index, 1);
          foundMarker.remove();
          visibleMarkers.delete(foundMarker);
          removeSitePolygon(siteId);
        }
      }
      
      return;
    }

    allCategories.forEach((categoryId) => {
      if (markersByCategory[categoryId][checkboxId]) {
        markersByCategory[categoryId][checkboxId].forEach((marker) => {
          if (isChecked) {
            markersLayer.push(marker);
            marker.addTo(map);
            visibleMarkers.add(marker);
          } else {
            const index = markersLayer.indexOf(marker);
            if (index > -1) markersLayer.splice(index, 1);
            marker.remove();
            visibleMarkers.delete(marker);
          }
        });
      }
    });
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

  window.filterMarkers = {
    updateMarkersForCheckbox,
  };

  window.cebuMapDebug = {
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
