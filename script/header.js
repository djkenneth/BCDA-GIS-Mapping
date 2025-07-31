// script/header.js

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "header-toggle";
  toggleBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><polygon points="12,8 8,16 16,16" fill="white"></polygon></svg>';
  toggleBtn.setAttribute("title", "Toggle header");

  const header = document.querySelector("header");
  if (!header) return;

  const navBar = header.querySelector(".nav-bar");
  if (!navBar) return;

  navBar.appendChild(toggleBtn);

  const isStreamsPage =
    window.location.pathname.includes("/streams") ||
    window.location.href.includes("/streams.php") ||
    window.location.href.includes("/streams/");

  // Initialize header state and adjust containers
  function initializeHeaderState() {
    if (isStreamsPage) {
      header.classList.remove("collapsed");
      localStorage.removeItem("headerCollapsed");
      adjustAllContainers(false); // false = header expanded
    } else {
      const isCollapsed = localStorage.getItem("headerCollapsed") === "true";
      if (isCollapsed) {
        header.classList.add("collapsed");
        adjustAllContainers(true); // true = header collapsed
      } else {
        header.classList.remove("collapsed");
        adjustAllContainers(false); // false = header expanded
      }
    }
  }

  // Unified function to adjust all containers based on header state
  function adjustAllContainers(isCollapsed) {
    const headerHeight = getHeaderHeight();
    const collapsedOffset = isCollapsed ? 0 : headerHeight;

    // Adjust filter sidebar
    const filterSidebar = document.querySelector(".filter-sidebar");
    if (filterSidebar) {
      filterSidebar.style.top = `${collapsedOffset}px`;
      filterSidebar.style.height = `calc(100vh - ${collapsedOffset}px)`;
    }

    // Get page type
    const isStreamsPage =
      window.location.pathname.includes("/streams") ||
      window.location.href.includes("/streams.php") ||
      window.location.href.includes("/streams/");

    // Adjust main containers WITHOUT changing position properties
    const container = document.querySelector(".container");
    const mainContent = document.querySelector(".main-content");
    const sidebar = document.querySelector(".sidebar");

    if (isStreamsPage) {
      // Special handling for streams page - but keep position stable
      if (container) {
        container.style.height = `calc(100vh - ${collapsedOffset}px)`;
        container.style.width = "100%";
        // Keep position relative to prevent jumping
        container.style.position = "relative";
        container.style.top = "auto";
        container.style.left = "auto";
        container.style.zIndex = "auto";
      }
      if (mainContent)
        mainContent.style.height = `calc(100vh - ${collapsedOffset}px)`;
      if (sidebar) sidebar.style.height = `calc(100vh - ${collapsedOffset}px)`;
    } else {
      // Regular pages - maintain consistent positioning
      if (container) {
        container.style.height = `calc(100vh - ${collapsedOffset}px)`;
        container.style.position = "relative";
        container.style.top = "auto";
        container.style.left = "auto";
        container.style.width = "100%";
        container.style.zIndex = "auto";
      }
      if (mainContent) {
        mainContent.style.height = `calc(100vh - ${collapsedOffset}px)`;
      }
      if (sidebar) {
        sidebar.style.height = `calc(100vh - ${collapsedOffset}px)`;
      }
    }

    // Adjust map container with stable positioning
    const mapContainer = document.querySelector("#map");
    if (mapContainer) {
      mapContainer.style.height = `calc(100vh - ${collapsedOffset}px)`;
      mapContainer.style.width = "100%";
      mapContainer.style.position = "relative"; // Keep consistent
      mapContainer.style.top = "auto"; // Prevent jumping
      mapContainer.style.left = "auto"; // Prevent jumping
      mapContainer.style.overflow = "hidden";

      // Force map to stay in place during resize
      if (map && map.resize) {
        // Get current center before resize
        const currentCenter = map.getCenter();
        const currentZoom = map.getZoom();

        // Resize the map container
        setTimeout(() => {
          map.resize();

          map.setCenter(currentCenter);
          map.setZoom(currentZoom);
        }, 50);
      }
    }

    // Adjust other map-related containers with stable positioning
    const mapWrapper = document.querySelector(".map-wrapper");
    if (mapWrapper) {
      mapWrapper.style.height = `calc(100vh - ${collapsedOffset}px)`;
      mapWrapper.style.width = "100%";
      mapWrapper.style.position = "relative";
    }

    const mapSection = document.querySelector(".map-section");
    if (mapSection) {
      mapSection.style.height = `calc(100vh - ${collapsedOffset}px)`;
      mapSection.style.width = "100%";
      mapSection.style.position = "relative";
    }
  }

  // Get accurate header height
  function getHeaderHeight() {
    const navBar = header.querySelector(".nav-bar");
    const buttonsContainer = header.querySelector(".header-buttons-container");
    const searchContainer = header.querySelector(".search-bar-container");

    let totalHeight = 0;

    if (navBar) totalHeight += navBar.offsetHeight;
    if (buttonsContainer) totalHeight += buttonsContainer.offsetHeight;
    if (searchContainer && searchContainer.style.display === "block") {
      totalHeight += searchContainer.offsetHeight;
    }

    return totalHeight || 284; // fallback to default height
  }

  // Initialize on page load
  initializeHeaderState();

  // Mutation observer to watch for header class changes
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === "class") {
        const isCollapsed = header.classList.contains("collapsed");
        adjustAllContainers(isCollapsed);

        // Trigger resize event for other components
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
          if (isStreamsPage) {
            adjustStreamsLayout();
          }
        }, 300);
      }
    });
  });

  observer.observe(header, { attributes: true });

  // Toggle button click handler
  toggleBtn.addEventListener("click", function () {
    header.classList.toggle("collapsed");
    const isNowCollapsed = header.classList.contains("collapsed");

    // Update localStorage
    if (isNowCollapsed) {
      localStorage.setItem("headerCollapsed", "true");
    } else {
      localStorage.removeItem("headerCollapsed");
    }

    // Adjust containers immediately
    adjustAllContainers(isNowCollapsed);

    // Delayed adjustments for animations
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
      if (isStreamsPage) {
        adjustStreamsLayout();
      }

      // Additional map resize
      if (map && map.resize) {
        map.resize();
      }
    }, 300);
  });

  // Scroll handler for non-streams pages
  if (!isStreamsPage) {
    let lastScrollTop = 0;
    let scrollTimeout;

    window.addEventListener("scroll", function () {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        let scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        if (
          scrollTop > lastScrollTop &&
          scrollTop > 50 &&
          !header.classList.contains("collapsed")
        ) {
          header.classList.add("collapsed");
          localStorage.setItem("headerCollapsed", "true");
        } else if (scrollTop < 10 && header.classList.contains("collapsed")) {
          header.classList.remove("collapsed");
          localStorage.removeItem("headerCollapsed");
        }

        lastScrollTop = scrollTop;
      }, 10);
    });
  }

  // Initialize other components
  initializeResponsiveFeatures();
  initializePublicInformation();
  initializeEmergencyContacts();
  initializeAppSwitcher();
  initializePanelManager();
  initializeSearchBar();

  // Final adjustment after all components are loaded
  setTimeout(() => {
    const isCollapsed = header.classList.contains("collapsed");
    adjustAllContainers(isCollapsed);
    window.dispatchEvent(new Event("resize"));
  }, 300);
});

