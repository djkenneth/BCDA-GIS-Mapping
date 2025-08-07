function loadPerformanceAnalytics(site, category) {
  const content = document.getElementById("performance-analytics-content");
  const analyticsHtml = generatePerformanceAnalytics(category.category, site);
  content.innerHTML = analyticsHtml;
}

function generatePerformanceAnalytics(category, site) {
  let title, metrics, chartType;

  switch (category) {
    default:
      title = "Performance Metrics";
      metrics = [
        { name: "Overall Rating", value: "87%", trend: "up" },
        { name: "Operational Efficiency", value: "92%", trend: "up" },
        { name: "Maintenance Compliance", value: "98%", trend: "stable" },
        { name: "User Satisfaction", value: "4.5/5", trend: "up" },
      ];
      chartType = "general";
  }

  let metricsHtml = "";
  metrics.forEach((metric) => {
    const trendIcon =
      metric.trend === "up"
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>'
        : metric.trend === "down"
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F44336" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFC107" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>';

    metricsHtml += `
        <div class="metric-row">
          <span class="metric-label">${metric.name}</span>
          <span class="metric-value">
            ${metric.value} ${trendIcon}
          </span>
        </div>
      `;
  });

  let chartHtml = "";
  if (chartType === "condition") {
    chartHtml = `
        <div class="chart-container">
          <h4>Infrastructure Condition Trend</h4>
          <div class="chart-bars">
            <div class="chart-bar" style="height: 75%;" title="2022: 78%"></div>
            <div class="chart-bar" style="height: 80%;" title="2023: 82%"></div>
            <div class="chart-bar" style="height: 84%;" title="2024: 86%"></div>
            <div class="chart-bar" style="height: 86%;" title="2025: 88%"></div>
          </div>
          <div class="chart-labels">
            <span>2022</span>
            <span>2023</span>
            <span>2024</span>
            <span>2025</span>
          </div>
        </div>
      `;
  } else if (chartType === "risk") {
    chartHtml = `
        <div class="chart-container">
          <h4>Risk Incident Frequency</h4>
          <div class="chart-bars">
            <div class="chart-bar risk-high" style="height: 90%;" title="2022: 18 incidents"></div>
            <div class="chart-bar risk-medium" style="height: 70%;" title="2023: 14 incidents"></div>
            <div class="chart-bar risk-low" style="height: 40%;" title="2024: 8 incidents"></div>
            <div class="chart-bar risk-low" style="height: 25%;" title="2025: 5 incidents"></div>
          </div>
          <div class="chart-labels">
            <span>2022</span>
            <span>2023</span>
            <span>2024</span>
            <span>2025</span>
          </div>
        </div>
      `;
  } else {
    chartHtml = `
        <div class="chart-container">
          <h4>Performance Trend</h4>
          <div class="chart-bars">
            <div class="chart-bar" style="height: 65%;" title="2022"></div>
            <div class="chart-bar" style="height: 72%;" title="2023"></div>
            <div class="chart-bar" style="height: 85%;" title="2024"></div>
            <div class="chart-bar" style="height: 92%;" title="2025"></div>
          </div>
          <div class="chart-labels">
            <span>2022</span>
            <span>2023</span>
            <span>2024</span>
            <span>2025</span>
          </div>
        </div>
      `;
  }

  return `
      <h4>${title}</h4>
      <div class="metrics-grid">
        ${metricsHtml}
      </div>
      ${chartHtml}
      <div class="last-updated">
        Last updated: May 26, 2025
      </div>
    `;
}
