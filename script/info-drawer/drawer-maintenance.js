function loadMaintenanceHistory(site, category) {
  const content = document.getElementById("maintenance-history-content");
  const maintenanceLogs = getMaintenanceLogs(site.id);

  let headerText = getMaintenanceLabel(category.category);
  let contentHtml = `<h4>${headerText}</h4>`;

  if (
    category.category === "Internet Access" ||
    category.category === "Free Public Internet" ||
    category.category === "National Broadband Project"
  ) {
    if (maintenanceLogs.length === 0) {
      contentHtml +=
        '<div class="empty-state">No maintenance records found for this site.</div>';
    } else {
      maintenanceLogs.forEach((log) => {
        contentHtml += `
            <div class="maintenance-entry">
              <div class="maintenance-entry-header">
                <span class="maintenance-entry-date">${log.date}</span>
                <span class="maintenance-entry-type ${log.type.toLowerCase()}">${
          log.type
        }</span>
              </div>
              <div class="maintenance-entry-content">
                <p><strong>Technician:</strong> ${log.technician}</p>
                <p><strong>Duration:</strong> ${log.duration}</p>
                <p><strong>Description:</strong> ${log.description}</p>
                <p><strong>Findings:</strong> ${log.findings}</p>
                ${
                  log.followUpRequired
                    ? `<div class="maintenance-follow-up">
                    <p><strong>Follow-up Required:</strong> Yes</p>
                    <p><strong>Follow-up Date:</strong> ${log.followUpDate}</p>
                    <p><strong>Follow-up Notes:</strong> ${log.followUpNotes}</p>
                  </div>`
                    : `<p><strong>Follow-up Required:</strong> No</p>`
                }
              </div>
            </div>
          `;
      });
    }
  } else {
    contentHtml += generateCategorySpecificHistory(category.category, site);
  }

  content.innerHTML = contentHtml;
}

function addMaintenanceLogListener(site, category) {
  const maintenanceLogBtn = document.getElementById("maintenance-log-btn");
  if (maintenanceLogBtn) {
    maintenanceLogBtn.addEventListener("click", function () {
      hideAllSections();

      const logSection = document.getElementById("maintenance-log-section");
      const logContent = document.getElementById("maintenance-log-content");

      if (!logSection || !logContent) {
        console.error("Maintenance log section or content not found");
        return;
      }

      logSection.style.display = "block";

      let headerText = getFirstButtonLabel(category.category);
      logSection.querySelector("h3").textContent = headerText;

      let contentHtml = "";

      if (
        category.category === "Internet Access" ||
        category.category === "Free Public Internet"
      ) {
        const logs = getMaintenanceLogs(site.id);

        if (logs.length === 0) {
          contentHtml =
            '<div class="empty-state">No maintenance records found for this site.</div>';
        } else {
          logs.forEach((log) => {
            contentHtml += `
                <div class="maintenance-entry">
                  <div class="maintenance-entry-header">
                    <span class="maintenance-entry-date">${log.date}</span>
                    <span class="maintenance-entry-type ${log.type.toLowerCase()}">${
              log.type
            }</span>
                  </div>
                  <div class="maintenance-entry-content">
                    <p><strong>Technician:</strong> ${log.technician}</p>
                    <p><strong>Duration:</strong> ${log.duration}</p>
                    <p><strong>Description:</strong> ${log.description}</p>
                    <p><strong>Findings:</strong> ${log.findings}</p>
                    ${
                      log.followUpRequired
                        ? `<div class="maintenance-follow-up">
                        <p><strong>Follow-up Required:</strong> Yes</p>
                        <p><strong>Follow-up Date:</strong> ${log.followUpDate}</p>
                        <p><strong>Follow-up Notes:</strong> ${log.followUpNotes}</p>
                      </div>`
                        : `<p><strong>Follow-up Required:</strong> No</p>`
                    }
                  </div>
                </div>
              `;
          });
        }
      } else {
        contentHtml = generatePerformanceAnalytics(category.category, site);
      }

      logContent.innerHTML = contentHtml;
    });
  }
}

