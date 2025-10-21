// script/utils.js

// ============================================================================
// DATA ACCESS HELPERS
// ============================================================================

// Get category by ID
function getCategoryById(categoryId) {
  return window.categories?.find(cat => cat.id === categoryId) || null;
}

// Get all subcategories for a category
function getSubcategoriesByCategoryId(categoryId) {
  return window.subcategories?.filter(sub => sub.categoryId === categoryId) || [];
}

// Get subcategory by ID
function getSubcategoryById(subcategoryId) {
  return window.subcategories?.find(sub => sub.id == subcategoryId) || null;
}

// Get all sites for a category
function getSitesByCategoryId(categoryId) {
  return window.sites?.filter(site => site.category === categoryId) || [];
}

function getCategoryDisplayName(categoryId) {
  const category = getCategoryById(categoryId);
  return category?.title || categoryId;
}

function getSubcategoryDisplayName(subcategoryID) {
  console.log('subcategoryID', subcategoryID);
  const subcategory = window.subcategories?.find(sub => sub.id == subcategoryID);
  console.log('subcategory subcategory', subcategory.title);
  return subcategory?.title || subcategoryID || 'Unknown';
}

function findSiteById(siteId) {
  return getSiteById(siteId);
}

// Get all sites by status
function getAllSitesByStatus(status) {
  if (status === "total") {
    return window.sites || [];
  }
  return window.sites?.filter(site => site.status === status) || [];
}

// Get sites by status and category
function getSitesByStatusAndCategory(status, categoryId) {
  const categorySites = getSitesByCategoryId(categoryId);
  if (status === "total") {
    return categorySites;
  }
  return categorySites.filter(site => site.status === status);
}

// Find category by site ID  
function findCategoryBySiteId(siteId) {
  const site = getSiteById(siteId);
  return site ? getCategoryById(site.category) : null;
}

// Get all sites for a subcategory
function getSitesBySubcategoryId(subcategoryId) {
  return window.sites?.filter(site => site.subcategory === subcategoryId) || [];
}

// Get site by ID
function getSiteById(siteId) {
  return window.sites?.find(site => site.id === siteId) || null;
}

// Get category for a site
function getCategoryForSite(siteId) {
  const site = getSiteById(siteId);
  return site ? getCategoryById(site.category) : null;
}

// Get subcategory for a site
function getSubcategoryForSite(siteId) {
  const site = getSiteById(siteId);
  return site ? getSubcategoryById(site.subcategory) : null;
}

// Get full site data with category and subcategory info
function getFullSiteData(siteId) {
  const site = getSiteById(siteId);
  if (!site) return null;

  const category = getCategoryById(site.category);
  const subcategory = getSubcategoryById(site.subcategory);

  return {
    ...site,
    categoryData: category,
    subcategoryData: subcategory,
  };
}

// ============================================================================
// CHECKBOX STATE MANAGEMENT
// ============================================================================

// Get all checked categories
function getCheckedCategories() {
  return window.categories?.filter(cat => cat.isCheck) || [];
}

// Get all checked subcategories
function getCheckedSubcategories() {
  return window.subcategories?.filter(sub => sub.isCheck) || [];
}

// Get all checked sites
function getCheckedSites() {
  return window.sites?.filter(site => site.isCheck) || [];
}

// Check if all items in array are checked
function areAllChecked(items) {
  return items && items.length > 0 && items.every(item => item.isCheck);
}

// Check if some items in array are checked
function areSomeChecked(items) {
  return items && items.some(item => item.isCheck);
}

// Set check state for all items in array
function setCheckStateForAll(items, isChecked) {
  if (!items) return;
  items.forEach(item => {
    item.isCheck = isChecked;
  });
}

// ============================================================================
// SEARCH AND FILTER
// ============================================================================

// Search sites by name
function searchSitesByName(query) {
  if (!query || !window.sites) return [];
  
  const lowerQuery = query.toLowerCase();
  return window.sites.filter(site => 
    site.name.toLowerCase().includes(lowerQuery)
  );
}

// Filter sites by status
function filterSitesByStatus(status) {
  return window.sites?.filter(site => site.status === status) || [];
}

// Filter sites by multiple criteria
function filterSites(criteria = {}) {
  let filtered = window.sites || [];

  if (criteria.category) {
    filtered = filtered.filter(site => site.category === criteria.category);
  }

  if (criteria.subcategory) {
    filtered = filtered.filter(site => site.subcategory === criteria.subcategory);
  }

  if (criteria.status) {
    filtered = filtered.filter(site => site.status === criteria.status);
  }

  if (criteria.name) {
    const lowerName = criteria.name.toLowerCase();
    filtered = filtered.filter(site => 
      site.name.toLowerCase().includes(lowerName)
    );
  }

  return filtered;
}

// ============================================================================
// STATISTICS
// ============================================================================