function adjustStreamsLayout() {
  const header = document.querySelector("header");
  const container = document.querySelector(".container");
  const mainContent = document.querySelector(".main-content");
  const sidebar = document.querySelector(".sidebar");
  const mapContainer = document.querySelector("#map");

  if (!header || !container) return;

  const isCollapsed = header.classList.contains("collapsed");
  const headerHeight = getHeaderHeight();
  const offset = isCollapsed ? 0 : headerHeight;

  // Adjust containers without changing position
  container.style.height = `calc(100vh - ${offset}px)`;
  container.style.width = "100%";
  container.style.position = "relative"; // Keep stable
  container.style.top = "auto";
  container.style.left = "auto";
  container.style.zIndex = "auto";

  if (mainContent) mainContent.style.height = `calc(100vh - ${offset}px)`;
  if (sidebar) sidebar.style.height = `calc(100vh - ${offset}px)`;

  if (mapContainer) {
    mapContainer.style.height = `calc(100vh - ${offset}px)`;
    mapContainer.style.width = "100%";
    mapContainer.style.position = "relative";
    mapContainer.style.top = "auto";
    mapContainer.style.left = "auto";
  }

  // Adjust streams grid
  const streamsGrid = document.querySelector(".streams-grid");
  if (streamsGrid) {
    streamsGrid.style.height = "calc(100% - 60px)";
  }

  // Resize map without movement
  if (map && map.resize) {
    const currentCenter = map.getCenter();
    const currentZoom = map.getZoom();

    setTimeout(() => {
      map.resize({
        animate: false,
        pan: false,
      });

      // Ensure the view stays the same
      map.easeTo({
        center: currentCenter,
        zoom: currentZoom,
      });
    }, 100);
  }
}

// Get accurate header height helper
function getHeaderHeight() {
  const header = document.querySelector("header");
  if (!header) return 284;

  const navBar = header.querySelector(".nav-bar");
  const buttonsContainer = header.querySelector(".header-buttons-container");
  const searchContainer = header.querySelector(".search-bar-container");

  let totalHeight = 0;

  if (navBar) totalHeight += navBar.offsetHeight;
  if (buttonsContainer) totalHeight += buttonsContainer.offsetHeight;
  if (searchContainer && searchContainer.style.display === "block") {
    totalHeight += searchContainer.offsetHeight;
  }

  return totalHeight || 284;
}

function initializeResponsiveFeatures() {
  initializeMobileAlerts();
  initializeMobileEvents();
  initializeMobileEmergencyContacts();
}

