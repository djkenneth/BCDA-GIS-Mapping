// script/infrastructure-cards.js

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
      const buildingsCheckbox = document.getElementById("all-government");
      if (buildingsCheckbox) {
        if (!buildingsCheckbox.checked) {
          buildingsCheckbox.checked = true;
          buildingsCheckbox.dispatchEvent(new Event("change"));
        } else {
          console.log("Buildings category already selected");
        }
      } else {
        console.warn("Buildings checkbox not found, will try again later");
        // Schedule a retry
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
        total: 0,
        active: 0,
        warning: 0,
        critical: 0,
        maintenance: 0,
        inactive: 0,
        categories: {},
        subcategories: {},
      };

      mapMarkers.forEach((category) => {
        const categoryStats = {
          total: 0,
          active: 0,
          warning: 0,
          critical: 0,
          maintenance: 0,
          inactive: 0,
          subcategories: {},
        };

        const shouldIncludeCategory =
          selectedCategories.showAll ||
          selectedCategories.categories.includes(category.id);

        if (shouldIncludeCategory) {
          category.sites.forEach((site) => {
            categoryStats.total++;
            infrastructureData.total++;

            const status = site.status || "active";
            categoryStats[status]++;
            infrastructureData[status]++;

            const subcategoryKey = getSubcategoryKey(site.subcategory);

            if (!categoryStats.subcategories[subcategoryKey]) {
              categoryStats.subcategories[subcategoryKey] = {
                name: site.subcategory,
                total: 0,
                active: 0,
                warning: 0,
                critical: 0,
                maintenance: 0,
                inactive: 0,
              };
            }

            if (!infrastructureData.subcategories[subcategoryKey]) {
              infrastructureData.subcategories[subcategoryKey] = {
                name: site.subcategory,
                total: 0,
                active: 0,
                warning: 0,
                critical: 0,
                maintenance: 0,
                inactive: 0,
                categoryId: category.id,
              };
            }

            categoryStats.subcategories[subcategoryKey].total++;
            categoryStats.subcategories[subcategoryKey][status]++;

            infrastructureData.subcategories[subcategoryKey].total++;
            infrastructureData.subcategories[subcategoryKey][status]++;
          });
        }

        infrastructureData.categories[category.id] = categoryStats;
      });
    } catch (error) {
      console.error("Error calculating infrastructure stats:", error);
    }
  }

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

    // Fallback: convert subcategory to kebab-case
    return subcategory.toLowerCase().replace(/\s+/g, "-");
  }

  function renderInfrastructureCards() {
    const cardsWrapper = document.getElementById("infra-cards-wrapper");
    if (!cardsWrapper) {
      console.error("Infrastructure cards wrapper not found");
      return;
    }

    const selectedCategories = getSelectedCategories();
    let cards = [];

    if (selectedCategories.showAll) {
      cards = getOverviewCards();
    } else if (selectedCategories.categories.length === 1) {
      const categoryId = selectedCategories.categories[0];
      cards = getCategoryWithStatusCards(categoryId);
    } else if (selectedCategories.categories.length > 1) {
      cards = getCategoryCards(selectedCategories.categories);
    }

    let cardsHTML = "";
    cards.forEach((card) => {
      cardsHTML += `
        <div class="infra-card ${card.className}" 
             data-category="${card.category}" 
             data-filter="${card.filter}"
             data-subcategory="${card.subcategory || ""}"
             style="cursor: pointer;">
          <div class="card-title">${card.value}</div>
          <div class="card-type">${card.title}</div>
          <div class="card-result">${card.type}</div>
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
        title: "Total Sites",
        value: infrastructureData.total,
        type: "Total Infrastructure",
        className: "info-bg",
        icon: "fas fa-map-marker-alt",
        category: "status",
        filter: "total",
      },
      {
        title: "Active",
        value: infrastructureData.active,
        type: "Operational Sites",
        className: "active-bg",
        icon: "fas fa-check-circle",
        category: "status",
        filter: "active",
      },
      {
        title: "Warning",
        value: infrastructureData.warning,
        type: "Needs Attention",
        className: "warning-bg",
        icon: "fas fa-exclamation-triangle",
        category: "status",
        filter: "warning",
      },
      {
        title: "Critical",
        value: infrastructureData.critical,
        type: "Immediate Action",
        className: "critical-bg",
        icon: "fas fa-times-circle",
        category: "status",
        filter: "critical",
      },
      {
        title: "Maintenance",
        value: infrastructureData.maintenance,
        type: "Under Maintenance",
        className: "maintenance-bg",
        icon: "fas fa-wrench",
        category: "status",
        filter: "maintenance",
      },
      {
        title: "Inactive",
        value: infrastructureData.inactive,
        type: "Inactive Sites",
        className: "inactive-bg",
        icon: "fas fa-ban",
        category: "status",
        filter: "inactive",
      },
      {
        title: "Infrastructure",
        value: infrastructureData.categories.infrastructure?.total || 0,
        type: "Roads, Utilities, Comm",
        className: "wifi-bg",
        icon: "fas fa-road",
        category: "infrastructure",
        filter: "infrastructure",
      },
      {
        title: "Public Buildings",
        value: infrastructureData.categories.public_buildings?.total || 0,
        type: "Hospitals, Schools, Govt",
        className: "nbp-bg",
        icon: "fas fa-building",
        category: "public_buildings",
        filter: "public_buildings",
      },
      {
        title: "Natural Features",
        value: infrastructureData.categories.natural_features?.total || 0,
        type: "Parks, Waterways",
        className: "data-center-bg",
        icon: "fas fa-leaf",
        category: "natural_features",
        filter: "natural_features",
      },
      {
        title: "Environmental Risks",
        value: infrastructureData.categories.environmental_risks?.total || 0,
        type: "Flood, Pollution Zones",
        className: "critical-bg",
        icon: "fas fa-exclamation-triangle",
        category: "environmental_risks",
        filter: "environmental_risks",
      },
      {
        title: "Points of Interest",
        value: infrastructureData.categories.points_of_interest?.total || 0,
        type: "Business, Recreation",
        className: "ai-bg",
        icon: "fas fa-star",
        category: "points_of_interest",
        filter: "points_of_interest",
      },
      {
        title: "Demographics",
        value: infrastructureData.categories.population_data?.total || 0,
        type: "Population Data",
        className: "info-bg",
        icon: "fas fa-users",
        category: "population_data",
        filter: "population_data",
      },
    ];
  }

  function getCategoryWithStatusCards(categoryId) {
    const cards = [];
    const categoryData = infrastructureData.categories[categoryId];

    if (!categoryData) return cards;

    const statusCards = [
      {
        title: "Active",
        value: categoryData.active,
        type: "Operational Sites",
        className: "active-bg",
        icon: "fas fa-check-circle",
        category: "status",
        filter: "active",
        categoryFilter: categoryId,
      },
      {
        title: "Warning",
        value: categoryData.warning,
        type: "Needs Attention",
        className: "warning-bg",
        icon: "fas fa-exclamation-triangle",
        category: "status",
        filter: "warning",
        categoryFilter: categoryId,
      },
      {
        title: "Critical",
        value: categoryData.critical,
        type: "Immediate Action",
        className: "critical-bg",
        icon: "fas fa-times-circle",
        category: "status",
        filter: "critical",
        categoryFilter: categoryId,
      },
      {
        title: "Maintenance",
        value: categoryData.maintenance,
        type: "Under Maintenance",
        className: "maintenance-bg",
        icon: "fas fa-wrench",
        category: "status",
        filter: "maintenance",
        categoryFilter: categoryId,
      },
      {
        title: "Inactive",
        value: categoryData.inactive,
        type: "Inactive Sites",
        className: "inactive-bg",
        icon: "fas fa-ban",
        category: "status",
        filter: "inactive",
        categoryFilter: categoryId,
      },
    ];

    cards.push(...statusCards);

    const subcategoryCards = getSubcategoryCards(categoryId);
    cards.push(...subcategoryCards);

    return cards;
  }

  function getCategoryCards(selectedCategoryIds) {
    const cards = [];

    selectedCategoryIds.forEach((categoryId) => {
      const categoryData = infrastructureData.categories[categoryId];
      if (!categoryData) return;

      const categoryInfo = getCategoryInfo(categoryId);
      cards.push({
        title: categoryInfo.title,
        value: categoryData.total,
        type: categoryInfo.type,
        className: categoryInfo.className,
        icon: categoryInfo.icon,
        category: categoryId,
        filter: categoryId,
      });
    });

    return cards;
  }

  function getSubcategoryCards(categoryId) {
    const cards = [];
    const categoryData = infrastructureData.categories[categoryId];

    if (!categoryData || !categoryData.subcategories) return cards;

    const subcategoryConfigs = getSubcategoryConfigs(categoryId);

    subcategoryConfigs.forEach((config) => {
      const subcategoryData = categoryData.subcategories[config.key];
      if (subcategoryData && subcategoryData.total > 0) {
        cards.push({
          title: config.title,
          value: subcategoryData.total,
          type: config.type,
          className: config.className,
          icon: config.icon,
          category: categoryId,
          filter: config.key,
          subcategory: config.key,
        });
      }
    });

    return cards;
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

  function getCategoryInfo(categoryId) {
    const category = findCategoryById(categoryId);
    return (
      category?.displayInfo || {
        title: categoryId,
        type: "Unknown",
        className: "info-bg",
        icon: "fas fa-question",
      }
    );
  }

  function getSubcategoryConfigs(categoryId) {
    const category = findCategoryById(categoryId);
    if (!category?.subcategoryConfigs) return [];

    // Convert object to array format expected by existing code
    return Object.entries(category.subcategoryConfigs).map(([key, config]) => ({
      key,
      ...config,
    }));
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

      // If no categories selected, try to find any checked category from mapMarkers
      if (selectedCategories.length === 0 && window.mapMarkers) {
        // Fallback: check if any individual subcategory is selected
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
          // Return all categories if any subcategory is selected but no master category is selected
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
    const sidebar = document.querySelector(".sidebar-v2");
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
      style.textContent = `
        .sites-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid rgba(84, 138, 152, 0.3);
          background-color: #111c2b;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        
        .sites-modal-header h3 {
          margin: 0;
          font-size: 22px;
          color: #FAD754;
        }
        
        .sites-modal-header .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          padding: 5px;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }
        
        .sites-modal-header .close-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .sites-modal-content {
          padding: 20px;
          overflow-y: auto;
        }
        
        .subcategory-section {
          margin-bottom: 30px;
        }
        
        .subcategory-section:last-child {
          margin-bottom: 0;
        }
        
        .subcategory-header {
          margin-bottom: 15px;
          padding: 10px 15px;
          border-bottom: 2px solid rgba(250, 215, 84, 0.3);
          cursor: pointer;
          transition: background-color 0.2s ease;
          border-radius: 5px;
        }
        
        .subcategory-header:hover {
          background-color: rgba(250, 215, 84, 0.1);
        }
        
        .subcategory-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #FAD754;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .collapse-icon {
          transition: transform 0.3s ease;
          font-size: 14px;
        }
        
        .collapse-icon.fa-chevron-right {
          transform: rotate(-90deg);
        }
        
        .subcategory-count {
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
          background-color: rgba(250, 215, 84, 0.2);
          padding: 2px 8px;
          border-radius: 12px;
          margin-left: auto;
        }
        
        .sites-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 15px;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .sites-grid.collapsed {
          max-height: 0;
          margin-bottom: 0;
          opacity: 0;
        }
        
        .site-item {
          background-color: #111c2b;
          border-radius: 8px;
          padding: 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .site-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          border-color: #FAD754;
        }
        
        .site-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
        }
        
        .site-name {
          font-size: 16px;
          font-weight: 600;
          color: white;
          flex: 1;
          margin-right: 10px;
          line-height: 1.3;
        }
        
        .site-status {
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          flex-shrink: 0;
        }
        
        .site-status.status-active {
          background-color: rgba(76, 175, 80, 0.2);
          color: #4CAF50;
        }
        
        .site-status.status-warning {
          background-color: rgba(255, 193, 7, 0.2);
          color: #FFC107;
        }
        
        .site-status.status-critical {
          background-color: rgba(244, 67, 54, 0.2);
          color: #F44336;
        }
        
        .site-status.status-maintenance {
          background-color: rgba(33, 150, 243, 0.2);
          color: #2196F3;
        }
        
        .site-status.status-inactive {
          background-color: rgba(158, 158, 158, 0.2);
          color: #9E9E9E;
        }
        
        .site-details {
          margin-bottom: 10px;
        }
        
        .site-subcategory {
          color: #FAD754;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 5px;
        }
        
        .site-location {
          color: #b0bec5;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .site-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          line-height: 1.4;
        }
        
        .no-sites {
          text-align: center;
          color: #b0bec5;
          font-size: 16px;
          padding: 40px;
        }
        
        .sites-modal-content::-webkit-scrollbar {
          width: 8px;
        }
        
        .sites-modal-content::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        .sites-modal-content::-webkit-scrollbar-thumb {
          background: #FAD754;
          border-radius: 4px;
        }
        
        .sites-modal-content::-webkit-scrollbar-thumb:hover {
          background: #e6c34a;
        }
        
        @media (max-width: 1024px) {
          .sites-modal-header {
            padding: 15px;
          }
          
          .sites-modal-header h3 {
            font-size: 20px;
          }
          
          .sites-modal-content {
            padding: 15px;
          }
          
          .sites-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 12px;
          }
          
          .subcategory-title {
            font-size: 16px;
          }
          
          .subcategory-section {
            margin-bottom: 25px;
          }
        }
        
        @media (max-width: 768px) {
          .sites-modal-header {
            position: sticky;
            top: 0;
            background-color: #080f17;
            z-index: 10;
            padding-top: 15px;
            margin-bottom: 15px;
          }
          
          .sites-modal-header h3 {
            font-size: 18px;
          }
          
          .sites-modal-content {
            padding: 15px;
            max-height: calc(100vh - 80px);
            overflow-y: auto;
          }
          
          .sites-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          
          .site-item {
            margin-bottom: 8px;
          }
          
          .subcategory-title {
            font-size: 15px;
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }
          
          .subcategory-count {
            align-self: flex-start;
          }
          
          .subcategory-section {
            margin-bottom: 20px;
          }
          
          .subcategory-header {
            margin-bottom: 12px;
            padding-bottom: 8px;
          }
        }
      `;
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
