const categoryTemplates = {
  Infrastructure: (site) => {
    const details = site.technicalDetails || {};
    return `
        <h4>Infrastructure Details</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Construction Date:</span>
            <span class="detail-item-value">${
              details.installationDate || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Maintenance:</span>
            <span class="detail-item-value">${
              details.lastMaintenance || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Coverage Area:</span>
            <span class="detail-item-value">${
              details.coverageArea || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Capacity:</span>
            <span class="detail-item-value">${details.capacity || "N/A"}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Condition Rating:</span>
            <span class="detail-item-value">${
              details.conditionRating || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Responsible Agency:</span>
            <span class="detail-item-value">${
              details.serviceProvider || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Operating Hours:</span>
            <span class="detail-item-value">${
              details.operatingHours || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Inspection:</span>
            <span class="detail-item-value">${
              details.lastInspection || "N/A"
            }</span>
          </div>
        </div>
      `;
  },

  "Public Buildings": (site) => {
    const details = site.technicalDetails || {};
    return `
        <h4>Building Details</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Year Built:</span>
            <span class="detail-item-value">${
              details.installationDate || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Square Footage:</span>
            <span class="detail-item-value">${
              details.squareFootage || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Operating Hours:</span>
            <span class="detail-item-value">${
              details.operatingHours || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Capacity:</span>
            <span class="detail-item-value">${details.capacity || "N/A"}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Renovation:</span>
            <span class="detail-item-value">${
              details.lastMaintenance || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Accessibility Features:</span>
            <span class="detail-item-value">${
              details.accessibilityFeatures || "Available"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Maintaining Authority:</span>
            <span class="detail-item-value">${
              details.serviceProvider || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Inspection:</span>
            <span class="detail-item-value">${
              details.lastInspection || "N/A"
            }</span>
          </div>
        </div>
      `;
  },

  "Natural Features": (site) => {
    const details = site.technicalDetails || {};
    return `
        <h4>Natural Feature Details</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Area Size:</span>
            <span class="detail-item-value">${
              details.coverageArea || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Protected Status:</span>
            <span class="detail-item-value">${
              details.protectedStatus || "Protected"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Conservation Efforts:</span>
            <span class="detail-item-value">${
              details.conservationEfforts || "Ongoing monitoring"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Assessment:</span>
            <span class="detail-item-value">${
              details.lastMaintenance || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Biodiversity Rating:</span>
            <span class="detail-item-value">${
              details.biodiversityRating || "High"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Responsible Agency:</span>
            <span class="detail-item-value">${
              details.serviceProvider ||
              "Cebu Environment and Natural Resources Office"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Inspection:</span>
            <span class="detail-item-value">${
              details.lastInspection || "N/A"
            }</span>
          </div>
        </div>
      `;
  },

  "Environmental Risks": (site) => {
    const details = site.technicalDetails || {};
    return `
        <h4>Risk Assessment</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Risk Level:</span>
            <span class="detail-item-value">${
              site.status === "critical"
                ? "High"
                : site.status === "warning"
                ? "Moderate"
                : "Low"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Assessment Date:</span>
            <span class="detail-item-value">${
              details.lastMaintenance || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Affected Area:</span>
            <span class="detail-item-value">${
              details.coverageArea || site.subcategory
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Mitigation Measures:</span>
            <span class="detail-item-value">${
              details.mitigationMeasures ||
              "Early warning systems, infrastructure reinforcement"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Historical Incidents:</span>
            <span class="detail-item-value">${
              details.historicalIncidents || "Multiple minor incidents recorded"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Monitoring Agency:</span>
            <span class="detail-item-value">${
              details.serviceProvider ||
              "Cebu City Risk Reduction and Management Office"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Inspection:</span>
            <span class="detail-item-value">${
              details.lastInspection || "N/A"
            }</span>
          </div>
        </div>
      `;
  },

  "Points of Interest": (site) => {
    const details = site.technicalDetails || {};
    return `
        <h4>Point of Interest Details</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Established:</span>
            <span class="detail-item-value">${
              details.installationDate || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Operating Hours:</span>
            <span class="detail-item-value">${
              details.operatingHours || "8:00 AM - 6:00 PM"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Visitor Capacity:</span>
            <span class="detail-item-value">${
              details.capacity || "Varies by season"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Services Offered:</span>
            <span class="detail-item-value">${
              details.servicesOffered || "Information, amenities, guided tours"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Contact Information:</span>
            <span class="detail-item-value">${
              details.contactInformation || "+63 32 XXX XXXX"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Management:</span>
            <span class="detail-item-value">${
              details.serviceProvider || "Cebu City Tourism Office"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Renovation:</span>
            <span class="detail-item-value">${
              details.lastMaintenance || "N/A"
            }</span>
          </div>
        </div>
      `;
  },

  "Population Data": (site) => {
    const details = site.technicalDetails || {};
    return `
        <h4>Population Statistics</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Census Date:</span>
            <span class="detail-item-value">${
              details.censusDate || "2024"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Total Population:</span>
            <span class="detail-item-value">${
              details.totalPopulation || "See demographic data"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Density (per km²):</span>
            <span class="detail-item-value">${
              details.densityPerKm || "Varies by district"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Age Distribution:</span>
            <span class="detail-item-value">${
              details.ageDistribution || "0-14: 28%, 15-64: 67%, 65+: 5%"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Growth Rate:</span>
            <span class="detail-item-value">${
              details.growthRate || "1.8% annually"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Data Source:</span>
            <span class="detail-item-value">${
              details.serviceProvider || "Philippine Statistics Authority"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Updated:</span>
            <span class="detail-item-value">${
              details.lastMaintenance || "N/A"
            }</span>
          </div>
        </div>
      `;
  },

  "Internet Access": (site) => {
    const details = site.technicalDetails || {};
    return `
        <h4>Internet Access Details</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Installation Date:</span>
            <span class="detail-item-value">${
              details.installationDate || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Provider:</span>
            <span class="detail-item-value">${
              details.serviceProvider ||
              "Department of Information and Communications Technology"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Connection Type:</span>
            <span class="detail-item-value">${
              details.connectionType || "Fiber Optic"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Average Speed:</span>
            <span class="detail-item-value">${
              details.averageSpeed || "100 Mbps"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Coverage Radius:</span>
            <span class="detail-item-value">${
              details.coverageArea || "100-500 meters"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Maintenance:</span>
            <span class="detail-item-value">${
              details.lastMaintenance || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Operating Hours:</span>
            <span class="detail-item-value">${
              details.operatingHours || "24/7"
            }</span>
          </div>
        </div>
      `;
  },

  "Traffic Data": (site) => {
    const details = site.technicalDetails || {};
    return `
        <h4>Traffic Information</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Monitoring Since:</span>
            <span class="detail-item-value">${
              details.installationDate || "2023"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Peak Hours:</span>
            <span class="detail-item-value">${
              details.peakHours || "Weekdays 7-9 AM, 5-7 PM"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Average Daily Volume:</span>
            <span class="detail-item-value">${
              details.averageVolume || "15,000-30,000 vehicles"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Congestion Level:</span>
            <span class="detail-item-value">${
              site.status === "critical"
                ? "High"
                : site.status === "warning"
                ? "Moderate"
                : "Low"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Updated:</span>
            <span class="detail-item-value">${
              details.lastMaintenance || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Monitoring Agency:</span>
            <span class="detail-item-value">${
              details.serviceProvider || "Cebu City Traffic Management"
            }</span>
          </div>
        </div>
      `;
  },

  "National Broadband Project": (site) => {
    const details = site.technicalDetails || {};
    return `
        <h4>NBP Infrastructure Details</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Deployment Date:</span>
            <span class="detail-item-value">${
              details.installationDate || "2023-2025"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Network Type:</span>
            <span class="detail-item-value">${site.subcategory || "N/A"}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Bandwidth Capacity:</span>
            <span class="detail-item-value">${
              details.capacity || "10 Gbps"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Coverage Area:</span>
            <span class="detail-item-value">${
              details.coverageArea || "Varies by facility type"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Operating Status:</span>
            <span class="detail-item-value">${site.status || "Active"}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Service Provider:</span>
            <span class="detail-item-value">${
              details.serviceProvider || "DICT - National Broadband Program"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Maintenance:</span>
            <span class="detail-item-value">${
              details.lastMaintenance || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Inspection:</span>
            <span class="detail-item-value">${
              details.lastInspection || "N/A"
            }</span>
          </div>
        </div>
      `;
  },

  default: (site) => {
    const details = site.technicalDetails || {};
    return `
        <h4>Technical Details</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item-label">Installation Date:</span>
            <span class="detail-item-value">${
              details.installationDate || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Maintenance:</span>
            <span class="detail-item-value">${
              details.lastMaintenance || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Coverage Area:</span>
            <span class="detail-item-value">${
              details.coverageArea || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Operating Hours:</span>
            <span class="detail-item-value">${
              details.operatingHours || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Service Provider:</span>
            <span class="detail-item-value">${
              details.serviceProvider || "N/A"
            }</span>
          </div>
          <div class="detail-item">
            <span class="detail-item-label">Last Inspection:</span>
            <span class="detail-item-value">${
              details.lastInspection || "N/A"
            }</span>
          </div>
        </div>
      `;
  },
};

