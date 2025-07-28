document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'header-toggle';
  toggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><polygon points="12,8 8,16 16,16" fill="white"></polygon></svg>';
  toggleBtn.setAttribute('title', 'Toggle header');
  
  const header = document.querySelector('header');
  if (!header) return;
  
  const navBar = header.querySelector('.nav-bar');
  if (!navBar) return;
  
  navBar.appendChild(toggleBtn);
  
  const isStreamsPage = window.location.pathname.includes('/streams') || 
                        window.location.href.includes('/streams.php') ||
                        window.location.href.includes('/streams/');
  
  // Initialize header state and adjust containers
  function initializeHeaderState() {
    if (isStreamsPage) {
      header.classList.remove('collapsed');
      localStorage.removeItem('headerCollapsed');
      adjustAllContainers(false); // false = header expanded
    } else {
      const isCollapsed = localStorage.getItem('headerCollapsed') === 'true';
      if (isCollapsed) {
        header.classList.add('collapsed');
        adjustAllContainers(true); // true = header collapsed
      } else {
        header.classList.remove('collapsed');
        adjustAllContainers(false); // false = header expanded
      }
    }
  }
  
  // Unified function to adjust all containers based on header state
  function adjustAllContainers(isCollapsed) {
  const headerHeight = getHeaderHeight();
  const collapsedOffset = isCollapsed ? 0 : headerHeight;
  
  // Adjust filter sidebar
  const filterSidebar = document.querySelector('.filter-sidebar');
  if (filterSidebar) {
    filterSidebar.style.top = `${collapsedOffset}px`;
    filterSidebar.style.height = `calc(100vh - ${collapsedOffset}px)`;
  }
  
  // Get page type
  const isStreamsPage = window.location.pathname.includes('/streams') || 
                        window.location.href.includes('/streams.php') ||
                        window.location.href.includes('/streams/');
  
  // Adjust main containers WITHOUT changing position properties
  const container = document.querySelector('.container');
  const mainContent = document.querySelector('.main-content');
  const sidebar = document.querySelector('.sidebar');
  
  if (isStreamsPage) {
    // Special handling for streams page - but keep position stable
    if (container) {
      container.style.height = `calc(100vh - ${collapsedOffset}px)`;
      container.style.width = '100%';
      // Keep position relative to prevent jumping
      container.style.position = 'relative';
      container.style.top = 'auto';
      container.style.left = 'auto';
      container.style.zIndex = 'auto';
    }
    if (mainContent) mainContent.style.height = `calc(100vh - ${collapsedOffset}px)`;
    if (sidebar) sidebar.style.height = `calc(100vh - ${collapsedOffset}px)`;
  } else {
    // Regular pages - maintain consistent positioning
    if (container) {
      container.style.height = `calc(100vh - ${collapsedOffset}px)`;
      container.style.position = 'relative';
      container.style.top = 'auto';
      container.style.left = 'auto';
      container.style.width = '100%';
      container.style.zIndex = 'auto';
    }
    if (mainContent) {
      mainContent.style.height = `calc(100vh - ${collapsedOffset}px)`;
    }
    if (sidebar) {
      sidebar.style.height = `calc(100vh - ${collapsedOffset}px)`;
    }
  }
  
  // Adjust map container with stable positioning
  const mapContainer = document.querySelector('#map');
  if (mapContainer) {
    mapContainer.style.height = `calc(100vh - ${collapsedOffset}px)`;
    mapContainer.style.width = '100%';
    mapContainer.style.position = 'relative'; // Keep consistent
    mapContainer.style.top = 'auto'; // Prevent jumping
    mapContainer.style.left = 'auto'; // Prevent jumping
    mapContainer.style.overflow = 'hidden';
    
    // Force map to stay in place during resize
    if (window.map && window.map.resize) {
      // Get current center before resize
      const currentCenter = window.map.getCenter();
      const currentZoom = window.map.getZoom();
      
      // Resize the map container
      setTimeout(() => {
        window.map.resize();
        
        window.map.setCenter(currentCenter);
        window.map.setZoom(currentZoom);
      }, 50);
    }
  }
  
  // Adjust other map-related containers with stable positioning
  const mapWrapper = document.querySelector('.map-wrapper');
  if (mapWrapper) {
    mapWrapper.style.height = `calc(100vh - ${collapsedOffset}px)`;
    mapWrapper.style.width = '100%';
    mapWrapper.style.position = 'relative';
  }
  
  const mapSection = document.querySelector('.map-section');
  if (mapSection) {
    mapSection.style.height = `calc(100vh - ${collapsedOffset}px)`;
    mapSection.style.width = '100%';
    mapSection.style.position = 'relative';
  }
  
  // Adjust leaflet container if it exists
  // const leafletContainer = document.querySelector('.leaflet-container');
  // if (leafletContainer) {
  //   leafletContainer.style.height = `calc(100vh - ${collapsedOffset}px)`;
  //   leafletContainer.style.width = '100%';
  //   leafletContainer.style.position = 'relative';
  // }
}
  
  // Get accurate header height
  function getHeaderHeight() {
    const navBar = header.querySelector('.nav-bar');
    const buttonsContainer = header.querySelector('.header-buttons-container');
    const searchContainer = header.querySelector('.search-bar-container');
    
    let totalHeight = 0;
    
    if (navBar) totalHeight += navBar.offsetHeight;
    if (buttonsContainer) totalHeight += buttonsContainer.offsetHeight;
    if (searchContainer && searchContainer.style.display === 'block') {
      totalHeight += searchContainer.offsetHeight;
    }
    
    return totalHeight || 284; // fallback to default height
  }
  
  // Initialize on page load
  initializeHeaderState();
  
  // Mutation observer to watch for header class changes
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'class') {
        const isCollapsed = header.classList.contains('collapsed');
        adjustAllContainers(isCollapsed);
        
        // Trigger resize event for other components
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
          if (isStreamsPage) {
            adjustStreamsLayout();
          }
        }, 300);
      }
    });
  });
  
  observer.observe(header, { attributes: true });
  
  // Toggle button click handler
  toggleBtn.addEventListener('click', function() {
    const wasCollapsed = header.classList.contains('collapsed');
    header.classList.toggle('collapsed');
    const isNowCollapsed = header.classList.contains('collapsed');
    
    // Update localStorage
    if (isNowCollapsed) {
      localStorage.setItem('headerCollapsed', 'true');
    } else {
      localStorage.removeItem('headerCollapsed');
    }
    
    // Adjust containers immediately
    adjustAllContainers(isNowCollapsed);
    
    // Delayed adjustments for animations
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      if (isStreamsPage) {
        adjustStreamsLayout();
      }
      
      // Additional map resize
      if (window.map && window.map.resize) {
        window.map.resize();
      }
    }, 300);
  });
  
  // Scroll handler for non-streams pages
  if (!isStreamsPage) {
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 50 && !header.classList.contains('collapsed')) {
          header.classList.add('collapsed');
          localStorage.setItem('headerCollapsed', 'true');
        } 
        else if (scrollTop < 10 && header.classList.contains('collapsed')) {
          header.classList.remove('collapsed');
          localStorage.removeItem('headerCollapsed');
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
  initializeNotificationMenu();
  initializePanelManager();
  initializeSearchBar();
  
  // Final adjustment after all components are loaded
  setTimeout(() => {
    const isCollapsed = header.classList.contains('collapsed');
    adjustAllContainers(isCollapsed);
    window.dispatchEvent(new Event('resize'));
  }, 300);
});

