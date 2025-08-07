const scheduleInspectionBtn = document.getElementById(
  "schedule-inspection-btn"
);

if (scheduleInspectionBtn) {
  scheduleInspectionBtn.addEventListener("click", function () {
    hideAllSections();
    const inspectionSection = document.getElementById("inspection-section");
    if (inspectionSection) {
      inspectionSection.style.display = "block";
    }
  });
}

const scheduleBtn = document.getElementById("schedule-btn");
if (scheduleBtn) {
  scheduleBtn.addEventListener("click", function () {
    alert("Inspection scheduled successfully!");
    const inspectionSection = document.getElementById("inspection-section");
    if (inspectionSection) {
      inspectionSection.style.display = "none";
    }
  });
}

const cancelInspectionBtn = document.getElementById("cancel-inspection-btn");
if (cancelInspectionBtn) {
  cancelInspectionBtn.addEventListener("click", function () {
    const form = document.getElementById("inspection-form");
    if (form) {
      form.reset();
    }
    const inspectionSection = document.getElementById("inspection-section");
    if (inspectionSection) {
      inspectionSection.style.display = "none";
    }
  });
}

const viewMoreBtn = document.getElementById("view-more");
if (viewMoreBtn) {
  viewMoreBtn.addEventListener("click", function () {
    drawer.classList.toggle("expanded");

    if (drawer.classList.contains("expanded")) {
      showExpandedView(site, category, drawer);
    }
  });
}

function showExpandedView(site, category, drawer) {
  const technicalDetails = getTechnicalDetails(site.id);
  const categoryTemplate =
    categoryTemplates[category.category] || categoryTemplates["default"];
  const categorySpecificDetails = categoryTemplate({
    ...site,
    technicalDetails: technicalDetails,
  });
  const categoryLabel = getCategoryLabel(category.category, site.subcategory);

  document.getElementById("drawer-content").innerHTML = `
      <!-- Live Feed Card Integration -->
      <div class="live-feed-card-integrated" id="live-feed-card-integrated" style="display: block;">
        <div class="live-feed-header">
          <div class="alert-indicator">
            <span class="alert-dot"></span>
            <span>Live Feed - ${site.name}</span>
          </div>
        </div>
        
        <div class="live-feed-video">
          <video id="live-feed-video-player" autoplay muted playsinline></video>
          <div id="live-feed-loader" class="live-feed-loader">
            <div class="loader-spinner"></div>
            <div>Loading stream...</div>
          </div>
        </div>
        
        <div class="live-feed-info">
          <div class="info-row">
            <span>Device Channel</span>
            <span class="personnel-count">${site.id || "1000013"}</span>
          </div>
          <button id="live-feed-view-btn" class="view-btn" data-camera-code="${
            site.id || "1000013"
          }" data-site-id="${site.id}">View in Stream Viewer</button>
        </div>
      </div>
    
      <div class="site-details-section">
        <div class="site-details-header">${site.name}</div>
        <div class="site-details-grid">
          <div class="site-detail-row">
            <span class="site-detail-label">Category:</span>
            <span class="site-detail-value">${categoryLabel}</span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Subcategory:</span>
            <span class="site-detail-value">${site.subcategory}</span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Status:</span>
            <span class="site-detail-value"><span class="status-${
              site.status
            }">${
    site.status.charAt(0).toUpperCase() + site.status.slice(1)
  }</span></span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Location:</span>
            <span class="site-detail-value">${site.location[0].toFixed(
              6
            )}, ${site.location[1].toFixed(6)}</span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">ID:</span>
            <span class="site-detail-value">${site.id}</span>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h4>Description</h4>
        <p style="color: rgba(255, 255, 255, 0.9); line-height: 1.5; margin: 0;">${
          site.description
        }</p>
      </div>
      
      <div class="detail-section">
        ${categorySpecificDetails}
      </div>
      
      <div class="site-actions">
        <div class="site-actions-row">
          <button class="btn-primary" id="view-less">Show Less</button>
          <button class="btn-secondary" id="maintenance-log-btn">${getFirstButtonLabel(
            category.category
          )}</button>
        </div>
        <div class="site-actions-row">
          <button class="btn-secondary" id="network-info-btn">${getSecondButtonLabel(
            category.category
          )}</button>
          <button class="btn-secondary" id="technical-details-btn">Technical Details</button>
        </div>
        <div class="site-actions-row">
          <button class="btn-secondary" id="schedule-inspection-btn">Schedule Inspection</button>
        </div>
      </div>
    
      <div id="maintenance-log-section" style="display: none; margin-top: 20px;">
        <div class="detail-section">
          <h3>${getFirstButtonLabel(category.category)}</h3>
          <div id="maintenance-log-content"></div>
        </div>
      </div>
    
      <div id="network-info-section" style="display: none; margin-top: 20px;">
        <div class="detail-section">
          <h3>${getSecondButtonLabel(category.category)}</h3>
          <div id="network-info-content"></div>
        </div>
      </div>
    
      <div id="technical-details-section" style="display: none; margin-top: 20px;">
        <div class="detail-section">
          <h3>Technical Details</h3>
          <div id="technical-details-content"></div>
        </div>
      </div>

      <div id="inspection-section" style="display: none; margin-top: 20px;">
        <div class="detail-section">
          <h3>Schedule Inspection</h3>
          <div id="inspection-content">
            <form id="inspection-form">
              <div class="form-group">
                <label>Inspection Type</label>
                <select>
                  <option value="routine">Routine Inspection</option>
                  <option value="emergency">Emergency Response</option>
                  <option value="annual">Annual Comprehensive</option>
                </select>
              </div>
              <div class="form-group">
                <label>Date</label>
                <input type="date">
              </div>
              <div class="form-group">
                <label>Time</label>
                <input type="time">
              </div>
              <div class="form-group">
                <label>Technician</label>
                <select>
                  <option value="john">John Smith</option>
                  <option value="maria">Maria Rodriguez</option>
                  <option value="david">David Chen</option>
                  <option value="sarah">Sarah Johnson</option>
                </select>
              </div>
              <div class="form-group">
                <label>Notes</label>
                <textarea placeholder="Enter inspection notes..."></textarea>
              </div>
              <div class="site-actions">
                <div class="site-actions-row">
                  <button type="button" class="btn-primary" id="schedule-btn">Schedule</button>
                  <button type="button" class="btn-secondary" id="cancel-inspection-btn">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    
      <div class="site-actions">
        <div class="site-actions-row">
          <button class="bg-accent-custom" id="download-report" style="width: 100%; padding: 12px; border-radius: 5px; border: none; cursor: pointer; font-weight: 500; background-color: #FAD754; color: #000;">
            <span style="margin-right: 8px;"></span>Generate Executive Report
          </button>
        </div>
      </div>
    `;

  const viewLessBtn = document.getElementById("view-less");
  if (viewLessBtn) {
    viewLessBtn.addEventListener("click", function () {
      drawer.classList.remove("expanded");
      showInfoDrawer(site, category);
    });
  }

  const expandedDownloadBtn = document.getElementById("download-report");
  if (expandedDownloadBtn) {
    expandedDownloadBtn.addEventListener("click", function () {
      // Show loading state
      const originalText = expandedDownloadBtn.innerHTML;
      expandedDownloadBtn.innerHTML =
        '<span style="margin-right: 8px;">⏳</span>Generating Report...';
      expandedDownloadBtn.disabled = true;

      // Generate PDF report after short delay
      setTimeout(() => {
        downloadPDFReport(site, category);

        // Reset button state
        expandedDownloadBtn.innerHTML = originalText;
        expandedDownloadBtn.disabled = false;
      }, 800);
    });
  }

  addMaintenanceLogListener(site, category);
  addNetworkInfoListener(site, category);
  addTechnicalDetailsListener(site, category);

  // Initialize live feed for expanded view
  // setTimeout(() => {
  //   initializeLiveFeed(site);
  //   setupLiveFeedEventListeners(site);
  // }, 100);
}

