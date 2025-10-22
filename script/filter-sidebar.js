// script/filter-sidebar.js

// ============================================================================
// CONFIGURATION
// ============================================================================

const CATEGORY_MASTER_IDS = [1, 2, 3, 4, 5, 6];

// ============================================================================
// FUNCTIONS
// ============================================================================

/**
 * Create and setup "All" checkbox with event listener
 * @param {string} containerId - ID of the parent container
 * @param {string} checkboxId - ID for the checkbox
 * @param {number} targetId - Category or Subcategory ID
 * @param {Function} changeHandler - Handler function when checkbox changes
 * @returns {HTMLElement} - The created allItem element
 */
function createAllCheckbox(containerId, checkboxId, targetId, changeHandler) {
  const allItem = document.createElement('div');
  allItem.className = 'dropdown-item all-sites-item';
  allItem.innerHTML = `
    <input type="checkbox" id="${checkboxId}" data-target="${targetId}">
    <label for="${checkboxId}">All</label>
  `;

  const allCheckbox = allItem.querySelector(`#${checkboxId}`);
  if (allCheckbox && changeHandler) {
    allCheckbox.addEventListener('change', function() {
      changeHandler(targetId, this.checked);
    });
  }

  return allItem;
}

/**
 * Update the state of an "All" checkbox based on children
 * @param {HTMLElement} allCheckbox - The "All" checkbox element
 * @param {NodeList} childCheckboxes - Array of child checkboxes
 */
function updateAllCheckboxState(allCheckbox, childCheckboxes) {
  if (!allCheckbox || !childCheckboxes.length) return;

  const checkboxArray = Array.from(childCheckboxes);
  const allChecked = checkboxArray.every(cb => cb.checked);
  const someChecked = checkboxArray.some(cb => cb.checked);

  allCheckbox.checked = allChecked;
  allCheckbox.indeterminate = someChecked && !allChecked;
}

function populateSiteDropdowns() {
  if (typeof subcategories === 'undefined' || typeof sites === 'undefined') {
    console.log('Data not available, retrying...');
    setTimeout(populateSiteDropdowns, 100);
    return;
  }

  // Iterate through each subcategory
  subcategories.forEach(subcategory => {
    const subcategoryId = subcategory.id;
    const subcategorySites = getSitesBySubcategoryId(subcategoryId);
    const dropdownId = `subcategory-${subcategoryId}-dropdown`;
    const dropdown = document.getElementById(dropdownId);
    const countSpan = document.querySelector(`[data-count="subcategory-${subcategoryId}"]`);
          
    if (dropdown && countSpan) {
      countSpan.textContent = subcategorySites.length;
      
      // Populate dropdown
      dropdown.innerHTML = '';

      // Add "All" option
      // const allItem = document.createElement('div');
      // allItem.className = 'dropdown-item all-sites-item';
      // allItem.innerHTML = `
      //   <input type="checkbox" id="subcategory-${subcategoryId}-all" data-subcategory="${subcategoryId}">
      //   <label for="subcategory-${subcategoryId}-all">All</label>
      // `;
      const allItem = createAllCheckbox(
        dropdownId,
        `subcategory-${subcategoryId}-all`,
        subcategoryId,
        handleSubcategoryChange
      );
      dropdown.appendChild(allItem);

      // Add search input
      const searchItem = document.createElement('div');
      searchItem.className = 'search-input-item';
      searchItem.innerHTML = `
        <div class="search-input-container">
          <i class="fas fa-search search-icon"></i>
          <input type="text" 
                class="site-search-input" 
                placeholder="Search sites..." 
                data-dropdown-id="${dropdownId}">
        </div>
      `;
      dropdown.appendChild(searchItem);

      // Add search event listener
      const searchInput = searchItem.querySelector('.site-search-input');
      searchInput.addEventListener('input', function(event) {
        handleSearchInput(event, dropdown);
      });

      // Add individual sites
      subcategorySites.forEach(site => {
        const siteItem = document.createElement('div');
        siteItem.className = 'dropdown-item site-dropdown-item';
        siteItem.innerHTML = `
          <input type="checkbox" 
                 id="site-${site.id}" 
                 data-site-id="${site.id}"
                 ${site.isCheck ? 'checked' : ''}>
          <label for="site-${site.id}">${site.name}</label>
        `;
        dropdown.appendChild(siteItem);
      });

      // Add event listener for "All" checkbox
      const allCheckbox = dropdown.querySelector(`#subcategory-${subcategoryId}-all`);
      if (allCheckbox) {
        allCheckbox.addEventListener('change', function() {
          handleSubcategoryChange(subcategoryId, this.checked);
        });
      }

      // Add listeners to individual site checkboxes
      const siteCheckboxes = dropdown.querySelectorAll('input[data-site-id]');
      siteCheckboxes.forEach(cb => {
        cb.addEventListener('change', function() {
          const siteId = parseInt(this.dataset.siteId);
          const isChecked = this.checked;

          // ✅ Call updateMarkersForCheckbox to show/hide polygon
          if (window.updateMarkersForCheckbox) {
            window.updateMarkersForCheckbox(`site-${siteId}`, isChecked);
          }

          // ✅ Update site state in data.js
          const site = getSiteById(siteId);
          if (site) {
            site.isCheck = isChecked;
          }

          // ✅ Update parent subcategory checkbox state
          updateSubcategoryCheckboxState(subcategoryId);

          // ✅ Update parent category checkbox state  
          const subcategory = getSubcategoryById(subcategoryId);
          if (subcategory) {
            updateCategoryCheckboxState(subcategory.categoryId);
          }

          // ✅ Update "All" checkbox state in dropdown using reusable function
          const allCheckbox = dropdown.querySelector(`#subcategory-${subcategoryId}-all`);
          updateAllCheckboxState(allCheckbox, siteCheckboxes);
        });
      });
    }
  });
}