function adjustStreamsLayout() {
  const header = document.querySelector('header');
  const container = document.querySelector('.container');
  const mainContent = document.querySelector('.main-content');
  const sidebar = document.querySelector('.sidebar');
  const mapContainer = document.querySelector('#map');
  
  if (!header || !container) return;
  
  const isCollapsed = header.classList.contains('collapsed');
  const headerHeight = getHeaderHeight();
  const offset = isCollapsed ? 0 : headerHeight;
  
  // Adjust containers without changing position
  container.style.height = `calc(100vh - ${offset}px)`;
  container.style.width = '100%';
  container.style.position = 'relative'; // Keep stable
  container.style.top = 'auto';
  container.style.left = 'auto';
  container.style.zIndex = 'auto';
  
  if (mainContent) mainContent.style.height = `calc(100vh - ${offset}px)`;
  if (sidebar) sidebar.style.height = `calc(100vh - ${offset}px)`;
  
  if (mapContainer) {
    mapContainer.style.height = `calc(100vh - ${offset}px)`;
    mapContainer.style.width = '100%';
    mapContainer.style.position = 'relative';
    mapContainer.style.top = 'auto';
    mapContainer.style.left = 'auto';
  }
  
  // Adjust streams grid
  const streamsGrid = document.querySelector('.streams-grid');
  if (streamsGrid) {
    streamsGrid.style.height = 'calc(100% - 60px)';
  }
  
  // Resize map without movement
  if (window.map && window.map.resize) {
    const currentCenter = window.map.getCenter();
    const currentZoom = window.map.getZoom();
    
    setTimeout(() => {
      window.map.resize({
        animate: false,
        pan: false
      });
      
      // Ensure the view stays the same
      window.map.setView(currentCenter, currentZoom, {
        animate: false
      });
    }, 100);
  }
}