// Helper function to get category-specific maintenance data
function getCategoryMaintenanceData(categoryName, site) {
  const maintenanceLogs = getMaintenanceLogs(site.id);

  // If we have actual maintenance logs, use them, otherwise generate category-specific examples
  if (
    maintenanceLogs &&
    maintenanceLogs.length > 0 &&
    maintenanceLogs[0].date !== "2025-03-10"
  ) {
    return maintenanceLogs.slice(0, 3); // Return up to 3 most recent
  }

  return (
    categoryMaintenance[categoryName] || [
      {
        date: "2025-04-20",
        type: "General System Maintenance",
        technician: "General Maintenance Crew",
        duration: "4 hours",
        findings:
          "Routine inspection and maintenance procedures completed according to established protocols. All systems checked and found operating within normal parameters. Preventive maintenance tasks completed successfully. Next scheduled maintenance in 3 months.",
      },
      {
        date: "2025-02-15",
        type: "Safety and Compliance Check",
        technician: "Safety Inspector",
        duration: "2 hours",
        findings:
          "Safety protocols verified and all compliance requirements met. Equipment inspected and found in good working order. Documentation updated and filed appropriately. No safety concerns identified.",
      },
    ]
  );
}

function getMaintenanceLogs(siteId) {
  return (
    sitesMaintenanceLogs?.[siteId] ||
    sitesMaintenanceLogs?.["default"] || [
      {
        date: "2025-03-10",
        type: "Routine",
        technician: "John Smith",
        duration: "4 hours",
        description: "Standard quarterly maintenance and inspection.",
        findings: "All systems operating within normal parameters.",
        followUpRequired: false,
      },
    ]
  );
}

