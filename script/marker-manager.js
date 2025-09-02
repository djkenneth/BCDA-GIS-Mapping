// script/marker-manager.js

const markerIcons = {
  // Default markers (used when no specific type is available)
  default: {
    active: {
      iconUrl: "assets/marker/marker-active.svg",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    },
    maintenance: {
      iconUrl: "assets/marker/marker-maintenance.svg",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    },
    inactive: {
      iconUrl: "assets/marker/marker-inactive.svg",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    },
    warning: {
      iconUrl: "assets/marker/marker-warning.svg",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    },
    critical: {
      iconUrl: "assets/marker/marker-critical.svg",
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