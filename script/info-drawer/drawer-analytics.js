function loadPerformanceAnalytics(site, category) {
  const content = document.getElementById("performance-analytics-content");
  const analyticsHtml = generatePerformanceAnalytics(category.category, site);
  content.innerHTML = analyticsHtml;
}

function generatePerformanceAnalytics(category, site) {
  let title, metrics, chartType;

  switch (category) {
    case "Infrastructure":
      title = "Infrastructure Performance Metrics";
      metrics = [
        { name: "Condition Rating", value: "86%", trend: "stable" },
        { name: "Maintenance Efficiency", value: "92%", trend: "up" },
        { name: "Utilization Rate", value: "78%", trend: "up" },
        { name: "Service Reliability", value: "99.8%", trend: "stable" },
      ];
      chartType = "condition";
      break;
    case "Public Buildings":
      title = "Building Performance Metrics";
      metrics = [
        { name: "Occupancy Rate", value: "92%", trend: "up" },
        { name: "Energy Efficiency", value: "85%", trend: "up" },
        { name: "Maintenance Cost", value: "-12%", trend: "down" },
        { name: "User Satisfaction", value: "4.7/5", trend: "up" },
      ];
      chartType = "occupancy";
      break;
    case "Natural Features":
      title = "Conservation Performance";
      metrics = [
        { name: "Biodiversity Index", value: "7.8/10", trend: "up" },
        { name: "Water Quality", value: "Good", trend: "stable" },
        { name: "Visitor Impact", value: "Low", trend: "stable" },
        { name: "Preservation Rating", value: "92%", trend: "up" },
      ];
      chartType = "biodiversity";
      break;
    case "Environmental Risks":
      title = "Risk Mitigation Performance";
      metrics = [
        { name: "Early Warning Effectiveness", value: "95%", trend: "up" },
        { name: "Community Preparedness", value: "83%", trend: "up" },
        { name: "Response Time", value: "8.4 min", trend: "down" },
        { name: "Recovery Rate", value: "76%", trend: "up" },
      ];
      chartType = "risk";
      break;
    case "Points of Interest":
      title = "Visitor Engagement Analytics";
      metrics = [
        { name: "Visitor Satisfaction", value: "4.8/5", trend: "up" },
        { name: "Average Visit Duration", value: "72 min", trend: "up" },
        { name: "Return Rate", value: "68%", trend: "up" },
        { name: "Digital Engagement", value: "89%", trend: "up" },
      ];
      chartType = "visitors";
      break;
    case "Population Data":
      title = "Community Engagement Metrics";
      metrics = [
        { name: "Survey Participation", value: "74%", trend: "up" },
        { name: "Public Service Utilization", value: "82%", trend: "up" },
        {
          name: "Community Program Attendance",
          value: "65%",
          trend: "stable",
        },
        { name: "Digital Access", value: "91%", trend: "up" },
      ];
      chartType = "community";
      break;
    case "National Broadband Project":
      title = "Network Performance Analytics";
      metrics = [
        { name: "Network Availability", value: "99.95%", trend: "up" },
        { name: "Bandwidth Utilization", value: "78%", trend: "up" },
        { name: "User Adoption", value: "86%", trend: "up" },
        { name: "Service Quality", value: "4.7/5", trend: "stable" },
      ];
      chartType = "network";
      break;
    case "Internet Access":
    case "Free Public Internet":
      title = "Network Performance Metrics";
      metrics = [
        { name: "Network Uptime", value: "99.8%", trend: "up" },
        { name: "Average Speed", value: "95 Mbps", trend: "up" },
        { name: "User Satisfaction", value: "4.6/5", trend: "up" },
        { name: "Peak Usage", value: "350 users", trend: "up" },
      ];
      chartType = "network";
      break;
    case "Traffic Data":
      title = "Traffic Performance Analytics";
      metrics = [
        { name: "Average Daily Volume", value: "15,000", trend: "up" },
        { name: "Peak Hour Congestion", value: "Medium", trend: "stable" },
        { name: "Traffic Flow Efficiency", value: "78%", trend: "up" },
        { name: "Incident Response Time", value: "12 min", trend: "down" },
      ];
      chartType = "traffic";
      break;
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
