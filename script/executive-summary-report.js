// script/executive-summary-report.js

const monitoringInterface = document.getElementById("full-screen-monitoring");
const closeMonitoringBtn = document.getElementById("close-monitoring-btn");

// Handle close button
if (closeMonitoringBtn) {
  closeMonitoringBtn.addEventListener("click", function () {
    monitoringInterface.style.display = "none";
  });
}

// Show monitoring interface and initialize
function showMonitoringInterface() {
  // Make sure the interface exists before trying to show it
  if (!monitoringInterface) {
    console.error("Monitoring interface element not found");
    return;
  }

  // Show the interface
  monitoringInterface.style.display = "block";
}

function generateReport() {
  const reportType = document.getElementById("reportType").value;
  const timePeriod = document.getElementById("timePeriod").value;
  const audienceLevel = document.getElementById("audienceLevel").value;
  const format = document.getElementById("reportFormat").value;

  // Simulate report generation
  const modal = document.createElement("div");
  modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            `;

  modal.innerHTML = `
                <div style="background: rgba(26, 35, 50, 0.95); padding: 2rem; border-radius: 12px; text-align: center; max-width: 500px; border: 1px solid rgba(255, 215, 0, 0.3);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
                    <h3 style="color: #ffd700;">Generating Executive Report</h3>
                    <p style="margin: 1rem 0; color: #8fa8b8;">
                        Creating ${reportType} report for ${timePeriod}<br>
                        Audience: ${audienceLevel}<br>
                        Format: ${format}
                    </p>
                    <div style="background: rgba(15, 26, 43, 0.8); padding: 1rem; border-radius: 8px; margin: 1rem 0; border-left: 3px solid #ffd700;">
                        <div style="font-weight: 600; color: #ffffff;">Report will include:</div>
                        <ul style="text-align: left; margin-top: 0.5rem; color: #8fa8b8;">
                            <li>Executive summary and key highlights</li>
                            <li>Financial performance metrics</li>
                            <li>Zone-by-zone analysis</li>
                            <li>Strategic recommendations</li>
                            <li>Risk assessment and mitigation</li>
                        </ul>
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" 
                            style="background: rgba(15, 26, 43, 0.8); color: #fff; border: 1px solid rgba(255, 215, 0, 0.2); padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; font-weight: 600;">
                        Download Report
                    </button>
                </div>
            `;

  document.body.appendChild(modal);
}

function scheduleReport() {
  alert(
    "Auto-report scheduling interface opened. Configure automatic report generation and distribution."
  );
}

function shareReport() {
  alert(
    "Report sharing options: Email distribution, secure portal upload, or direct stakeholder notifications."
  );
}

function selectTemplate(templateType) {
  document.getElementById("reportType").value = templateType;
  alert(
    `Template selected: ${templateType
      .replace("-", " ")
      .toUpperCase()}. Report generator updated with template specifications.`
  );
}

// Auto-update insights (simulate real-time data)
setInterval(() => {
  const insights = document.querySelectorAll(".kpi-value");
  insights.forEach((insight) => {
    // Add subtle animation to suggest live data
    insight.style.transform = "scale(1.02)";
    setTimeout(() => {
      insight.style.transform = "scale(1)";
    }, 200);
  });
}, 30000);