function loadTechnicalDetails(site, category) {
  const technicalDetails = getTechnicalDetails(site.id);
  const content = document.getElementById("technical-details-content");

  const categoryTemplate =
    categoryTemplates[category.category] || categoryTemplates["default"];
  const categorySpecificDetails = categoryTemplate({
    ...site,
    technicalDetails: technicalDetails,
  });

  content.innerHTML = categorySpecificDetails;
}

function generateCategorySpecificNetworkInfo(category, site) {
  switch (category) {
    case "Infrastructure":
      return `
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Monitoring Status:</span>
              <span class="detail-item-value">Active</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Data Collection:</span>
              <span class="detail-item-value">Real-time</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Sensor Network:</span>
              <span class="detail-item-value">8 sensors active</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Connectivity:</span>
              <span class="detail-item-value">4G/LTE + Fiber backup</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Power Status:</span>
              <span class="detail-item-value">Grid + Solar backup</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Last Communication:</span>
              <span class="detail-item-value">2 minutes ago</span>
            </div>
          </div>
          
        `;
    case "Public Buildings":
      return `
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Building Management System:</span>
              <span class="detail-item-value">Online</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Occupancy Sensors:</span>
              <span class="detail-item-value">15 active</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">HVAC Control:</span>
              <span class="detail-item-value">Automated</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Energy Monitoring:</span>
              <span class="detail-item-value">Real-time</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Security Integration:</span>
              <span class="detail-item-value">Connected</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Current Occupancy:</span>
              <span class="detail-item-value">68% (820/1200)</span>
            </div>
          </div>
          
        `;
    case "Natural Features":
      return `
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Weather Station:</span>
              <span class="detail-item-value">Active</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Water Quality Sensors:</span>
              <span class="detail-item-value">3 monitoring points</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Air Quality Index:</span>
              <span class="detail-item-value">Good (42 AQI)</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Soil Moisture:</span>
              <span class="detail-item-value">Optimal (65%)</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Temperature:</span>
              <span class="detail-item-value">28°C</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Humidity:</span>
              <span class="detail-item-value">72%</span>
            </div>
          </div>
          
        `;
    case "Environmental Risks":
      return `
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Alert System Status:</span>
              <span class="detail-item-value">Active</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Monitoring Sensors:</span>
              <span class="detail-item-value">12 operational</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Current Risk Level:</span>
              <span class="detail-item-value">${
                site.status === "critical"
                  ? "High"
                  : site.status === "warning"
                  ? "Medium"
                  : "Low"
              }</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Last Alert:</span>
              <span class="detail-item-value">None (30 days)</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Communication Range:</span>
              <span class="detail-item-value">5 km radius</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Response Time:</span>
              <span class="detail-item-value">< 5 minutes</span>
            </div>
          </div>
         
        `;
    case "Points of Interest":
      return `
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Visitor Counter:</span>
              <span class="detail-item-value">Digital tracking active</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Current Visitors:</span>
              <span class="detail-item-value">142 people</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">WiFi Status:</span>
              <span class="detail-item-value">Available (50 Mbps)</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Audio Guide System:</span>
              <span class="detail-item-value">12 languages available</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Security Cameras:</span>
              <span class="detail-item-value">8 cameras active</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Emergency Stations:</span>
              <span class="detail-item-value">4 locations</span>
            </div>
          </div>
          
        
        `;
    case "Population Data":
      return `
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Data Collection Status:</span>
              <span class="detail-item-value">Active</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Survey Completion:</span>
              <span class="detail-item-value">74% response rate</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Data Quality:</span>
              <span class="detail-item-value">High (95% accuracy)</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Update Frequency:</span>
              <span class="detail-item-value">Monthly</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Source Integration:</span>
              <span class="detail-item-value">PSA + Local Records</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Privacy Compliance:</span>
              <span class="detail-item-value">DPA Compliant</span>
            </div>
          </div>
          
        `;
    case "Traffic Data":
      return `
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Traffic Sensors:</span>
              <span class="detail-item-value">6 active sensors</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Current Volume:</span>
              <span class="detail-item-value">1,847 vehicles/hour</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Average Speed:</span>
              <span class="detail-item-value">45 km/h</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Congestion Level:</span>
              <span class="detail-item-value">${
                site.status === "critical"
                  ? "High"
                  : site.status === "warning"
                  ? "Medium"
                  : "Low"
              }</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Data Accuracy:</span>
              <span class="detail-item-value">99.8%</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Real-time Updates:</span>
              <span class="detail-item-value">Every 30 seconds</span>
            </div>
          </div>
          
        `;
    default:
      return `
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">System Status:</span>
              <span class="detail-item-value">Operational</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Connectivity:</span>
              <span class="detail-item-value">Online</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Data Quality:</span>
              <span class="detail-item-value">High</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Last Update:</span>
              <span class="detail-item-value">5 minutes ago</span>
            </div>
          </div>
        `;
  }
}