// Toggle dropdown visibility
function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    dropdown.classList.toggle('show');
  }
}

function setupDropdownToggles() {
  const toggleButtons = document.querySelectorAll('.dropdown-toggle');
  toggleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const dropdownId = this.getAttribute('data-dropdown');
      toggleDropdown(dropdownId);
      
      // Toggle icon
      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
      }
    });
  });
}

function handleCategoryCheckbox(categoryId, isChecked) {
  const category = getCategoryById(categoryId);
  if (!category) return;

  console.log('handleCategoryCheckbox', categoryId, isChecked);

  // Update category state
  category.isCheck = isChecked;

  // Update all subcategories in this category
  const categorySubcategories = getSubcategoriesByCategoryId(categoryId);
  categorySubcategories.forEach(subcategory => {
    subcategory.isCheck = isChecked;
    
    // Update subcategory checkbox
    const subcategoryCheckbox = document.getElementById(`subcategory-${subcategory.id}`);
    if (subcategoryCheckbox) {
      subcategoryCheckbox.checked = isChecked;
    }

    // ✅ Update dropdown "All" checkbox
    const dropdownAllCheckbox = document.getElementById(`subcategory-${subcategory.id}-all`);
    if (dropdownAllCheckbox) {
      dropdownAllCheckbox.checked = isChecked;
      dropdownAllCheckbox.indeterminate = false;
    }

    // Update all sites in this subcategory
    const subcategorySites = getSitesBySubcategoryId(subcategory.id);
    subcategorySites.forEach(site => {
      site.isCheck = isChecked;
      
      // Update site checkbox in dropdown
      const siteCheckbox = document.getElementById(`site-${site.id}`);
      if (siteCheckbox) {
        siteCheckbox.checked = isChecked;
      }

      // ✅ CRITICAL: Update each site's polygon visibility individually
      if (window.updateMarkersForCheckbox) {
        window.updateMarkersForCheckbox(`site-${site.id}`, isChecked);
      }
    });
  });
}

function updateCategoryCheckboxState(categoryId) {
  const categorySubcategories = getSubcategoriesByCategoryId(categoryId);
  const allChecked = categorySubcategories.every(sub => sub.isCheck);
  const someChecked = categorySubcategories.some(sub => sub.isCheck);

  const categoryCheckbox = document.getElementById(`category-${categoryId}`);
  if (categoryCheckbox) {
    categoryCheckbox.checked = allChecked;
    categoryCheckbox.indeterminate = someChecked && !allChecked;
  }

  const category = getCategoryById(categoryId);
  if (category) {
    category.isCheck = allChecked;
  }
}

function handleSubcategoryCheckbox(subcategoryId, isChecked) {
  const subcategory = getSubcategoryById(subcategoryId);
  if (!subcategory) return;

  console.log('handleSubcategoryCheckbox', subcategoryId, isChecked);

  // Update subcategory state
  subcategory.isCheck = isChecked;

  // Update all sites in this subcategory
  const subcategorySites = getSitesBySubcategoryId(subcategoryId);
  subcategorySites.forEach(site => {
    site.isCheck = isChecked;
    
    // Update site checkbox
    const siteCheckbox = document.getElementById(`site-${site.id}`);
    if (siteCheckbox) {
      siteCheckbox.checked = isChecked;
    }

    // ✅ CRITICAL: Update each site's polygon visibility individually
    if (window.updateMarkersForCheckbox) {
      window.updateMarkersForCheckbox(`site-${site.id}`, isChecked);
    }
  });

  // Update parent category checkbox state
  updateCategoryCheckboxState(subcategory.categoryId);

  // ✅ No need for subcategory-level marker update since we updated each site individually
}