function generateCategorySpecificHistory(category, site) {
  switch (category) {
    case "Infrastructure":
      return `
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-04-15</span>
              <span class="maintenance-entry-type routine">Structural Inspection</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Inspector:</strong> Civil Engineer Maria Santos</p>
              <p><strong>Duration:</strong> 6 hours</p>
              <p><strong>Findings:</strong> Infrastructure condition rated at 86%. Minor concrete spalling observed on south wall. Overall structural integrity remains excellent.</p>
              <p><strong>Recommendations:</strong> Schedule concrete repair within 3 months. No immediate safety concerns.</p>
            </div>
          </div>
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-02-28</span>
              <span class="maintenance-entry-type routine">Preventive Maintenance</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Technician:</strong> Maintenance Team Alpha</p>
              <p><strong>Duration:</strong> 4 hours</p>
              <p><strong>Findings:</strong> All systems operational. Drainage cleaned, lighting checked, safety equipment verified.</p>
              <p><strong>Status:</strong> Maintenance completed successfully</p>
            </div>
          </div>
        `;
    case "Public Buildings":
      return `
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-05-10</span>
              <span class="maintenance-entry-type routine">HVAC Service</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Contractor:</strong> CoolAir Systems Inc.</p>
              <p><strong>Duration:</strong> 8 hours</p>
              <p><strong>Work Performed:</strong> Annual HVAC system maintenance, filter replacement, efficiency testing</p>
              <p><strong>Results:</strong> System efficiency improved by 12%. Energy consumption reduced.</p>
            </div>
          </div>
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-03-22</span>
              <span class="maintenance-entry-type routine">Safety Inspection</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Inspector:</strong> Fire Safety Bureau</p>
              <p><strong>Duration:</strong> 3 hours</p>
              <p><strong>Findings:</strong> All fire safety systems operational. Emergency exits clear. Fire extinguishers serviced.</p>
              <p><strong>Compliance:</strong> 100% - Certificate renewed</p>
            </div>
          </div>
        `;
    case "Natural Features":
      return `
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-04-30</span>
              <span class="maintenance-entry-type routine">Ecological Assessment</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Biologist:</strong> Dr. Elena Rodriguez</p>
              <p><strong>Duration:</strong> 12 hours (2 days)</p>
              <p><strong>Assessment:</strong> Biodiversity index remains high at 7.8/10. Native species population stable.</p>
              <p><strong>Observations:</strong> Minimal invasive species encroachment. Water quality excellent.</p>
            </div>
          </div>
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-01-15</span>
              <span class="maintenance-entry-type routine">Trail Maintenance</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Team:</strong> Parks & Recreation Crew</p>
              <p><strong>Duration:</strong> 16 hours (4 days)</p>
              <p><strong>Work Done:</strong> Trail clearing, erosion control, signage updates, waste removal</p>
              <p><strong>Status:</strong> All visitor trails restored to excellent condition</p>
            </div>
          </div>
        `;
    case "Environmental Risks":
      return `
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-05-20</span>
              <span class="maintenance-entry-type emergency">Flood Risk Assessment</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Team:</strong> Risk Management Office</p>
              <p><strong>Trigger:</strong> Heavy rainfall warning issued</p>
              <p><strong>Assessment:</strong> Water levels monitored. Early warning systems activated.</p>
              <p><strong>Actions:</strong> Community alerts sent. Emergency response teams on standby.</p>
            </div>
          </div>
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-03-08</span>
              <span class="maintenance-entry-type routine">Sensor Calibration</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Technician:</strong> Environmental Monitoring Team</p>
              <p><strong>Duration:</strong> 4 hours</p>
              <p><strong>Work:</strong> All 12 monitoring sensors calibrated and tested</p>
              <p><strong>Status:</strong> All systems operational. Data accuracy verified.</p>
            </div>
          </div>
        `;
    case "Points of Interest":
      return `
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-05-12</span>
              <span class="maintenance-entry-type routine">Facility Cleaning</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Service:</strong> Heritage Site Maintenance</p>
              <p><strong>Duration:</strong> 6 hours</p>
              <p><strong>Work:</strong> Deep cleaning, artifact preservation check, visitor area maintenance</p>
              <p><strong>Visitor Impact:</strong> No disruption to regular operating hours</p>
            </div>
          </div>
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-02-14</span>
              <span class="maintenance-entry-type routine">Security Update</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Contractor:</strong> SecureGuard Systems</p>
              <p><strong>Duration:</strong> 3 hours</p>
              <p><strong>Upgrades:</strong> CCTV system updated, access control systems tested</p>
              <p><strong>Result:</strong> Security coverage improved by 25%</p>
            </div>
          </div>
        `;
    case "Traffic Data":
      return `
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-05-18</span>
              <span class="maintenance-entry-type routine">Sensor Maintenance</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Team:</strong> Traffic Management Systems</p>
              <p><strong>Duration:</strong> 2 hours</p>
              <p><strong>Work:</strong> Traffic counting sensors cleaned and calibrated</p>
              <p><strong>Data Quality:</strong> 99.8% accuracy maintained</p>
            </div>
          </div>
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-04-03</span>
              <span class="maintenance-entry-type routine">Data Analysis</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Analyst:</strong> Traffic Engineering Office</p>
              <p><strong>Period:</strong> Q1 2025 Data Review</p>
              <p><strong>Findings:</strong> 15% increase in traffic volume during peak hours</p>
              <p><strong>Recommendations:</strong> Consider traffic flow optimization measures</p>
            </div>
          </div>
        `;
    default:
      return `
          <div class="maintenance-entry">
            <div class="maintenance-entry-header">
              <span class="maintenance-entry-date">2025-04-20</span>
              <span class="maintenance-entry-type routine">General Maintenance</span>
            </div>
            <div class="maintenance-entry-content">
              <p><strong>Team:</strong> General Maintenance Crew</p>
              <p><strong>Duration:</strong> 4 hours</p>
              <p><strong>Work:</strong> Routine inspection and maintenance procedures completed</p>
              <p><strong>Status:</strong> All systems operating normally</p>
            </div>
          </div>
        `;
  }
}

function getFirstButtonLabel(category) {
  switch (category) {
    case "Internet Access":
    case "Free Public Internet":
      return "Maintenance History";
    default:
      return "Performance Analytics";
  }
}
