// script/filter-sidebar.js

function populateSiteDropdowns() {
  if (typeof mapMarkers === 'undefined') {
    console.log('mapMarkers not available, retrying...');
    setTimeout(populateSiteDropdowns, 100);
    return;
  }

  console.log('Populating site dropdowns...');
  
  // Iterate through each category in mapMarkers
  mapMarkers.forEach(categoryData => {
    const categoryId = categoryData.id;
    console.log(`Processing category: ${categoryId}`);
    
    // Iterate through subcategories
    Object.keys(categoryData.subcategoryConfigs || {}).forEach(subcategoryId => {
      const sites = categoryData.sites.filter(site => site.subcategory === subcategoryId);
      const dropdownId = `${subcategoryId}-dropdown`;
      const dropdown = document.getElementById(dropdownId);
      const countSpan = document.querySelector(`[data-count="${subcategoryId}"]`);
      
      console.log(`Processing subcategory: ${subcategoryId}, sites found: ${sites.length}`);
      
      if (dropdown && countSpan) {
        countSpan.textContent = sites.length;
        
        // Populate dropdown
        dropdown.innerHTML = '';

        const allItem = document.createElement('div');
        allItem.className = 'site-dropdown-item all-sites-item';
        allItem.innerHTML = `
            <input type="checkbox" id="${subcategoryId}" data-category="${categoryId}" data-subcategory="${subcategoryId}">
            <label for="${subcategoryId}">All</label>
        `;
        dropdown.appendChild(allItem);

        sites.forEach(site => {
          const siteItem = document.createElement('div');
          siteItem.className = 'site-dropdown-item';
          siteItem.innerHTML = `
            <input type="checkbox" id="site-${site.id}" data-site-id="${site.id}">
            <label for="site-${site.id}">${site.name}</label>
          `;
          dropdown.appendChild(siteItem);
        });

        console.log(`Populated dropdown for ${subcategoryId} with ${sites.length} sites`);
      } else {
        if (!dropdown) console.log(`Dropdown not found: ${dropdownId}`);
        if (!countSpan) console.log(`Count span not found for: ${subcategoryId}`);
      }
    });
  });
}

// Function to toggle dropdown visibility
function toggleSiteDropdown(subcategoryId) {
  const dropdown = document.getElementById(`${subcategoryId}-dropdown`);
  if (dropdown) {
    dropdown.classList.toggle('expanded');
    console.log(`Toggled dropdown for ${subcategoryId}`);
  } else {
    console.log(`Dropdown not found: ${subcategoryId}-dropdown`);
  }
}

function updateSubcategoryCheckbox(subcategoryId) {
  const dropdown = document.getElementById(`${subcategoryId}-dropdown`);
  const subcategoryCheckbox = dropdown?.querySelector('.all-sites-item input[type="checkbox"]');
  
  if (!dropdown || !subcategoryCheckbox) return;
  
  const siteCheckboxes = dropdown.querySelectorAll('.site-dropdown-item input[type="checkbox"]:not(.all-sites-item input[type="checkbox"])');

  const checkedSites = dropdown.querySelectorAll('.site-dropdown-item input[type="checkbox"]:checked:not(.all-sites-item input[type="checkbox"])');
  
  if (checkedSites.length === 0) {
    subcategoryCheckbox.checked = false;
    subcategoryCheckbox.indeterminate = false;
  } else if (checkedSites.length === siteCheckboxes.length) {
    subcategoryCheckbox.checked = true;
    subcategoryCheckbox.indeterminate = false;
  } else {
    subcategoryCheckbox.checked = false;
    subcategoryCheckbox.indeterminate = true;
  }
}

