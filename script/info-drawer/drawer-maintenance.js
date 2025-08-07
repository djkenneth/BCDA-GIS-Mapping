function getFirstButtonLabel(category) {
  switch (category) {
    case "Internet Access":
    case "Free Public Internet":
      return "Maintenance History";
    default:
      return "Performance Analytics";
  }
}
