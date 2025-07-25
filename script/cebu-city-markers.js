document.addEventListener("DOMContentLoaded", function () {
  let map;
  let markersLayer = [];
  let markersByCategory = {};
  let visibleMarkers = new Set();
  let mapSourcesAdded = false;

  function initializeMap() {
    // Initialize MapLibre GL map with interaction handlers enabled
    map = new maplibregl.Map({
      container: "map",
      zoom: 7,
      center: [123.8854, 10.3157], // Cebu City coordinates [lng, lat]
      pitch: 0,
      // hash: true,
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
          // Use a different source for terrain and hillshade layers, to improve render quality
          terrainSource: {
            type: "raster-dem",
            url: "https://demotiles.maplibre.org/terrain-tiles/tiles.json",
            tileSize: 256,
          },
          hillshadeSource: {
            type: "raster-dem",
            url: "https://demotiles.maplibre.org/terrain-tiles/tiles.json",
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
          },
          {
            id: "hills",
            type: "hillshade",
            source: "hillshadeSource",
            layout: { visibility: "visible" },
            paint: { "hillshade-shadow-color": "#473B24" },
          },
        ],
        terrain: {
          source: "terrainSource",
          exaggeration: 1,
        },
        sky: {},
      },
      maxZoom: 18,
      maxPitch: 85,
      bearing: 0,
      // Enable all interaction handlers explicitly
      interactive: true,
      scrollZoom: true,
      boxZoom: true,
      dragRotate: true,
      dragPan: true,
      keyboard: true,
      doubleClickZoom: true,
      touchZoomRotate: true,
      touchPitch: true,
      cooperativeGestures: false, // Set to true if you want to require Ctrl+scroll for zoom
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

    map.addControl(
      new maplibregl.TerrainControl({
        source: "terrainSource",
        exaggeration: 1,
      })
    );

    // Add scale control
    // map.addControl(new maplibregl.ScaleControl({
    //   maxWidth: 80,
    //   unit: 'metric'
    // }), 'bottom-left');

    // Store map globally

    map.on("load", function () {
      console.log("MapLibre map loaded successfully");
      mapSourcesAdded = true;
      createMarkers();
    });

    // Handle map resize for header toggle
    // map.on('resize', function() {
    //   setTimeout(() => {
    //     map.resize();
    //   }, 100);
    // });

    // Add error handling
    map.on("error", function (e) {
      console.error("MapLibre GL JS error:", e);
    });

    window.map = map;

    // Log interaction handlers status for debugging
    // map.on('load', function() {
    //   console.log('Map interaction handlers status:');
    //   console.log('ScrollZoom enabled:', map.scrollZoom.isEnabled());
    //   console.log('DragPan enabled:', map.dragPan.isEnabled());
    //   console.log('DragRotate enabled:', map.dragRotate.isEnabled());
    //   console.log('DoubleClickZoom enabled:', map.doubleClickZoom.isEnabled());
    //   console.log('TouchZoomRotate enabled:', map.touchZoomRotate.isEnabled());
    //   console.log('Keyboard enabled:', map.keyboard.isEnabled());
    // });
  }

  function createMarkers() {
    if (!window.cebuCityMarkers || !mapSourcesAdded) return;

    console.log("Creating markers with MapLibre GL JS");

    window.cebuCityMarkers.forEach((category) => {
      const categoryId = category.id;
      markersByCategory[categoryId] = {};

      category.sites.forEach((site) => {
        const subcategory = getSubcategoryKey(site.subcategory);

        if (!markersByCategory[categoryId][subcategory]) {
          markersByCategory[categoryId][subcategory] = [];
        }

        // Create marker element
        const markerElement = document.createElement("div");
        markerElement.className = "marker-custom";
        markerElement.innerHTML = getMarkerIcon(site.subcategory, site.status);
        markerElement.style.width = "30px";
        markerElement.style.height = "30px";
        markerElement.style.cursor = "pointer";

        // Create MapLibre marker
        const marker = new maplibregl.Marker({
          element: markerElement,
          anchor: "bottom",
        })
          .setLngLat([site.location[1], site.location[0]]) // [lng, lat] format
          .addTo(map);

        // Add click event
        markerElement.addEventListener("click", function (e) {
          showSiteDetails(site, category);
          zoomToMarker(site.location);

          setTimeout(() => {
            showLiveFeedCardForSite(site, e);
          }, 300);
        });

        // Store marker reference
        marker._siteData = { site, category };
        markersByCategory[categoryId][subcategory].push(marker);
        visibleMarkers.add(marker);
      });
    });

    // console.log('Markers created:', markersByCategory);
  }

  function getMarkerIcon(subcategory, status) {
    const iconColor = getStatusColor(status);
    const iconType = getIconType(subcategory);

    return `
      <div style="
        width: 30px; 
        height: 30px; 
        background: ${iconColor}; 
        border: 2px solid white; 
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        font-size: 14px;
        color: white;
      ">
        ${iconType}
      </div>
    `;
  }

  function getStatusColor(status) {
    const colors = {
      active: "#10B981",
      maintenance: "#F59E0B",
      inactive: "#EF4444",
      warning: "#F97316",
      construction: "#8B5CF6",
      default: "#6B7280",
    };
    return colors[status] || colors.default;
  }

  function getIconType(subcategory) {
    const icons = {
      hospitals: "🏥",
      schools: "🏫",
      govt: "🏛️",
      police: "👮",
      fire: "🚒",
      water: "💧",
      electricity: "⚡",
      roads: "🛣️",
      transport: "🚌",
      wifi: "📶",
      parks: "🌳",
      businesses: "🏢",
      default: "📍",
    };

    const key = Object.keys(icons).find((k) =>
      subcategory.toLowerCase().includes(k)
    );
    return icons[key] || icons.default;
  }

  function showLiveFeedCardForSite(site, event) {
    console.log("Showing live feed card for site:", site.name);

    if (typeof window.showLiveFeedCard !== "function") {
      console.error("showLiveFeedCard function not available");
      return;
    }

    const cardPosition = calculateLiveFeedPosition();

    try {
      window.showLiveFeedCard(cardPosition);

      updateLiveFeedCardForSite(site);

      console.log("Live feed card shown successfully");
    } catch (error) {
      console.error("Error showing live feed card:", error);
    }
  }

  function calculateLiveFeedPosition() {
    const header = document.querySelector("header");
    const sidebar = document.querySelector(".sidebar-v2");
    const sidebarContent = document.querySelector(
      ".sidebar-content-v2.visible"
    );

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

  function updateLiveFeedCardForSite(site) {
    const liveFeedCard = document.querySelector(".live-feed-card");
    if (liveFeedCard) {
      const alertIndicator = liveFeedCard.querySelector(
        ".alert-indicator span:last-child"
      );
      if (alertIndicator) {
        alertIndicator.textContent = `Live Feed - ${site.name}`;
      }

      const deviceChannel = liveFeedCard.querySelector(".personnel-count");
      if (deviceChannel) {
        deviceChannel.textContent = site.id || "1000013";
      }

      const viewBtn = liveFeedCard.querySelector("#live-feed-view-btn");
      if (viewBtn) {
        viewBtn.setAttribute("data-site-id", site.id);
        viewBtn.setAttribute("data-camera-code", site.id || "1000013");

        const newViewBtn = viewBtn.cloneNode(true);
        viewBtn.parentNode.replaceChild(newViewBtn, viewBtn);

        newViewBtn.addEventListener("click", function () {
          const cameraCode = this.getAttribute("data-camera-code") || "1000013";
          console.log("Redirecting to streams page with camera:", cameraCode);

          const currentPath = window.location.pathname;
          let streamsPath;

          if (
            currentPath.includes("/streams/") ||
            currentPath.endsWith("streams.php")
          ) {
            streamsPath = `?camera=${cameraCode}`;
          } else {
            streamsPath = `streams/?camera=${cameraCode}`;
          }

          console.log("Navigating to:", streamsPath);
          window.location.href = streamsPath;
        });
      }
    }
  }

  function getSubcategoryKey(subcategory) {
    const subcategoryMap = {
      Highways: "highways",
      Roads: "main-roads",
      Streets: "streets",
      "Public transportation networks": "public-transport",
      "Real-time traffic conditions": "traffic-data",
      "Congestion patterns": "traffic-data",
      "Public transport routes": "public-transport",
      "Water Supply": "water",
      "Electricity Supply": "electricity",
      "Sewage System": "sewage",
      "Communication lines": "communication",
      "Waste Management Facilities": "waste",
      "Core Infrastructure": "nbp",
      "Data Centers": "nbp",
      Operations: "nbp",
      "Public Access Points": "nbp",
      "Specialized Networks": "nbp",
      "Wireless Infrastructure": "nbp",
      "Service Centers": "nbp",
      "WiFi Hotspots": "wifi-hotspots",
      "Public Internet Centers": "internet-centers",
      Hospitals: "hospitals",
      Schools: "schools",
      "Government Offices": "govt",
      "Police Stations": "police",
      "Fire Departments": "fire",
      Topography: "topography",
      Waterways: "waterways",
      Parks: "parks",
      "Green Spaces": "parks",
      "Areas vulnerable to flooding": "flood",
      "Pollution zones": "pollution",
      "Other environmental hazards": "hazards",
      Businesses: "businesses",
      "Recreational areas": "recreational",
      "Community centers": "community",
      "Population density": "density",
      "Income distribution": "income",
      "Education levels": "education",
    };

    return (
      subcategoryMap[subcategory] ||
      subcategory.toLowerCase().replace(/\s+/g, "-")
    );
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

  // function zoomToMarker(location) {
  //   const bounds = L.latLngBounds([location]);
  //   const paddedBounds = bounds.pad(0.2);
  //   map.flyToBounds(paddedBounds, {
  //     padding: [50, 50],
  //     maxZoom: 15,
  //     duration: 1,
  //   });
  // }

  function zoomToMarker(location) {
    // Convert to [lng, lat] format for MapLibre
    const lngLat = [location[1], location[0]];

    map.easeTo({
      center: lngLat,
      zoom: 15,
      duration: 1000,
    });
  }

  // function updateMarkersForCheckbox(checkboxId, isChecked) {
  //   const allCategories = Object.keys(markersByCategory);

  //   if (checkboxId === 'all') {
  //     allCategories.forEach(categoryId => {
  //       Object.values(markersByCategory[categoryId]).forEach(subcategoryMarkers => {
  //         subcategoryMarkers.forEach(marker => {
  //           if (isChecked) {
  //             markersLayer.addLayer(marker);
  //             visibleMarkers.add(marker);
  //           } else {
  //             markersLayer.removeLayer(marker);
  //             visibleMarkers.delete(marker);
  //           }
  //         });
  //       });
  //     });
  //     return;
  //   }

  //   const categoryMasterCheckboxes = {
  //     'all-infrastructure': 'infrastructure',
  //     'all-buildings': 'public_buildings',
  //     'all-natural': 'natural_features',
  //     'all-risks': 'environmental_risks',
  //     'all-poi': 'points_of_interest',
  //     'all-demographics': 'population_data',
  //     'all-internet': 'internet_access'
  //   };

  //   if (categoryMasterCheckboxes[checkboxId]) {
  //     const categoryId = categoryMasterCheckboxes[checkboxId];
  //     if (markersByCategory[categoryId]) {
  //       Object.values(markersByCategory[categoryId]).forEach(subcategoryMarkers => {
  //         subcategoryMarkers.forEach(marker => {
  //           if (isChecked) {
  //             markersLayer.addLayer(marker);
  //             visibleMarkers.add(marker);
  //           } else {
  //             markersLayer.removeLayer(marker);
  //             visibleMarkers.delete(marker);
  //           }
  //         });
  //       });
  //     }
  //     return;
  //   }

  //   allCategories.forEach(categoryId => {
  //     if (markersByCategory[categoryId][checkboxId]) {
  //       markersByCategory[categoryId][checkboxId].forEach(marker => {
  //         if (isChecked) {
  //           markersLayer.addLayer(marker);
  //           visibleMarkers.add(marker);
  //         } else {
  //           markersLayer.removeLayer(marker);
  //           visibleMarkers.delete(marker);
  //         }
  //       });
  //     }
  //   });
  // }

  function updateMarkersForCheckbox(checkboxId, isChecked) {
    const allCategories = Object.keys(markersByCategory);

    if (checkboxId === "all") {
      allCategories.forEach((categoryId) => {
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
      });
      return;
    }

    const categoryMasterCheckboxes = {
      "all-infrastructure": "infrastructure",
      "all-buildings": "public_buildings",
      "all-natural": "natural_features",
      "all-risks": "environmental_risks",
      "all-poi": "points_of_interest",
      "all-demographics": "population_data",
      "all-internet": "internet_access",
    };

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

  function updateMasterCheckboxes() {
    const masterCheckboxes = {
      all: document.getElementById("all"),
      "all-infrastructure": document.getElementById("all-infrastructure"),
      "all-buildings": document.getElementById("all-buildings"),
      "all-natural": document.getElementById("all-natural"),
      "all-risks": document.getElementById("all-risks"),
      "all-poi": document.getElementById("all-poi"),
      "all-demographics": document.getElementById("all-demographics"),
      "all-internet": document.getElementById("all-internet"),
    };

    Object.entries(masterCheckboxes).forEach(([id, checkbox]) => {
      if (!checkbox) return;

      let relatedCheckboxes = [];

      if (id === "all") {
        relatedCheckboxes = document.querySelectorAll(
          '.content-section-item input[type="checkbox"]:not(#all):not([id^="all-"])'
        );
      } else {
        const contentId = id.replace("all-", "") + "-content";
        relatedCheckboxes = document.querySelectorAll(
          `#${contentId} .content-section-item input[type="checkbox"]:not([id^="all-"])`
        );
      }

      const checkedCount = Array.from(relatedCheckboxes).filter(
        (cb) => cb.checked
      ).length;
      const totalCount = relatedCheckboxes.length;

      if (checkedCount === 0) {
        checkbox.checked = false;
        checkbox.indeterminate = false;
      } else if (checkedCount === totalCount) {
        checkbox.checked = true;
        checkbox.indeterminate = false;
      } else {
        checkbox.checked = false;
        checkbox.indeterminate = true;
      }
    });
  }

  function findSiteById(siteId) {
    let foundSite = null;
    let foundCategory = null;

    if (window.cebuCityMarkers) {
      window.cebuCityMarkers.forEach((category) => {
        const site = category.sites.find((s) => s.id === siteId);
        if (site) {
          foundSite = site;
          foundCategory = category;
        }
      });
    }

    return { site: foundSite, category: foundCategory };
  }

  // function zoomToSiteById(siteId) {
  //   const { site, category } = findSiteById(siteId);

  //   if (site && category) {
  //     console.log('Zooming to site:', site.name);

  //     const location = site.location;
  //     const bounds = L.latLngBounds([location]);
  //     const paddedBounds = bounds.pad(0.2);

  //     map.flyToBounds(paddedBounds, {
  //       padding: [50, 50],
  //       maxZoom: 16,
  //       duration: 2
  //     });

  //     setTimeout(() => {
  //       showSiteDetails(site, category);

  //       setTimeout(() => {
  //         showLiveFeedCardForSite(site, null);
  //       }, 500);
  //     }, 1000);

  //     return true;
  //   }

  //   return false;
  // }

  function zoomToSiteById(siteId) {
    const { site, category } = findSiteById(siteId);

    if (site && category) {
      console.log("Zooming to site:", site.name);

      const location = site.location;
      const lngLat = [location[1], location[0]]; // Convert to [lng, lat]

      map.easeTo({
        center: lngLat,
        zoom: 16,
        duration: 2000,
      });

      setTimeout(() => {
        showSiteDetails(site.id, category.id);

        setTimeout(() => {
          if (window.showLiveFeedCardForSite) {
            window.showLiveFeedCardForSite(site, null);
          }
        }, 500);
      }, 1000);

      return true;
    }

    return false;
  }

  window.filterMarkers = {
    updateMarkersForCheckbox,
    updateMasterCheckboxes,
  };

  window.cebuMapDebug = {
    showLiveFeedCardForSite,
    calculateLiveFeedPosition,
    updateLiveFeedCardForSite,
    findSiteById,
    zoomToSiteById,
  };

  window.updateLiveFeedCardForSite = updateLiveFeedCardForSite;

  // if (document.readyState === 'loading') {
  //   document.addEventListener('DOMContentLoaded', function() {
  //     initializeMap();
  //     createMarkers();
  //   });
  // } else {
  //   initializeMap();
  //   createMarkers();
  // }

  initializeMap();
  createMarkers();
});