// Get accurate header height helper
function getHeaderHeight() {
  const header = document.querySelector('header');
  if (!header) return 284;
  
  const navBar = header.querySelector('.nav-bar');
  const buttonsContainer = header.querySelector('.header-buttons-container');
  const searchContainer = header.querySelector('.search-bar-container');
  
  let totalHeight = 0;
  
  if (navBar) totalHeight += navBar.offsetHeight;
  if (buttonsContainer) totalHeight += buttonsContainer.offsetHeight;
  if (searchContainer && searchContainer.style.display === 'block') {
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
  const mobileAlertsContainer = document.querySelector('#mobile-alerts-container');
  if (!mobileAlertsContainer) return;

  const alerts = [
    { text: 'Road closure: IT Park area', class: 'alert-closure', icon: '🚧' },
    { text: 'Weather alert: Heavy rainfall', class: 'alert-weather', icon: '🌧️' },
    { text: 'Traffic advisory: Osmeña Blvd', class: 'alert-traffic', icon: '🚗' },
    { text: 'Construction: Escario Street', class: 'alert-construction', icon: '🔨' },
    { text: 'Accident: Fuente Circle', class: 'alert-accident', icon: '⚠️' },
    { text: 'Event traffic: SM City Cebu', class: 'alert-event', icon: '🎪' },
    { text: 'Flooding alert: Mabolo area', class: 'alert-flooding', icon: '🌊' }
  ];

  let currentAlertIndex = 0;

  function updateMobileAlerts() {
    mobileAlertsContainer.innerHTML = '';
    
    for (let i = 0; i < 3; i++) {
      const alertIndex = (currentAlertIndex + i) % alerts.length;
      const alert = alerts[alertIndex];
      
      const alertItem = document.createElement('div');
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
  const mobileEventsContainer = document.querySelector('.mobile-events-container');
  if (!mobileEventsContainer) return;

  const events = [
    { text: 'Sinulog Festival 2025', date: 'Jan 19', icon: '🎉' },
    { text: 'Public Meeting: Budget 2025', date: 'Feb 15', icon: '🏛️' },
    { text: 'Community Cleanup Drive', date: 'Feb 20', icon: '🧹' },
    { text: 'Health & Wellness Fair', date: 'Mar 1-3', icon: '🏥' },
    { text: 'Food Festival at Plaza', date: 'Mar 14-16', icon: '🍽️' },
    { text: 'Tech Summit 2025', date: 'Apr 5', icon: '💻' },
    { text: 'Environmental Fair', date: 'Apr 22', icon: '🌱' },
    { text: 'Barangay Sports Festival', date: 'May 1-3', icon: '⚽' }
  ];

  let currentEventIndex = 0;

  function updateMobileEvents() {
    mobileEventsContainer.innerHTML = '';
    
    for (let i = 0; i < 3; i++) {
      const eventIndex = (currentEventIndex + i) % events.length;
      const event = events[eventIndex];
      
      const eventItem = document.createElement('div');
      eventItem.className = 'mobile-event-item';
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
  const mobileEmergencyGrid = document.querySelector('.mobile-emergency-grid');
  if (!mobileEmergencyGrid) return;
  
  mobileEmergencyGrid.addEventListener('click', function(e) {
    const contact = e.target.closest('.mobile-emergency-contact');
    if (contact) {
      const number = contact.querySelector('.mobile-emergency-number').textContent;
      const service = contact.querySelector('.mobile-emergency-label').textContent;
      
      console.log(`Emergency contact clicked: ${service} - ${number}`);
      
      contact.style.transform = 'scale(0.95)';
      setTimeout(() => {
        contact.style.transform = 'scale(1)';
      }, 150);
    }
  });
}

function initializePublicInformation() {
  const alerts = [
    { text: 'Construction: Escario Street', class: 'alert-construction' },
    { text: 'Road closure: IT Park area', class: 'alert-closure' },
    { text: 'Weather alert: Heavy rainfall', class: 'alert-weather' },
    { text: 'Traffic advisory: Osmeña Blvd', class: 'alert-traffic' },
    { text: 'Accident: Fuente Circle', class: 'alert-accident' },
    { text: 'Event traffic: SM City Cebu', class: 'alert-event' },
    { text: 'Flooding alert: Mabolo area', class: 'alert-flooding' }
  ];
  
  const events = [
    { 
      icon: 'S', 
      text: 'Sinulog Festival 2025', 
      date: 'Jan 19',
      class: 'event-festival',
      status: 'upcoming'
    },
    { 
      icon: 'M', 
      text: 'Public Meeting: Budget 2025', 
      date: 'Feb 15',
      class: 'event-meeting',
      status: 'upcoming'
    },
    { 
      icon: 'C', 
      text: 'Community Cleanup Drive', 
      date: 'Feb 20',
      class: 'event-community',
      status: 'upcoming'
    },
    { 
      icon: 'H', 
      text: 'Health & Wellness Fair', 
      date: 'Mar 1-3',
      class: 'event-health',
      status: 'upcoming'
    },
    { 
      icon: 'F', 
      text: 'Food Festival at Plaza', 
      date: 'Mar 14-16',
      class: 'event-ongoing',
      status: 'ongoing'
    },
    { 
      icon: 'T', 
      text: 'Tech Summit 2025', 
      date: 'Apr 5',
      class: 'event-tech',
      status: 'upcoming'
    },
    { 
      icon: 'E', 
      text: 'Environmental Fair', 
      date: 'Apr 22',
      class: 'event-community',
      status: 'upcoming'
    },
    { 
      icon: 'B', 
      text: 'Barangay Sports Festival', 
      date: 'May 1-3',
      class: 'event-ongoing',
      status: 'ongoing'
    }
  ];
  
  const alertsContainer = document.querySelector('#alerts-container');
  const eventsContainer = document.querySelector('.city-events-section .events-container');
  const noEventsMessage = document.querySelector('.no-events-message');
  
  if (!alertsContainer) return;
  
  if (!eventsContainer) {
    const cityEventsSection = document.querySelector('.city-events-section');
    if (cityEventsSection) {
      const container = document.createElement('div');
      container.className = 'events-container';
      cityEventsSection.appendChild(container);
    }
  }
  
  const finalEventsContainer = document.querySelector('.city-events-section .events-container');
  
  if (noEventsMessage) {
    noEventsMessage.style.display = 'none';
  }
  if (finalEventsContainer) {
    finalEventsContainer.style.display = 'flex';
  }
  
  let currentAlertIndex = 3;
  let currentEventIndex = 0;
  
  displayEvents(currentEventIndex);
  
  setInterval(() => {
    const alertItems = alertsContainer.querySelectorAll('.alert-item');
    const eventItems = finalEventsContainer.querySelectorAll('.event-item');
    
    alertItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
    });
    
    eventItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
    });
    
    setTimeout(() => {
      alertsContainer.innerHTML = '';
      for (let i = 0; i < 3; i++) {
        const alertIndex = (currentAlertIndex + i) % alerts.length;
        const alert = alerts[alertIndex];
        
        const alertItem = document.createElement('div');
        alertItem.className = `alert-item ${alert.class}`;
        alertItem.innerHTML = `
          <span class="alert-icon"></span>
          <span class="alert-text">${alert.text}</span>
        `;
        alertItem.style.opacity = '0';
        alertItem.style.transform = 'translateX(-20px)';
        
        alertsContainer.appendChild(alertItem);
        
        setTimeout(() => {
          alertItem.style.opacity = '1';
          alertItem.style.transform = 'translateX(0)';
        }, 100 * i);
      }
      
      currentEventIndex = (currentEventIndex + 3) % events.length;
      displayEvents(currentEventIndex);
      
      currentAlertIndex = (currentAlertIndex + 3) % alerts.length;
    }, 300);
  }, 5000);
  
  function displayEvents(startIndex) {
    finalEventsContainer.innerHTML = '';
    
    const eventsToShow = Math.min(3, events.length);
    
    for (let i = 0; i < eventsToShow; i++) {
      const eventIndex = (startIndex + i) % events.length;
      const event = events[eventIndex];
      
      const eventItem = document.createElement('div');
      eventItem.className = `event-item ${event.class}`;
      eventItem.innerHTML = `
        <span class="event-icon">${event.icon}</span>
        <span class="event-text">${event.text}</span>
        <span class="event-date">${event.date}</span>
      `;
      eventItem.style.opacity = '0';
      eventItem.style.transform = 'translateX(-20px)';
      
      finalEventsContainer.appendChild(eventItem);
      
      setTimeout(() => {
        eventItem.style.transition = 'all 0.3s ease';
        eventItem.style.opacity = '1';
        eventItem.style.transform = 'translateX(0)';
      }, 100 * i);
    }
  }
}

function initializeEmergencyContacts() {
  const emergencyGrid = document.querySelector('.emergency-grid');
  if (!emergencyGrid) return;
  
  emergencyGrid.addEventListener('click', function(e) {
    const contact = e.target.closest('.emergency-contact');
    if (contact) {
      const number = contact.querySelector('.emergency-number').textContent;
      const service = contact.querySelector('.emergency-label').textContent;
      
      console.log(`Emergency contact clicked: ${service} - ${number}`);
      
      contact.style.transform = 'scale(0.95)';
      setTimeout(() => {
        contact.style.transform = 'scale(1)';
      }, 150);
    }
  });
}

function initializeAppSwitcher() {
  const apps = [
    {
      name: "Guardian (UAC)",
      icon: "guardian-icon.png",
      url: "https://dict.itbsstudio.com/GUARDIAN/login",
    },
    {
      name: "NERVE",
      icon: "nerve-icon.png",
      url: "https://dict.itbsstudio.com/NERVE/MainDashboard",
    },
    {
      name: "LEDGER",
      icon: "ledger-icon.png",
      url: "https://dict.itbsstudio.com/LEDGER/login",
    },
    {
      name: "Pulse",
      icon: "pulse-icon.png",
      url: "https://dict.itbsstudio.com/PULSE/login",
    },
  ];

  const switcherIcon = document.getElementById("app-switcher-icon");
  const switcherImg = switcherIcon ? switcherIcon.querySelector('img') : null;

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

  if (!document.querySelector('.app-switcher-menu')) {
    const menu = document.createElement("div");
    menu.className = "app-switcher-menu";
    if (document.body.classList.contains("dark-theme") || true) {
      menu.classList.add("dark-theme");
    }

    const mobileCloseBtn = document.createElement("button");
    mobileCloseBtn.className = "mobile-close-btn";
    mobileCloseBtn.innerHTML = "×";
    mobileCloseBtn.addEventListener("click", function() {
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
        
        const notificationMenu = document.querySelector('.notification-menu');
        if (notificationMenu) {
          notificationMenu.classList.remove("show");
        }
        
        if (window.panelManager) {
          if (menu.classList.contains("show")) {
            window.panelManager.openPanel('appSwitcher');
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

function initializeNotificationMenu() {
  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Traffic Update',
      message: 'Heavy traffic on Osmeña Boulevard due to road construction.',
      time: '10 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Weather Advisory',
      message: 'Thunderstorm warning in effect until 6:00 PM today.',
      time: '30 minutes ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Event Reminder',
      message: 'Sinulog Festival parade starts at 9:00 AM tomorrow.',
      time: '1 hour ago',
      read: true
    },
    {
      id: 4,
      type: 'success',
      title: 'Service Update',
      message: 'Water service restored in Lahug area.',
      time: '2 hours ago',
      read: true
    }
  ];

  const bellIcon = document.getElementById('bell-icon');
  if (!bellIcon) {
    console.error('Bell icon not found!');
    return;
  }

  const bellImg = bellIcon.querySelector('img');
  if (!bellImg) {
    console.error('Bell icon image not found inside the bell-icon div!');
    return;
  }
  
  if (bellIcon.querySelector('.notification-menu')) {
    return;
  }

  const unreadCount = notifications.filter(n => !n.read).length;
  if (unreadCount > 0) {
    let badge = bellIcon.querySelector('.notification-badge');
    if (!badge) {
      badge = document.createElement('div');
      badge.className = 'notification-badge';
      badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
      bellIcon.appendChild(badge);
    }
  }

  const notificationMenu = document.createElement('div');
  notificationMenu.className = 'notification-menu';

  const mobileCloseBtn = document.createElement("button");
  mobileCloseBtn.className = "mobile-close-btn";
  mobileCloseBtn.innerHTML = "×";
  mobileCloseBtn.addEventListener("click", function() {
    notificationMenu.classList.remove("show");
  });

  const header = document.createElement('div');
  header.className = 'notification-header';
  header.innerHTML = `
    <h3>Notifications</h3>
    <div class="notification-actions">
      <button id="mark-all-read">Mark all as read</button>
    </div>
  `;
  notificationMenu.appendChild(header);

  const notificationBody = document.createElement('div');
  notificationBody.className = 'notification-body';
  notificationBody.id = 'style-1';

  if (notifications.length > 0) {
    notifications.forEach(notification => {
      const notificationItem = document.createElement('div');
      notificationItem.className = `notification-item ${notification.read ? 'read' : 'unread'}`;
      
      let iconHtml = '';
      switch(notification.type) {
        case 'alert':
          iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/></svg>';
          break;
        case 'warning':
          iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>';
          break;
        case 'info':
          iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>';
          break;
        case 'success':
          iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>';
          break;
        default:
          iconHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/></svg>';
      }
      
      notificationItem.innerHTML = `
        <div class="notification-icon">
          ${iconHtml}
        </div>
        <div class="notification-content">
          <div class="notification-title">${notification.title}</div>
          <div class="notification-message">${notification.message}</div>
          <div class="notification-time">${notification.time}</div>
        </div>
      `;
      
      notificationItem.addEventListener('click', function() {
        this.classList.add('read');
        this.classList.remove('unread');
        
        const badge = bellIcon.querySelector('.notification-badge');
        if (badge) {
          const currentUnread = parseInt(badge.textContent);
          if (currentUnread > 1) {
            badge.textContent = currentUnread - 1;
          } else {
            badge.remove();
          }
        }
        
        console.log(`Notification ${notification.id} marked as read`);
      });
      
      notificationBody.appendChild(notificationItem);
    });
  } else {
    const emptyState = document.createElement('div');
    emptyState.className = 'notification-empty';
    emptyState.textContent = 'No notifications at this time.';
    notificationBody.appendChild(emptyState);
  }

  notificationMenu.appendChild(notificationBody);
  notificationMenu.appendChild(mobileCloseBtn);

  if (!bellIcon.querySelector('.notification-menu')) {
    bellIcon.appendChild(notificationMenu);
  }

  bellIcon.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.target === bellIcon || e.target === bellImg) {
      notificationMenu.classList.toggle('show');
    
      const appSwitcherMenu = document.querySelector('.app-switcher-menu');
      if (appSwitcherMenu) {
        appSwitcherMenu.classList.remove('show');
      }
      
      if (window.panelManager) {
        if (notificationMenu.classList.contains("show")) {
          window.panelManager.openPanel('notifications');
        } else {
          window.panelManager.currentOpenPanel = null;
        }
      }
    }
  });

  const markAllReadBtn = document.getElementById('mark-all-read');
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      
      const unreadItems = notificationBody.querySelectorAll('.notification-item.unread');
      unreadItems.forEach(item => {
        item.classList.remove('unread');
        item.classList.add('read');
      });
      
      const badge = bellIcon.querySelector('.notification-badge');
      if (badge) {
        badge.remove();
      }
      
      console.log('All notifications marked as read');
    });
  }

  document.addEventListener('click', function(e) {
    if (!bellIcon.contains(e.target)) {
      notificationMenu.classList.remove('show');
    }
  });
}