function initializeMobileAlerts() {
  const mobileAlertsContainer = document.querySelector(
    "#mobile-alerts-container"
  );
  if (!mobileAlertsContainer) return;

  const alerts = [
    { text: "Road closure: IT Park area", class: "alert-closure", icon: "🚧" },
    {
      text: "Weather alert: Heavy rainfall",
      class: "alert-weather",
      icon: "🌧️",
    },
    {
      text: "Traffic advisory: Osmeña Blvd",
      class: "alert-traffic",
      icon: "🚗",
    },
    {
      text: "Construction: Escario Street",
      class: "alert-construction",
      icon: "🔨",
    },
    { text: "Accident: Fuente Circle", class: "alert-accident", icon: "⚠️" },
    { text: "Event traffic: SM City Cebu", class: "alert-event", icon: "🎪" },
    {
      text: "Flooding alert: Mabolo area",
      class: "alert-flooding",
      icon: "🌊",
    },
  ];

  let currentAlertIndex = 0;

  function updateMobileAlerts() {
    mobileAlertsContainer.innerHTML = "";

    for (let i = 0; i < 3; i++) {
      const alertIndex = (currentAlertIndex + i) % alerts.length;
      const alert = alerts[alertIndex];

      const alertItem = document.createElement("div");
      alertItem.className = `mobile-alert-item ${alert.class}`;
      alertItem.innerHTML = `
        <span class="mobile-alert-icon">${alert.icon}</span>
        <span class="mobile-alert-text">${alert.text}</span>
      `;

      mobileAlertsContainer.appendChild(alertItem);
    }

    currentAlertIndex = (currentAlertIndex + 3) % alerts.length;
  }

  updateMobileAlerts();
  setInterval(updateMobileAlerts, 5000);
}

function initializeMobileEvents() {
  const mobileEventsContainer = document.querySelector(
    ".mobile-events-container"
  );
  if (!mobileEventsContainer) return;

  const events = [
    { text: "Sinulog Festival 2025", date: "Jan 19", icon: "🎉" },
    { text: "Public Meeting: Budget 2025", date: "Feb 15", icon: "🏛️" },
    { text: "Community Cleanup Drive", date: "Feb 20", icon: "🧹" },
    { text: "Health & Wellness Fair", date: "Mar 1-3", icon: "🏥" },
    { text: "Food Festival at Plaza", date: "Mar 14-16", icon: "🍽️" },
    { text: "Tech Summit 2025", date: "Apr 5", icon: "💻" },
    { text: "Environmental Fair", date: "Apr 22", icon: "🌱" },
    { text: "Barangay Sports Festival", date: "May 1-3", icon: "⚽" },
  ];

  let currentEventIndex = 0;

  function updateMobileEvents() {
    mobileEventsContainer.innerHTML = "";

    for (let i = 0; i < 3; i++) {
      const eventIndex = (currentEventIndex + i) % events.length;
      const event = events[eventIndex];

      const eventItem = document.createElement("div");
      eventItem.className = "mobile-event-item";
      eventItem.innerHTML = `
        <span class="mobile-event-icon">${event.icon}</span>
        <div class="mobile-event-content">
          <span class="mobile-event-text">${event.text}</span>
          <span class="mobile-event-date">${event.date}</span>
        </div>
      `;

      mobileEventsContainer.appendChild(eventItem);
    }

    currentEventIndex = (currentEventIndex + 3) % events.length;
  }

  updateMobileEvents();
  setInterval(updateMobileEvents, 5000);
}

function initializeMobileEmergencyContacts() {
  const mobileEmergencyGrid = document.querySelector(".mobile-emergency-grid");
  if (!mobileEmergencyGrid) return;

  mobileEmergencyGrid.addEventListener("click", function (e) {
    const contact = e.target.closest(".mobile-emergency-contact");
    if (contact) {
      const number = contact.querySelector(
        ".mobile-emergency-number"
      ).textContent;
      const service = contact.querySelector(
        ".mobile-emergency-label"
      ).textContent;

      contact.style.transform = "scale(0.95)";
      setTimeout(() => {
        contact.style.transform = "scale(1)";
      }, 150);
    }
  });
}

function initializePublicInformation() {
  const alertsContainer = document.querySelector("#alerts-container");
  const eventsContainer = document.querySelector(
    ".city-events-section .events-container"
  );
  const noEventsMessage = document.querySelector(".no-events-message");

  if (!alertsContainer) return;

  if (!eventsContainer) {
    const cityEventsSection = document.querySelector(".city-events-section");
    if (cityEventsSection) {
      const container = document.createElement("div");
      container.className = "events-container";
      cityEventsSection.appendChild(container);
    }
  }

  const finalEventsContainer = document.querySelector(
    ".city-events-section .events-container"
  );

  if (noEventsMessage) {
    noEventsMessage.style.display = "none";
  }
  if (finalEventsContainer) {
    finalEventsContainer.style.display = "flex";
  }

  let currentAlertIndex = 3;
  let currentEventIndex = 0;

  displayEvents(currentEventIndex);

  setInterval(() => {
    const alertItems = alertsContainer.querySelectorAll(".alert-item");
    const eventItems = finalEventsContainer.querySelectorAll(".event-item");

    alertItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(-20px)";
    });

    eventItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(-20px)";
    });

    setTimeout(() => {
      alertsContainer.innerHTML = "";
      for (let i = 0; i < 3; i++) {
        const alertIndex = (currentAlertIndex + i) % publicAlerts.length;
        const alert = publicAlerts[alertIndex];

        const alertItem = document.createElement("div");
        alertItem.className = `alert-item ${alert.class}`;
        alertItem.innerHTML = `
          <span class="alert-icon"></span>
          <span class="alert-text">${alert.text}</span>
        `;
        alertItem.style.opacity = "0";
        alertItem.style.transform = "translateX(-20px)";

        alertsContainer.appendChild(alertItem);

        setTimeout(() => {
          alertItem.style.opacity = "1";
          alertItem.style.transform = "translateX(0)";
        }, 100 * i);
      }

      currentEventIndex = (currentEventIndex + 3) % cityEvents.length;
      displayEvents(currentEventIndex);

      currentAlertIndex = (currentAlertIndex + 3) % publicAlerts.length;
    }, 300);
  }, 5000);

  function displayEvents(startIndex) {
    finalEventsContainer.innerHTML = "";

    const eventsToShow = Math.min(3, cityEvents.length);

    for (let i = 0; i < eventsToShow; i++) {
      const eventIndex = (startIndex + i) % cityEvents.length;
      const event = cityEvents[eventIndex];

      const eventItem = document.createElement("div");
      eventItem.className = `event-item ${event.class}`;
      eventItem.innerHTML = `
        <span class="event-icon">${event.icon}</span>
        <span class="event-text">${event.text}</span>
        <span class="event-date">${event.date}</span>
      `;
      eventItem.style.opacity = "0";
      eventItem.style.transform = "translateX(-20px)";

      finalEventsContainer.appendChild(eventItem);

      setTimeout(() => {
        eventItem.style.transition = "all 0.3s ease";
        eventItem.style.opacity = "1";
        eventItem.style.transform = "translateX(0)";
      }, 100 * i);
    }
  }
}

