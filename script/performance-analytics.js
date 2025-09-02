// script/performance-analytics.js

const alertsInterface = document.getElementById("full-screen-alerts-interface");
const closeAlertsBtn = document.getElementById("close-alerts-btn");

if (closeAlertsBtn) {
  closeAlertsBtn.addEventListener("click", function () {
    alertsInterface.style.display = "none";
  });
}

function showAlertsInterface() {
  // Make sure the interface is visible regardless of previous state
  if (alertsInterface) {
    // Show the interface
    alertsInterface.style.display = "block";
  } else {
    console.error("");
  }
}

// Revenue Trends Chart
const revenueCtx = document.getElementById("revenueChart").getContext("2d");
new Chart(revenueCtx, {
  type: "line",
  data: {
    labels: [
      "Q1 2023",
      "Q2 2023",
      "Q3 2023",
      "Q4 2023",
      "Q1 2024",
      "Q2 2024",
      "Q3 2024",
      "Q4 2024",
    ],
    datasets: [
      {
        label: "Total Revenue (₱B)",
        data: [16.2, 17.8, 18.5, 19.1, 19.8, 20.4, 21.2, 22.1],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      x: {
        grid: { display: false },
      },
    },
  },
});

// Occupancy Chart
const occupancyCtx = document.getElementById("occupancyChart").getContext("2d");
new Chart(occupancyCtx, {
  type: "bar",
  data: {
    labels: ["Clark Freeport", "BGC Taguig", "Subic Bay", "Bataan Tech"],
    datasets: [
      {
        label: "Occupancy Rate (%)",
        data: [92.3, 94.1, 87.6, 84.2],
        backgroundColor: ["#3182ce", "#805ad5", "#38a169", "#d69e2e"],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      x: {
        grid: { display: false },
      },
    },
  },
});

// Growth Chart
const growthCtx = document.getElementById("growthChart").getContext("2d");
new Chart(growthCtx, {
  type: "radar",
  data: {
    labels: [
      "Revenue Growth",
      "Occupancy Growth",
      "Locator Growth",
      "Lease Rate Growth",
      "EBITDA Growth",
    ],
    datasets: [
      {
        label: "2024 Performance",
        data: [15.7, 3.2, 8.4, 11.2, 18.5],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        pointBackgroundColor: "#3b82f6",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 20,
        grid: { color: "rgba(0,0,0,0.1)" },
      },
    },
  },
});

// Portfolio Mix Chart
const portfolioCtx = document.getElementById("portfolioChart").getContext("2d");
new Chart(portfolioCtx, {
  type: "doughnut",
  data: {
    labels: ["Clark Freeport", "BGC Taguig", "Subic Bay", "Bataan Tech"],
    datasets: [
      {
        data: [37.1, 31.2, 19.5, 12.2],
        backgroundColor: ["#3182ce", "#805ad5", "#38a169", "#d69e2e"],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { usePointStyle: true },
      },
    },
  },
});

// Export functionality
function exportData() {
  alert("Performance analytics data exported successfully!");
}

// Filter functionality
document
  .getElementById("timePeriod")
  .addEventListener("change", updateAnalytics);
document
  .getElementById("zoneFilter")
  .addEventListener("change", updateAnalytics);
document
  .getElementById("metricFilter")
  .addEventListener("change", updateAnalytics);
document
  .getElementById("comparisonFilter")
  .addEventListener("change", updateAnalytics);

function updateAnalytics() {
  // Simulate data refresh based on filters
  console.log("Analytics updated based on filter changes");
}
