// script/info-drawer.js

document.addEventListener("DOMContentLoaded", function () {
  function showInfoDrawer(site, category) {
    const drawer = document.getElementById("info-drawer");
    const drawerContent = document.getElementById("drawer-content");
    const sideWrapper = document.querySelector(".side-wrapper");

    if (drawer) {
      drawer.setAttribute("data-site-id", site.id);
    }

    hideAllSections();

    if (sideWrapper) {
      sideWrapper.classList.add("active");

      const cards = sideWrapper.querySelectorAll(".card");
      cards.forEach((card) => {
        if (!card.querySelector(".card-close-btn")) {
          const closeBtn = document.createElement("button");
          closeBtn.className = "card-close-btn";
          closeBtn.innerHTML = "✕";
          closeBtn.setAttribute("title", "Close card");

          closeBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            sideWrapper.classList.remove("active");            
          });

          card.appendChild(closeBtn);
        }
      });
    }

    const categoryLabel = getCategoryLabel(category.category, site.subcategory);
    
    drawerContent.innerHTML = `
      <!-- Photo Grid Section -->
      <div class="photo-grid-section">
        <h4>Site Photos</h4>
        <div class="photo-grid" id="photo-grid">
          ${generatePhotoGrid(site)}
        </div>
      </div>

      <div class="site-details-section">
        <div class="site-details-header">${site.name}</div>
        <div class="site-details-grid">
          <div class="site-detail-row">
            <span class="site-detail-label">Asset ID:</span>
            <span class="site-detail-value">${site.id}</span>
          </div>
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
        </div>
        <div class="site-description">
          <span class="site-detail-label">Description</span>
          <p>${site.description}</p>
        </div>
      </div>

      <div class="tab-navigation">
        ${generateTabButtons(category.category)}
      </div>

      <div class="tab-content">
        <div id="technical-details-section" class="tab-section active">
          <div class="detail-section">
            <div id="technical-details-content"></div>
          </div>
        </div>

        <div id="performance-analytics-section" class="tab-section">
          <div class="detail-section">
            <div id="performance-analytics-content"></div>
          </div>
        </div>

        <div id="schedule-inspection-section" class="tab-section">
          <div class="detail-section">
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

        <div id="download-report-main-section" class="tab-section">
          <div class="detail-section">
            <div id="download-report-content">
              <h4>Generate Comprehensive Report</h4>
              <p>Generate a detailed  executive report for <strong>${
                site.name
              }</strong> including all technical specifications, performance analytics, maintenance history, and strategic recommendations.</p>
              
              <div class="report-preview-section" style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                <h5 style="margin-bottom: 10px; color: #FAD754;">Report Contents:</h5>
                <ul style="margin: 0; padding-left: 20px; color: rgba(255,255,255,0.8);">
                  <li>Site Information & Classification</li>
                  <li>${getCategorySpecificReportSections(
                    category.category
                  ).join("</li><li>")}</li>
                  <li>Strategic Recommendations</li>
                </ul>
              </div>
              
              <div class="site-actions">
                <div class="site-actions-row">
                  <button class="btn-primary" id="direct-generate-report-btn" style="width: 100%; padding: 12px; border-radius: 5px; border: none; cursor: pointer; font-weight: 500; background-color: #FAD754; color: #000;">
                    <span style="margin-right: 8px;"></span>Generate Executive Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;

    drawer.classList.add("open");
    drawer.classList.add("style-1");

    const technicalDetails = getTechnicalDetails(site.id);
    const content = document.getElementById("technical-details-content");

    content.innerHTML = `
      <h4>Technical Details</h4>
      <div class="detail-grid">
        <div class="detail-item">
          <span class="detail-item-label">Installation Date:</span>
          <span class="detail-item-value">${
            technicalDetails.installationDate || "N/A"
          }</span>
        </div>
        <div class="detail-item">
          <span class="detail-item-label">Last Maintenance:</span>
          <span class="detail-item-value">${
            technicalDetails.lastMaintenance || "N/A"
          }</span>
        </div>
        <div class="detail-item">
          <span class="detail-item-label">Coverage Area:</span>
          <span class="detail-item-value">${
            technicalDetails.coverageArea || "N/A"
          }</span>
        </div>
        <div class="detail-item">
          <span class="detail-item-label">Operating Hours:</span>
          <span class="detail-item-value">${
            technicalDetails.operatingHours || "N/A"
          }</span>
        </div>
        <div class="detail-item">
          <span class="detail-item-label">Service Provider:</span>
          <span class="detail-item-value">${
            technicalDetails.serviceProvider || "N/A"
          }</span>
        </div>
        <div class="detail-item">
          <span class="detail-item-label">Last Inspection:</span>
          <span class="detail-item-value">${
            technicalDetails.lastInspection || "N/A"
          }</span>
        </div>
      </div>
    `

    addEventListeners(site, category, drawer);
  }

  function addEventListeners(site, category, drawer) {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabSections = document.querySelectorAll(".tab-section");

    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const targetTab = this.getAttribute("data-tab");

        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabSections.forEach((section) => section.classList.remove("active"));

        this.classList.add("active");
        const targetSection = document.getElementById(targetTab + "-section");
        if (targetSection) {
          targetSection.classList.add("active");

          if (targetTab === "performance-analytics") {
            loadPerformanceAnalytics(site, category);
          } else if (targetTab === "download-report-main") {
            loadDownloadReportContent(site, category);
          }
        }
      });
    });

    const firstTab = document.querySelector(".tab-btn");
    
    if (firstTab) {
      firstTab.classList.add("active");
    }

    const drawerCloseBtn = document.getElementById("drawer-close");

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener("click", function () {
        drawer.classList.remove("open");
        drawer.classList.remove("expanded");

        const sideWrapper = document.querySelector(".side-wrapper");
        if (sideWrapper) {
          sideWrapper.classList.remove("active");
        }

        hideAllSections();
      });
    }
  }

  function generateTabButtons(categoryName) {
    const allTabs = [
      {
        id: "technical-details",
        label: "Technical Details",
        categories: ["all"],
      },
      {
        id: "performance-analytics",
        label: getPerformanceLabel(categoryName),
        categories: ["all"],
      },
      {
        id: "schedule-inspection",
        label: "Schedule Inspection",
        categories: ["all"],
      },
      {
        id: "download-report-main",
        label: "Generate Report",
        categories: ["all"],
      },
    ];

    return allTabs
      .map((tab) => {
        if (
          tab.categories.includes("all") ||
          tab.categories.includes(categoryName)
        ) {
          return `<button class="tab-btn" data-tab="${tab.id}">${tab.label}</button>`;
        }
        return "";
      })
      .join("");
  }

  function hideAllSections() {
    const sections = document.querySelectorAll(".tab-section");
    sections.forEach((section) => {
      section.classList.remove("active");
    });
  }
  
  window.showInfoDrawer = showInfoDrawer;
});

$(document).ready(function () {
  // Initialize carousel with custom settings
  $("#imageCarousel").carousel({
    interval: 5000,
    pause: "hover",
    wrap: true,
  });

  // Thumbnail navigation click handler
  $(".thumbnail-nav").click(function () {
    var slideIndex = $(this).data("slide-to");
    $("#imageCarousel").carousel(slideIndex);

    // Update thumbnail active state
    $(".thumbnail-nav").removeClass("border-primary");
    $(this).addClass("border-primary");
  });

  // Update thumbnail active state on carousel slide
  $("#imageCarousel").on("slide.bs.carousel", function (e) {
    var activeIndex = $(e.relatedTarget).index();
    $(".thumbnail-nav").removeClass("border-primary");
    $(".thumbnail-nav").eq(activeIndex).addClass("border-primary");
  });
});