function updateSubcategoryCheckboxState(subcategoryId) {
  const subcategorySites = getSitesBySubcategoryId(subcategoryId);
  const allChecked = subcategorySites.every(site => site.isCheck);
  const someChecked = subcategorySites.some(site => site.isCheck);

  const subcategoryCheckbox = document.getElementById(`subcategory-${subcategoryId}`);
  if (subcategoryCheckbox) {
    subcategoryCheckbox.checked = allChecked;
    subcategoryCheckbox.indeterminate = someChecked && !allChecked;
  }

  const subcategory = getSubcategoryById(subcategoryId);
  if (subcategory) {
    subcategory.isCheck = allChecked;
  }
}

function handleSiteCheckbox(siteId, isChecked) {
  const site = getSiteById(siteId);
  if (!site) return;

  console.log('handleSiteCheckbox');
  

  // Update site state
  site.isCheck = isChecked;

  // Update parent subcategory checkbox state
  updateSubcategoryCheckboxState(site.subcategory);

  // Update parent category checkbox state
  updateCategoryCheckboxState(site.category);

  // Trigger marker update
  if (window.updateMarkersForCheckbox) {
    window.updateMarkersForCheckbox(`site-${siteId}`, isChecked);
  }
}

function handleAllCheckbox(isChecked) {
  console.log('handleAllCheckbox', handleAllCheckbox);

  // Update all categories
  categories.forEach(category => {
    category.isCheck = isChecked;
    const categoryCheckbox = document.getElementById(`category-${category.id}`);
    if (categoryCheckbox) {
      categoryCheckbox.checked = isChecked;
    }
  });

  // Update all subcategories
  subcategories.forEach(subcategory => {
    subcategory.isCheck = isChecked;
    const subcategoryCheckbox = document.getElementById(`subcategory-${subcategory.id}`);
    if (subcategoryCheckbox) {
      subcategoryCheckbox.checked = isChecked;
    }
  });

  // Update all sites
  sites.forEach(site => {
    site.isCheck = isChecked;
    const siteCheckbox = document.getElementById(`site-${site.id}`);
    if (siteCheckbox) {
      siteCheckbox.checked = isChecked;
    }
  });

  // Trigger marker update
  if (window.updateMarkersForCheckbox) {
    window.updateMarkersForCheckbox('all', isChecked);
  }
}

function setupCheckboxListeners() {
  // All checkbox
  const allCheckbox = document.getElementById('all');
  if (allCheckbox) {
    allCheckbox.addEventListener('change', function() {
      handleAllCheckbox(this.checked);
    });
  }

  // Category checkboxes
  categories.forEach(category => {
    const checkbox = document.getElementById(`category-${category.id}`);
    if (checkbox) {
      checkbox.addEventListener('change', function() {
        handleCategoryCheckbox(category.id, this.checked);
      });
    }
  });

  // Subcategory checkboxes
  subcategories.forEach(subcategory => {
    const checkbox = document.getElementById(`subcategory-${subcategory.id}`);
    if (checkbox) {
      checkbox.addEventListener('change', function() {
        handleSubcategoryCheckbox(subcategory.id, this.checked);
      });
    }
  });
}

