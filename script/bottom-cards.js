// script/bottom-cards.js

document.addEventListener("DOMContentLoaded", function () {
  let infrastructureData = {};

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  function initializeInfrastructureCards() {
    if (!window.categories || !window.subcategories || !window.sites) {
      console.error("Data not loaded");
      setTimeout(() => {
        initializeInfrastructureCards();
      }, 1000);
      return;
    }

    calculateInfrastructureStats();
    renderInfrastructureCards();
  }

  // ============================================================================
  // STATISTICS CALCULATION
  // ============================================================================

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

      window.categories.forEach((category) => {
        const categoryStats = {
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
          const categorySites = getSitesByCategoryId(category.id);
          
          categorySites.forEach((site) => {
            const subcategoryId = site.subcategory;
            const status = site.status || "active_locators";

            // Initialize subcategory stats if needed
            if (!categoryStats.subcategories[subcategoryId]) {
              categoryStats.subcategories[subcategoryId] = {
                activeLocators: 0,
                pendingPermits: 0,
                criticalIssues: 0,
                infrastructureAssets: 0,
                availableLots: 0,
                occupancyRate: 0,
              };
            }

            if (!infrastructureData.subcategories[subcategoryId]) {
              infrastructureData.subcategories[subcategoryId] = {
                activeLocators: 0,
                pendingPermits: 0,
                criticalIssues: 0,
                infrastructureAssets: 0,
                availableLots: 0,
                occupancyRate: 0,
              };
            }

            // Update stats based on status
            switch (status) {
              case "active_locators":
                categoryStats.activeLocators++;
                categoryStats.subcategories[subcategoryId].activeLocators++;
                infrastructureData.activeLocators++;
                infrastructureData.subcategories[subcategoryId].activeLocators++;
                break;
              case "pending_permits":
                categoryStats.pendingPermits++;
                categoryStats.subcategories[subcategoryId].pendingPermits++;
                infrastructureData.pendingPermits++;
                infrastructureData.subcategories[subcategoryId].pendingPermits++;
                break;
              case "critical_issues":
                categoryStats.criticalIssues++;
                categoryStats.subcategories[subcategoryId].criticalIssues++;
                infrastructureData.criticalIssues++;
                infrastructureData.subcategories[subcategoryId].criticalIssues++;
                break;
              case "infrastructure_assets":
                categoryStats.infrastructureAssets++;
                categoryStats.subcategories[subcategoryId].infrastructureAssets++;
                infrastructureData.infrastructureAssets++;
                infrastructureData.subcategories[subcategoryId].infrastructureAssets++;
                break;
              case "available_lots":
                categoryStats.availableLots++;
                categoryStats.subcategories[subcategoryId].availableLots++;
                infrastructureData.availableLots++;
                infrastructureData.subcategories[subcategoryId].availableLots++;
                break;
              case "occupancy_rate":
                categoryStats.occupancyRate++;
                categoryStats.subcategories[subcategoryId].occupancyRate++;
                infrastructureData.occupancyRate++;
                infrastructureData.subcategories[subcategoryId].occupancyRate++;
                break;
              default:
                categoryStats.activeLocators++;
                categoryStats.subcategories[subcategoryId].activeLocators++;
                infrastructureData.activeLocators++;
                infrastructureData.subcategories[subcategoryId].activeLocators++;
            }
          });
        }

        infrastructureData.categories[category.id] = categoryStats;
      });

      // Calculate occupancy rate
      const totalSites =
        infrastructureData.activeLocators +
        infrastructureData.pendingPermits +
        infrastructureData.criticalIssues +
        infrastructureData.infrastructureAssets +
        infrastructureData.availableLots;

      if (totalSites > 0) {
        infrastructureData.occupancyRate = Math.round(
          (infrastructureData.activeLocators / totalSites) * 100
        );
      }
    } catch (error) {
      console.error("Error calculating infrastructure stats:", error);
    }
  }

  // ============================================================================
  // RENDERING
  // ============================================================================

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
          <div class="card-result">${card.title}</div>
          <div class="flex items-center justify-between">
            <div class="card-title">${card.value}</div>
            <div class="icon">
              <i class="${card.icon} "></i>
            </div>
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
        title: "Occupancy Rate",
        value: (infrastructureData.occupancyRate || 0) + "%",
        className: "maintenance-bg",
        icon: "fas fa-chart-pie",
        category: "status",
        filter: "occupancy_rate",
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
        title: "Critical Issues",
        value: infrastructureData.criticalIssues || 0,
        className: "critical-bg",
        icon: "fas fa-exclamation-triangle",
        category: "status",
        filter: "critical_issues",
      },
    ];
  }

  // ============================================================================
  // MODAL FUNCTIONS
  // ============================================================================

  function getSelectedCategories() {
    try {
      const allCheckbox = document.getElementById("all");

      if (allCheckbox && allCheckbox.checked) {
        return {
          showAll: true,
          categories: [],
        };
      }

      const selectedCategories = [];

      window.categories.forEach(category => {
        const checkbox = document.getElementById(`category-${category.id}`);
        if (checkbox && checkbox.checked) {
          selectedCategories.push(category.id);
        }
      });

      // If no categories selected but some subcategories are checked
      if (selectedCategories.length === 0) {
        const hasAnyChecked = window.subcategories.some(subcategory => {
          const checkbox = document.getElementById(`subcategory-${subcategory.id}`);
          return checkbox && checkbox.checked;
        });

        if (hasAnyChecked) {
          return {
            showAll: false,
            categories: window.categories.map(cat => cat.id),
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
    initialize: safeInitialization,
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

    modal.addEventListener("click", function (e) {
      if (
        e.target === modal &&
        !window.matchMedia(`(max-width: ${CONFIG.BREAKPOINTS.MOBILE}px)`).matches
      ) {
        closeSitesModal(modal);
      }
    });

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

    const isMobile = window.matchMedia(`(max-width: ${CONFIG.BREAKPOINTS.MOBILE}px)`).matches;
    const isTablet = window.matchMedia(
      `(max-width: ${CONFIG.BREAKPOINTS.TABLET}px) and (min-width: ${CONFIG.BREAKPOINTS.MOBILE}px)`
    ).matches;

    if (isMobile || isTablet) {
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

      if (isMobile) {
        document.body.classList.add("modal-open");
      }
      return;
    }

    const header = document.querySelector("header");
    const sidebarContent = document.querySelector(".sidebar-content.visible");

    let topPosition = CONFIG.DESKTOP.TOP;
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
          filter.replace(/_/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase())
        } Sites in ${window.getCategoryDisplayName(categoryFilter)}`;
        sites = window.getSitesByStatusAndCategory(filter, categoryFilter);
      } else {
        modalTitle = `${
          filter.replace(/_/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase())
        } Sites`;
        sites = window.getAllSitesByStatus(filter);
      }
    } else if (subcategory) {
      modalTitle = window.getSubcategoryDisplayName(subcategory);
      sites = window.utils.getSitesBySubcategory(subcategory);
    } else {
      modalTitle = window.getCategoryDisplayName(category);
      sites = window.getSitesByCategoryId(category);
    }

    title.textContent = modalTitle;

    if (sites.length === 0) {
      content.innerHTML =
        '<div class="no-sites">No sites found for this category</div>';
      return;
    }

    const sitesBySubcategory = {};
    sites.forEach((site) => {
      const subcategoryKey = site.subcategory;
      const subcategory = window.getSubcategoryById(site.subcategory);
      const subcategoryName = subcategory?.title || 'Unknown';
      
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
    
    sortedSubcategories.forEach(_subcategoryKey => {
      const subcategoryData = sitesBySubcategory[_subcategoryKey];
      const collapseId = `collapse-${_subcategoryKey}`;
      

      const subcategoryDisplayName = window.utils.getSubcategoryDisplayName(_subcategoryKey);

      sitesHTML += `
        <div class="subcategory-section">
          <div class="subcategory-header collapsible" data-target="${collapseId}">
            <h4 class="subcategory-title">
              <i class="collapse-icon fas fa-chevron-down"></i>
              ${subcategoryDisplayName}
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
              <div class="site-status ${statusClass}">${site.status || "active"}</div>
            </div>
            <div class="site-details">
              <div class="site-subcategory">${subcategoryDisplayName}</div>
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
        const siteId = parseInt(this.getAttribute("data-site-id"));
        const site = window.findSiteById(siteId);

        if (site) {
          const category = window.findCategoryBySiteId(siteId);
          const subcategory = getSubcategoryById(site.subcategory);
          
          // Show info drawer
          if (window.showInfoDrawer) {
            window.showInfoDrawer(site, category, subcategory);
          }
          
          // Zoom to site location
          if (window.zoomToSite) {
            window.zoomToSite(siteId);
          }
          
          // Show polygon if site has polygon data
          const polygonData = getPolygonBySiteId(siteId);
          if (polygonData && window.setPolygonVisibility) {
            window.setPolygonVisibility(siteId, true);
          }
          
          // Close modal
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

  function addOrganizedSitesModalStyles() {
    if (!document.getElementById("organized-sites-modal-styles")) {
      const style = document.createElement("style");
      style.id = "organized-sites-modal-styles";

      document.head.appendChild(style);
    }
  }

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  function updateInfrastructureCards() {
    calculateInfrastructureStats();
    renderInfrastructureCards();
  }

  // ============================================================================
  // EVENT LISTENERS
  // ============================================================================

  // Listen for checkbox changes
  document.addEventListener("change", function (e) {
    if (e.target.type === "checkbox" && e.target.closest(".sidebar-content")) {
      setTimeout(updateInfrastructureCards, 100);
    }
  });

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  function safeInitialization() {
    try {
      if (window.categories || window.subcategories || window.sites) {
        initializeInfrastructureCards();
      } else {
        window.addEventListener(
          "markersLoaded",
          initializeInfrastructureCards
        );

        setTimeout(() => {
          if (!window.categories || !window.subcategories || !window.sites) {
            console.warn(
              "Timeout waiting for markers data, attempting initialization anyway"
            );
            initializeInfrastructureCards();
          }
        }, 2000); // 5 second timeout
      }
    } catch (error) {
      console.error("Error during initialization:", error);
    }
  }

  safeInitialization();

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
      setTimeout(() => {
        updateModalPosition(modal);
      }, 100);
    }
  });

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
        window.matchMedia(`(max-width: ${CONFIG.BREAKPOINTS.MOBILE}px)`).matches
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

  if (window.categories || window.subcategories || window.sites) {
    initializeInfrastructureCards();
  } else {
    window.addEventListener("load", initializeInfrastructureCards);
  }

  // ============================================================================
  // WINDOW EXPORTS
  // ============================================================================

  window.infrastructureCards = {
    getData: () => infrastructureData,
  };

  window.updateInfrastructureCards = updateInfrastructureCards;
});
