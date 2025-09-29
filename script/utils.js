// script/utils.js

// Format file size
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Get document icon based on file extension
function getDocumentIcon(extension) {
  const iconMap = {
    pdf: '<i class="fas fa-file-pdf"></i>',
    doc: '<i class="fas fa-file-word"></i>',
    docx: '<i class="fas fa-file-word"></i>',
    xls: '<i class="fas fa-file-excel"></i>',
    xlsx: '<i class="fas fa-file-excel"></i>',
    ppt: '<i class="fas fa-file-powerpoint"></i>',
    pptx: '<i class="fas fa-file-powerpoint"></i>',
  };

  return iconMap[extension] || '<i class="fas fa-file"></i>';
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

  // Styling
  notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            max-width: 400px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;

  // Type-specific styling
  const colors = {
    success: "#4CAF50",
    error: "#f44336",
    warning: "#ff9800",
    info: "#2196F3",
  };
  notification.style.backgroundColor = colors[type] || colors.info;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    removeNotification(notification);
  });

  // Auto remove
  setTimeout(() => {
    removeNotification(notification);
  }, 5000);
}

// Remove notification
function removeNotification(notification) {
  notification.style.opacity = "0";
  notification.style.transform = "translateX(100%)";

  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 300);
}

/**
 * Universal component positioning function
 * Handles responsive positioning based on header and sidebar state
 * @param {Element|NodeList} elements - Single element or list of elements to position
 * @param {Object} options - Positioning options
 * @param {boolean} options.observeChanges - Whether to set up observers for dynamic positioning
 * @param {Function} options.callback - Optional callback after positioning
 * @param {Array} options.excludeSelectors - Selectors to skip positioning for
 */
function positionComponents(elements, options = {}) {
  const {
    observeChanges = false,
    callback = null,
    excludeSelectors = ['#info-drawer', '.live-feed-card']
  } = options;

  // Convert single element to array for consistent handling
  const elementsArray = elements instanceof NodeList ? Array.from(elements) : 
                       Array.isArray(elements) ? elements : [elements];

  function calculatePositions() {
    const header = document.querySelector("header");
    const sidebar = document.querySelector(".sidebar");
    const sidebarContent = document.querySelector(".sidebar-content.visible");

    let topPosition = CONFIG.DESKTOP.TOP;
    let rightPosition = "0";
    let bottomPosition = "0";
    let leftPosition = "60px";

    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
      console.log('Mobile view');
      // Mobile view
      if (header && header.classList.contains("collapsed")) {
        topPosition = "0";
      } else if (screenWidth <= 425) {
        topPosition = "194px";
      } else {
        topPosition = "236px";
      }

      if (sidebar) {
        if (sidebarContent && sidebarContent.classList.contains("visible")) {
          leftPosition = "340px";
        } else {
          leftPosition = "60px";
        }
      }
    } else if (screenWidth <= 1024) {
      console.log('tablet view');
      
      // Tablet view
      if (header && header.classList.contains("collapsed")) {
        topPosition = "0";
      } else {
        topPosition = "236px";
      }

      if (sidebar) {
        if (sidebarContent && sidebarContent.classList.contains("visible")) {
          leftPosition = "360px";
        } else {
          leftPosition = "60px";
        }
      }
    } else {
      // Desktop view
      if (header && header.classList.contains("collapsed")) {
        topPosition = "0";
      } else {
        topPosition = CONFIG.DESKTOP.TOP;
      }

      if (sidebar) {
        if (sidebarContent && sidebarContent.classList.contains("visible")) {
          leftPosition = "360px";
        } else {
          leftPosition = "60px";
        }
      }
    }

    return { topPosition, rightPosition, bottomPosition, leftPosition };
  }

  function applyPositioning() {
    const positions = calculatePositions();
    
    elementsArray.forEach(element => {
      if (!element) return;

      // Check if element should be excluded
      const shouldExclude = excludeSelectors.some(selector => 
        element.matches?.(selector) || element.id === selector.replace('#', '') ||
        element.classList.contains(selector.replace('.', ''))
      );

      if (shouldExclude || element.hasAttribute("data-skip-positioning")) {
        return;
      }

      // Apply positioning
      element.style.top = positions.topPosition;
      element.style.left = positions.leftPosition;
      element.style.right = positions.rightPosition;
      element.style.bottom = positions.bottomPosition;

      // Ensure proper positioning properties
      if (!element.style.position) {
        element.style.position = "fixed";
      }
    });

    // Execute callback if provided
    if (callback && typeof callback === 'function') {
      callback(positions);
    }
  }

  // Apply initial positioning
  applyPositioning();

  // Set up observers if requested
  if (observeChanges) {
    const header = document.querySelector("header");
    const sidebar = document.querySelector(".sidebar");

    if (header) {
      const headerObserver = new MutationObserver(applyPositioning);
      headerObserver.observe(header, {
        attributes: true,
        attributeFilter: ["class"]
      });
    }

    if (sidebar) {
      const sidebarObserver = new MutationObserver(applyPositioning);
      sidebarObserver.observe(sidebar, { attributes: true, subtree: true });

      const sidebarContents = document.querySelectorAll(".sidebar-content");
      sidebarContents.forEach(content => {
        const contentObserver = new MutationObserver(applyPositioning);
        contentObserver.observe(content, {
          attributes: true,
          attributeFilter: ["class"]
        });
      });
    }

    // Window resize handler
    let resizeTimeout;
    window.addEventListener("resize", function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(applyPositioning, 250);
    });
  }

  // Return object with utility methods
  return {
    reposition: applyPositioning,
    getPositions: calculatePositions
  };
}