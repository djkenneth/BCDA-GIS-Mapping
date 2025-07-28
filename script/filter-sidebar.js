document.addEventListener("DOMContentLoaded", function () {
  // Tab switching functionality
  const tabs = document.querySelectorAll(".sidebar-tab-v2");
  const panels = document.querySelectorAll(".sidebar-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab");
      const targetPanel = document.getElementById(`${tabName}-content`);
      const isAlreadyActive = this.classList.contains("active");

      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("active"));

      // Hide all panels
      panels.forEach((panel) => panel.classList.remove("visible"));

      if (isAlreadyActive) {
        return;
      }

      // Add active class to clicked tab
      this.classList.add("active");

      // Show corresponding panel
      if (targetPanel) {
        targetPanel.classList.add("visible");
      }
    });
  });

  // Adjust sidebar position based on header state
  setupHeaderObserver();

  // Close panel functionality
  const closeButtons = document.querySelectorAll(".close-panel");
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const panel = this.closest(".sidebar-content");
      panel.classList.remove("visible");

      // Also deactivate the corresponding tab
      tabs.forEach((tab) => tab.classList.remove("active"));
    });
  });

  // "ALL" checkbox functionality - Toggle all checkboxes in a section
  const allCheckboxes = {
    all: document.querySelectorAll(
      '.content-section-item input[type="checkbox"]:not(#all)'
    ),
    "all-infrastructure": document.querySelectorAll(
      '#infrastructure-content .content-section-item input[type="checkbox"]:not([id^="all-"])'
    ),
    "all-buildings": document.querySelectorAll(
      '#buildings-content .content-section-item input[type="checkbox"]:not([id^="all-"])'
    ),
    "all-natural": document.querySelectorAll(
      '#natural-content .content-section-item input[type="checkbox"]:not([id^="all-"])'
    ),
    "all-risks": document.querySelectorAll(
      '#risks-content .content-section-item input[type="checkbox"]:not([id^="all-"])'
    ),
    "all-poi": document.querySelectorAll(
      '#poi-content .content-section-item input[type="checkbox"]:not([id^="all-"])'
    ),
    "all-demographics": document.querySelectorAll(
      '#demographics-content .content-section-item input[type="checkbox"]:not([id^="all-"])'
    ),
    "all-internet": document.querySelectorAll(
      '#internet-content .content-section-item input[type="checkbox"]:not([id^="all-"])'
    ),
  };

  // Add event listeners for all master checkboxes
  Object.keys(allCheckboxes).forEach((id) => {
    const masterCheckbox = document.getElementById(id);
    if (masterCheckbox) {
      masterCheckbox.addEventListener("change", function () {
        const isChecked = this.checked;
        
        // Handle the "All" checkbox specially
        if (id === 'all') {
          // Check/uncheck all category master checkboxes
          ['all-infrastructure', 'all-buildings', 'all-natural', 'all-risks', 'all-poi', 'all-demographics', 'all-internet'].forEach(categoryId => {
            const categoryCheckbox = document.getElementById(categoryId);
            if (categoryCheckbox) {
              categoryCheckbox.checked = isChecked;
              // Trigger change event for each category
              categoryCheckbox.dispatchEvent(new Event('change'));
            }
          });
        } else {
          // Handle individual category checkboxes
          allCheckboxes[id].forEach((checkbox) => {
            checkbox.checked = isChecked;

            // Update map markers based on the checkbox state
            if (
              window.filterMarkers &&
              window.filterMarkers.updateMarkersForCheckbox
            ) {
              window.filterMarkers.updateMarkersForCheckbox(
                checkbox.id,
                isChecked
              );
            }
          });
        }

        // Update map markers for the master checkbox
        if (
          window.filterMarkers &&
          window.filterMarkers.updateMarkersForCheckbox
        ) {
          window.filterMarkers.updateMarkersForCheckbox(id, isChecked);
        }

        // Update master checkbox states
        if (
          window.filterMarkers &&
          window.filterMarkers.updateMasterCheckboxes
        ) {
          window.filterMarkers.updateMasterCheckboxes();
        }

        // Update infrastructure cards
        if (window.infrastructureCards && window.infrastructureCards.update) {
          setTimeout(() => window.infrastructureCards.update(), 100);
        }
      });
    }
  });

  // Select All buttons functionality
  const selectAllButtons = document.querySelectorAll(".select-all");
  selectAllButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const section = this.closest(".content-section");
      const checkboxes = section.querySelectorAll('input[type="checkbox"]');

      // Check if all checkboxes are checked
      const allChecked = Array.from(checkboxes).every(
        (checkbox) => checkbox.checked
      );

      // Toggle all checkboxes based on current state
      checkboxes.forEach((checkbox) => {
        checkbox.checked = !allChecked;

        // Update map markers based on the checkbox state
        if (
          window.filterMarkers &&
          window.filterMarkers.updateMarkersForCheckbox
        ) {
          window.filterMarkers.updateMarkersForCheckbox(
            checkbox.id,
            !allChecked
          );
        }
      });

      // Update button text
      this.textContent = allChecked ? "Select All" : "Deselect All";

      // Update master checkbox states
      if (window.filterMarkers && window.filterMarkers.updateMasterCheckboxes) {
        window.filterMarkers.updateMasterCheckboxes();
      }

      // Update infrastructure cards
      if (window.infrastructureCards && window.infrastructureCards.update) {
        setTimeout(() => window.infrastructureCards.update(), 100);
      }
    });
  });

  // Individual checkbox listeners
  const individualCheckboxes = document.querySelectorAll(
    '.content-section-item input[type="checkbox"]:not([id^="all-"])'
  );
  
  individualCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      // Update map markers based on the checkbox state
      if (
        window.filterMarkers &&
        window.filterMarkers.updateMarkersForCheckbox
      ) {
        window.filterMarkers.updateMarkersForCheckbox(this.id, this.checked);
      }

      // Update master checkbox states
      if (window.filterMarkers && window.filterMarkers.updateMasterCheckboxes) {
        window.filterMarkers.updateMasterCheckboxes();
      }

      // Update infrastructure cards
      if (window.infrastructureCards && window.infrastructureCards.update) {
        setTimeout(() => window.infrastructureCards.update(), 100);
      }
    });
  });

  // Observer for dynamically added checkboxes
  const sidebarContent = document.querySelector('.sidebar-content');
  if (sidebarContent) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) {
              const newCheckboxes = node.querySelectorAll('input[type="checkbox"]');
              
              newCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                  if (
                    window.filterMarkers &&
                    window.filterMarkers.updateMarkersForCheckbox
                  ) {
                    window.filterMarkers.updateMarkersForCheckbox(
                      checkbox.id,
                      checkbox.checked
                    );
                  }
                  
                  if (window.filterMarkers && window.filterMarkers.updateMasterCheckboxes) {
                    window.filterMarkers.updateMasterCheckboxes();
                  }

                  // Update infrastructure cards
                  if (window.infrastructureCards && window.infrastructureCards.update) {
                    setTimeout(() => window.infrastructureCards.update(), 100);
                  }
                });
              });
            }
          });
        }
      });
    });
    
    observer.observe(sidebarContent, { childList: true, subtree: true });
  }

  // Media query for mobile view adjustments
  const mobileMediaQuery = window.matchMedia("(max-width: 768px)");

  function handleMobileChanges(e) {
    // Mobile view adjustments can be added here if needed
  }

  // Initial check
  handleMobileChanges(mobileMediaQuery);

  // Add listener for changes
  mobileMediaQuery.addEventListener("change", handleMobileChanges);

  // Function to programmatically trigger filter updates (for infrastructure cards)
  window.triggerFilterUpdate = function() {
    if (window.infrastructureCards && window.infrastructureCards.update) {
      window.infrastructureCards.update();
    }
  };

  // Initialize infrastructure cards when sidebar is ready
  setTimeout(() => {
    if (window.infrastructureCards && window.infrastructureCards.update) {
      window.infrastructureCards.update();
    }
  }, 500);
});

