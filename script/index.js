const DEMO_CAMERA_CODE = "1000013";
const STREAM_STORAGE_KEY = "stream_" + DEMO_CAMERA_CODE;
const EXCLUDED_DEVICE_CODES = ['1000012', '1000014', '1000006'];
const API_BASE_URL = 'https://philtower.itbsstudio.com';

// Remove separate live feed card functionality since it's now integrated
// Keep only the functions needed for the integrated version

function storeStreamUrl(cameraCode, streamData) {
  const streamInfo = {
    url: streamData.html_stream_url,
    rtspUrl: streamData.rtsp_url,
    streamId: streamData.stream_id,
    timestamp: Date.now()
  };
  
  try {
    localStorage.setItem(`stream_${cameraCode}`, JSON.stringify(streamInfo));
    return streamInfo;
  } catch (error) {
    console.error('Error storing stream URL in local storage:', error);
    return null;
  }
}

function getStoredStreamUrl(cameraCode) {
  try {
    const streamInfoStr = localStorage.getItem(`stream_${cameraCode}`);
    if (!streamInfoStr) return null;
    
    const streamInfo = JSON.parse(streamInfoStr);
    return streamInfo;
  } catch (error) {
    console.error('Error retrieving stream URL from local storage:', error);
    localStorage.removeItem(`stream_${cameraCode}`);
    return null;
  }
}

async function isStreamUrlValid(streamUrl) {
  if (!streamUrl) return false;
  
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve(false);
    }, 5000);
    
    fetch(streamUrl, { method: 'HEAD' })
      .then(response => {
        clearTimeout(timeoutId);
        const isValid = response.ok;
        resolve(isValid);
      })
      .catch(error => {
        clearTimeout(timeoutId);
        console.error('Error validating stream URL:', error);
        resolve(false);
      });
  });
}

async function getStreamUrl(cameraCode = DEMO_CAMERA_CODE) {
  const storedStreamInfo = getStoredStreamUrl(cameraCode);
  
  if (storedStreamInfo && storedStreamInfo.url) {
    const isValid = await isStreamUrlValid(storedStreamInfo.url);
    
    if (isValid) {
      return storedStreamInfo.url;
    } else {
      localStorage.removeItem(`stream_${cameraCode}`);
    }
  }
  
  try {
    const streamData = await startCameraStream(cameraCode);
    if (streamData) {
      storeStreamUrl(cameraCode, streamData);
      return streamData.html_stream_url;
    }
  } catch (error) {
    console.error('Error creating new stream:', error);
  }
  
  return null;
}

async function startCameraStream(cameraCode = DEMO_CAMERA_CODE) {
  try {
    
    const channelId = `${cameraCode}$1$0$0`;
    
    const response = await fetch(`${API_BASE_URL}/api/video/start-stream?channel_id=${channelId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error starting stream: ${response.statusText}`);
    }
    
    const streamData = await response.json();
    return streamData;
  } catch (error) {
    console.error('Error starting camera stream:', error);
    return null;
  }
}

function initializeHlsPlayer(videoElement, streamUrl, loaderElement) {
  return new Promise((resolve, reject) => {
    if (window.integratedHlsPlayer) {
      window.integratedHlsPlayer.destroy();
      window.integratedHlsPlayer = null;
    }
    
    if (typeof Hls !== 'undefined' && Hls.isSupported()) {
      const hls = new Hls({
        debug: false,
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 0
      });
      
      hls.loadSource(streamUrl);
      hls.attachMedia(videoElement);
      
      window.integratedHlsPlayer = hls;
      
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        videoElement.play().then(() => {
          resolve();
        }).catch(e => {
          console.warn('Autoplay prevented in integrated live feed:', e);
          resolve();
        });
      });
      
      hls.on(Hls.Events.FRAG_BUFFERED, function() {
        if (loaderElement && videoElement.readyState >= 3) {
          loaderElement.style.display = 'none';
        }
      });
      
      hls.on(Hls.Events.ERROR, function(event, data) {
        console.error('HLS error in integrated live feed:', data);
        if (data.fatal) {
          reject(new Error('Fatal HLS error: ' + data.type));
        }
      });
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = streamUrl;
      videoElement.addEventListener('loadedmetadata', function() {
        videoElement.play().then(() => {
          if (loaderElement) {
            loaderElement.style.display = 'none';
          }
          resolve();
        }).catch(reject);
      });
    } else {
      reject(new Error('HLS not supported in this browser'));
    }
    
    videoElement.addEventListener('timeupdate', function onTimeUpdate() {
      if (videoElement.currentTime > 0 && loaderElement) {
        loaderElement.style.display = 'none';
        videoElement.removeEventListener('timeupdate', onTimeUpdate);
      }
    });
  });
}

