// script/info-drawer.js

document.addEventListener("DOMContentLoaded", function () {
  function showInfoDrawer(site, category) {
    const drawer = document.getElementById("info-drawer");
    const drawerContent = document.getElementById("drawer-content");
    const sideWrapper = document.querySelector(".side-wrapper");
    const deviceChannel = document.querySelector('#device-channel');

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

    const subCategoryTitle = category.subcategoryConfigs[site.subcategory].title;

    drawerContent.innerHTML = `
      <div class="site-details-section">
        <div class="site-details-header">${site.name}</div>
        <h6 id="site-name">Site Details</h6>
        <div class="site-details-grid">
          <div class="site-detail-row">
            <span class="site-detail-label">Category:</span>
            <span class="site-detail-value">${category.displayInfo.title}</span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Zone Type:</span>
            <span class="site-detail-value">${site.id}</span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Subcategory:</span>
            <span class="site-detail-value">${subCategoryTitle}</span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Status:</span>
            <span class="site-detail-value">
              <span class="status-${site.status}">${site.status.charAt(0).toUpperCase() + site.status.slice(1)}</span>
            </span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Location:</span>
            <span class="site-detail-value">
              ${site.location[0].toFixed(6)}° N, ${site.location[1].toFixed(6)}° E
            </span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Lot Size:</span>
            <span class="site-detail-value">
              ${site.lotSize}
            </span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Lease Expiry:</span>
            <span class="site-detail-value">
              ${site.leaseExpiry}
            </span>
          </div>
          <div class="site-detail-row">
            <span class="site-detail-label">Employees:</span>
            <span class="site-detail-value">
              ${site.employees}
            </span>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <div id="download-report-content">
          <h4>Generate Comprehensive Report</h4>
          <p>Generate a detailed  executive report for <strong>${
            site.name
          }</strong> including all technical specifications, performance analytics, maintenance history, and strategic recommendations.</p>
          
          <div class="report-preview-section" style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px;">
            <h5>Report Contents:</h5>
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
              <button class="btn-primary" id="direct-generate-report-btn">
                <span style="margin-right: 8px;"></span>Generate Executive Report
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    deviceChannel.innerHTML = site.id

    drawer.classList.add("open");
    drawer.classList.add("style-1");
    
    // Add event listener for direct PDF generation
    const directGenerateBtn = document.getElementById(
      "direct-generate-report-btn"
    );
    
    if (directGenerateBtn) {
      directGenerateBtn.addEventListener("click", function () {
        // Show loading state
        const originalText = directGenerateBtn.innerHTML;
        directGenerateBtn.innerHTML =
          '<span style="margin-right: 8px;">⏳</span>Generating Report...';
        directGenerateBtn.disabled = true;

        // Generate PDF report after short delay
        setTimeout(() => {
          downloadPDFReport(site, category);

          // Reset button state
          directGenerateBtn.innerHTML = originalText;
          directGenerateBtn.disabled = false;
        }, 1000);
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