// Get site count by category
function getSiteCountByCategory(categoryId) {
  return getSitesByCategoryId(categoryId).length;
}

// Get site count by subcategory
function getSiteCountBySubcategory(subcategoryId) {
  return getSitesBySubcategoryId(subcategoryId).length;
}

// Get site counts by status
function getSiteCountsByStatus() {
  const counts = {
    active_locators: 0,
    pending_permits: 0,
    critical_issues: 0,
    infrastructure_assets: 0,
    available_lots: 0,
    occupancy_rate: 0,
  };

  if (!window.sites) return counts;

  window.sites.forEach(site => {
    const status = site.status || 'active_locators';
    if (counts.hasOwnProperty(status)) {
      counts[status]++;
    }
  });

  return counts;
}

// ============================================================================
// FILE UTILITIES
// ============================================================================

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

// ============================================================================
// NOTIFICATION SYSTEM
// ============================================================================

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

// ============================================================================
// VALIDATION
// ============================================================================

// Validate site data structure
function validateSiteData(site) {
  const required = ['id', 'name', 'location', 'category', 'subcategory'];
  const missing = required.filter(field => !site.hasOwnProperty(field));
  
  if (missing.length > 0) {
    console.warn(`Site missing required fields: ${missing.join(', ')}`, site);
    return false;
  }
  
  return true;
}

// Validate category data structure
function validateCategoryData(category) {
  const required = ['id', 'name'];
  const missing = required.filter(field => !category.hasOwnProperty(field));
  
  if (missing.length > 0) {
    console.warn(`Category missing required fields: ${missing.join(', ')}`, category);
    return false;
  }
  
  return true;
}

// Validate subcategory data structure
function validateSubcategoryData(subcategory) {
  const required = ['id', 'categoryId', 'title'];
  const missing = required.filter(field => !subcategory.hasOwnProperty(field));
  
  if (missing.length > 0) {
    console.warn(`Subcategory missing required fields: ${missing.join(', ')}`, subcategory);
    return false;
  }
  
  return true;
}

// ============================================================================
// DEBUGGING HELPERS
// ============================================================================

// Log data structure summary
function logDataSummary() {
  console.group('Data Structure Summary');
  console.log('Categories:', window.categories?.length || 0);
  console.log('Subcategories:', window.subcategories?.length || 0);
  console.log('Sites:', window.sites?.length || 0);
  
  if (window.categories) {
    window.categories.forEach(cat => {
      const subCount = getSubcategoriesByCategoryId(cat.id).length;
      const siteCount = getSitesByCategoryId(cat.id).length;
      console.log(`  ${cat.name}: ${subCount} subcategories, ${siteCount} sites`);
    });
  }
  
  console.groupEnd();
}

// Validate all data
function validateAllData() {
  console.group('Data Validation');
  
  let valid = true;
  
  if (window.categories) {
    window.categories.forEach(cat => {
      if (!validateCategoryData(cat)) valid = false;
    });
  }
  
  if (window.subcategories) {
    window.subcategories.forEach(sub => {
      if (!validateSubcategoryData(sub)) valid = false;
    });
  }
  
  if (window.sites) {
    window.sites.forEach(site => {
      if (!validateSiteData(site)) valid = false;
    });
  }
  
  console.log('All data valid:', valid);
  console.groupEnd();
  
  return valid;
}

// ============================================================================
// WINDOW EXPORTS
// ============================================================================

// Export utility functions to window
window.utils = {
  // Data access
  getCategoryById,
  getSubcategoriesByCategoryId,
  getSubcategoryById,
  getSitesByCategoryId,
  getSitesBySubcategoryId,
  getSiteById,
  getCategoryForSite,
  getSubcategoryForSite,
  getFullSiteData,
  getCategoryDisplayName,
  getSubcategoryDisplayName,
  getAllSitesByStatus,
  getSitesByStatusAndCategory,
  findCategoryBySiteId,
  
  // Checkbox state
  getCheckedCategories,
  getCheckedSubcategories,
  getCheckedSites,
  areAllChecked,
  areSomeChecked,
  setCheckStateForAll,
  
  // Search and filter
  searchSitesByName,
  filterSitesByStatus,
  filterSites,
  
  // Statistics
  getSiteCountByCategory,
  getSiteCountBySubcategory,
  getSiteCountsByStatus,
  
  // File utilities
  formatFileSize,
  getDocumentIcon,
  
  // Notifications
  showNotification,
  removeNotification,
  
  // Validation
  validateSiteData,
  validateCategoryData,
  validateSubcategoryData,
  validateAllData,
  
  // Debugging
  logDataSummary,
};

window.getAllSitesByStatus = getAllSitesByStatus;
window.getSitesByStatusAndCategory = getSitesByStatusAndCategory;
window.findCategoryBySiteId = findCategoryBySiteId;
window.findSiteById = findSiteById;