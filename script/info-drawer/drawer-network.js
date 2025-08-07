function loadNetworkInfo(site, category) {
  const content = document.getElementById("network-info-content");
  let headerText = getNetworkLabel(category.category);
  let contentHTML = `<h4>${headerText}</h4>`;

  if (
    category.category === "Internet Access" ||
    category.category === "Free Public Internet" ||
    category.category === "National Broadband Project"
  ) {
    const networkInfo = getNetworkInfo(site.id);

    contentHTML += `
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Status:</span>
            <span class="detail-item-value">${networkInfo.status}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Uptime:</span>
            <span class="detail-item-value">${networkInfo.uptime}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Bandwidth:</span>
            <span class="detail-item-value">${networkInfo.bandwidth}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Latency:</span>
            <span class="detail-item-value">${networkInfo.latency}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Signal Strength:</span>
            <span class="detail-item-value">${networkInfo.signalStrength}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Connected Devices:</span>
            <span class="detail-item-value">${networkInfo.connectedDevices}</span>
          </div>
        </div>
        <div class="detail-item" style="margin-top: 15px;">
          <span class="detail-item-label">Last Update:</span>
          <span class="detail-item-value">${networkInfo.lastUpdate}</span>
        </div>
      `;
  } else {
    contentHTML += generateCategorySpecificNetworkInfo(category.category, site);
  }

  content.innerHTML = contentHTML;
}

function addNetworkInfoListener(site, category) {
  const networkInfoBtn = document.getElementById("network-info-btn");
  if (networkInfoBtn) {
    networkInfoBtn.addEventListener("click", function () {
      hideAllSections();

      const networkInfoSection = document.getElementById(
        "network-info-section"
      );
      const networkInfoContent = document.getElementById(
        "network-info-content"
      );

      if (!networkInfoSection || !networkInfoContent) {
        console.error("Network info section or content not found");
        return;
      }

      networkInfoSection.style.display = "block";

      let headerText = getSecondButtonLabel(category.category);
      networkInfoSection.querySelector("h3").textContent = headerText;

      let contentHTML = "";

      if (
        category.category === "Internet Access" ||
        category.category === "Free Public Internet"
      ) {
        const networkInfo = getNetworkInfo(site.id);

        contentHTML = `
            <div class="detail-grid">
              <div class="detail-item">
                <span class="detail-item-label">Status:</span>
                <span class="detail-item-value">${networkInfo.status}</span>
              </div>
              <div class="detail-item">
                <span class="detail-item-label">Uptime:</span>
                <span class="detail-item-value">${networkInfo.uptime}</span>
              </div>
              <div class="detail-item">
                <span class="detail-item-label">Bandwidth:</span>
                <span class="detail-item-value">${networkInfo.bandwidth}</span>
              </div>
              <div class="detail-item">
                <span class="detail-item-label">Latency:</span>
                <span class="detail-item-value">${networkInfo.latency}</span>
              </div>
              <div class="detail-item">
                <span class="detail-item-label">Signal Strength:</span>
                <span class="detail-item-value">${networkInfo.signalStrength}</span>
              </div>
              <div class="detail-item">
                <span class="detail-item-label">Connected Devices:</span>
                <span class="detail-item-value">${networkInfo.connectedDevices}</span>
              </div>
            </div>
            <div class="detail-item" style="margin-top: 15px;">
              <span class="detail-item-label">Last Update:</span>
              <span class="detail-item-value">${networkInfo.lastUpdate}</span>
            </div>
          `;
      } else {
        contentHTML = generateDataManagementContent(category.category, site);
      }

      networkInfoContent.innerHTML = contentHTML;
    });
  }
}

function getNetworkInfo(siteId) {
  return (
    siteNetworkInfo?.[siteId] ||
    siteNetworkInfo?.["default"] || {
      status: "Active",
      uptime: "99.8%",
      bandwidth: "450 Mbps",
      latency: "18ms",
      signalStrength: "-65 dBm",
      connectedDevices: 8,
      lastUpdate: "2025-05-26 14:25:36",
    }
  );
}

