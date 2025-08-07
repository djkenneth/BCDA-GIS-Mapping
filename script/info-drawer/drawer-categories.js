function getCategoryLabel(category, subcategory) {
  const categoryMappings = {
    Infrastructure: "Infrastructure",
    "Public Buildings": "Public Buildings",
    "Natural Features": "Natural Features",
    "Environmental Risks": "Environmental Risks",
    "Points of Interest": "Points of Interest",
    "Population Data": "Population Data",
    "Internet Access": "Internet Access",
    "Traffic Data": "Traffic Data",
    "National Broadband Project": "National Broadband Project",
  };

  return categoryMappings[category] || category;
}

function getPerformanceLabel(categoryName) {
  switch (categoryName) {
    case "Internet Access":
    case "Free Public Internet":
    case "National Broadband Project":
      return "Network Performance";
    case "Infrastructure":
      return "Infrastructure Analytics";
    case "Public Buildings":
      return "Building Analytics";
    case "Natural Features":
      return "Conservation Analytics";
    case "Environmental Risks":
      return "Risk Analytics";
    case "Points of Interest":
      return "Visitor Analytics";
    case "Population Data":
      return "Demographic Analytics";
    case "Traffic Data":
      return "Traffic Analytics";
    default:
      return "Performance Analytics";
  }
}

function getMaintenanceLabel(categoryName) {
  switch (categoryName) {
    case "Internet Access":
    case "Free Public Internet":
    case "National Broadband Project":
      return "Maintenance History";
    case "Infrastructure":
      return "Maintenance Records";
    case "Public Buildings":
      return "Building Maintenance";
    case "Natural Features":
      return "Conservation Records";
    case "Environmental Risks":
      return "Incident History";
    case "Points of Interest":
      return "Facility Records";
    case "Population Data":
      return "Data Updates";
    case "Traffic Data":
      return "Monitoring History";
    default:
      return "Activity History";
  }
}

function getNetworkLabel(categoryName) {
  switch (categoryName) {
    case "Internet Access":
    case "Free Public Internet":
    case "National Broadband Project":
      return "Network Info";
    case "Infrastructure":
      return "System Status";
    case "Public Buildings":
      return "Building Systems";
    case "Natural Features":
      return "Environmental Data";
    case "Environmental Risks":
      return "Risk Monitoring";
    case "Points of Interest":
      return "Facility Status";
    case "Population Data":
      return "Data Sources";
    case "Traffic Data":
      return "Traffic Monitoring";
    default:
      return "System Info";
  }
}

function getMaintenanceCategories() {
  return [
    "Internet Access",
    "Free Public Internet",
    "National Broadband Project",
    "Infrastructure",
    "Public Buildings",
    "Natural Features",
    "Environmental Risks",
    "Points of Interest",
    "Traffic Data",
  ];
}

function getNetworkCategories() {
  return [
    "Internet Access",
    "Free Public Internet",
    "National Broadband Project",
    "Infrastructure",
    "Public Buildings",
    "Natural Features",
    "Environmental Risks",
    "Points of Interest",
    "Population Data",
    "Traffic Data",
  ];
}
