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