function initializeEmergencyContacts() {
  const emergencyGrid = document.querySelector(".emergency-grid");
  if (!emergencyGrid) return;

  emergencyGrid.addEventListener("click", function (e) {
    const contact = e.target.closest(".emergency-contact");
    if (contact) {
      const number = contact.querySelector(".emergency-number").textContent;
      const service = contact.querySelector(".emergency-label").textContent;

      contact.style.transform = "scale(0.95)";
      setTimeout(() => {
        contact.style.transform = "scale(1)";
      }, 150);
    }
  });
}

function initializeAppSwitcher() {
  const switcherIcon = document.getElementById("app-switcher-icon");
  const switcherImg = switcherIcon ? switcherIcon.querySelector("img") : null;

  if (!switcherIcon) {
    console.error("App switcher icon not found!");
    return;
  }

  let switcherParent = switcherIcon.parentElement;
  if (!switcherParent.classList.contains("app-switcher")) {
    const wrapper = document.createElement("div");
    wrapper.className = "app-switcher";
    switcherIcon.parentNode.insertBefore(wrapper, switcherIcon);
    wrapper.appendChild(switcherIcon);
    switcherParent = wrapper;
  }

  if (!document.querySelector(".app-switcher-menu")) {
    const menu = document.createElement("div");
    menu.className = "app-switcher-menu";
    if (document.body.classList.contains("dark-theme") || true) {
      menu.classList.add("dark-theme");
    }

    const mobileCloseBtn = document.createElement("button");
    mobileCloseBtn.className = "mobile-close-btn";
    mobileCloseBtn.innerHTML = "×";
    mobileCloseBtn.addEventListener("click", function () {
      menu.classList.remove("show");
    });

    const title = document.createElement("div");
    title.className = "app-switcher-title";
    title.textContent = "App Switcher";
    menu.appendChild(title);

    const list = document.createElement("ul");
    list.className = "app-switcher-list";

    apps.forEach((app) => {
      const item = document.createElement("li");
      item.className = "app-item";

      const icon = document.createElement("img");
      icon.className = "app-icon";
      icon.src = `../assets/logos/${app.icon}`;
      icon.alt = app.name;

      const name = document.createElement("span");
      name.className = "app-name";
      name.textContent = app.name;

      item.appendChild(icon);
      item.appendChild(name);

      item.addEventListener("click", function () {
        window.location.href = app.url;
      });

      list.appendChild(item);
    });

    menu.appendChild(list);
    menu.appendChild(mobileCloseBtn);
    switcherParent.appendChild(menu);

    switcherIcon.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (e.target === switcherIcon || e.target === switcherImg) {
        menu.classList.toggle("show");

        const notificationMenu = document.querySelector(".notification-menu");
        if (notificationMenu) {
          notificationMenu.classList.remove("show");
        }

        if (window.panelManager) {
          if (menu.classList.contains("show")) {
            window.panelManager.openPanel("appSwitcher");
          } else {
            window.panelManager.currentOpenPanel = null;
          }
        }
      }
    });

    document.addEventListener("click", function (e) {
      if (!switcherParent.contains(e.target)) {
        menu.classList.remove("show");
      }
    });
  }
}

function initializePanelManager() {
  if (!window.panelManager) {
    window.panelManager = {
      currentOpenPanel: null,

      registerPanel: function (panelId, panelElement) {
        this[panelId] = panelElement;
      },

      openPanel: function (panelId) {
        if (
          this.currentOpenPanel &&
          this.currentOpenPanel !== panelId &&
          this[this.currentOpenPanel]
        ) {
          this[this.currentOpenPanel].style.display = "none";
          this[this.currentOpenPanel].classList.remove("show");
        }

        this.currentOpenPanel = panelId;
      },
    };
  }

  const notificationMenu = document.querySelector(".notification-menu");
  if (notificationMenu) {
    window.panelManager.registerPanel("notifications", notificationMenu);
  }

  const appSwitcherMenu = document.querySelector(".app-switcher-menu");
  if (appSwitcherMenu) {
    window.panelManager.registerPanel("appSwitcher", appSwitcherMenu);
  }
}