function setupHeaderObserver() {
  const header = document.querySelector("header");
  if (header) {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.attributeName === "class") {
          const isHeaderCollapsed = header.classList.contains("collapsed");
          const filterSidebar = document.querySelector(".sidebar-v2");
          const sidebarContents = document.querySelectorAll(".sidebar-content");

          if (filterSidebar) {
            applySidebarPositioning(filterSidebar, sidebarContents, isHeaderCollapsed);
          }
        }
      });
    });

    observer.observe(header, { attributes: true });
    
    // Initial positioning on load
    const filterSidebar = document.querySelector(".sidebar-v2");
    const sidebarContents = document.querySelectorAll(".sidebar-content");
    const isHeaderCollapsed = header.classList.contains("collapsed");
    
    if (filterSidebar) {
      applySidebarPositioning(filterSidebar, sidebarContents, isHeaderCollapsed);
    }
  }
}

function applySidebarPositioning(filterSidebar, sidebarContents, isHeaderCollapsed) {
  if (isHeaderCollapsed) {
    // Header is collapsed - full height
    filterSidebar.style.top = "0";
    filterSidebar.style.height = "100%";

    sidebarContents.forEach((content) => {
      content.style.top = "0";
      content.style.height = "100%";
    });
  } else {
    // Header is expanded - adjust based on screen size
    const screenWidth = window.innerWidth;
    let topValue, heightValue;

    if (screenWidth <= 768) {
      // Mobile breakpoint
      topValue = "253px";
      heightValue = "calc(100vh - 253px)";
    } else if (screenWidth <= 1024) {
      // Tablet breakpoint  
      topValue = "244px";
      heightValue = "calc(100vh - 244px)";
    } else {
      // Desktop (default)
      topValue = "284px";
      heightValue = "calc(100vh - 284px)";
    }

    filterSidebar.style.top = topValue;
    filterSidebar.style.height = heightValue;

    sidebarContents.forEach((content) => {
      content.style.top = topValue;
      content.style.height = heightValue;
    });
  }
}

// Add resize listener to handle responsive changes
window.addEventListener('resize', function() {
  const header = document.querySelector("header");
  const filterSidebar = document.querySelector(".sidebar-v2");
  const sidebarContents = document.querySelectorAll(".sidebar-content");
  
  if (header && filterSidebar) {
    const isHeaderCollapsed = header.classList.contains("collapsed");
    applySidebarPositioning(filterSidebar, sidebarContents, isHeaderCollapsed);
  }
});