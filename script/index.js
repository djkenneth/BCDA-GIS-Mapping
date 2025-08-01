// script/index.js

const DEMO_CAMERA_CODE = "1000013";
const STREAM_STORAGE_KEY = "stream_" + DEMO_CAMERA_CODE;
const EXCLUDED_DEVICE_CODES = ["1000012", "1000014", "1000006"];
const API_BASE_URL = "https://philtower.itbsstudio.com";

async function fetchDevices() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/devices`);

    if (!response.ok) {
      throw new Error(`Error fetching devices: ${response.statusText}`);
    }

    const data = await response.json();

    let allDevices = [];

    if (
      data &&
      data.code === 1000 &&
      data.data &&
      Array.isArray(data.data.pageData)
    ) {
      allDevices = data.data.pageData.map((device) => ({
        code: device.deviceCode,
        name: device.deviceName + " (" + device.deviceCode + ")",
        deviceStatus: device.status === "1" ? 1 : 0,
        ip: device.deviceIp,
        model: device.deviceModel,
        manufacturer: device.manufacturerName,
        channelId: `${device.deviceCode}$1$0$0`,
      }));
    } else if (data && data.data && Array.isArray(data.data.list)) {
      allDevices = data.data.list;
    }

    return allDevices.filter((device) => {
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

  let deviceListHTML = "";

  devices.forEach((device) => {
    const deviceName =
      device.name ||
      `${device.ip || device.deviceIp} (${device.code || device.deviceCode})`;
    const deviceIp = device.ip || device.deviceIp || "";
    const isOnline = device.deviceStatus === 1;

    deviceListHTML += `
      <div class="camera-item">
        <div class="camera-item-header">
          <div class="camera-name">${deviceName}</div>
        </div>
        <div class="camera-item-body">
          <div class="camera-ip">${deviceIp}</div>
          <div class="camera-status ${
            isOnline ? "status-online" : "status-offline"
          }">${isOnline ? "Online" : "Offline"}</div>
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
  if (!document.getElementById("camera-item-styles")) {
    const styleElement = document.createElement("style");
    styleElement.id = "camera-item-styles";
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
  const sections = [
    "maintenance-log-section",
    "inspection-section",
    "camera-section",
    "network-info-section",
  ];
  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      section.style.display = "none";
    }
  });
}

function initializeCardCloseButtons() {
  const sideWrapper = document.querySelector(".side-wrapper");
  if (sideWrapper) {
    const cards = sideWrapper.querySelectorAll(".card");

    cards.forEach((card) => {
      if (!card.querySelector(".card-close-btn")) {
        const closeBtn = document.createElement("button");
        closeBtn.className = "card-close-btn";
        closeBtn.innerHTML = "×";
        closeBtn.setAttribute("title", "Close cards");

        closeBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          sideWrapper.classList.remove("active");

          // Clean up integrated live feed when closing
          const videoElement = document.getElementById(
            "live-feed-video-player"
          );
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
            videoElement.src = "";
          }
        });

        card.appendChild(closeBtn);
      }
    });
  }
}

function searchForSiteByName(siteName) {
  if (!mapMarkers) {
    console.error("Cebu city markers not loaded");
    return null;
  }

  let foundSite = null;
  let foundCategory = null;

  mapMarkers.forEach((category) => {
    const site = category.sites.find(
      (s) =>
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
      duration: 2000,
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

document.addEventListener("DOMContentLoaded", function () {
  initializeCardCloseButtons();
});