function toggleSiteDropdown(subcategoryId) {
  const dropdown = document.getElementById(`${subcategoryId}-dropdown`);
  if (dropdown) {
    dropdown.classList.toggle('expanded');
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

function handleSubcategoryChange(subcategoryId, isChecked) {
  const dropdown = document.getElementById(`subcategory-${subcategoryId}-dropdown`);
  if (!dropdown) return;
  
  console.log('handleSubcategoryChange', subcategoryId, isChecked);
  
  const siteCheckboxes = dropdown.querySelectorAll('.site-dropdown-item input[type="checkbox"]');
  siteCheckboxes.forEach(checkbox => {
    checkbox.checked = isChecked;
    
    // Update site state in data
    const siteId = parseInt(checkbox.dataset.siteId);
    const site = getSiteById(siteId);
    if (site) {
      site.isCheck = isChecked;
    }
    
    // ✅ CRITICAL: Update each site's polygon visibility individually
    if (window.updateMarkersForCheckbox) {
      window.updateMarkersForCheckbox(`site-${siteId}`, isChecked);
    }
  });

  // Update parent subcategory state
  const subcategory = getSubcategoryById(subcategoryId);
  if (subcategory) {
    subcategory.isCheck = isChecked;
    updateCategoryCheckboxState(subcategory.categoryId);
  }
}

function filterSitesInDropdown(searchTerm, dropdown) {
  const siteItems = dropdown.querySelectorAll('.site-dropdown-item:not(.all-sites-item):not(.search-input-item)');
  const normalizedSearch = searchTerm.toLowerCase().trim();
  
  siteItems.forEach(item => {
    const label = item.querySelector('label');
    const siteName = label ? label.textContent.toLowerCase() : '';
    
    if (normalizedSearch === '' || siteName.includes(normalizedSearch)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function handleSearchInput(event, dropdown) {
  const searchTerm = event.target.value;
  filterSitesInDropdown(searchTerm, dropdown);
}

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

          if(screenWidth <= CONFIG.BREAKPOINTS.MOBILE_SMALL) {
            topValue = "194px";
            heightValue = "calc(100vh - 194px)";
          } else if (screenWidth <= CONFIG.BREAKPOINTS.MOBILE) {
            // Mobile breakpoint
            topValue = "236px";
            heightValue = "calc(100vh - 236px)";
          } else if (screenWidth <= CONFIG.BREAKPOINTS.TABLET) {
            // Tablet breakpoint
            topValue = "258px";
            heightValue = "calc(100vh - 258px)";
          } else {
            // Desktop (default)
            topValue = CONFIG.DESKTOP.TOP;
            heightValue = `calc(100vh - ${CONFIG.DESKTOP.TOP})`;
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

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(populateSiteDropdowns, 1000);

  const tabs = document.querySelectorAll(".sidebar-tab-v2");
  const panels = document.querySelectorAll(".sidebar-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab");
      const targetPanel = document.getElementById(`${tabName}-content`);
      const isAlreadyActive = this.classList.contains("active");

      tabs.forEach((t) => t.classList.remove("active"));

      panels.forEach((panel) => panel.classList.remove("visible"));

      if (isAlreadyActive) {
        return;
      }

      this.classList.add("active");

      if (targetPanel) {
        targetPanel.classList.add("visible");
      }
    });
  });

  setupHeaderObserver();

  const closeButtons = document.querySelectorAll(".close-panel");
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const panel = this.closest(".sidebar-content");
      panel.classList.remove("visible");

      tabs.forEach((tab) => tab.classList.remove("active"));
    });
  });

  document.querySelectorAll('.checkbox-flex-container').forEach(container => {
    const label = container.querySelector('label');
    if (label) {
      const subcategoryId = label.getAttribute('for');
      
      if (!container.querySelector('.dropdown-toggle-btn')) {
        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '<i class="fas fa-chevron-down"></i>';
        toggleButton.className = 'dropdown-toggle-btn';
        toggleButton.title = 'Toggle sites list';
        
        container.appendChild(toggleButton);
      }
      
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
  
  document.addEventListener('change', function(e) {
    
    if (e.target.matches('.all-sites-item input[type="checkbox"]')) {

      const subcategoryId = e.target.dataset.subcategory;
      const isChecked = e.target.checked;

      if (subcategoryId) {
        handleSubcategoryChange(subcategoryId, isChecked);
      }
    }
  });

  const sidebarContent = document.querySelector(".sidebar-content");
  if (sidebarContent) {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) {
              const checkboxes = node.querySelectorAll(
                'input[type="checkbox"]'
              );
              checkboxes.forEach((checkbox) => {
                if (!checkbox.hasAttribute("data-listener-added")) {
                  checkbox.addEventListener("change", function () {

                    if (
                      window.filterMarkers &&
                      window.updateMarkersForCheckbox
                    ) {
                      window.updateMarkersForCheckbox(
                        this.id,
                        this.checked
                      );
                    }

                    if (
                      window.infrastructureCards &&
                      window.updateInfrastructureCards
                    ) {
                      setTimeout(
                        () => window.updateInfrastructureCards(),
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

        if (
          window.filterMarkers &&
          window.updateMarkersForCheckbox
        ) {
          window.updateMarkersForCheckbox(
            checkbox.id,
            isSelectAll
          );
        }
      });

      this.textContent = isSelectAll ? "Deselect All" : "Select All";

      if (window.infrastructureCards && window.updateInfrastructureCards) {
        setTimeout(() => window.updateInfrastructureCards(), 100);
      }
    });
  });

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  document.addEventListener('DOMContentLoaded', function() {
    // Wait for data to be available
    function initializeSidebar() {
      if (typeof categories === 'undefined' || typeof subcategories === 'undefined' || typeof sites === 'undefined') {
        setTimeout(initializeSidebar, 100);
        return;
      }

      setupDropdownToggles();
      setupCheckboxListeners();
      populateSiteDropdowns();
    }

    initializeSidebar();
  });

  // ============================================================================
  // WINDOW EXPORTS
  // ============================================================================

  window.filterSidebar = {
    populateSiteDropdowns: populateSiteDropdowns,
    toggleSiteDropdown: toggleSiteDropdown,
    handleCategoryCheckbox,
    handleSubcategoryCheckbox,
    handleSiteCheckbox,
    handleAllCheckbox,
  };
});