// Function to handle subcategory checkbox changes
function handleSubcategoryChange(subcategoryId, isChecked) {
  
  const dropdown = document.getElementById(`${subcategoryId}-dropdown`);
  if (!dropdown) return;
  
  const siteCheckboxes = dropdown.querySelectorAll('.site-dropdown-item input[type="checkbox"]:not(.all-sites-item input[type="checkbox"])');
  siteCheckboxes.forEach(checkbox => {
    checkbox.checked = isChecked;

    if (window.filterMarkers && window.filterMarkers.updateMarkersForCheckbox) {
      window.filterMarkers.updateMarkersForCheckbox(checkbox.id, isChecked);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Wait for data to be loaded, then populate dropdowns
  setTimeout(populateSiteDropdowns, 1000);

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

  // Build allCheckboxes from mapMarkers data
  if (typeof mapMarkers !== 'undefined') {
    mapMarkers.forEach(category => {
      const masterCheckboxId = category.checkboxConfig.masterCheckboxId;
      const subcategoryIds = Object.keys(category.subcategoryConfigs || {});
      
      if (masterCheckboxId && subcategoryIds.length > 0) {
        allCheckboxes[masterCheckboxId] = subcategoryIds;
      }
    });
  }

  // Define categoryMasterIds for the "All" checkbox
  const categoryMasterIds = [
    "all-economic-zones",
    "all-locator-management", 
    "all-infrastructure-projects",
    "all-afp-modernization",
    "all-investment-tracking",
    "all-sustainability-environment"
  ];
  
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

      // Update infrastructure cards
      if (window.infrastructureCards && window.infrastructureCards.update) {
        setTimeout(() => window.infrastructureCards.update(), 100);
      }
    });
  });

  document.querySelectorAll('.checkbox-flex-container').forEach(container => {
    const label = container.querySelector('label');
    if (label) {
      const subcategoryId = label.getAttribute('for');
      
      // Add dropdown toggle button
      if (!container.querySelector('.dropdown-toggle-btn')) {
        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '<i class="fas fa-chevron-down"></i>';
        toggleButton.className = 'dropdown-toggle-btn';
        toggleButton.style.cssText = `
          background: none;
          border: none;
          color: #fad754;
          cursor: pointer;
          padding: 2px 6px;
          margin-left: 8px;
          font-size: 10px;
          transition: transform 0.3s ease;
          border-radius: 2px;
        `;
        toggleButton.title = 'Toggle sites list';
        
        container.appendChild(toggleButton);
      }
      
      // Make entire container clickable for dropdown toggle
      container.style.cursor = 'pointer';
      container.addEventListener('click', function(e) {
        e.preventDefault();
        toggleSiteDropdown(subcategoryId);
        const icon = container.querySelector('.dropdown-toggle-btn i');
        const dropdown = document.getElementById(`${subcategoryId}-dropdown`);
        if (dropdown && dropdown.classList.contains('expanded')) {
          icon.style.transform = 'rotate(180deg)';
        } else {
          icon.style.transform = 'rotate(0deg)';
        }
      });
    }
  });
  
  // Add event listeners for individual site checkboxes (delegated)
  document.addEventListener('change', function(e) {
    
    if (e.target.matches('.all-sites-item input[type="checkbox"]')) {

      const subcategoryId = e.target.dataset.subcategory;
      const isChecked = e.target.checked;
      
      if (subcategoryId) {
        handleSubcategoryChange(subcategoryId, isChecked);
      }
    }
    
    if (e.target.matches('.site-dropdown-item input[type="checkbox"]') && !e.target.closest('.all-sites-item')) {

      const isChecked = e.target.checked;

      // Use updateMarkersForCheckbox for individual sites  
      if (window.filterMarkers && window.filterMarkers.updateMarkersForCheckbox) {
        console.log('e.target.id', e.target.id)
        window.filterMarkers.updateMarkersForCheckbox(e.target.id, isChecked);
      }

      // Update parent subcategory checkbox state
      const dropdown = e.target.closest('.sites-dropdown');
      if (dropdown) {
        const subcategoryId = dropdown.id.replace('-dropdown', '');
        updateSubcategoryCheckbox(subcategoryId);
      }
    }
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
    populateSiteDropdowns: populateSiteDropdowns,
    toggleSiteDropdown: toggleSiteDropdown
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

          if(screenWidth <= 425) {
            topValue = "194px";
            heightValue = "calc(100vh - 194px)";
          } else if (screenWidth <= 768) {
            // Mobile breakpoint
            topValue = "236px";
            heightValue = "calc(100vh - 236px)";
          } else if (screenWidth <= 1024) {
            // Tablet breakpoint
            topValue = "258px";
            heightValue = "calc(100vh - 258px)";
          } else {
            // Desktop (default)
            topValue = "298px";
            heightValue = "calc(100vh - 298px)";
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

function refreshSiteDropdowns() {
  populateSiteDropdowns();
}