function generateDataManagementContent(category, site) {
  let content = "";

  switch (category) {
    case "Infrastructure":
      content = `
          <h4>Infrastructure Status</h4>
          <div class="detail-grid" style="margin-bottom: 15px;">
            <div class="detail-item">
              <span class="detail-item-label">Current Status:</span>
              <span class="detail-item-value">${
                site.status.charAt(0).toUpperCase() + site.status.slice(1)
              }</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Engineering Standard:</span>
              <span class="detail-item-value">ISO 12944-5:2018</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Material Composition:</span>
              <span class="detail-item-value">Reinforced Concrete</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Design Capacity:</span>
              <span class="detail-item-value">250,000 users daily</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Expected Lifespan:</span>
              <span class="detail-item-value">45 years</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Current Age:</span>
              <span class="detail-item-value">7 years</span>
            </div>
          </div>
          
          <h4>Utility Connections</h4>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Power Supply: Connected</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Water Supply: Connected</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Data Network: Connected</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Emergency Systems: Operational</span>
          </div>
        `;
      break;

    case "Public Buildings":
      content = `
          <h4>Building Directory</h4>
          <div class="detail-grid" style="margin-bottom: 15px;">
            <div class="detail-item">
              <span class="detail-item-label">Type:</span>
              <span class="detail-item-value">${site.subcategory}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Total Floors:</span>
              <span class="detail-item-value">5</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Total Area:</span>
              <span class="detail-item-value">10,540 sq. meters</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Occupancy Capacity:</span>
              <span class="detail-item-value">1,200 persons</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Operating Hours:</span>
              <span class="detail-item-value">Monday-Friday, 8:00 AM - 5:00 PM</span>
            </div>
          </div>
          
          <h4>Facility Status</h4>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Main Power: Operational</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Backup Generator: Operational</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Fire Safety Systems: Operational</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Elevator Systems: Operational</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>HVAC Systems: Operational</span>
          </div>
        `;
      break;

    case "Natural Features":
      content = `
          <h4>Environmental Data</h4>
          <div class="detail-grid" style="margin-bottom: 15px;">
            <div class="detail-item">
              <span class="detail-item-label">Type:</span>
              <span class="detail-item-value">${site.subcategory}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Total Area:</span>
              <span class="detail-item-value">24.5 hectares</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Elevation:</span>
              <span class="detail-item-value">120-350 meters</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Climate Zone:</span>
              <span class="detail-item-value">Tropical</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Ecosystem Type:</span>
              <span class="detail-item-value">Riparian Forest</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Native Species:</span>
              <span class="detail-item-value">78 cataloged</span>
            </div>
          </div>
          
          <h4>Biodiversity Indicators</h4>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Flora Diversity Index:</span>
              <span class="detail-item-value">High (7.8/10)</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Fauna Diversity Index:</span>
              <span class="detail-item-value">Medium (6.4/10)</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Invasive Species Presence:</span>
              <span class="detail-item-value">Low (2.1/10)</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Conservation Status:</span>
              <span class="detail-item-value">Protected</span>
            </div>
          </div>
        `;
      break;

    case "Environmental Risks":
      content = `
          <h4>Risk Assessment</h4>
          <div class="detail-grid" style="margin-bottom: 15px;">
            <div class="detail-item">
              <span class="detail-item-label">Risk Type:</span>
              <span class="detail-item-value">${site.subcategory}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Risk Level:</span>
              <span class="detail-item-value">${
                site.status === "critical"
                  ? "High"
                  : site.status === "warning"
                  ? "Medium"
                  : "Low"
              }</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Affected Area:</span>
              <span class="detail-item-value">3.7 sq. kilometers</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Population Exposure:</span>
              <span class="detail-item-value">~15,000 people</span>
            </div>
          </div>
          
          <h4>Hazard Monitoring Systems</h4>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Early Warning System: Active</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Real-time Sensors: Online (12/12)</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Community Alert System: Operational</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Data Integration: Connected to NDRRMC</span>
          </div>
        `;
      break;

    case "Points of Interest":
      content = `
          <h4>Location Details</h4>
          <div class="detail-grid" style="margin-bottom: 15px;">
            <div class="detail-item">
              <span class="detail-item-label">Type:</span>
              <span class="detail-item-value">${site.subcategory}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Establishment Date:</span>
              <span class="detail-item-value">2015</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Total Area:</span>
              <span class="detail-item-value">4.2 hectares</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Ownership:</span>
              <span class="detail-item-value">${
                site.subcategory.includes("Community") ? "Public" : "Private"
              }</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Operating Hours:</span>
              <span class="detail-item-value">9:00 AM - 8:00 PM</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Peak Visitor Time:</span>
              <span class="detail-item-value">2:00 PM - 5:00 PM</span>
            </div>
          </div>
          
          <h4>Visitor Information</h4>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Daily Average Visitors:</span>
              <span class="detail-item-value">2,500</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Monthly Visitor Trend:</span>
              <span class="detail-item-value">Increasing</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Visitor Satisfaction:</span>
              <span class="detail-item-value">4.7/5.0</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Special Events:</span>
              <span class="detail-item-value">2 upcoming in May 2025</span>
            </div>
          </div>
        `;
      break;

    case "Population Data":
      content = `
          <h4>Demographic Profile</h4>
          <div class="detail-grid" style="margin-bottom: 15px;">
            <div class="detail-item">
              <span class="detail-item-label">Area Type:</span>
              <span class="detail-item-value">${site.subcategory}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Total Population:</span>
              <span class="detail-item-value">68,750</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Population Density:</span>
              <span class="detail-item-value">12,500/km²</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Growth Rate:</span>
              <span class="detail-item-value">1.8% annually</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Median Age:</span>
              <span class="detail-item-value">28.5 years</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Household Size:</span>
              <span class="detail-item-value">4.2 persons</span>
            </div>
          </div>
          
          <h4>Community Statistics</h4>
          <div style="margin-bottom: 10px;">
            <p style="margin-bottom: 5px; font-weight: 500;">Age Distribution:</p>
            <div style="display: flex; height: 20px; border-radius: 4px; overflow: hidden; margin-bottom: 5px;">
              <div style="width: 28%; background-color: #90CAF9; height: 100%;" title="0-19 years: 28%"></div>
              <div style="width: 38%; background-color: #42A5F5; height: 100%;" title="20-39 years: 38%"></div>
              <div style="width: 22%; background-color: #1E88E5; height: 100%;" title="40-59 years: 22%"></div>
              <div style="width: 12%; background-color: #0D47A1; height: 100%;" title="60+ years: 12%"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px;">
              <span>0-19: 28%</span>
              <span>20-39: 38%</span>
              <span>40-59: 22%</span>
              <span>60+: 12%</span>
            </div>
          </div>
          
          <div style="margin-bottom: 10px;">
            <p style="margin-bottom: 5px; font-weight: 500;">Education Levels:</p>
            <div style="display: flex; height: 20px; border-radius: 4px; overflow: hidden; margin-bottom: 5px;">
              <div style="width: 18%; background-color: #FFCC80; height: 100%;" title="Primary: 18%"></div>
              <div style="width: 42%; background-color: #FFB74D; height: 100%;" title="Secondary: 42%"></div>
              <div style="width: 32%; background-color: #FF9800; height: 100%;" title="Tertiary: 32%"></div>
              <div style="width: 8%; background-color: #E65100; height: 100%;" title="Post-graduate: 8%"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px;">
              <span>Primary: 18%</span>
              <span>Secondary: 42%</span>
              <span>Tertiary: 32%</span>
              <span>Post-grad: 8%</span>
            </div>
          </div>
        `;
      break;

    case "National Broadband Project":
      content = `
          <h4>Network Connectivity</h4>
          <div class="detail-grid" style="margin-bottom: 15px;">
            <div class="detail-item">
              <span class="detail-item-label">Node Type:</span>
              <span class="detail-item-value">${site.subcategory}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Installation Date:</span>
              <span class="detail-item-value">June 15, 2023</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Coverage Radius:</span>
              <span class="detail-item-value">3.2 kilometers</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Capacity:</span>
              <span class="detail-item-value">10 Gbps</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Connection Type:</span>
              <span class="detail-item-value">Fiber Optic</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Power Supply:</span>
              <span class="detail-item-value">Main grid + Solar backup</span>
            </div>
          </div>
          
          <h4>Network Connectivity</h4>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Backbone Connection: Connected</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Last Mile Distribution: Operational</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Local Government Network: Integrated</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Educational Institutions: 8 connected</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Public Access Points: 24 active</span>
          </div>
        `;
      break;

    default:
      content = `
          <h4>Data Management</h4>
          <div class="detail-grid" style="margin-bottom: 15px;">
            <div class="detail-item">
              <span class="detail-item-label">Type:</span>
              <span class="detail-item-value">${site.subcategory}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Status:</span>
              <span class="detail-item-value">${
                site.status.charAt(0).toUpperCase() + site.status.slice(1)
              }</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Last Updated:</span>
              <span class="detail-item-value">May 7, 2025</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Data Quality:</span>
              <span class="detail-item-value">High</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Database Size:</span>
              <span class="detail-item-value">14.8 GB</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Records:</span>
              <span class="detail-item-value">26,542</span>
            </div>
          </div>
          
          <h4>System Status</h4>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Primary Database: Online</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Backup System: Synchronized</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>API Services: Operational</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot operational"></span>
            <span>Analytics Dashboard: Available</span>
          </div>
        `;
  }

  return content;
}

function getSecondButtonLabel(category) {
  switch (category) {
    case "Internet Access":
    case "Free Public Internet":
      return "Network Info";
    case "Infrastructure":
      return "Infrastructure Status";
    case "Public Buildings":
      return "Building Directory";
    case "Natural Features":
      return "Environmental Data";
    case "Environmental Risks":
      return "Risk Assessment";
    case "Points of Interest":
      return "Location Details";
    case "Population Data":
      return "Demographic Profile";
    case "National Broadband Project":
      return "Network Connectivity";
    default:
      return "Data Management";
  }
}