function addTechnicalDetailsListener(site, category) {
  const technicalDetailsBtn = document.getElementById("technical-details-btn");
  if (technicalDetailsBtn) {
    technicalDetailsBtn.addEventListener("click", function () {
      hideAllSections();

      const technicalDetailsSection = document.getElementById(
        "technical-details-section"
      );
      const technicalDetailsContent = document.getElementById(
        "technical-details-content"
      );

      if (!technicalDetailsSection || !technicalDetailsContent) {
        console.error("Technical details section or content not found");
        return;
      }

      technicalDetailsSection.style.display = "block";

      const technicalDetails = getTechnicalDetails(site.id);

      let contentHTML = `
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-item-label">Installation Date:</span>
              <span class="detail-item-value">${technicalDetails.installationDate}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Last Maintenance:</span>
              <span class="detail-item-value">${technicalDetails.lastMaintenance}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Coverage Area:</span>
              <span class="detail-item-value">${technicalDetails.coverageArea}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Operating Hours:</span>
              <span class="detail-item-value">${technicalDetails.operatingHours}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Service Provider:</span>
              <span class="detail-item-value">${technicalDetails.serviceProvider}</span>
            </div>
            <div class="detail-item">
              <span class="detail-item-label">Last Inspection:</span>
              <span class="detail-item-value">${technicalDetails.lastInspection}</span>
            </div>
          </div>
        `;

      technicalDetailsContent.innerHTML = contentHTML;
    });
  }
}