function initializePanelManager() {
  if (!window.panelManager) {
    window.panelManager = {
      currentOpenPanel: null,
      
      registerPanel: function(panelId, panelElement) {
        this[panelId] = panelElement;
      },
      
      openPanel: function(panelId) {
        if (this.currentOpenPanel && this.currentOpenPanel !== panelId && this[this.currentOpenPanel]) {
          this[this.currentOpenPanel].style.display = 'none';
          this[this.currentOpenPanel].classList.remove('show');
        }
        
        this.currentOpenPanel = panelId;
      }
    };
  }
  
  const notificationMenu = document.querySelector('.notification-menu');
  if (notificationMenu) {
    window.panelManager.registerPanel('notifications', notificationMenu);
  }
  
  const appSwitcherMenu = document.querySelector('.app-switcher-menu');
  if (appSwitcherMenu) {
    window.panelManager.registerPanel('appSwitcher', appSwitcherMenu);
  }
}

// Initialize for streams page specifically
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('/streams') || 
      window.location.href.includes('/streams.php') ||
      window.location.href.includes('/streams/')) {
    
    const header = document.querySelector('header');
    if (header) {
      header.classList.remove('collapsed');
      localStorage.removeItem('headerCollapsed');
      
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
        adjustStreamsLayout();
      }, 100);
    }
  }
});

