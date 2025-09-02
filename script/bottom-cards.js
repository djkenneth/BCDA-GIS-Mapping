// script/bottom-cards.js

document.addEventListener("DOMContentLoaded", function () {
  let infrastructureData = {};
  let isInitialLoad = true;

  function initializeInfrastructureCards() {
    // Check if markers data is available
    if (!mapMarkers) {
      console.error("markers data not loaded");
      // Create a retry mechanism
      setTimeout(() => {
        initializeInfrastructureCards();
      }, 1000);
      return;
    }

    if (isInitialLoad) {
      initializeDefaultBuildings();
      isInitialLoad = false;
    }

    calculateInfrastructureStats();
    renderInfrastructureCards();
  }

  function initializeDefaultBuildings() {
    try {
      const buildingsCheckbox = document.getElementById("clark-freeport");
      if (buildingsCheckbox) {
        if (!buildingsCheckbox.checked) {
          buildingsCheckbox.checked = true;
          buildingsCheckbox.dispatchEvent(new Event("change"));
        } else {
          console.log("Buildings category already selected");
        }
      } else {
        console.warn("Buildings checkbox not found, will try again later");
        setTimeout(initializeDefaultBuildings, 500);
      }
    } catch (error) {
      console.error("Error initializing default buildings:", error);
    }
  }

  function calculateInfrastructureStats() {
    try {
      const selectedCategories = getSelectedCategories();
      infrastructureData = {
        activeLocators: 0,
        pendingPermits: 0,
        criticalIssues: 0,
        infrastructureAssets: 0,
        availableLots: 0,
        occupancyRate: 0,
        categories: {},
        subcategories: {},
      };

      mapMarkers.forEach((category) => {
        const categoryStats = {
          // Remove old status properties and add new ones
          activeLocators: 0,
          pendingPermits: 0,
          criticalIssues: 0,
          infrastructureAssets: 0,
          availableLots: 0,
          occupancyRate: 0,
          subcategories: {},
        };

        const shouldIncludeCategory =
          selectedCategories.showAll ||
          selectedCategories.categories.includes(category.id);

        if (shouldIncludeCategory) {
          category.sites.forEach((site) => {
            // Count sites based on NEW status values
            const status = site.status || "active_locators";

            // Update counters based on new status values
            switch (status) {
              case "active_locators":
                categoryStats.activeLocators++;
                infrastructureData.activeLocators++;
                break;
              case "pending_permits":
                categoryStats.pendingPermits++;
                infrastructureData.pendingPermits++;
                break;
              case "critical_issues":
                categoryStats.criticalIssues++;
                infrastructureData.criticalIssues++;
                break;
              case "infrastructure_assets":
                categoryStats.infrastructureAssets++;
                infrastructureData.infrastructureAssets++;
                break;
              case "available_lots":
                categoryStats.availableLots++;
                infrastructureData.availableLots++;
                break;
              case "occupancy_rate":
                categoryStats.occupancyRate++;
                infrastructureData.occupancyRate++;
                break;
              default:
                // Default to active_locators for unknown status
                categoryStats.activeLocators++;
                infrastructureData.activeLocators++;
            }

            const subcategoryKey = getSubcategoryKey(site.subcategory);

            // Update subcategory tracking with new status properties
            if (!categoryStats.subcategories[subcategoryKey]) {
              categoryStats.subcategories[subcategoryKey] = {
                name: site.subcategory,
                activeLocators: 0,
                pendingPermits: 0,
                criticalIssues: 0,
                infrastructureAssets: 0,
                availableLots: 0,
                occupancyRate: 0,
              };
            }

            if (!infrastructureData.subcategories[subcategoryKey]) {
              infrastructureData.subcategories[subcategoryKey] = {
                name: site.subcategory,
                activeLocators: 0,
                pendingPermits: 0,
                criticalIssues: 0,
                infrastructureAssets: 0,
                availableLots: 0,
                occupancyRate: 0,
                categoryId: category.id,
              };
            }

            // Update subcategory counters
            switch (status) {
              case "active_locators":
                categoryStats.subcategories[subcategoryKey].activeLocators++;
                infrastructureData.subcategories[subcategoryKey]
                  .activeLocators++;
                break;
              case "pending_permits":
                categoryStats.subcategories[subcategoryKey].pendingPermits++;
                infrastructureData.subcategories[subcategoryKey]
                  .pendingPermits++;
                break;
              case "critical_issues":
                categoryStats.subcategories[subcategoryKey].criticalIssues++;
                infrastructureData.subcategories[subcategoryKey]
                  .criticalIssues++;
                break;
              case "infrastructure_assets":
                categoryStats.subcategories[subcategoryKey]
                  .infrastructureAssets++;
                infrastructureData.subcategories[subcategoryKey]
                  .infrastructureAssets++;
                break;
              case "available_lots":
                categoryStats.subcategories[subcategoryKey].availableLots++;
                infrastructureData.subcategories[subcategoryKey]
                  .availableLots++;
                break;
              case "occupancy_rate":
                categoryStats.subcategories[subcategoryKey].occupancyRate++;
                infrastructureData.subcategories[subcategoryKey]
                  .occupancyRate++;
                break;
              default:
                categoryStats.subcategories[subcategoryKey].activeLocators++;
                infrastructureData.subcategories[subcategoryKey]
                  .activeLocators++;
            }
          });
        }

        infrastructureData.categories[category.id] = categoryStats;
      });

      // Calculate occupancy rate as percentage
      const totalSites =
        infrastructureData.activeLocators +
        infrastructureData.pendingPermits +
        infrastructureData.criticalIssues +
        infrastructureData.infrastructureAssets +
        infrastructureData.availableLots;

      if (totalSites > 0) {
        // Calculate occupancy rate (active locators / total sites * 100)
        infrastructureData.occupancyRate = Math.round(
          (infrastructureData.activeLocators / totalSites) * 100
        );
      }
    } catch (error) {
      console.error("Error calculating infrastructure stats:", error);
    }
  }

  // function calculateInfrastructureStats() {
  //   try {
  //     const selectedCategories = getSelectedCategories();

  //     infrastructureData = {
  //       activeLocators: 0,
  //       pendingPermits: 0,
  //       criticalIssues: 0,
  //       infrastructureAssets: 0,
  //       availableLots: 0,
  //       occupancyRate: 0,
  //       categories: {},
  //       subcategories: {},
  //     };

  //     mapMarkers.forEach((category) => {
  //       const categoryStats = {
  //         activeLocators: 0,
  //         pendingPermits: 0,
  //         criticalIssues: 0,
  //         infrastructureAssets: 0,
  //         availableLots: 0,
  //         occupancyRate: 0,
  //         subcategories: {},
  //       };

  //       const shouldIncludeCategory =
  //         selectedCategories.showAll ||
  //         selectedCategories.categories.includes(category.id);

  //       if (shouldIncludeCategory) {
  //         category.sites.forEach((site) => {
  //           categoryStats.total++;
  //           infrastructureData.total++;

  //           const status = site.status || "active";

  //           categoryStats[status]++;
  //           infrastructureData[status]++;

  //           const subcategoryKey = getSubcategoryKey(site.subcategory);

  //           if (!categoryStats.subcategories[subcategoryKey]) {
  //             categoryStats.subcategories[subcategoryKey] = {
  //               name: site.subcategory,
  //               total: 0,
  //               active: 0,
  //               warning: 0,
  //               critical: 0,
  //               maintenance: 0,
  //               inactive: 0,
  //               recently_acquired: 0,
  //               transfer_pending: 0,
  //             };
  //           }

  //           if (!infrastructureData.subcategories[subcategoryKey]) {
  //             infrastructureData.subcategories[subcategoryKey] = {
  //               name: site.subcategory,
  //               total: 0,
  //               active: 0,
  //               warning: 0,
  //               critical: 0,
  //               maintenance: 0,
  //               inactive: 0,
  //               recently_acquired: 0,
  //               transfer_pending: 0,
  //               categoryId: category.id,
  //             };
  //           }

  //           categoryStats.subcategories[subcategoryKey].total++;
  //           categoryStats.subcategories[subcategoryKey][status]++;

  //           infrastructureData.subcategories[subcategoryKey].total++;
  //           infrastructureData.subcategories[subcategoryKey][status]++;
  //         });
  //       }

  //       infrastructureData.categories[category.id] = categoryStats;
  //     });
  //   } catch (error) {
  //     console.error("Error calculating infrastructure stats:", error);
  //   }
  // }

  function getSubcategoryKey(subcategory) {
    // Search through all categories in mapMarkers for matching subcategory
    for (const category of window.mapMarkers || []) {
      if (category.subcategoryConfigs) {
        // Check if subcategory matches any display title
        for (const [key, config] of Object.entries(
          category.subcategoryConfigs
        )) {
          if (config.title === subcategory) {
            return key;
          }
        }
      }
    }

    return subcategory.toLowerCase().replace(/\s+/g, "-");
  }

  function renderInfrastructureCards() {
    const cardsWrapper = document.getElementById("infra-cards-wrapper");
    if (!cardsWrapper) {
      console.error("Infrastructure cards wrapper not found");
      return;
    }

    let cards = [];

    cards = getOverviewCards();

    let cardsHTML = "";
    cards.forEach((card) => {
      cardsHTML += `
        <div class="infra-card ${card.className}" 
             data-category="${card.category}" 
             data-filter="${card.filter}"
             data-subcategory="${card.subcategory || ""}"
             style="cursor: pointer;">
          <div class="card-title">${card.value}</div>
          <div class="card-result">${card.title}</div>
          <div class="icon">
            <i class="${card.icon}"></i>
          </div>
        </div>
      `;
    });

    cardsWrapper.innerHTML = cardsHTML;

    addCardClickListeners();
  }

  function getOverviewCards() {
    return [
      {
        title: "Active Locators",
        value: infrastructureData.activeLocators || 0,
        className: "active-bg",
        icon: "fas fa-map-marker-alt",
        category: "status",
        filter: "active_locators",
      },
      {
        title: "Pending Permits",
        value: infrastructureData.pendingPermits || 0,
        className: "warning-bg",
        icon: "fas fa-clock",
        category: "status",
        filter: "pending_permits",
      },
      {
        title: "Critical Issues",
        value: infrastructureData.criticalIssues || 0,
        className: "critical-bg",
        icon: "fas fa-exclamation-triangle",
        category: "status",
        filter: "critical_issues",
      },
      {
        title: "Infrastructure Assets",
        value: infrastructureData.infrastructureAssets || 0,
        className: "info-bg",
        icon: "fas fa-building",
        category: "status",
        filter: "infrastructure_assets",
      },
      {
        title: "Available Lots",
        value: infrastructureData.availableLots || 0,
        className: "inactive-bg",
        icon: "fas fa-map",
        category: "status",
        filter: "available_lots",
      },
      {
        title: "Occupancy Rate",
        value: (infrastructureData.occupancyRate || 0) + "%",
        className: "maintenance-bg",
        icon: "fas fa-chart-pie",
        category: "status",
        filter: "occupancy_rate",
      },
    ];
  }

  function findCategoryById(categoryId) {
    return mapMarkers?.find((cat) => cat.id === categoryId) || null;
  }

  function getCategoryDisplayName(categoryId) {
    const category = findCategoryById(categoryId);
    return category?.displayInfo?.title || categoryId;
  }

  function getSubcategoryDisplayName(subcategoryKey) {
    // Search all categories for the subcategory
    for (const category of mapMarkers || []) {
      const subcategoryConfig = category.subcategoryConfigs?.[subcategoryKey];
      if (subcategoryConfig) {
        return subcategoryConfig.title;
      }
    }

    // Fallback to formatted key if not found
    return subcategoryKey
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }

  function getSelectedCategories() {
    try {
      const allCheckbox = document.getElementById("all");

      // If all checkbox is checked, show all categories
      if (allCheckbox && allCheckbox.checked) {
        return {
          showAll: true,
          categories: [],
        };
      }

      const selectedCategories = [];

      // Get categoryMasterCheckboxes from filter-sidebar.js
      const categoryMasterCheckboxes =
        window.filterSidebar?.categoryMasterCheckboxes || {};

      // Check each master category checkbox dynamically
      Object.entries(categoryMasterCheckboxes).forEach(
        ([checkboxId, categoryId]) => {
          if (checkboxId !== "all") {
            // Skip the "all" checkbox
            const checkbox = document.getElementById(checkboxId);
            if (checkbox && checkbox.checked) {
              selectedCategories.push(categoryId);
            }
          }
        }
      );

      if (selectedCategories.length === 0 && window.mapMarkers) {
        const hasAnyChecked = window.mapMarkers.some((category) => {
          if (category.subcategoryConfigs) {
            return Object.keys(category.subcategoryConfigs).some(
              (subcategoryKey) => {
                const checkbox = document.getElementById(subcategoryKey);
                return checkbox && checkbox.checked;
              }
            );
          }
          return false;
        });

        if (hasAnyChecked) {
          return {
            showAll: false,
            categories: window.mapMarkers.map((cat) => cat.id),
          };
        }
      }

      return {
        showAll: selectedCategories.length === 0,
        categories: selectedCategories,
      };
    } catch (error) {
      console.error("Error getting selected categories:", error);
      return {
        showAll: true,
        categories: [],
      };
    }
  }

  function safeInitialization() {
    try {
      if (mapMarkers) {
        initializeInfrastructureCards();
      } else {
        // Set up a global event listener for marker data
        window.addEventListener(
          "cebuCityMarkersLoaded",
          initializeInfrastructureCards
        );

        // Also set a timeout as a fallback
        setTimeout(() => {
          if (!mapMarkers) {
            console.warn(
              "Timeout waiting for markers data, attempting initialization anyway"
            );
            mapMarkers = mapMarkers || [];
            initializeInfrastructureCards();
          }
        }, 2000); // 5 second timeout
      }
    } catch (error) {
      console.error("Error during initialization:", error);
    }
  }

  safeInitialization();

  // Export the infrastructure cards API
  window.infrastructureCards = {
    update: function () {
      try {
        calculateInfrastructureStats();
        renderInfrastructureCards();
      } catch (error) {
        console.error("Error updating infrastructure cards:", error);
      }
    },
    getData: () => infrastructureData,
    initialize: safeInitialization, // Add explicit initialization method
  };

  function addCardClickListeners() {
    const cards = document.querySelectorAll(".infra-card");
    cards.forEach((card) => {
      card.addEventListener("click", function () {
        const category = this.getAttribute("data-category");
        const filter = this.getAttribute("data-filter");
        const subcategory = this.getAttribute("data-subcategory");
        const categoryFilter = this.getAttribute("data-category-filter");

        showSitesList(category, filter, subcategory, categoryFilter);
      });
    });
  }

  function showSitesList(category, filter, subcategory, categoryFilter) {
    let sitesModal = document.getElementById("sites-modal");

    if (!sitesModal) {
      sitesModal = createSitesModal();
    }

    populateSitesModal(
      sitesModal,
      category,
      filter,
      subcategory,
      categoryFilter
    );
    sitesModal.style.display = "block";
    updateModalPosition(sitesModal);
  }

  function createSitesModal() {
    const modal = document.createElement("div");
    modal.id = "sites-modal";
    modal.className = "sites-modal";
    modal.innerHTML = `
        <div class="sites-modal-header">
            <h3 id="sites-modal-title">Sites List</h3>
            <button class="close-btn" id="sites-modal-close">×</button>
        </div>
        <div class="sites-modal-content" id="sites-modal-content">
        </div>
    `;

    // Base styles that work across all screen sizes
    modal.style.cssText = `
        position: fixed;
        background-color: #080f17;
        z-index: 1000;
        color: white;
        display: none;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector("#sites-modal-close");
    closeBtn.addEventListener("click", function () {
      closeSitesModal(modal);
    });

    // Close modal when clicking outside on desktop
    modal.addEventListener("click", function (e) {
      if (
        e.target === modal &&
        !window.matchMedia("(max-width: 768px)").matches
      ) {
        closeSitesModal(modal);
      }
    });

    // Handle escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.style.display === "block") {
        closeSitesModal(modal);
      }
    });

    return modal;
  }

  function closeSitesModal(modal) {
    modal.style.display = "none";
    modal.classList.remove("full-screen");
    document.body.classList.remove("modal-open");
  }

  function updateModalPosition(modal) {
    if (!modal) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const isTablet = window.matchMedia(
      "(max-width: 1024px) and (min-width: 769px)"
    ).matches;

    if (isMobile || isTablet) {
      // Force full-screen positioning for mobile and tablet
      modal.style.top = "0px";
      modal.style.left = "0px";
      modal.style.right = "0px";
      modal.style.bottom = "0px";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.maxWidth = "100%";
      modal.style.maxHeight = "100%";
      modal.style.margin = "0";
      modal.style.padding = "0";
      modal.style.borderRadius = "0";
      modal.style.border = "none";
      modal.style.zIndex = "1000";
      modal.classList.add("full-screen");

      // Prevent body scroll on mobile
      if (isMobile) {
        document.body.classList.add("modal-open");
      }
      return;
    }

    // Desktop positioning logic (existing code)
    const header = document.querySelector("header");
    const sidebarContent = document.querySelector(".sidebar-content.visible");

    let topPosition = "284px";
    let leftPosition = "60px";

    if (header && header.classList.contains("collapsed")) {
      topPosition = "0px";
    } else {
      topPosition = "284px";
    }

    if (sidebarContent && sidebarContent.classList.contains("visible")) {
      leftPosition = "380px";
    } else {
      leftPosition = "60px";
    }

    modal.style.top = topPosition;
    modal.style.left = leftPosition;
    modal.style.right = "0";
    modal.style.bottom = "0";
    modal.style.width = "auto";
    modal.style.height = "auto";
    modal.style.maxWidth = "none";
    modal.style.maxHeight = "none";
    modal.classList.remove("full-screen");
  }

  function populateSitesModal(
    modal,
    category,
    filter,
    subcategory,
    categoryFilter
  ) {
    const title = modal.querySelector("#sites-modal-title");
    const content = modal.querySelector("#sites-modal-content");

    let sites = [];
    let modalTitle = "";

    if (category === "status") {
      if (categoryFilter) {
        modalTitle = `${
          filter.charAt(0).toUpperCase() + filter.slice(1)
        } Sites in ${getCategoryDisplayName(categoryFilter)}`;
        sites = getSitesByStatusAndCategory(filter, categoryFilter);
      } else {
        modalTitle = `${
          filter.charAt(0).toUpperCase() + filter.slice(1)
        } Sites`;
        sites = getAllSitesByStatus(filter);
      }
    } else if (subcategory) {
      modalTitle = getSubcategoryDisplayName(subcategory);
      sites = getSitesBySubcategory(subcategory);
    } else {
      modalTitle = getCategoryDisplayName(category);
      sites = getSitesByCategory(category);
    }

    title.textContent = modalTitle;

    if (sites.length === 0) {
      content.innerHTML =
        '<div class="no-sites">No sites found for this category</div>';
      return;
    }

    const sitesBySubcategory = {};
    sites.forEach((site) => {
      const subcategoryKey = getSubcategoryKey(site.subcategory);
      const subcategoryName = site.subcategory;

      if (!sitesBySubcategory[subcategoryKey]) {
        sitesBySubcategory[subcategoryKey] = {
          name: subcategoryName,
          sites: [],
          count: 0,
          collapsed: false,
        };
      }

      sitesBySubcategory[subcategoryKey].sites.push(site);
      sitesBySubcategory[subcategoryKey].count++;
    });

    let sitesHTML = "";

    const sortedSubcategories = Object.keys(sitesBySubcategory).sort((a, b) => {
      return sitesBySubcategory[a].name.localeCompare(
        sitesBySubcategory[b].name
      );
    });

    sortedSubcategories.forEach((subcategoryKey) => {
      const subcategoryData = sitesBySubcategory[subcategoryKey];
      const collapseId = `collapse-${subcategoryKey}`;

      sitesHTML += `
        <div class="subcategory-section">
          <div class="subcategory-header collapsible" data-target="${collapseId}">
            <h4 class="subcategory-title">
              <i class="collapse-icon fas fa-chevron-down"></i>
              ${subcategoryData.name}
              <span class="subcategory-count">(${subcategoryData.count})</span>
            </h4>
          </div>
          <div class="sites-grid collapsible-content" id="${collapseId}">
      `;

      subcategoryData.sites.forEach((site) => {
        const statusClass = `status-${site.status || "active"}`;
        sitesHTML += `
          <div class="site-item ${statusClass}" data-site-id="${site.id}">
            <div class="site-header">
              <div class="site-name">${site.name}</div>
              <div class="site-status ${statusClass}">${
          site.status || "active"
        }</div>
            </div>
            <div class="site-details">
              <div class="site-subcategory">${site.subcategory}</div>
              <div class="site-location">
                <i class="fas fa-map-marker-alt"></i>
                ${site.location[0].toFixed(4)}, ${site.location[1].toFixed(4)}
              </div>
            </div>
            <div class="site-description">${site.description}</div>
          </div>
        `;
      });

      sitesHTML += `
          </div>
        </div>
      `;
    });

    content.innerHTML = sitesHTML;

    const siteItems = content.querySelectorAll(".site-item");
    siteItems.forEach((item) => {
      item.addEventListener("click", function () {
        const siteId = this.getAttribute("data-site-id");
        const site = findSiteById(siteId);
        if (site && window.showInfoDrawer) {
          const category = findCategoryBySiteId(siteId);
          window.showInfoDrawer(site, category);

          if (window.cebuMapDebug && window.cebuMapDebug.zoomToSiteById) {
            window.cebuMapDebug.zoomToSiteById(site.id);
          }

          modal.style.display = "none";
        }
      });
    });

    const collapsibleHeaders = content.querySelectorAll(".collapsible");
    collapsibleHeaders.forEach((header) => {
      header.addEventListener("click", function () {
        const targetId = this.getAttribute("data-target");
        const target = document.getElementById(targetId);
        const icon = this.querySelector(".collapse-icon");

        if (target) {
          target.classList.toggle("collapsed");
          icon.classList.toggle("fa-chevron-down");
          icon.classList.toggle("fa-chevron-right");
        }
      });
    });

    addOrganizedSitesModalStyles();
  }

  function getSitesByStatusAndCategory(status, categoryId) {
    let sites = [];

    if (!mapMarkers) return sites;

    const category = mapMarkers.find((cat) => cat.id === categoryId);
    if (!category) return sites;

    category.sites.forEach((site) => {
      if (status === "total" || site.status === status) {
        sites.push({
          ...site,
          categoryName: category.category,
        });
      }
    });

    return sites;
  }

  function getSitesBySubcategory(subcategoryKey) {
    let sites = [];

    if (!mapMarkers) return sites;

    mapMarkers.forEach((category) => {
      category.sites.forEach((site) => {
        if (getSubcategoryKey(site.subcategory) === subcategoryKey) {
          sites.push({
            ...site,
            categoryName: category.category,
          });
        }
      });
    });

    return sites;
  }

  function addOrganizedSitesModalStyles() {
    if (!document.getElementById("organized-sites-modal-styles")) {
      const style = document.createElement("style");
      style.id = "organized-sites-modal-styles";

      document.head.appendChild(style);
    }
  }

  function getAllSitesByStatus(status) {
    let sites = [];

    if (!mapMarkers) return sites;

    mapMarkers.forEach((category) => {
      category.sites.forEach((site) => {
        if (status === "total" || site.status === status) {
          sites.push({
            ...site,
            categoryName: category.category,
          });
        }
      });
    });

    return sites;
  }

  function getSitesByCategory(categoryId) {
    if (!mapMarkers) return [];

    const category = mapMarkers.find((cat) => cat.id === categoryId);
    return category ? category.sites : [];
  }

  function findSiteById(siteId) {
    if (!mapMarkers) return null;

    for (const category of mapMarkers) {
      for (const site of category.sites) {
        if (site.id === siteId) {
          return site;
        }
      }
    }
    return null;
  }

  function findCategoryBySiteId(siteId) {
    if (!mapMarkers) return null;

    for (const category of mapMarkers) {
      if (category.sites.some((site) => site.id === siteId)) {
        return category;
      }
    }
    return null;
  }

  function updateInfrastructureCards() {
    calculateInfrastructureStats();
    renderInfrastructureCards();
  }

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList") {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasMarkerChanges = addedNodes.some(
          (node) =>
            node.classList &&
            (node.classList.contains("leaflet-marker-icon") ||
              node.classList.contains("leaflet-marker-shadow"))
        );

        if (hasMarkerChanges) {
          setTimeout(updateInfrastructureCards, 100);
        }
      }
    });
  });

  const mapElement = document.getElementById("map");
  if (mapElement) {
    observer.observe(mapElement, {
      childList: true,
      subtree: true,
    });
  }

  document.addEventListener("change", function (e) {
    if (e.target.type === "checkbox" && e.target.closest(".sidebar-content")) {
      setTimeout(updateInfrastructureCards, 100);
    }
  });

  window.addEventListener("resize", function () {
    const modal = document.getElementById("sites-modal");
    if (modal && modal.style.display === "block") {
      // Small delay to ensure resize has completed
      setTimeout(() => {
        updateModalPosition(modal);
      }, 100);
    }
  });

  // Handle orientation change on mobile devices
  window.addEventListener("orientationchange", function () {
    const modal = document.getElementById("sites-modal");
    if (modal && modal.style.display === "block") {
      setTimeout(() => {
        updateModalPosition(modal);
      }, 200);
    }
  });

  document.addEventListener(
    "touchend",
    function (event) {
      const modal = document.getElementById("sites-modal");
      if (
        modal &&
        modal.style.display === "block" &&
        window.matchMedia("(max-width: 768px)").matches
      ) {
        const now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }
    },
    false
  );

  let lastTouchEnd = 0;

  const searchObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        const modal = document.getElementById("sites-modal");
        if (modal && modal.style.display === "block") {
          setTimeout(() => updateModalPosition(modal), 100);
        }
      }
    });
  });

  const searchIcon = document.querySelector(".search-icon");
  if (searchIcon) {
    searchObserver.observe(searchIcon, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  if (mapMarkers) {
    initializeInfrastructureCards();
  } else {
    window.addEventListener("load", initializeInfrastructureCards);
  }

  window.infrastructureCards = {
    update: updateInfrastructureCards,
    getData: () => infrastructureData,
  };

  window.getSubcategoryKey = getSubcategoryKey;
});
