// script/strategic-dashboard.js

const fullScreenForm = document.getElementById(
  "full-screen-infrastructure-form"
);
const closeBtn = document.getElementById('close');

// Zone filtering functionality
let currentZoneFilter = "all";
let currentCategoryFilter = "all";
let currentPerformanceFilter = "all";
let currentSearchFilter = "";

closeBtn.addEventListener('click', hideInfrastructureForm);

function hideInfrastructureForm() {
    if (fullScreenForm) {
        fullScreenForm.style.display = 'none';
    }
}

function showInfrastructureForm() {
  if (fullScreenForm) {
    adjustFormPosition();
    fullScreenForm.style.display = "block";
  }
}

function toggleZoneFilter(element, zone) {
  // Remove active from all pills
  document.querySelectorAll(".zone-pill").forEach((pill) => {
    pill.classList.remove("active");
  });

  // Add active to clicked pill
  element.classList.add("active");
  currentZoneFilter = zone;

  applyFilters();
}

function applyFilters() {
  const zoneCards = document.querySelectorAll(".zone-card");
  const noResults = document.getElementById("noResults");
  let visibleCount = 0;
  let totalCount = zoneCards.length - 1; // Subtract 1 for no-results div

  zoneCards.forEach((card) => {
    if (card.id === "noResults") return;

    const zoneId = card.getAttribute("data-zone");
    const category = card.getAttribute("data-category");
    const performance = card.getAttribute("data-performance");
    const name = card.getAttribute("data-name").toLowerCase();

    let isVisible = true;

    // Zone filter
    if (currentZoneFilter !== "all" && zoneId !== currentZoneFilter) {
      isVisible = false;
    }

    // Category filter
    if (currentCategoryFilter !== "all" && category !== currentCategoryFilter) {
      isVisible = false;
    }

    // Performance filter
    if (
      currentPerformanceFilter !== "all" &&
      performance !== currentPerformanceFilter
    ) {
      isVisible = false;
    }

    // Search filter
    if (
      currentSearchFilter &&
      !name.includes(currentSearchFilter.toLowerCase())
    ) {
      isVisible = false;
    }

    // Apply visibility
    if (isVisible) {
      card.classList.remove("hidden");
      visibleCount++;
    } else {
      card.classList.add("hidden");
    }
  });

  // Show/hide no results message
  if (visibleCount === 0) {
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
  }

  // Update zone count
  updateZoneCount(visibleCount, totalCount);
}

function updateZoneCount(visible, total) {
  const zoneCount = document.getElementById("zoneCount");
  zoneCount.textContent = `Showing ${visible} of ${total} zones`;
}

function clearAllFilters() {
  // Reset all filters
  currentZoneFilter = "all";
  currentCategoryFilter = "all";
  currentPerformanceFilter = "all";
  currentSearchFilter = "";

  // Reset UI elements
  document.getElementById("categoryFilter").value = "all";
  document.getElementById("performanceFilter").value = "all";
  document.getElementById("searchFilter").value = "";

  // Reset zone pills
  document.querySelectorAll(".zone-pill").forEach((pill) => {
    pill.classList.remove("active");
  });
  document.querySelector('[data-zone="all"]').classList.add("active");

  // Apply filters
  applyFilters();
}

// Event listeners
document
  .getElementById("categoryFilter")
  .addEventListener("change", function () {
    currentCategoryFilter = this.value;
    applyFilters();
  });

document
  .getElementById("performanceFilter")
  .addEventListener("change", function () {
    currentPerformanceFilter = this.value;
    applyFilters();
  });

document.getElementById("searchFilter").addEventListener("input", function () {
  currentSearchFilter = this.value;
  applyFilters();
});

// Initialize filters on page load
document.addEventListener("DOMContentLoaded", function () {
  applyFilters();
});

// Add some sample animation for zone cards
function animateZoneCards() {
  const visibleCards = document.querySelectorAll(".zone-card:not(.hidden)");
  visibleCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {
      card.style.transition = "all 0.4s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Call animation after filters are applied
const originalApplyFilters = applyFilters;
applyFilters = function () {
  originalApplyFilters();
  setTimeout(animateZoneCards, 50);
};

// Add responsive filter toggle for mobile
function toggleFiltersOnMobile() {
  const filtersSection = document.querySelector(".filters-section");
  const filtersGrid = document.querySelector(".filters-grid");
  const zonePills = document.querySelector(".zone-filter-pills");

  if (window.innerWidth <= 768) {
    filtersGrid.style.gridTemplateColumns = "1fr";
    zonePills.style.justifyContent = "center";
  } else {
    filtersGrid.style.gridTemplateColumns = "1fr 1fr 1fr auto";
    zonePills.style.justifyContent = "flex-start";
  }
}

window.showInfrastructureForm = showInfrastructureForm;

// Call on load and resize
window.addEventListener("load", toggleFiltersOnMobile);
window.addEventListener("resize", toggleFiltersOnMobile);
