  function getTechnicalDetails(siteId) {
    return (
      siteTechnicalDetails?.[siteId] ||
      siteTechnicalDetails?.["default"] || {
        installationDate: "2020-01-01",
        lastMaintenance: "2025-01-15",
        coverageArea: "Varies by facility",
        operatingHours: "24/7",
        serviceProvider: "Department of Finance Management System",
        lastInspection: "2025-02-28",
      }
    );
  }