function initializeSearchBar() {
  const searchIcon = document.getElementById('search-icon');
  const searchImg = searchIcon ? searchIcon.querySelector('img') : null;
  
  if (!searchIcon) {
    console.error('Search icon not found!');
    return;
  }

  const headerButtonsContainer = document.querySelector('.header-buttons-container');
  if (!headerButtonsContainer) {
    console.error('Header buttons container not found!');
    return;
  }

  const searchBarContainer = document.createElement('div');
  searchBarContainer.className = 'search-bar-container';
  searchBarContainer.style.display = 'none';
  
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

  headerButtonsContainer.parentNode.insertBefore(searchBarContainer, headerButtonsContainer);

  const mobileCloseBtn = document.createElement("button");
  mobileCloseBtn.className = "mobile-close-btn";
  mobileCloseBtn.innerHTML = "×";
  mobileCloseBtn.addEventListener("click", function() {
    hideSearchBar();
  });

  const searchSuggestions = document.getElementById('search-suggestions');
  searchSuggestions.appendChild(mobileCloseBtn);

  const searchData = {
    quickActions: [
    ],
    categories: {
      "Hospitals & Healthcare": {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l11 11z"/></svg>`,
        items: [
          { title: "Cebu City Medical Center", description: "Public hospital with comprehensive services", distance: "1.2km", siteId: "hospital_01", category: "Public Buildings" },
          { title: "Vicente Sotto Memorial", description: "Major government tertiary care hospital", distance: "0.8km", siteId: "hospital_02", category: "Public Buildings" },
          { title: "Chong Hua Hospital", description: "Leading private hospital", distance: "1.5km", siteId: "hospital_10", category: "Public Buildings" },
          { title: "Cebu Doctors' University Hospital", description: "University hospital with comprehensive healthcare", distance: "0.9km", siteId: "hospital_04", category: "Public Buildings" },
          { title: "Adventist Hospital Cebu", description: "Faith-based hospital providing quality healthcare", distance: "1.1km", siteId: "hospital_05", category: "Public Buildings" }
        ]
      },
      "Government Services": {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></svg>`,
        items: [
          { title: "Cebu City Hall", description: "Main administrative center", distance: "0.3km", siteId: "govt_01", category: "Public Buildings" },
          { title: "Office of the City Civil Registrar", description: "Birth certificates, marriage licenses", distance: "0.5km", siteId: "govt_13", category: "Public Buildings" },
          { title: "Cebu City Health Department", description: "Public health services", distance: "0.7km", siteId: "govt_15", category: "Public Buildings" },
          { title: "DPWH Cebu City District Office", description: "Public works and highways office", distance: "0.4km", siteId: "govt_10", category: "Public Buildings" },
          { title: "DTI Cebu Provincial Office", description: "Trade and industry services", distance: "0.6km", siteId: "govt_05", category: "Public Buildings" }
        ]
      },
      "Transportation": {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"/><path d="M8 8v4"/><path d="M9 18h6"/></svg>`,
        items: [
          { title: "Route 01K: Urgello - SM - Parkmall", description: "Jeepney route through commercial areas", distance: "Multiple stops", siteId: "transport_route_01", category: "Traffic Data" },
          { title: "Route 04B: Lahug - Carbon Market", description: "Route through educational areas", distance: "Multiple stops", siteId: "transport_route_02", category: "Traffic Data" },
          { title: "Route 13C: Talamban - Colon", description: "Northern route to downtown", distance: "Multiple stops", siteId: "transport_route_03", category: "Traffic Data" },
          { title: "MyBus Terminal - SM City", description: "Bus routes to airport and Talisay", distance: "1.8km", siteId: "transport_02", category: "Infrastructure" },
          { title: "Jeepney Routes MI-03B", description: "Route from MEPZ to Cordova", distance: "Various", siteId: "transport_01", category: "Infrastructure" }
        ]
      },
      "Education": {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
        items: [
          { title: "University of the Philippines Cebu", description: "Public university campus", distance: "2.2km", siteId: "school_14", category: "Public Buildings" },
          { title: "Cebu City National Science High School", description: "Specialized science high school", distance: "1.5km", siteId: "school_01", category: "Public Buildings" },
          { title: "Cebu Institute of Technology - University", description: "Technology-focused university", distance: "0.9km", siteId: "school_12", category: "Public Buildings" },
          { title: "University of the Visayas - Main Campus", description: "Private university with various programs", distance: "1.1km", siteId: "school_13", category: "Public Buildings" },
          { title: "University of Cebu - Banilad Campus", description: "Private university campus", distance: "2.8km", siteId: "school_15", category: "Public Buildings" }
        ]
      },
      "Internet & Connectivity": {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><path d="M12 20h.01"/></svg>`,
        items: [
          { title: "Ayala Center Free WiFi", description: "Shopping mall WiFi access", distance: "1.2km", siteId: "wifi_01", category: "Internet Access" },
          { title: "IT Park Public WiFi", description: "High-speed internet in business district", distance: "2.5km", siteId: "wifi_03", category: "Internet Access" },
          { title: "Plaza Independencia WiFi", description: "Public WiFi at historic plaza", distance: "0.4km", siteId: "wifi_05", category: "Internet Access" },
          { title: "Cebu City Library Digital Center", description: "Free computer and internet access", distance: "0.7km", siteId: "internet_01", category: "Internet Access" },
          { title: "NBP Cebu City Gateway", description: "National broadband infrastructure", distance: "1.0km", siteId: "nbp_01", category: "National Broadband Project" }
        ]
      },
      "Shopping & Recreation": {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1z"/><path d="M9 12v4"/><path d="M15 12v4"/></svg>`,
        items: [
          { title: "Ayala Center Cebu", description: "Premier shopping destination", distance: "1.2km", siteId: "recreation_02", category: "Points of Interest" },
          { title: "SM Seaside City Cebu", description: "Large shopping mall with entertainment", distance: "2.8km", siteId: "recreation_01", category: "Points of Interest" },
          { title: "Cebu Business Park", description: "Mixed-use development with amenities", distance: "1.1km", siteId: "business_01", category: "Points of Interest" },
          { title: "Cebu IT Park", description: "Business and entertainment district", distance: "2.5km", siteId: "business_02", category: "Points of Interest" },
          { title: "Plaza Independencia", description: "Historic plaza and public space", distance: "0.4km", siteId: "recreation_05", category: "Points of Interest" }
        ]
      }
    }
  };

  let searchTimeout;
  let currentSearchTerm = '';

  searchIcon.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.target === searchIcon || e.target === searchImg) {
      const isShowing = searchBarContainer.style.display === 'block';
      
      if (!isShowing) {
        showSearchBar();
      } else {
        hideSearchBar();
      }
    }
  });

  function showSearchBar() {
    searchBarContainer.style.display = 'block';
    searchBarContainer.style.opacity = '0';
    searchBarContainer.style.transform = 'translateY(-10px)';
    
    // Recalculate container heights when search bar is shown
    setTimeout(() => {
      const header = document.querySelector('header');
      const isCollapsed = header ? header.classList.contains('collapsed') : false;
      adjustAllContainers(isCollapsed);
    }, 10);
    
    setTimeout(() => {
      searchBarContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      searchBarContainer.style.opacity = '1';
      searchBarContainer.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
      document.getElementById('header-search-input').focus();
      showDefaultSuggestions();
    }, 300);
    
    const notificationMenu = document.querySelector('.notification-menu');
    const appSwitcherMenu = document.querySelector('.app-switcher-menu');
    if (notificationMenu) notificationMenu.classList.remove('show');
    if (appSwitcherMenu) appSwitcherMenu.classList.remove('show');
    
    if (window.panelManager) {
      window.panelManager.openPanel('searchBar');
    }
  }

  function hideSearchBar() {
    searchBarContainer.style.opacity = '0';
    searchBarContainer.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      searchBarContainer.style.display = 'none';
      searchBarContainer.style.transition = '';
      document.getElementById('header-search-input').value = '';
      hideSuggestions();
      
      // Recalculate container heights when search bar is hidden
      const header = document.querySelector('header');
      const isCollapsed = header ? header.classList.contains('collapsed') : false;
      adjustAllContainers(isCollapsed);
    }, 300);
    
    if (window.panelManager) {
      window.panelManager.currentOpenPanel = null;
    }
  }

  const closeBtn = document.getElementById('close-search-btn');
  closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    hideSearchBar();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchBarContainer.style.display === 'block') {
      hideSearchBar();
    }
  });

  const searchInput = document.getElementById('header-search-input');
  
  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    currentSearchTerm = searchTerm;
    
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    searchTimeout = setTimeout(() => {
      if (searchTerm === '') {
        showDefaultSuggestions();
      } else {
        performSearch(searchTerm);
      }
    }, 300);
  });

  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const searchTerm = e.target.value.trim();
      
      if (searchTerm) {
        executeSearch(searchTerm);
      }
    }
  });

  function showDefaultSuggestions() {
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    let html = '';
    
    if (searchData.quickActions.length > 0) {
      html += `
        <div class="search-quick-actions">
          <div class="search-quick-actions-grid">
            ${searchData.quickActions.map(action => 
              `<div class="search-quick-action" data-search="${action.toLowerCase()}">${action}</div>`
            ).join('')}
          </div>
        </div>
      `;
    }
    
    Object.entries(searchData.categories).forEach(([category, data]) => {
      html += `
        <div class="search-suggestion-section">
          <div class="search-suggestion-header">${category}</div>
          ${data.items.slice(0, 3).map(item => `
            <div class="search-suggestion-item" data-search="${item.title.toLowerCase()}" data-site-id="${item.siteId || ''}" data-category="${item.category || ''}">
              <div class="search-suggestion-icon">${data.icon}</div>
              <div class="search-suggestion-content">
                <div class="search-suggestion-title">${item.title}</div>
                <div class="search-suggestion-description">${item.description}</div>
              </div>
              <div class="search-suggestion-distance">${item.distance}</div>
            </div>
          `).join('')}
        </div>
      `;
    });
    
    suggestionsContainer.innerHTML = html;
    suggestionsContainer.appendChild(mobileCloseBtn);
    suggestionsContainer.classList.add('show');
    
    addSuggestionClickHandlers();
  }

  function performSearch(searchTerm) {
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    suggestionsContainer.innerHTML = `
      <div class="search-loading">
        <div class="search-loading-spinner"></div>
        <div>Searching...</div>
      </div>
    `;
    suggestionsContainer.appendChild(mobileCloseBtn);
    suggestionsContainer.classList.add('show');
    
    setTimeout(() => {
      const results = getSearchResults(searchTerm);
      displaySearchResults(results, searchTerm);
    }, 500);
  }

  function getSearchResults(searchTerm) {
    const results = {
      exact: [],
      partial: [],
      category: []
    };
    
    Object.entries(searchData.categories).forEach(([category, data]) => {
      data.items.forEach(item => {
        const titleLower = item.title.toLowerCase();
        const descriptionLower = item.description.toLowerCase();
        const categoryLower = category.toLowerCase();
        
        if (titleLower.includes(searchTerm) || descriptionLower.includes(searchTerm)) {
          const matchData = {
            ...item,
            category: category,
            icon: data.icon
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
            icon: data.icon
          });
        }
      });
    });
    
    return results;
  }

  // Continuation of the search functions and remaining code

  function displaySearchResults(results, searchTerm) {
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    const totalResults = results.exact.length + results.partial.length + results.category.length;
    
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
      suggestionsContainer.classList.add('show');
      return;
    }
    
    let html = '';
    
    if (results.exact.length > 0) {
      html += `
        <div class="search-suggestion-section">
          <div class="search-suggestion-header">Best Matches</div>
          ${results.exact.map(item => `
            <div class="search-suggestion-item" data-search="${item.title.toLowerCase()}" data-site-id="${item.siteId || ''}" data-category="${item.category || ''}">
              <div class="search-suggestion-icon">${item.icon}</div>
              <div class="search-suggestion-content">
                <div class="search-suggestion-title">${highlightMatch(item.title, searchTerm)}</div>
                <div class="search-suggestion-description">${highlightMatch(item.description, searchTerm)}</div>
              </div>
              <div class="search-suggestion-distance">${item.distance}</div>
            </div>
          `).join('')}
        </div>
      `;
    }
    
    if (results.partial.length > 0) {
      html += `
        <div class="search-suggestion-section">
          <div class="search-suggestion-header">Related Results</div>
          ${results.partial.slice(0, 5).map(item => `
            <div class="search-suggestion-item" data-search="${item.title.toLowerCase()}" data-site-id="${item.siteId || ''}" data-category="${item.category || ''}">
              <div class="search-suggestion-icon">${item.icon}</div>
              <div class="search-suggestion-content">
                <div class="search-suggestion-title">${highlightMatch(item.title, searchTerm)}</div>
                <div class="search-suggestion-description">${highlightMatch(item.description, searchTerm)}</div>
              </div>
              <div class="search-suggestion-distance">${item.distance}</div>
            </div>
          `).join('')}
        </div>
      `;
    }
    
    if (results.category.length > 0) {
      html += `
        <div class="search-suggestion-section">
          <div class="search-suggestion-header">Category Results</div>
          ${results.category.slice(0, 3).map(item => `
            <div class="search-suggestion-item" data-search="${item.title.toLowerCase()}" data-site-id="${item.siteId || ''}" data-category="${item.category || ''}">
              <div class="search-suggestion-icon">${item.icon}</div>
              <div class="search-suggestion-content">
                <div class="search-suggestion-title">${item.title}</div>
                <div class="search-suggestion-description">${item.description}</div>
              </div>
              <div class="search-suggestion-distance">${item.distance}</div>
            </div>
          `).join('')}
        </div>
      `;
    }
    
    suggestionsContainer.innerHTML = html;
    suggestionsContainer.appendChild(mobileCloseBtn);
    suggestionsContainer.classList.add('show');
    
    addSuggestionClickHandlers();
  }

  function highlightMatch(text, searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark style="background: rgba(59, 130, 246, 0.3); color: #64B5F6; padding: 0 2px; border-radius: 2px;">$1</mark>');
  }

  function addSuggestionClickHandlers() {
    const suggestionItems = document.querySelectorAll('.search-suggestion-item, .search-quick-action');
    
    suggestionItems.forEach(item => {
      item.addEventListener('click', function() {
        const siteId = this.getAttribute('data-site-id');
        const category = this.getAttribute('data-category');
        const searchTerm = this.getAttribute('data-search') || this.textContent.toLowerCase();
        
        if (siteId && category) {
          executeSearchWithSite(siteId, category);
        } else {
          executeSearch(searchTerm);
        }
      });
    });
  }

  function executeSearchWithSite(siteId, categoryName) {
    console.log('Executing search with site:', siteId, 'category:', categoryName);
    
    hideSearchBar();
    
    if (!window.cebuCityMarkers || !window.map) {
      console.error('Map or markers not available');
      return;
    }
    
    let targetSite = null;
    let targetCategory = null;
    
    window.cebuCityMarkers.forEach(category => {
      if (category.category === categoryName) {
        targetCategory = category;
        const site = category.sites.find(s => s.id === siteId);
        if (site) {
          targetSite = site;
        }
      }
    });
    
    if (targetSite && targetCategory) {
      console.log('Found target site:', targetSite.name);
      
      const location = targetSite.location;
      
      if (window.map) {
        const bounds = L.latLngBounds([location]);
        const paddedBounds = bounds.pad(0.2);
        window.map.flyToBounds(paddedBounds, {
          padding: [50, 50],
          maxZoom: 16,
          duration: 2
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
      console.warn('Site not found:', siteId);
      executeSearch(siteId);
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

  function executeSearch(searchTerm) {
    console.log('Executing search for:', searchTerm);
    
    document.getElementById('header-search-input').value = searchTerm;
    
    hideSuggestions();
    
    if (searchTerm.includes('hospital')) {
      console.log('Showing hospitals on map');
      if (window.filterMarkers && window.filterMarkers.updateMarkersForCheckbox) {
        window.filterMarkers.updateMarkersForCheckbox('hospitals', true);
      }
    } else if (searchTerm.includes('transport') || searchTerm.includes('route')) {
      console.log('Showing transport routes');
      if (window.filterMarkers && window.filterMarkers.updateMarkersForCheckbox) {
        window.filterMarkers.updateMarkersForCheckbox('public-transport', true);
      }
    } else if (searchTerm.includes('government') || searchTerm.includes('services')) {
      console.log('Showing government services');
      if (window.filterMarkers && window.filterMarkers.updateMarkersForCheckbox) {
        window.filterMarkers.updateMarkersForCheckbox('govt', true);
      }
    } else if (searchTerm.includes('wifi') || searchTerm.includes('internet')) {
      console.log('Showing WiFi hotspots');
      if (window.filterMarkers && window.filterMarkers.updateMarkersForCheckbox) {
        window.filterMarkers.updateMarkersForCheckbox('wifi-hotspots', true);
      }
    } else if (searchTerm.includes('school') || searchTerm.includes('education')) {
      console.log('Showing schools');
      if (window.filterMarkers && window.filterMarkers.updateMarkersForCheckbox) {
        window.filterMarkers.updateMarkersForCheckbox('schools', true);
      }
    }
  }

  function hideSuggestions() {
    const suggestionsContainer = document.getElementById('search-suggestions');
    suggestionsContainer.classList.remove('show');
  }

  document.addEventListener('click', function(e) {
    if (searchBarContainer.style.display === 'block' && 
        !searchBarContainer.contains(e.target) && 
        !searchIcon.contains(e.target)) {
      hideSearchBar();
    }
  });

  if (window.panelManager) {
    window.panelManager.registerPanel('searchBar', searchBarContainer);
  }
}

// Window resize event handler to ensure proper map sizing
window.addEventListener('resize', function() {
  const header = document.querySelector('header');
  if (header) {
    const isCollapsed = header.classList.contains('collapsed');
    adjustAllContainers(isCollapsed);
    
    // Force map invalidation after resize
    setTimeout(() => {
      if (window.map && window.map.resize) {
        window.map.resize();
      }
    }, 100);
  }
});

// Enhanced container adjustment function for better map integration
function adjustAllContainers(isCollapsed) {
  const headerHeight = getHeaderHeight();
  const collapsedOffset = isCollapsed ? 0 : headerHeight;
  
  // Adjust filter sidebar
  const filterSidebar = document.querySelector('.filter-sidebar');
  if (filterSidebar) {
    filterSidebar.style.top = `${collapsedOffset}px`;
    filterSidebar.style.height = `calc(100vh - ${collapsedOffset}px)`;
  }
  
  // Adjust main containers
  const container = document.querySelector('.container');
  const mainContent = document.querySelector('.main-content');
  const sidebar = document.querySelector('.sidebar');
  
  const isStreamsPage = window.location.pathname.includes('/streams') || 
                        window.location.href.includes('/streams.php') ||
                        window.location.href.includes('/streams/');
  
  if (isStreamsPage) {
    // Special handling for streams page
    if (isCollapsed) {
      if (container) {
        container.style.height = '100vh';
        container.style.width = '100vw';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.zIndex = '5';
      }
      if (mainContent) mainContent.style.height = '100vh';
      if (sidebar) sidebar.style.height = '100vh';
    } else {
      if (container) {
        container.style.height = `calc(100vh - ${headerHeight}px)`;
        container.style.width = '100%';
        container.style.position = 'relative';
        container.style.top = 'auto';
        container.style.left = 'auto';
        container.style.zIndex = 'auto';
      }
      if (mainContent) mainContent.style.height = `calc(100vh - ${headerHeight}px)`;
      if (sidebar) sidebar.style.height = `calc(100vh - ${headerHeight}px)`;
    }
  } else {
    // Regular pages
    if (container) {
      container.style.height = `calc(100vh - ${collapsedOffset}px)`;
      container.style.paddingTop = isCollapsed ? '0' : '0';
      container.style.marginTop = isCollapsed ? '0' : '0';
    }
    if (mainContent) {
      mainContent.style.height = `calc(100vh - ${collapsedOffset}px)`;
    }
    if (sidebar) {
      sidebar.style.height = `calc(100vh - ${collapsedOffset}px)`;
    }
  }
  
  // Adjust map container specifically - this is crucial for map functionality
  const mapContainer = document.querySelector('#map');
  if (mapContainer) {
    mapContainer.style.height = `calc(100vh - ${collapsedOffset}px)`;
    mapContainer.style.width = '100%';
    mapContainer.style.position = 'relative';
    mapContainer.style.overflow = 'hidden';
    
    // Ensure the map fills its container properly
    setTimeout(() => {
      if (window.map && window.map.resize) {
        window.map.resize();
        
        // Force a repaint to ensure proper rendering
        window.map.getContainer().style.visibility = 'hidden';
        window.map.getContainer().offsetHeight; // trigger reflow
        window.map.getContainer().style.visibility = 'visible';
      }
    }, 150);
  }
  
  // Adjust other map-related containers
  const mapWrapper = document.querySelector('.map-wrapper');
  if (mapWrapper) {
    mapWrapper.style.height = `calc(100vh - ${collapsedOffset}px)`;
    mapWrapper.style.width = '100%';
  }
  
  const mapSection = document.querySelector('.map-section');
  if (mapSection) {
    mapSection.style.height = `calc(100vh - ${collapsedOffset}px)`;
    mapSection.style.width = '100%';
  }
  
  // Adjust leaflet container if it exists
  // const leafletContainer = document.querySelector('.leaflet-container');
  // if (leafletContainer) {
  //   leafletContainer.style.height = `calc(100vh - ${collapsedOffset}px)`;
  //   leafletContainer.style.width = '100%';
  // }
  
  // Additional adjustments for map tiles
  setTimeout(() => {
    if (window.map && window.map.resize) {
      // Trigger map resize and redraw
      window.map.resize();
      
      // Force tile layer refresh
      // window.map.eachLayer(function(layer) {
      //   if (layer._url) { // This is likely a tile layer
      //     layer.redraw();
      //   }
      // });
    }
  }, 200);
}

// Map-specific resize handler
function handleMapResize() {
  const header = document.querySelector('header');
  if (!header) return;
  
  const isCollapsed = header.classList.contains('collapsed');
  const headerHeight = getHeaderHeight();
  const offset = isCollapsed ? 0 : headerHeight;
  
  // Update map container dimensions
  const mapContainer = document.querySelector('#map');
  if (mapContainer && window.map) {
    mapContainer.style.height = `calc(100vh - ${offset}px)`;
    
    // Force Leaflet to recognize the size change
    setTimeout(() => {
      if(window.map.resize) {
        window.map.resize();
      }
      
      // Additional force refresh for stubborn cases
      const mapElement = window.map.getContainer();
      if (mapElement) {
        mapElement.style.height = `calc(100vh - ${offset}px)`;
        // window.map._resetView(window.map.getCenter(), window.map.getZoom(), true);
      }
    }, 100);
  }
}

// Export functions for external use
if (typeof window !== 'undefined') {
  window.adjustAllContainers = adjustAllContainers;
  window.handleMapResize = handleMapResize;
  window.getHeaderHeight = getHeaderHeight;
  window.adjustStreamsLayout = adjustStreamsLayout;
}

// Initialize map resize handling when map is ready
document.addEventListener('DOMContentLoaded', function() {
  // Watch for map initialization
  const checkMapReady = setInterval(() => {
    // if (window.map) {
      clearInterval(checkMapReady);
      
      // Set up map event listeners
      // window.map.on('resize', function() {
      //   handleMapResize();
      // });
      
      // Initial adjustment
      setTimeout(() => {
        const header = document.querySelector('header');
        const isCollapsed = header ? header.classList.contains('collapsed') : false;
        adjustAllContainers(isCollapsed);
      }, 500);
    // }
  }, 100);
  
  // Fallback timeout
  setTimeout(() => {
    clearInterval(checkMapReady);
  }, 10000);
});

