// script/info-drawer.js

document.addEventListener("DOMContentLoaded", function () {
  function showInfoDrawer(site, category) {
    const drawer = document.getElementById("info-drawer");
    const sideWrapper = document.querySelector(".side-wrapper");

    if (drawer) {
      drawer.setAttribute("data-site-id", site.id);
    }

    hideAllSections();

    if (sideWrapper) {
      sideWrapper.classList.add("active");

      const cards = sideWrapper.querySelectorAll(".card");
      cards.forEach((card) => {
        if (!card.querySelector(".card-close-btn")) {
          const closeBtn = document.createElement("button");
          closeBtn.className = "card-close-btn";
          closeBtn.innerHTML = "✕";
          closeBtn.setAttribute("title", "Close card");

          closeBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            sideWrapper.classList.remove("active");            
          });

          card.appendChild(closeBtn);
        }
      });
    }

    drawer.classList.add("open");
    drawer.classList.add("style-1");

    addEventListeners(site, category, drawer);
  }

  function addEventListeners(site, category, drawer) {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabSections = document.querySelectorAll(".tab-section");

    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const targetTab = this.getAttribute("data-tab");

        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabSections.forEach((section) => section.classList.remove("active"));

        this.classList.add("active");
        const targetSection = document.getElementById(targetTab + "-section");
        if (targetSection) {
          targetSection.classList.add("active");

          if (targetTab === "performance-analytics") {
            loadPerformanceAnalytics(site, category);
          } else if (targetTab === "download-report-main") {
            loadDownloadReportContent(site, category);
          }
        }
      });
    });

    const firstTab = document.querySelector(".tab-btn");
    
    if (firstTab) {
      firstTab.classList.add("active");
    }

    const drawerCloseBtn = document.getElementById("drawer-close");

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener("click", function () {
        drawer.classList.remove("open");
        drawer.classList.remove("expanded");

        const sideWrapper = document.querySelector(".side-wrapper");
        if (sideWrapper) {
          sideWrapper.classList.remove("active");
        }

        hideAllSections();
      });
    }
  }

  function hideAllSections() {
    const sections = document.querySelectorAll(".tab-section");
    sections.forEach((section) => {
      section.classList.remove("active");
    });
  }

  function showSiteInfo(siteData, options = {}) {
    const drawer = document.getElementById('info-drawer');
    if (!drawer) return;

    // Store current site data
    currentSiteData = siteData;

    // Update site information
    updateSiteDetails(siteData);
    
    // Show appropriate sections based on options
    if (options.showLiveFeed) {
        showLiveFeedSection(siteData);
    }
    
    if (options.showTechnicalDetails) {
        showTechnicalDetailsSection(siteData);
    }
    
    if (options.showTabs) {
        showTabNavigation();
    }

    // Open the drawer
    drawer.classList.add('open');
    drawer.classList.add('style-1'); // Maintain existing styling
  }

  function updateSiteDetails(siteData) {
    // Update status section
    const statusElement = document.getElementById('site-status');
    const companyElement = document.getElementById('site-company');
    const deviceChannelElement = document.getElementById('device-channel');
    
    if (statusElement) statusElement.textContent = siteData.status || 'Active';
    if (companyElement) companyElement.textContent = siteData.company || 'Unknown Company';
    if (deviceChannelElement) {
        const deviceId = siteData.id ? `${siteData.id}_${String(Math.floor(Math.random() * 100)).padStart(2, '0')}` : 'N/A';
        deviceChannelElement.textContent = deviceId;
    }

    // Update site details
    const detailMappings = {
        'site-name': siteData.name || 'Site Details',
        'site-category': siteData.category || '-',
        'site-zone': siteData.zone || '-',
        'site-status-detail': siteData.status || '-',
        'site-location': siteData.location || '-',
        'site-size': siteData.size || '-',
        'site-lease': siteData.lease || '-',
        'site-employees': siteData.employees || '-'
    };

    Object.entries(detailMappings).forEach(([elementId, value]) => {
        const element = document.getElementById(elementId);
        if (element) element.textContent = value;
    });

    // Update description
    const descriptionElement = document.getElementById('site-description');
    if (descriptionElement) {
        descriptionElement.textContent = siteData.description || 'No description available.';
    }

    // Apply status styling
    const statusDetailElement = document.getElementById('site-status-detail');
    if (statusDetailElement && siteData.status) {
        statusDetailElement.className = 'info-value';
        if (siteData.status.toLowerCase().includes('operational') || 
            siteData.status.toLowerCase().includes('active')) {
            statusDetailElement.classList.add('status-active-text');
        }
    }
}
  
  window.showInfoDrawer = showInfoDrawer;
  window.showSiteInfo = showSiteInfo;

  if (window.drawerUtils) {
    // Extend existing drawer utilities with new functionality
    Object.assign(window.drawerUtils, {
        showSiteInfo,
        closeInfoDrawer,
        expandDrawer,
        switchTab
    });
}
});
