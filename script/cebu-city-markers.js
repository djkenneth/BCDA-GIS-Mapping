document.addEventListener("DOMContentLoaded", function () {
  let map;
  let markersLayer = L.layerGroup();
  let markersByCategory = {};
  let visibleMarkers = new Set();

  function initializeMap() {
    map = L.map("map", {
      center: [10.3157, 123.8854],
      zoom: 12,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    markersLayer.addTo(map);
    L.control.attribution({ position: "bottomright" }).addTo(map);
    
    window.map = map;
  }

  function createMarkers() {
    if (!window.cebuCityMarkers || !window.markerManager) {
      console.error('Required data not loaded');
      return;
    }

    window.cebuCityMarkers.forEach((category) => {
      markersByCategory[category.id] = {};
      
      category.sites.forEach((site) => {
        const marker = window.markerManager.createSiteMarker(
          site.location,
          site.subcategory,
          site.status,
          { title: site.name }
        );

        marker.bindTooltip(site.name);
        
        marker.on("click", function(e) {
          console.log("Marker clicked:", site.name);
          
          showSiteDetails(site, category);
          zoomToMarker(site.location);
          
          setTimeout(() => {
            showLiveFeedCardForSite(site, e);
          }, 300);
        });

        const subcategory = getSubcategoryKey(site.subcategory);
        if (!markersByCategory[category.id][subcategory]) {
          markersByCategory[category.id][subcategory] = [];
        }
        markersByCategory[category.id][subcategory].push(marker);
      });
    });
  }

  function showLiveFeedCardForSite(site, event) {
    console.log("Showing live feed card for site:", site.name);
    
    if (typeof window.showLiveFeedCard !== 'function') {
      console.error('showLiveFeedCard function not available');
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
    const header = document.querySelector('header');
    const sidebar = document.querySelector('.sidebar-v2');
    const sidebarContent = document.querySelector('.sidebar-content-v2.visible');
    
    let topPosition = 248;
    let leftPosition = 80;
    
    if (header && header.classList.contains('collapsed')) {
      topPosition = 20;
    }
    
    if (sidebarContent) {
      leftPosition = 380;
    }
    
    return {
      x: leftPosition,
      y: topPosition
    };
  }

  function updateLiveFeedCardForSite(site) {
    const liveFeedCard = document.querySelector('.live-feed-card');
    if (liveFeedCard) {
      const alertIndicator = liveFeedCard.querySelector('.alert-indicator span:last-child');
      if (alertIndicator) {
        alertIndicator.textContent = `Live Feed - ${site.name}`;
      }
      
      const deviceChannel = liveFeedCard.querySelector('.personnel-count');
      if (deviceChannel) {
        deviceChannel.textContent = site.id || '1000013';
      }
      
      const viewBtn = liveFeedCard.querySelector('#live-feed-view-btn');
      if (viewBtn) {
        viewBtn.setAttribute('data-site-id', site.id);
        viewBtn.setAttribute('data-camera-code', site.id || '1000013');
        
        const newViewBtn = viewBtn.cloneNode(true);
        viewBtn.parentNode.replaceChild(newViewBtn, viewBtn);
        
        newViewBtn.addEventListener('click', function() {
          const cameraCode = this.getAttribute('data-camera-code') || '1000013';
          console.log("Redirecting to streams page with camera:", cameraCode);
          
          const currentPath = window.location.pathname;
          let streamsPath;
          
          if (currentPath.includes('/streams/') || currentPath.endsWith('streams.php')) {
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
      "Highways": "highways",
      "Roads": "main-roads", 
      "Streets": "streets",
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
      "Operations": "nbp",
      "Public Access Points": "nbp",
      "Specialized Networks": "nbp",
      "Wireless Infrastructure": "nbp",
      "Service Centers": "nbp",
      "WiFi Hotspots": "wifi-hotspots",
      "Public Internet Centers": "internet-centers",
      "Hospitals": "hospitals",
      "Schools": "schools",
      "Government Offices": "govt",
      "Police Stations": "police",
      "Fire Departments": "fire",
      "Topography": "topography",
      "Waterways": "waterways",
      "Parks": "parks",
      "Green Spaces": "parks",
      "Areas vulnerable to flooding": "flood",
      "Pollution zones": "pollution",
      "Other environmental hazards": "hazards",
      "Businesses": "businesses",
      "Recreational areas": "recreational",
      "Community centers": "community",
      "Population density": "density",
      "Income distribution": "income",
      "Education levels": "education"
    };
    
    return subcategoryMap[subcategory] || subcategory.toLowerCase().replace(/\s+/g, '-');
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
    const bounds = L.latLngBounds([location]);
    const paddedBounds = bounds.pad(0.2);
    map.flyToBounds(paddedBounds, {
      padding: [50, 50],
      maxZoom: 15,
      duration: 1,
    });
  }

  function updateMarkersForCheckbox(checkboxId, isChecked) {
    const allCategories = Object.keys(markersByCategory);
    
    if (checkboxId === 'all') {
      allCategories.forEach(categoryId => {
        Object.values(markersByCategory[categoryId]).forEach(subcategoryMarkers => {
          subcategoryMarkers.forEach(marker => {
            if (isChecked) {
              markersLayer.addLayer(marker);
              visibleMarkers.add(marker);
            } else {
              markersLayer.removeLayer(marker);
              visibleMarkers.delete(marker);
            }
          });
        });
      });
      return;
    }

    const categoryMasterCheckboxes = {
      'all-infrastructure': 'infrastructure',
      'all-buildings': 'public_buildings', 
      'all-natural': 'natural_features',
      'all-risks': 'environmental_risks',
      'all-poi': 'points_of_interest',
      'all-demographics': 'population_data',
      'all-internet': 'internet_access'
    };

    if (categoryMasterCheckboxes[checkboxId]) {
      const categoryId = categoryMasterCheckboxes[checkboxId];
      if (markersByCategory[categoryId]) {
        Object.values(markersByCategory[categoryId]).forEach(subcategoryMarkers => {
          subcategoryMarkers.forEach(marker => {
            if (isChecked) {
              markersLayer.addLayer(marker);
              visibleMarkers.add(marker);
            } else {
              markersLayer.removeLayer(marker);
              visibleMarkers.delete(marker);
            }
          });
        });
      }
      return;
    }

    allCategories.forEach(categoryId => {
      if (markersByCategory[categoryId][checkboxId]) {
        markersByCategory[categoryId][checkboxId].forEach(marker => {
          if (isChecked) {
            markersLayer.addLayer(marker);
            visibleMarkers.add(marker);
          } else {
            markersLayer.removeLayer(marker);
            visibleMarkers.delete(marker);
          }
        });
      }
    });
  }

  function updateMasterCheckboxes() {
    const masterCheckboxes = {
      'all': document.getElementById('all'),
      'all-infrastructure': document.getElementById('all-infrastructure'),
      'all-buildings': document.getElementById('all-buildings'),
      'all-natural': document.getElementById('all-natural'),
      'all-risks': document.getElementById('all-risks'),
      'all-poi': document.getElementById('all-poi'),
      'all-demographics': document.getElementById('all-demographics'),
      'all-internet': document.getElementById('all-internet')
    };

    Object.entries(masterCheckboxes).forEach(([id, checkbox]) => {
      if (!checkbox) return;
      
      let relatedCheckboxes = [];
      
      if (id === 'all') {
        relatedCheckboxes = document.querySelectorAll('.content-section-item input[type="checkbox"]:not(#all):not([id^="all-"])');
      } else {
        const contentId = id.replace('all-', '') + '-content';
        relatedCheckboxes = document.querySelectorAll(`#${contentId} .content-section-item input[type="checkbox"]:not([id^="all-"])`);
      }
      
      const checkedCount = Array.from(relatedCheckboxes).filter(cb => cb.checked).length;
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
      window.cebuCityMarkers.forEach(category => {
        const site = category.sites.find(s => s.id === siteId);
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
      console.log('Zooming to site:', site.name);
      
      const location = site.location;
      const bounds = L.latLngBounds([location]);
      const paddedBounds = bounds.pad(0.2);
      
      map.flyToBounds(paddedBounds, {
        padding: [50, 50],
        maxZoom: 16,
        duration: 2
      });
      
      setTimeout(() => {
        showSiteDetails(site, category);
        
        setTimeout(() => {
          showLiveFeedCardForSite(site, null);
        }, 500);
      }, 1000);
      
      return true;
    }
    
    return false;
  }

  window.filterMarkers = {
    updateMarkersForCheckbox,
    updateMasterCheckboxes
  };

  window.cebuMapDebug = {
    showLiveFeedCardForSite,
    calculateLiveFeedPosition,
    updateLiveFeedCardForSite,
    findSiteById,
    zoomToSiteById
  };

  window.updateLiveFeedCardForSite = updateLiveFeedCardForSite;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initializeMap();
      createMarkers();
    });
  } else {
    initializeMap();
    createMarkers();
  }
});