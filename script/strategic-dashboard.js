const fullScreenForm = document.getElementById(
  "full-screen-infrastructure-form"
);

const closeBtn = document.getElementById('close');

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
  document.querySelectorAll(".zone-pill").forEach((pill) => {
    pill.classList.remove("active");
  });

  element.classList.add("active");
  currentZoneFilter = zone;

  applyFilters();
}

function applyFilters() {
  const zoneCards = document.querySelectorAll(".zone-card");
  const noResults = document.getElementById("noResults");
  let visibleCount = 0;
  let totalCount = zoneCards.length - 1;

  zoneCards.forEach((card) => {
    if (card.id === "noResults") return;

    const zoneId = card.getAttribute("data-zone");
    const category = card.getAttribute("data-category");
    const performance = card.getAttribute("data-performance");
    const name = card.getAttribute("data-name").toLowerCase();

    let isVisible = true;

    if (currentZoneFilter !== "all" && zoneId !== currentZoneFilter) {
      isVisible = false;
    }

    if (currentCategoryFilter !== "all" && category !== currentCategoryFilter) {
      isVisible = false;
    }

    if (
      currentPerformanceFilter !== "all" &&
      performance !== currentPerformanceFilter
    ) {
      isVisible = false;
    }

    if (
      currentSearchFilter &&
      !name.includes(currentSearchFilter.toLowerCase())
    ) {
      isVisible = false;
    }

    if (isVisible) {
      card.classList.remove("hidden");
      visibleCount++;
    } else {
      card.classList.add("hidden");
    }
  });

  if (visibleCount === 0) {
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
  }

  updateZoneCount(visibleCount, totalCount);
}

function updateZoneCount(visible, total) {
  const zoneCount = document.getElementById("zoneCount");
  zoneCount.textContent = `Showing ${visible} of ${total} zones`;
}

function clearAllFilters() {
  currentZoneFilter = "all";
  currentCategoryFilter = "all";
  currentPerformanceFilter = "all";
  currentSearchFilter = "";

  document.getElementById("categoryFilter").value = "all";
  document.getElementById("performanceFilter").value = "all";
  document.getElementById("searchFilter").value = "";

  document.querySelectorAll(".zone-pill").forEach((pill) => {
    pill.classList.remove("active");
  });
  document.querySelector('[data-zone="all"]').classList.add("active");

  applyFilters();
}

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

document.addEventListener("DOMContentLoaded", function () {
  applyFilters();
});

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

const originalApplyFilters = applyFilters;
applyFilters = function () {
  originalApplyFilters();
  setTimeout(animateZoneCards, 50);
};

function toggleFiltersOnMobile() {
  const filtersSection = document.querySelector(".filters-section");
  const filtersGrid = document.querySelector(".filters-grid");
  const zonePills = document.querySelector(".zone-filter-pills");

  if (window.innerWidth <= CONFIG.BREAKPOINTS.MOBILE) {
    filtersGrid.style.gridTemplateColumns = "1fr";
    zonePills.style.justifyContent = "center";
  } else {
    filtersGrid.style.gridTemplateColumns = "1fr 1fr 1fr auto";
    zonePills.style.justifyContent = "flex-start";
  }
}

window.showInfrastructureForm = showInfrastructureForm;

window.addEventListener("load", toggleFiltersOnMobile);
window.addEventListener("resize", toggleFiltersOnMobile);