// Initialize for streams page specifically
document.addEventListener("DOMContentLoaded", function () {
  if (
    window.location.pathname.includes("/streams") ||
    window.location.href.includes("/streams.php") ||
    window.location.href.includes("/streams/")
  ) {
    const header = document.querySelector("header");
    if (header) {
      header.classList.remove("collapsed");
      localStorage.removeItem("headerCollapsed");

      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
        adjustStreamsLayout();
      }, 100);
    }
  }
});

function initializeSearchBar() {
  const searchIcon = document.getElementById("search-icon");
  const searchImg = searchIcon ? searchIcon.querySelector("img") : null;

  if (!searchIcon) {
    console.error("Search icon not found!");
    return;
  }

  const headerButtonsContainer = document.querySelector(
    ".header-buttons-container"
  );
  if (!headerButtonsContainer) {
    console.error("Header buttons container not found!");
    return;
  }

  const searchBarContainer = document.createElement("div");
  searchBarContainer.className = "search-bar-container";
  searchBarContainer.style.display = "none";

  searchBarContainer.innerHTML = `
    <div class="search-bar-wrapper">
      <div class="search-input-group">
        <svg class="search-input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input 
          type="text" 
          class="search-input" 
          placeholder="Search for hospitals, government services, transport routes..."
          id="header-search-input"
          autocomplete="off"
        >
        <button class="search-close-btn" id="close-search-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="search-suggestions" id="search-suggestions">
      </div>
    </div>
  `;

  headerButtonsContainer.parentNode.insertBefore(
    searchBarContainer,
    headerButtonsContainer
  );

  const mobileCloseBtn = document.createElement("button");
  mobileCloseBtn.className = "mobile-close-btn";
  mobileCloseBtn.innerHTML = "×";
  mobileCloseBtn.addEventListener("click", function () {
    hideSearchBar();
  });

  const searchSuggestions = document.getElementById("search-suggestions");
  searchSuggestions.appendChild(mobileCloseBtn);

  let searchTimeout;

  searchIcon.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.target === searchIcon || e.target === searchImg) {
      const isShowing = searchBarContainer.style.display === "block";

      if (!isShowing) {
        showSearchBar();
      } else {
        hideSearchBar();
      }
    }
  });

  function showSearchBar() {
    searchBarContainer.style.display = "block";
    searchBarContainer.style.opacity = "0";
    searchBarContainer.style.transform = "translateY(-10px)";

    // Recalculate container heights when search bar is shown
    setTimeout(() => {
      const header = document.querySelector("header");
      const isCollapsed = header
        ? header.classList.contains("collapsed")
        : false;
      adjustAllContainers(isCollapsed);
    }, 10);

    setTimeout(() => {
      searchBarContainer.style.transition =
        "opacity 0.3s ease, transform 0.3s ease";
      searchBarContainer.style.opacity = "1";
      searchBarContainer.style.transform = "translateY(0)";
    }, 10);

    setTimeout(() => {
      document.getElementById("header-search-input").focus();
      showDefaultSuggestions();
    }, 300);

    const notificationMenu = document.querySelector(".notification-menu");
    const appSwitcherMenu = document.querySelector(".app-switcher-menu");
    if (notificationMenu) notificationMenu.classList.remove("show");
    if (appSwitcherMenu) appSwitcherMenu.classList.remove("show");

    if (window.panelManager) {
      window.panelManager.openPanel("searchBar");
    }
  }

  function hideSearchBar() {
    searchBarContainer.style.opacity = "0";
    searchBarContainer.style.transform = "translateY(-10px)";

    setTimeout(() => {
      searchBarContainer.style.display = "none";
      searchBarContainer.style.transition = "";
      document.getElementById("header-search-input").value = "";
      hideSuggestions();

      // Recalculate container heights when search bar is hidden
      const header = document.querySelector("header");
      const isCollapsed = header
        ? header.classList.contains("collapsed")
        : false;
      adjustAllContainers(isCollapsed);
    }, 300);

    if (window.panelManager) {
      window.panelManager.currentOpenPanel = null;
    }
  }

  const closeBtn = document.getElementById("close-search-btn");
  closeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    hideSearchBar();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && searchBarContainer.style.display === "block") {
      hideSearchBar();
    }
  });

  const searchInput = document.getElementById("header-search-input");

  searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    currentSearchTerm = searchTerm;

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      if (searchTerm === "") {
        showDefaultSuggestions();
      } else {
        performSearch(searchTerm);
      }
    }, 300);
  });

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const searchTerm = e.target.value.trim();

      if (searchTerm) {
        executeSearch(searchTerm);
      }
    }
  });

  function showDefaultSuggestions() {
    const suggestionsContainer = document.getElementById("search-suggestions");

    let html = "";

    if (searchData.quickActions.length > 0) {
      html += `
        <div class="search-quick-actions">
          <div class="search-quick-actions-grid">
            ${searchData.quickActions
              .map(
                (action) =>
                  `<div class="search-quick-action" data-search="${action.toLowerCase()}">${action}</div>`
              )
              .join("")}
          </div>
        </div>
      `;
    }

    Object.entries(searchData.categories).forEach(([category, data]) => {
      html += `
        <div class="search-suggestion-section">
          <div class="search-suggestion-header">${category}</div>
          ${data.items
            .slice(0, 3)
            .map(
              (item) => `
            <div class="search-suggestion-item" data-search="${item.title.toLowerCase()}" data-site-id="${
                item.siteId || ""
              }" data-category="${item.category || ""}">
              <div class="search-suggestion-icon">${data.icon}</div>
              <div class="search-suggestion-content">
                <div class="search-suggestion-title">${item.title}</div>
                <div class="search-suggestion-description">${
                  item.description
                }</div>
              </div>
              <div class="search-suggestion-distance">${item.distance}</div>
            </div>
          `
            )
            .join("")}
        </div>
      `;
    });

    suggestionsContainer.innerHTML = html;
    suggestionsContainer.appendChild(mobileCloseBtn);
    suggestionsContainer.classList.add("show");

    addSuggestionClickHandlers();
  }

  function performSearch(searchTerm) {
    const suggestionsContainer = document.getElementById("search-suggestions");

    suggestionsContainer.innerHTML = `
      <div class="search-loading">
        <div class="search-loading-spinner"></div>
        <div>Searching...</div>
      </div>
    `;
    suggestionsContainer.appendChild(mobileCloseBtn);
    suggestionsContainer.classList.add("show");

    setTimeout(() => {
      const results = getSearchResults(searchTerm);
      displaySearchResults(results, searchTerm);
    }, 500);
  }

  function getSearchResults(searchTerm) {
    const results = {
      exact: [],
      partial: [],
      category: [],
    };

    Object.entries(searchData.categories).forEach(([category, data]) => {
      data.items.forEach((item) => {
        const titleLower = item.title.toLowerCase();
        const descriptionLower = item.description.toLowerCase();
        const categoryLower = category.toLowerCase();

        if (
          titleLower.includes(searchTerm) ||
          descriptionLower.includes(searchTerm)
        ) {
          const matchData = {
            ...item,
            category: category,
            icon: data.icon,
          };

          if (titleLower.startsWith(searchTerm)) {
            results.exact.push(matchData);
          } else {
            results.partial.push(matchData);
          }
        } else if (categoryLower.includes(searchTerm)) {
          results.category.push({
            ...item,
            category: category,
            icon: data.icon,
          });
        }
      });
    });

    return results;
  }

  // Continuation of the search functions and remaining code

  function displaySearchResults(results, searchTerm) {
    const suggestionsContainer = document.getElementById("search-suggestions");

    const totalResults =
      results.exact.length + results.partial.length + results.category.length;

    if (totalResults === 0) {
      suggestionsContainer.innerHTML = `
        <div class="search-no-results">
          <svg class="search-no-results-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <div>No results found for "${searchTerm}"</div>
          <div style="font-size: 12px; margin-top: 8px;">Try searching for hospitals, schools, or government services</div>
        </div>
      `;
      suggestionsContainer.appendChild(mobileCloseBtn);
      suggestionsContainer.classList.add("show");
      return;
    }

    let html = "";

    if (results.exact.length > 0) {
      html += `
        <div class="search-suggestion-section">
          <div class="search-suggestion-header">Best Matches</div>
          ${results.exact
            .map(
              (item) => `
            <div class="search-suggestion-item" data-search="${item.title.toLowerCase()}" data-site-id="${
                item.siteId || ""
              }" data-category="${item.category || ""}">
              <div class="search-suggestion-icon">${item.icon}</div>
              <div class="search-suggestion-content">
                <div class="search-suggestion-title">${highlightMatch(
                  item.title,
                  searchTerm
                )}</div>
                <div class="search-suggestion-description">${highlightMatch(
                  item.description,
                  searchTerm
                )}</div>
              </div>
              <div class="search-suggestion-distance">${item.distance}</div>
            </div>
          `
            )
            .join("")}
        </div>
      `;
    }

    if (results.partial.length > 0) {
      html += `
        <div class="search-suggestion-section">
          <div class="search-suggestion-header">Related Results</div>
          ${results.partial
            .slice(0, 5)
            .map(
              (item) => `
            <div class="search-suggestion-item" data-search="${item.title.toLowerCase()}" data-site-id="${
                item.siteId || ""
              }" data-category="${item.category || ""}">
              <div class="search-suggestion-icon">${item.icon}</div>
              <div class="search-suggestion-content">
                <div class="search-suggestion-title">${highlightMatch(
                  item.title,
                  searchTerm
                )}</div>
                <div class="search-suggestion-description">${highlightMatch(
                  item.description,
                  searchTerm
                )}</div>
              </div>
              <div class="search-suggestion-distance">${item.distance}</div>
            </div>
          `
            )
            .join("")}
        </div>
      `;
    }

    if (results.category.length > 0) {
      html += `
        <div class="search-suggestion-section">
          <div class="search-suggestion-header">Category Results</div>
          ${results.category
            .slice(0, 3)
            .map(
              (item) => `
            <div class="search-suggestion-item" data-search="${item.title.toLowerCase()}" data-site-id="${
                item.siteId || ""
              }" data-category="${item.category || ""}">
              <div class="search-suggestion-icon">${item.icon}</div>
              <div class="search-suggestion-content">
                <div class="search-suggestion-title">${item.title}</div>
                <div class="search-suggestion-description">${
                  item.description
                }</div>
              </div>
              <div class="search-suggestion-distance">${item.distance}</div>
            </div>
          `
            )
            .join("")}
        </div>
      `;
    }

    suggestionsContainer.innerHTML = html;
    suggestionsContainer.appendChild(mobileCloseBtn);
    suggestionsContainer.classList.add("show");

    addSuggestionClickHandlers();
  }

  function highlightMatch(text, searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(
      regex,
      '<mark style="background: rgba(59, 130, 246, 0.3); color: #64B5F6; padding: 0 2px; border-radius: 2px;">$1</mark>'
    );
  }

  function addSuggestionClickHandlers() {
    const suggestionItems = document.querySelectorAll(
      ".search-suggestion-item, .search-quick-action"
    );

    suggestionItems.forEach((item) => {
      item.addEventListener("click", function () {
        const siteId = this.getAttribute("data-site-id");
        const category = this.getAttribute("data-category");
        const searchTerm =
          this.getAttribute("data-search") || this.textContent.toLowerCase();

        if (siteId && category) {
          executeSearchWithSite(siteId, category);
        } else {
          executeSearch(searchTerm);
        }
      });
    });
  }

  function executeSearchWithSite(siteId, categoryName) {
    hideSearchBar();

    if (!mapMarkers || !map) {
      console.error("Map or markers not available");
      return;
    }

    let targetSite = null;
    let targetCategory = null;

    mapMarkers.forEach((category) => {
      if (category.category === categoryName) {
        targetCategory = category;
        const site = category.sites.find((s) => s.id === siteId);
        if (site) {
          targetSite = site;
        }
      }
    });

    if (targetSite && targetCategory) {
      const location = targetSite.location;

      if (map) {
        map.easeTo({
          center: [location[1], location[0]],
          zoom: 15,
          duration: 3000,
        });

        setTimeout(() => {
          if (window.showInfoDrawer) {
            window.showInfoDrawer(targetSite, targetCategory);
          }

          const sideWrapper = document.querySelector(".side-wrapper");
          if (sideWrapper) {
            sideWrapper.classList.add("active");
          }

          setTimeout(() => {
            const position = calculateLiveFeedPosition();
            if (window.showLiveFeedCard) {
              window.showLiveFeedCard(position);

              if (window.updateLiveFeedCardForSite) {
                window.updateLiveFeedCardForSite(targetSite);
              }
            }
          }, 500);
        }, 1000);
      }
    } else {
      console.warn("Site not found:", siteId);
      executeSearch(siteId);
    }
  }

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

  function executeSearch(searchTerm) {
    document.getElementById("header-search-input").value = searchTerm;

    hideSuggestions();

    if (searchTerm.includes("hospital")) {
      if (
        window.filterMarkers &&
        window.filterMarkers.updateMarkersForCheckbox
      ) {
        window.filterMarkers.updateMarkersForCheckbox("hospitals", true);
      }
    } else if (
      searchTerm.includes("transport") ||
      searchTerm.includes("route")
    ) {
      if (
        window.filterMarkers &&
        window.filterMarkers.updateMarkersForCheckbox
      ) {
        window.filterMarkers.updateMarkersForCheckbox("public-transport", true);
      }
    } else if (
      searchTerm.includes("government") ||
      searchTerm.includes("services")
    ) {
      if (
        window.filterMarkers &&
        window.filterMarkers.updateMarkersForCheckbox
      ) {
        window.filterMarkers.updateMarkersForCheckbox("govt", true);
      }
    } else if (searchTerm.includes("wifi") || searchTerm.includes("internet")) {
      if (
        window.filterMarkers &&
        window.filterMarkers.updateMarkersForCheckbox
      ) {
        window.filterMarkers.updateMarkersForCheckbox("wifi-hotspots", true);
      }
    } else if (
      searchTerm.includes("school") ||
      searchTerm.includes("education")
    ) {
      if (
        window.filterMarkers &&
        window.filterMarkers.updateMarkersForCheckbox
      ) {
        window.filterMarkers.updateMarkersForCheckbox("schools", true);
      }
    }
  }

  function hideSuggestions() {
    const suggestionsContainer = document.getElementById("search-suggestions");
    suggestionsContainer.classList.remove("show");
  }

  document.addEventListener("click", function (e) {
    if (
      searchBarContainer.style.display === "block" &&
      !searchBarContainer.contains(e.target) &&
      !searchIcon.contains(e.target)
    ) {
      hideSearchBar();
    }
  });

  if (window.panelManager) {
    window.panelManager.registerPanel("searchBar", searchBarContainer);
  }
}

