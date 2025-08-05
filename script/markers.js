// script/markers.js

document.addEventListener("DOMContentLoaded", function () {
  let map;
  let markersLayer = [];
  let markersByCategory = {};
  let visibleMarkers = new Set();
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

        const siteMarker = createSiteMarker(
          site.location,
          site.subcategory,
          site.status
        );

        // Create MapLibre marker
        const marker = new maplibregl.Marker({
          element: siteMarker,
        })
          .setLngLat([site.location[1], site.location[0]])
          .addTo(map);

        // Add click event
        siteMarker.addEventListener("click", function (e) {
          showSiteDetails(site, category);
          zoomToMarker(site.location);

          // setTimeout(() => {
          //   showLiveFeedCardForSite(site);
          // }, 300);
        });

        // Store marker reference
        marker._siteData = { site, category };
        markersByCategory[categoryId][subcategory].push(marker);
        visibleMarkers.add(marker);
      });
    });
  }

  // function showLiveFeedCardForSite(site) {
  //   if (typeof window.showLiveFeedCard !== "function") {
  //     console.error("showLiveFeedCard function not available");
  //     return;
  //   }

  //   const cardPosition = calculateLiveFeedPosition();

  //   try {
  //     window.showLiveFeedCard(cardPosition);

  //     updateLiveFeedCardForSite(site);
  //   } catch (error) {
  //     console.error("Error showing live feed card:", error);
  //   }
  // }

  function calculateLiveFeedPosition() {
    const header = document.querySelector("header");
    const sidebar = document.querySelector(".sidebar-v2");
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

          window.location.href = streamsPath;
        });
      }
    }
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

    const categoryMasterCheckboxes = {
      "all-infrastructure": "infrastructure",
      "all-buildings": "public_buildings",
      "all-natural": "natural_features",
      "all-risks": "environmental_risks",
      "all-poi": "points_of_interest",
      "all-demographics": "population_data",
    };

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
    updateMasterCheckboxes,
  };

  window.cebuMapDebug = {
    // showLiveFeedCardForSite,
    calculateLiveFeedPosition,
    updateLiveFeedCardForSite,
    findSiteById,
    zoomToSiteById,
  };

  window.updateLiveFeedCardForSite = updateLiveFeedCardForSite;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initializeMap();
    });
  } else {
    initializeMap();
  }
});
