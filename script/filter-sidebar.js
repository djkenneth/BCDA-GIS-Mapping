// script/filter-sidebar.js

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

  const allCheckboxes = {
    all: document.querySelectorAll(
      '.content-section-item input[type="checkbox"]:not(#all)'
    ),
  };

  mapMarkers.forEach(category => {
    const masterCheckboxId = category.checkboxConfig.masterCheckboxId;
    const subcategoryIds = Object.keys(category.subcategoryConfigs || {});
    
    if (masterCheckboxId && subcategoryIds.length > 0) {
      allCheckboxes[masterCheckboxId] = subcategoryIds;
    }
  });

  
  // Add event listeners for all master checkboxes
  Object.keys(allCheckboxes).forEach((id) => {
    const masterCheckbox = document.getElementById(id);
    if (masterCheckbox) {
      masterCheckbox.addEventListener("change", function () {
        const isChecked = this.checked;

        // Handle the "All" checkbox specially
        if (id === "all") {
          categoryMasterIds.forEach((categoryId) => {
            const categoryCheckbox = document.getElementById(categoryId);
            if (categoryCheckbox) {
              categoryCheckbox.checked = isChecked;
              // Trigger change event for each category
              categoryCheckbox.dispatchEvent(new Event("change"));
            }
          });
        } else {
          // Handle individual category checkboxes
          const checkboxIds = allCheckboxes[id];
          if (Array.isArray(checkboxIds)) {
            checkboxIds.forEach((checkboxId) => {
              const checkbox = document.getElementById(checkboxId);
              if (checkbox) {
                checkbox.checked = isChecked;

                // Update map markers based on the checkbox state
                if (
                  window.filterMarkers &&
                  window.filterMarkers.updateMarkersForCheckbox
                ) {
                  window.filterMarkers.updateMarkersForCheckbox(
                    checkboxId,
                    isChecked
                  );
                }
              }
            });
          }
        }

        // Update map markers for master checkbox
        if (
          window.filterMarkers &&
          window.filterMarkers.updateMarkersForCheckbox
        ) {
          window.filterMarkers.updateMarkersForCheckbox(id, isChecked);
        }

        // Update the select all button text
        const selectAllButton =
          this.closest(".content-section")?.querySelector(".select-all");
        if (selectAllButton) {
          selectAllButton.textContent = isChecked
            ? "Deselect All"
            : "Select All";
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

  // Individual checkbox listeners - aligned with mapMarkers subcategories
  const individualCheckboxes = document.querySelectorAll(
    '.content-section-item input[type="checkbox"]:not([id^="all"])'
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
  const sidebarContent = document.querySelector(".sidebar-content");
  if (sidebarContent) {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) {
              // Element node
              const checkboxes = node.querySelectorAll(
                'input[type="checkbox"]'
              );
              checkboxes.forEach((checkbox) => {
                if (!checkbox.hasAttribute("data-listener-added")) {
                  checkbox.addEventListener("change", function () {
                    if (
                      window.filterMarkers &&
                      window.filterMarkers.updateMarkersForCheckbox
                    ) {
                      window.filterMarkers.updateMarkersForCheckbox(
                        this.id,
                        this.checked
                      );
                    }
                    if (
                      window.filterMarkers &&
                      window.filterMarkers.updateMasterCheckboxes
                    ) {
                      window.filterMarkers.updateMasterCheckboxes();
                    }
                    if (
                      window.infrastructureCards &&
                      window.infrastructureCards.update
                    ) {
                      setTimeout(
                        () => window.infrastructureCards.update(),
                        100
                      );
                    }
                  });
                  checkbox.setAttribute("data-listener-added", "true");
                }
              });
            }
          });
        }
      });
    });

    observer.observe(sidebarContent, {
      childList: true,
      subtree: true,
    });
  }

  // "Select All" button functionality for each section
  const selectAllButtons = document.querySelectorAll(".select-all");
  selectAllButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const section = this.closest(".content-section");
      const checkboxes = section.querySelectorAll(
        'input[type="checkbox"]:not([id^="all-"])'
      );
      const isSelectAll = this.textContent === "Select All";

      checkboxes.forEach((checkbox) => {
        checkbox.checked = isSelectAll;

        // Trigger change event for each checkbox
        if (
          window.filterMarkers &&
          window.filterMarkers.updateMarkersForCheckbox
        ) {
          window.filterMarkers.updateMarkersForCheckbox(
            checkbox.id,
            isSelectAll
          );
        }
      });

      // Update button text
      this.textContent = isSelectAll ? "Deselect All" : "Select All";

      // Update master checkboxes
      if (window.filterMarkers && window.filterMarkers.updateMasterCheckboxes) {
        window.filterMarkers.updateMasterCheckboxes();
      }

      // Update infrastructure cards
      if (window.infrastructureCards && window.infrastructureCards.update) {
        setTimeout(() => window.infrastructureCards.update(), 100);
      }
    });
  });

  // Export for global access
  window.filterSidebar = {
    allCheckboxes: allCheckboxes,
    categoryMasterCheckboxes: categoryMasterCheckboxes,
  };
});

function setupHeaderObserver() {
  const header = document.querySelector("header");
  const sidebar = document.querySelector(".sidebar");
  const sidebarContents = document.querySelectorAll(".sidebar-content");

  if (!header || !sidebar) return;

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        const isCollapsed = header.classList.contains("collapsed");

        if (isCollapsed) {
          sidebar.style.top = "0";
          sidebar.style.height = "100vh";
          sidebarContents.forEach((content) => {
            content.style.top = "0";
            content.style.height = "100vh";
          });
        } else {
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
            topValue = "191px";
            heightValue = "calc(100vh - 191px)";
          }

          sidebar.style.top = topValue;
          sidebar.style.height = heightValue;
          sidebarContents.forEach((content) => {
            content.style.top = topValue;
            content.style.height = heightValue;
          });
        }
      }
    });
  });

  observer.observe(header, {
    attributes: true,
    attributeFilter: ["class"],
  });
}