// Window resize event handler to ensure proper map sizing
window.addEventListener("resize", function () {
  const header = document.querySelector("header");
  if (header) {
    const isCollapsed = header.classList.contains("collapsed");
    adjustAllContainers(isCollapsed);

    // Force map invalidation after resize
    setTimeout(() => {
      if (map && map.resize) {
        map.resize();
      }
    }, 100);
  }
});

// Enhanced container adjustment function for better map integration
function adjustAllContainers(isCollapsed) {
  const headerHeight = getHeaderHeight();
  const collapsedOffset = isCollapsed ? 0 : headerHeight;

  // Adjust filter sidebar
  const filterSidebar = document.querySelector(".filter-sidebar");
  if (filterSidebar) {
    filterSidebar.style.top = `${collapsedOffset}px`;
    filterSidebar.style.height = `calc(100vh - ${collapsedOffset}px)`;
  }

  // Adjust main containers
  const container = document.querySelector(".container");
  const mainContent = document.querySelector(".main-content");
  const sidebar = document.querySelector(".sidebar");

  const isStreamsPage =
    window.location.pathname.includes("/streams") ||
    window.location.href.includes("/streams.php") ||
    window.location.href.includes("/streams/");

  if (isStreamsPage) {
    // Special handling for streams page
    if (isCollapsed) {
      if (container) {
        container.style.height = "100vh";
        container.style.width = "100vw";
        container.style.position = "fixed";
        container.style.top = "0";
        container.style.left = "0";
        container.style.zIndex = "5";
      }
      if (mainContent) mainContent.style.height = "100vh";
      if (sidebar) sidebar.style.height = "100vh";
    } else {
      if (container) {
        container.style.height = `calc(100vh - ${headerHeight}px)`;
        container.style.width = "100%";
        container.style.position = "relative";
        container.style.top = "auto";
        container.style.left = "auto";
        container.style.zIndex = "auto";
      }
      if (mainContent)
        mainContent.style.height = `calc(100vh - ${headerHeight}px)`;
      if (sidebar) sidebar.style.height = `calc(100vh - ${headerHeight}px)`;
    }
  } else {
    // Regular pages
    if (container) {
      container.style.height = `calc(100vh - ${collapsedOffset}px)`;
      container.style.paddingTop = isCollapsed ? "0" : "0";
      container.style.marginTop = isCollapsed ? "0" : "0";
    }
    if (mainContent) {
      mainContent.style.height = `calc(100vh - ${collapsedOffset}px)`;
    }
    if (sidebar) {
      sidebar.style.height = `calc(100vh - ${collapsedOffset}px)`;
    }
  }

  // Adjust map container specifically - this is crucial for map functionality
  const mapContainer = document.querySelector("#map");
  if (mapContainer) {
    mapContainer.style.height = `calc(100vh - ${collapsedOffset}px)`;
    mapContainer.style.width = "100%";
    mapContainer.style.position = "relative";
    mapContainer.style.overflow = "hidden";

    // Ensure the map fills its container properly
    setTimeout(() => {
      if (map && map.resize) {
        map.resize();

        // Force a repaint to ensure proper rendering
        map.getContainer().style.visibility = "hidden";
        map.getContainer().offsetHeight; // trigger reflow
        map.getContainer().style.visibility = "visible";
      }
    }, 150);
  }

  // Adjust other map-related containers
  const mapWrapper = document.querySelector(".map-wrapper");
  if (mapWrapper) {
    mapWrapper.style.height = `calc(100vh - ${collapsedOffset}px)`;
    mapWrapper.style.width = "100%";
  }

  const mapSection = document.querySelector(".map-section");
  if (mapSection) {
    mapSection.style.height = `calc(100vh - ${collapsedOffset}px)`;
    mapSection.style.width = "100%";
  }

  // Additional adjustments for map tiles
  setTimeout(() => {
    if (map && map.resize) {
      // Trigger map resize and redraw
      map.resize();
    }
  }, 200);
}