async function fetchDevices() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/devices`);
    
    if (!response.ok) {
      throw new Error(`Error fetching devices: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    let allDevices = [];
    
    if (data && data.code === 1000 && data.data && Array.isArray(data.data.pageData)) {
      allDevices = data.data.pageData.map(device => ({
        code: device.deviceCode,
        name: device.deviceName + " (" + device.deviceCode + ")",
        deviceStatus: device.status === "1" ? 1 : 0,
        ip: device.deviceIp,
        model: device.deviceModel,
        manufacturer: device.manufacturerName,
        channelId: `${device.deviceCode}$1$0$0`
      }));
    } else if (data && data.data && Array.isArray(data.data.list)) {
      allDevices = data.data.list;
    }
    
    return allDevices.filter(device => {
      const deviceCode = device.code || device.deviceCode;
      return !EXCLUDED_DEVICE_CODES.includes(deviceCode);
    });
    
} catch (error) {
    console.error("Error fetching devices:", error);
    return [];
  }
}

async function showSecurityCameraList() {
  hideAllSections();
  
  ensureCameraStyles();
  
  const cameraSection = document.getElementById("camera-section");
  if (!cameraSection) return;
  
  cameraSection.style.display = "block";
  
  const cameraContent = document.getElementById("camera-list-content");
  if (!cameraContent) return;
  
  cameraContent.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      Loading devices...
    </div>
  `;
  
  const devices = await fetchDevices();
  
  if (devices.length === 0) {
    cameraContent.innerHTML = '<div class="empty-state">No devices found</div>';
    return;
  }
  
  let deviceListHTML = '';
  
  devices.forEach(device => {
    const deviceName = device.name || `${device.ip || device.deviceIp} (${device.code || device.deviceCode})`;
    const deviceIp = device.ip || device.deviceIp || '';
    const isOnline = device.deviceStatus === 1;
    
    deviceListHTML += `
      <div class="camera-item">
        <div class="camera-item-header">
          <div class="camera-name">${deviceName}</div>
        </div>
        <div class="camera-item-body">
          <div class="camera-ip">${deviceIp}</div>
          <div class="camera-status ${isOnline ? 'status-online' : 'status-offline'}">${isOnline ? 'Online' : 'Offline'}</div>
        </div>
      </div>
    `;
  });
  
  cameraContent.innerHTML = deviceListHTML;
  
  const deviceCountEl = document.getElementById("camera-device-count");
  if (deviceCountEl) {
    deviceCountEl.textContent = devices.length;
  }
}

function ensureCameraStyles() {
  if (!document.getElementById('camera-item-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'camera-item-styles';
    styleElement.textContent = `
      .camera-item {
        position: relative;
        padding: 15px;
        border-radius: 8px;
        background: #1e2330;
        margin-bottom: 10px;
        border: 1px solid #2c3244;
        color: white;
      }
      
      .camera-item-header {
        margin-bottom: 8px;
      }
      
      .camera-name {
        font-weight: 500;
        font-size: 15px;
      }
      
      .camera-item-body {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .camera-ip {
        color: #8b92a5;
        font-size: 14px;
      }
      
      .camera-status {
        font-size: 0.8rem;
        padding: 3px 10px;
        border-radius: 30px;
        font-weight: 500;
        text-align: center;
        min-width: 65px;
      }
      
      .status-online {
        background-color: #00bb41;
        color: #ffffff;
      }
      
      .status-offline {
        background-color: #fee2e2;
        color: #991b1b;
      }
    `;
    document.head.appendChild(styleElement);
  }
}

function hideAllSections() {
  const sections = ["maintenance-log-section", "inspection-section", "camera-section", "network-info-section"];
  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      section.style.display = "none";
    }
  });
}

function initializeCardCloseButtons() {
  const sideWrapper = document.querySelector('.side-wrapper');
  if (sideWrapper) {
    const cards = sideWrapper.querySelectorAll('.card');
    
    cards.forEach(card => {
      if (!card.querySelector('.card-close-btn')) {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'card-close-btn';
        closeBtn.innerHTML = '×';
        closeBtn.setAttribute('title', 'Close cards');
        
        closeBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          sideWrapper.classList.remove('active');
          
          // Clean up integrated live feed when closing
          const videoElement = document.getElementById('live-feed-video-player');
          if (videoElement) {
            videoElement.pause();
            if (window.integratedHlsPlayer) {
              try {
                window.integratedHlsPlayer.destroy();
                window.integratedHlsPlayer = null;
              } catch (error) {
                console.warn("Error destroying integrated HLS player:", error);
              }
            }
            videoElement.src = '';
          }
        });
        
        card.appendChild(closeBtn);
      }
    });
  }
}

function searchForSiteByName(siteName) {
  if (!window.mapMarkers) {
    console.error('Cebu city markers not loaded');
    return null;
  }
  
  let foundSite = null;
  let foundCategory = null;
  
  window.mapMarkers.forEach(category => {
    const site = category.sites.find(s => 
      s.name.toLowerCase().includes(siteName.toLowerCase()) ||
      s.description.toLowerCase().includes(siteName.toLowerCase())
    );
    if (site) {
      foundSite = site;
      foundCategory = category;
    }
  });
  
  return { site: foundSite, category: foundCategory };
}

function zoomToSiteByName(siteName) {
  const { site, category } = searchForSiteByName(siteName);
  
  if (site && category && window.map) {
    
    const location = site.location;

    window.map.flyTo({
      center: [location[1], location[0]], // MapLibre uses [lng, lat]
      zoom: 16,
      essential: true,
      duration: 2000
    });
    
    setTimeout(() => {
      if (window.showInfoDrawer) {
        window.showInfoDrawer(site, category);
      }
      
      const sideWrapper = document.querySelector(".side-wrapper");
      if (sideWrapper) {
        sideWrapper.classList.add("active");
      }
    }, 1000);
    
    return true;
  }
  
  return false;
}

function executeSearchAction(searchTerm) {
  const searchMappings = {
    'hospital': ['hospital', 'medical', 'health'],
    'government': ['government', 'city hall', 'office'],
    'school': ['school', 'university', 'education'],
    'transport': ['transport', 'jeepney', 'bus', 'route'],
    'wifi': ['wifi', 'internet', 'connectivity'],
    'park': ['park', 'plaza', 'recreation']
  };
  
  let categoryFound = false;
  
  Object.entries(searchMappings).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
      if (searchTerm.toLowerCase().includes(keyword)) {
        if (category === 'hospital') {
          activateMarkerCategory('hospitals');
        } else if (category === 'government') {
          activateMarkerCategory('govt');
        } else if (category === 'school') {
          activateMarkerCategory('schools');
        } else if (category === 'transport') {
          activateMarkerCategory('public-transport');
        } else if (category === 'wifi') {
          activateMarkerCategory('wifi-hotspots');
        } else if (category === 'park') {
          activateMarkerCategory('parks');
        }
        categoryFound = true;
      }
    });
  });
  
  if (!categoryFound) {
    const result = zoomToSiteByName(searchTerm);
    if (!result) {
      console.log('No specific site found, showing general search results');
    }
  }
}

function activateMarkerCategory(categoryKey) {
  if (window.filterMarkers && window.filterMarkers.updateMarkersForCheckbox) {
    window.filterMarkers.updateMarkersForCheckbox(categoryKey, true);
    
    const checkbox = document.getElementById(categoryKey);
    if (checkbox) {
      checkbox.checked = true;
    }
    
    if (window.filterMarkers.updateMasterCheckboxes) {
      window.filterMarkers.updateMasterCheckboxes();
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  
  initializeCardCloseButtons();
  
  // Export functions for global access
  window.getStreamUrl = getStreamUrl;
  window.storeStreamUrl = storeStreamUrl;
  window.getStoredStreamUrl = getStoredStreamUrl;
  window.isStreamUrlValid = isStreamUrlValid;
  window.startCameraStream = startCameraStream;
  window.initializeHlsPlayer = initializeHlsPlayer;
  
  window.searchForSiteByName = searchForSiteByName;
  window.zoomToSiteByName = zoomToSiteByName;
  window.executeSearchAction = executeSearchAction;
  window.activateMarkerCategory = activateMarkerCategory;
  
});