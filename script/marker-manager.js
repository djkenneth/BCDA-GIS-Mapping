// script/marker-manager.js

const markerIcons = {
  default: {
    active_locators: {
      iconUrl: "assets/marker/marker-active.svg",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    },
    pending_permits: {
      iconUrl: "assets/marker/marker-maintenance.svg", // Reuse existing maintenance icon
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    },
    critical_issues: {
      iconUrl: "assets/marker/marker-warning.svg", // Reuse existing warning icon
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    },
    infrastructure_assets: {
      iconUrl: "assets/marker/marker-critical.svg", // Reuse existing critical icon
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    },
    available_lots: {
      iconUrl: "assets/marker/marker-inactive.svg", // Reuse existing inactive icon
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    },
    occupancy_rate: {
      iconUrl: "assets/marker/marker-active.svg", // Use active icon for occupancy rate
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }
  }
};

/**
 * Get the appropriate marker icon based on site type and status
 * 
 * @param {string} subcategory - The subcategory of the site
 * @param {string} status - The status of the site (active, warning, critical, maintenance, inactive)
 * @returns {L.Icon} - The Leaflet icon to use for the marker
 */
function getMarkerIcon(subcategory, status) {
  // Default to the standard markers if no status is provided
  if (!status) status = "active";
  
  // Determine the marker type based on the subcategory
  const markerType = "default";
  
  // Return the appropriate icon based on marker type and status
  return markerIcons[markerType][status] || markerIcons.default[status];
}

/**
 * Create a marker for a site with the appropriate icon
 * 
 * @param {Array} location - The [lat, lng] location of the marker
 * @param {string} subcategory - The subcategory of the site
 * @param {string} status - The status of the site
 * @param {Object} options - Additional options for the marker
 * @returns {maplibregl.Marker} - The MapLibre GL JS marker
 */

function createSiteMarker(location, subcategory, status, options = {}) {
  const iconUrl = getMarkerIcon(subcategory, status);
  
  // Create marker element
  const el = document.createElement('div');
  el.className = 'maplibre-marker';
  el.style.backgroundImage = `url(${iconUrl.iconUrl})`;
  el.style.width = '40px';
  el.style.height = '40px';
  el.style.backgroundSize = 'contain';
  el.style.backgroundRepeat = 'no-repeat';
  el.style.cursor = 'pointer';
  
  return el;
}