// Map-specific resize handler
function handleMapResize() {
  const header = document.querySelector("header");
  if (!header) return;

  const isCollapsed = header.classList.contains("collapsed");
  const headerHeight = getHeaderHeight();
  const offset = isCollapsed ? 0 : headerHeight;

  // Update map container dimensions
  const mapContainer = document.querySelector("#map");
  if (mapContainer && map) {
    mapContainer.style.height = `calc(100vh - ${offset}px)`;

    // Force Leaflet to recognize the size change
    setTimeout(() => {
      if(map.resize) {
        map.resize();
      }

      // Additional force refresh for stubborn cases
      const mapElement = map.getContainer();
      if (mapElement) {
        mapElement.style.height = `calc(100vh - ${offset}px)`;
      }
    }, 100);
  }
}

// Export functions for external use
if (typeof window !== "undefined") {
  window.adjustAllContainers = adjustAllContainers;
  window.handleMapResize = handleMapResize;
  window.getHeaderHeight = getHeaderHeight;
  window.adjustStreamsLayout = adjustStreamsLayout;
}

// Initialize map resize handling when map is ready
document.addEventListener("DOMContentLoaded", function () {
  // Watch for map initialization
  const checkMapReady = setInterval(() => {
    clearInterval(checkMapReady);

    // Initial adjustment
    setTimeout(() => {
      const header = document.querySelector("header");
      const isCollapsed = header
        ? header.classList.contains("collapsed")
        : false;
      adjustAllContainers(isCollapsed);
    }, 500);
  }, 100);

  // Fallback timeout
  setTimeout(() => {
    clearInterval(checkMapReady);
  }, 10000);
});
