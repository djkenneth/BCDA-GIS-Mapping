function downloadPDFReport(site, category) {
  try {
    if (
      typeof window.jspdf === "undefined" ||
      typeof window.jspdf.jsPDF === "undefined"
    ) {
      console.error("jsPDF library not found");
      alert(
        "PDF generation library is not available. Please ensure jsPDF is loaded."
      );
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();

    // Set document properties
    doc.setProperties({
      title: `${site.name} - Infrastructure Report`,
      subject: `${category.displayInfo.title} Executive Report`,
      author: "Department of Finance Management System",
      keywords: `infrastructure, ${category.displayInfo.title}, site report`,
      creator: "Dashboard System",
    });

    // Category-specific colors
    let headerColor = getCategoryColor(category.displayInfo.title);

    // Header Section
    doc.setFillColor(headerColor[0], headerColor[1], headerColor[2]);
    doc.rect(0, 0, 210, 30, "F");

    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("DEPARTMENT OF FINANCE", 105, 12, { align: "center" });
    doc.text("EXECUTIVE REPORT", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`${category.displayInfo.title} Analysis`, 105, 26, { align: "center" });

    let yPosition = 45;

    // Site Information Header
    doc.setFontSize(16);
    doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
    doc.text("SITE INFORMATION", 15, yPosition);

    // Add underline
    doc.setDrawColor(headerColor[0], headerColor[1], headerColor[2]);
    doc.setLineWidth(0.8);
    doc.line(15, yPosition + 2, 195, yPosition + 2);

    yPosition += 12;
    doc.setFontSize(11);
    doc.setTextColor(20, 20, 20);

    // Basic site information with enhanced formatting
    const basicInfo = [
      [`Site Name:`, site.name],
      [`Category:`, category.displayInfo.title],
      [`Subcategory:`, site.subcategory],
      [
        `Current Status:`,
        site.status.charAt(0).toUpperCase() + site.status.slice(1),
      ],
      [
        `Geographic Location:`,
        `${site.location[0].toFixed(6)}, ${site.location[1].toFixed(6)}`,
      ],
      [`Site Identifier:`, site.id],
      [`Report Generated:`, `${dateStr} at ${timeStr}`],
    ];

    basicInfo.forEach(([label, value], index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.text(label, 20, yPosition + index * 7);
      doc.setFont("helvetica", "normal");
      doc.text(value, 80, yPosition + index * 7);
    });

    yPosition += basicInfo.length * 7 + 15;

    // Description Section
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
    doc.text("SITE DESCRIPTION", 15, yPosition);
    doc.line(15, yPosition + 2, 195, yPosition + 2);

    yPosition += 10;
    doc.setFontSize(11);
    doc.setTextColor(20, 20, 20);

    const descriptionLines = doc.splitTextToSize(site.description, 175);
    doc.text(descriptionLines, 20, yPosition);
    yPosition += descriptionLines.length * 5 + 15;

    // Category-Specific Technical Details
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }

    const categorySpecificData = getCategorySpecificPDFData(
      category.displayInfo.title,
      site
    );

    doc.setFontSize(14);
    doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
    doc.text(categorySpecificData.technicalTitle, 15, yPosition);
    doc.line(15, yPosition + 2, 195, yPosition + 2);

    yPosition += 12;
    doc.setFontSize(10);
    doc.setTextColor(20, 20, 20);

    // Technical details in two columns for better space utilization
    const halfLength = Math.ceil(
      categorySpecificData.technicalDetails.length / 2
    );
    const leftColumn = categorySpecificData.technicalDetails.slice(
      0,
      halfLength
    );
    const rightColumn = categorySpecificData.technicalDetails.slice(halfLength);

    leftColumn.forEach(([label, value], index) => {
      if (yPosition + index * 7 > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.text(label, 20, yPosition + index * 7);
      doc.setFont("helvetica", "normal");
      doc.text(value, 75, yPosition + index * 7);
    });

    let rightYPosition = yPosition;
    rightColumn.forEach(([label, value], index) => {
      if (rightYPosition + index * 7 > 270) {
        doc.addPage();
        rightYPosition = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.text(label, 110, rightYPosition + index * 7);
      doc.setFont("helvetica", "normal");
      doc.text(value, 165, rightYPosition + index * 7);
    });

    yPosition += Math.max(leftColumn.length, rightColumn.length) * 7 + 15;

    // Performance Analytics Section
    if (yPosition > 180) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
    doc.text("PERFORMANCE ANALYTICS", 15, yPosition);
    doc.line(15, yPosition + 2, 195, yPosition + 2);

    yPosition += 12;
    doc.setFontSize(10);
    doc.setTextColor(20, 20, 20);

    const performanceMetrics = getCategoryPerformanceMetrics(
      category.displayInfo.title,
      site
    );

    performanceMetrics.forEach((metric, index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`• ${metric}`, 20, yPosition + index * 6);
    });

    yPosition += performanceMetrics.length * 6 + 15;

    // Operational Status Section
    if (yPosition > 180) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
    doc.text(categorySpecificData.statusTitle, 15, yPosition);
    doc.line(15, yPosition + 2, 195, yPosition + 2);

    yPosition += 12;
    doc.setFontSize(10);
    doc.setTextColor(20, 20, 20);

    categorySpecificData.statusDetails.forEach((detail, index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`• ${detail}`, 20, yPosition + index * 6);
    });

    yPosition += categorySpecificData.statusDetails.length * 6 + 15;

    // Maintenance & History Section
    if (yPosition > 150) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
    doc.text(categorySpecificData.maintenanceTitle, 15, yPosition);
    doc.line(15, yPosition + 2, 195, yPosition + 2);

    yPosition += 12;
    doc.setFontSize(10);
    doc.setTextColor(20, 20, 20);

    // const maintenanceData = getCategoryMaintenanceData(category.displayInfo.title, site);

    // maintenanceData.forEach((item, index) => {
    //   if (yPosition > 250) {
    //     doc.addPage();
    //     yPosition = 20;
    //   }

    //   doc.setFont("helvetica", "bold");
    //   doc.text(`${item.date} - ${item.type}`, 20, yPosition + index * 20);
    //   doc.setFont("helvetica", "normal");
    //   doc.text(
    //     `Technician: ${item.technician}`,
    //     20,
    //     yPosition + index * 20 + 5
    //   );
    //   doc.text(`Duration: ${item.duration}`, 20, yPosition + index * 20 + 10);

    //   const findingsLines = doc.splitTextToSize(
    //     `Findings: ${item.findings}`,
    //     160
    //   );
    //   doc.text(findingsLines, 20, yPosition + index * 20 + 15);
    // });

    // yPosition += maintenanceData.length * 20 + 20;

    // Strategic Recommendations Section
    if (yPosition > 180) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
    doc.text("STRATEGIC RECOMMENDATIONS", 15, yPosition);
    doc.line(15, yPosition + 2, 195, yPosition + 2);

    yPosition += 12;
    doc.setFontSize(10);
    doc.setTextColor(20, 20, 20);

    const recommendations = getCategoryRecommendations(category.displayInfo.title, site);

    recommendations.forEach((rec, index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      const recLines = doc.splitTextToSize(`${index + 1}. ${rec}`, 170);
      doc.text(recLines, 20, yPosition + index * 12);
    });

    yPosition += recommendations.length * 12 + 20;

    // Executive Summary Section
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
    doc.text("EXECUTIVE SUMMARY", 15, yPosition);
    doc.line(15, yPosition + 2, 195, yPosition + 2);

    yPosition += 12;
    doc.setFontSize(11);
    doc.setTextColor(20, 20, 20);

    const executiveSummary = getExecutiveSummary(category.displayInfo.title, site);
    const summaryLines = doc.splitTextToSize(executiveSummary, 175);
    doc.text(summaryLines, 20, yPosition);

    // Footer on all pages
    const pageCount = doc.getNumberOfPages();
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(`Page ${i} of ${pageCount}`, 15, 285);
      doc.text(`Department of Finance Management System`, 105, 285, {
        align: "center",
      });
      doc.text(`Generated: ${dateStr}`, 195, 285, { align: "right" });

      // Add classification footer
      doc.setFontSize(7);
      doc.text(
        `OFFICIAL USE - ${category.displayInfo.title.toUpperCase()} INFRASTRUCTURE REPORT`,
        105,
        292,
        { align: "center" }
      );
    }

    // Save the PDF with enhanced filename
    const sanitizedSiteName = site.name.replace(/[^a-zA-Z0-9]/g, "_");
    const sanitizedCategory = category.displayInfo.title.replace(/[^a-zA-Z0-9]/g, "_");
    const filename = `${
      site.id
    }_${sanitizedSiteName}_${sanitizedCategory}_Executive_Report_${
      now.toISOString().split("T")[0]
    }.pdf`;

    doc.save(filename);
  } catch (error) {
    console.error("Error generating enhanced PDF report:", error);
    alert(
      "Could not generate PDF report. Please check console for details and ensure jsPDF library is properly loaded."
    );
  }
}

// Helper function to get category-specific recommendations
function getCategoryRecommendations(categoryName, site) {
  const recommendations = {
    Infrastructure: [
      "Schedule concrete repair and protective coating for south wall within 3 months to prevent structural deterioration and extend infrastructure lifespan",
      "Implement IoT-based structural health monitoring system with real-time sensors to enable predictive maintenance and early problem detection",
      "Upgrade drainage systems with larger capacity pipes and smart flow control to handle increased rainfall intensity due to climate change",
      "Conduct comprehensive seismic resilience assessment and retrofitting as needed to meet updated building code requirements",
      "Develop 10-year infrastructure modernization plan including smart technology integration and sustainability improvements",
      "Establish emergency response protocols and backup systems to ensure continued operation during natural disasters or system failures",
    ],
    "Public Buildings": [
      "Continue monthly HVAC preventive maintenance program to maintain 85% efficiency rating and extend equipment lifespan by 30%",
      "Install comprehensive smart building automation system to reduce energy consumption by estimated 15% and improve occupant comfort",
      "Schedule elevator modernization project within 12 months to improve reliability, reduce maintenance costs, and enhance accessibility features",
      "Implement visitor management system with digital check-in to optimize space utilization and improve security monitoring",
      "Upgrade to LED lighting throughout building to reduce energy costs by 40% and improve lighting quality for occupants",
      "Develop building resilience plan including backup power, emergency systems, and climate adaptation measures",
    ],
    "Natural Features": [
      "Expand invasive species control program with quarterly monitoring and removal activities to maintain current biodiversity levels",
      "Install 4 additional wildlife monitoring cameras for comprehensive ecosystem surveillance and research data collection",
      "Develop interpretive trail system with educational markers and QR-code linked digital content to enhance visitor experience while promoting conservation awareness",
      "Create designated buffer zones around sensitive habitats with restricted access to minimize human impact on critical breeding and nesting areas",
      "Establish citizen science program engaging local community in biodiversity monitoring and conservation activities",
      "Implement climate change adaptation strategies including assisted migration of vulnerable species and habitat restoration",
    ],
    "Environmental Risks": [
      "Upgrade early warning system with AI-powered prediction capabilities to improve forecast accuracy from 87% to 95% for weather-related events",
      "Conduct quarterly community preparedness drills to maintain 85%+ readiness level and improve emergency response coordination",
      "Install 6 additional monitoring sensors in high-risk areas to provide comprehensive coverage and redundant data collection",
      "Develop comprehensive mobile application for real-time risk alerts, evacuation routes, and emergency information accessible to all residents",
      "Create community resilience hubs with emergency supplies, communication equipment, and trained volunteer coordinators",
      "Establish inter-agency coordination protocols with neighboring municipalities for regional disaster response and resource sharing",
    ],
    "Points of Interest": [
      "Expand WiFi infrastructure coverage by 25% to accommodate increasing digital engagement and support for 500+ concurrent users",
      "Install interactive digital kiosks with multilingual information systems, virtual reality experiences, and accessibility features",
      "Develop comprehensive virtual tour platform with 360-degree photography and augmented reality features to extend accessibility globally",
      "Create seasonal events calendar with cultural performances, educational workshops, and community engagement activities to increase return visitor rate to 75%",
      "Implement sustainable tourism practices including visitor impact monitoring, waste reduction programs, and eco-friendly transportation options",
      "Establish partnership with local universities for cultural research, preservation projects, and student internship programs",
    ],
    "Population Data": [
      "Implement real-time demographic tracking system using anonymized mobile data and IoT sensors for better urban planning and service delivery",
      "Increase survey participation to 85% through gamification, digital platforms, and community incentive programs",
      "Develop predictive analytics platform for population growth modeling, infrastructure needs assessment, and resource allocation planning",
      "Create public-facing community dashboard with real-time demographic insights, service utilization data, and quality of life indicators",
      "Establish data-driven policy development process using demographic insights to guide budget allocation and program development",
      "Implement privacy-preserving data collection methods and transparent data governance policies to maintain public trust",
    ],
    "National Broadband Project": [
      "Connect 12 additional educational institutions to expand digital access and support distance learning capabilities throughout the region",
      "Implement redundant fiber backbone connections with automatic failover to ensure 99.99% uptime for critical government services",
      "Develop comprehensive digital literacy programs targeting 5,000 residents to increase adoption rate from 86% to 95%",
      "Plan Phase 3 expansion to underserved rural communities within 25km radius to bridge the digital divide",
      "Establish local technical support center with trained staff for rapid response to connectivity issues and user support",
      "Create innovation hub with high-speed connectivity to support local startups, remote work, and digital entrepreneurship",
    ],
    "Traffic Data": [
      "Install AI-powered smart traffic signal system to improve traffic flow efficiency by 20% and reduce average commute times",
      "Implement automated incident detection system with camera analytics and sensor fusion for response times under 5 minutes",
      "Develop comprehensive traffic mobile application providing real-time conditions, route optimization, and public transit integration",
      "Coordinate with urban planning department to identify infrastructure improvements based on traffic data analysis and growth projections",
      "Establish integrated transportation management center connecting traffic data with public transit, parking, and emergency services",
      "Create sustainable transportation incentive program using traffic data to encourage public transit use and reduce congestion",
    ],
  };

  return (
    recommendations[categoryName] || [
      "Continue regular preventive maintenance schedule to ensure optimal performance and extend equipment lifespan",
      "Monitor key performance indicators monthly with quarterly trend analysis for continuous improvement opportunities",
      "Implement user feedback collection system to identify service gaps and enhancement opportunities",
      "Plan comprehensive annual review and technology upgrade assessment to maintain modern service standards",
      "Develop emergency response protocols and backup procedures to ensure service continuity during disruptions",
      "Establish performance benchmarking against similar facilities to identify best practices and improvement opportunities",
    ]
  );
}

// Helper function to generate executive summary
function getExecutiveSummary(categoryName, site) {
  const summaries = {
    Infrastructure: `This comprehensive infrastructure assessment of ${site.name} reveals a well-maintained facility operating at 86% condition rating, significantly above the city average. The infrastructure demonstrates excellent structural integrity, full safety compliance, and efficient resource utilization. Current performance metrics indicate sustainable long-term operation with proactive maintenance extending asset lifespan. Key recommendations focus on preventive concrete repair, IoT monitoring implementation, and climate resilience upgrades. The facility serves as a model for infrastructure management with its 99.8% service reliability and positive community impact. Investment in recommended improvements will ensure continued excellent performance and prepare the infrastructure for future growth demands.`,

    "Public Buildings": `${site.name} demonstrates exemplary public building management with 92% occupancy utilization and 4.7/5 user satisfaction rating. The facility achieves LEED Gold energy efficiency standards while maintaining 100% safety compliance over 18 consecutive months. Smart building systems contribute to 12% operational cost reduction and enhanced user experience. The building successfully balances high utilization with excellent maintenance standards, positioning it as a flagship public facility. Recommended HVAC continuation, smart automation expansion, and elevator modernization will maintain this excellence while preparing for increased demand. The facility's success model should be replicated across other public buildings in the city system.`,

    "Natural Features": `The ecological assessment of ${site.name} demonstrates exceptional conservation success with a biodiversity index of 7.8/10 and 92% ecosystem preservation rate. This 24.5-hectare preserve maintains excellent water quality, stable native species populations, and sustainable visitor management despite 15% annual visitor growth. The conservation program effectively balances environmental protection with public access and education. Wildlife monitoring systems provide valuable research data while invasive species management maintains ecosystem integrity. Recommended expansions in monitoring technology, educational infrastructure, and community engagement will enhance both conservation outcomes and visitor experience while serving as a model for urban environmental preservation.`,

    "Environmental Risks": `Risk management assessment for ${site.name} shows highly effective hazard mitigation with 95% early warning accuracy and 89% risk management success rate. The comprehensive monitoring system protects approximately 15,000 residents across 3.7 square kilometers with response times averaging 8.4 minutes. Community preparedness levels at 83% indicate strong public engagement and awareness. The integration with national disaster systems provides regional coordination capabilities. Recommended AI enhancement, sensor expansion, and mobile application development will further improve prediction accuracy and community resilience. This facility represents best practices in community risk management and emergency preparedness.`,

    "Points of Interest": `${site.name} excels as a premier cultural destination with 4.8/5 visitor satisfaction and 68% return rate, welcoming over 850,000 annual visitors. The facility successfully combines heritage preservation with modern amenities, achieving 89% digital engagement while maintaining 95% cultural authenticity. Comprehensive accessibility features and multilingual services ensure inclusive access. Economic impact analysis shows significant contribution to local tourism economy. Recommended WiFi expansion, virtual reality integration, and seasonal programming will enhance visitor experience while supporting sustainable tourism growth. The facility serves as a model for heritage site management and community cultural preservation.`,

    "Population Data": `Demographic analysis of ${site.name} reveals a dynamic community of 68,750 residents with balanced age distribution and strong educational attainment. The 74% survey participation rate provides high-quality data supporting evidence-based policy development. Community engagement metrics show 82% public service utilization and 91% digital connectivity, indicating strong civic participation and modern infrastructure access. The 1.8% annual growth rate and rising quality of life index (7.2/10) demonstrate positive community trends. Recommended real-time tracking systems, predictive analytics, and public dashboards will enhance data-driven governance while maintaining resident privacy and trust.`,

    "Internet Access": `Network performance analysis for ${site.name} demonstrates exceptional public internet service with 99.8% uptime and 95 Mbps average speeds, significantly exceeding minimum commitments. The system successfully serves 350 concurrent users with 4.6/5 satisfaction rating, providing crucial digital access to the community. Technical infrastructure proves robust with redundant systems and proactive maintenance protocols. Cost efficiency at ₱12.50 per user daily provides excellent public value. Recommended Wi-Fi 6 upgrades, coverage expansion, and digital literacy programs will enhance service capacity and community impact while maintaining the high performance standards established.`,

    "National Broadband Project": `The NBP implementation at ${site.name} achieves outstanding connectivity with 99.95% uptime and 86% user adoption across target institutions. This Phase 2 deployment successfully connects 8 educational institutions and 12 government offices with 10 Gbps backbone capacity. The project demonstrates significant economic impact with estimated ₱2.3M annual community benefit. Integration with existing infrastructure proves seamless with full government network connectivity achieved. Recommended Phase 3 expansion, digital literacy programming, and technical support center establishment will maximize the project's transformational impact on regional digital equity and economic development.`,

    "Traffic Data": `Traffic monitoring analysis for ${site.name} provides comprehensive transportation insights with 99.8% data accuracy across 18,500 daily vehicle movements. The system successfully identifies traffic patterns, peak congestion periods, and optimization opportunities while maintaining real-time data processing capabilities. Current congestion levels remain manageable with 78% flow efficiency during peak periods. Integration with city traffic management systems enables coordinated response to incidents and planned events. Recommended smart signal implementation, AI-powered analytics, and public information systems will transform raw data into actionable traffic improvements and enhanced mobility for residents and visitors.`,
  };

  return (
    summaries[categoryName] ||
    `Assessment of ${site.name} shows a well-managed facility operating within established parameters with good performance metrics and user satisfaction. The facility demonstrates reliable service delivery, appropriate maintenance standards, and compliance with relevant regulations. Current operational status meets community needs while providing room for enhancement through recommended improvements. Regular monitoring and proactive maintenance ensure continued service quality and preparation for future growth. This facility contributes positively to the city's infrastructure portfolio and serves as a foundation for continued community development.`
  );
}

// Helper function to get category-specific colors
function getCategoryColor(categoryName) {
  const colors = {
    Infrastructure: [41, 128, 185],
    "Public Buildings": [39, 174, 96],
    "Natural Features": [46, 204, 113],
    "Environmental Risks": [231, 76, 60],
    "Points of Interest": [155, 89, 182],
    "Population Data": [243, 156, 18],
    "Internet Access": [52, 152, 219],
    "Free Public Internet": [52, 152, 219],
    "National Broadband Project": [26, 188, 156],
    "Traffic Data": [230, 126, 34],
  };
  return colors[categoryName] || [52, 73, 94];
}

// Helper function to get category-specific PDF data
function getCategorySpecificPDFData(categoryName, site) {
  const technicalDetails = getTechnicalDetails(site.id);

  switch (categoryName) {
    case "Infrastructure":
      return {
        technicalTitle: "INFRASTRUCTURE SPECIFICATIONS",
        technicalDetails: [
          [
            "Construction Date:",
            technicalDetails.installationDate || "2018-2020",
          ],
          ["Engineering Standard:", "ISO 12944-5:2018"],
          ["Material Composition:", "Reinforced Concrete & Steel"],
          ["Design Capacity:", "250,000 users daily"],
          ["Current Age:", "5-7 years"],
          ["Expected Lifespan:", "45-50 years"],
          [
            "Coverage Area:",
            technicalDetails.coverageArea || "Metropolitan area",
          ],
          ["Structural Condition:", "86% (Excellent)"],
          ["Safety Compliance:", "100% Certified"],
          ["Environmental Rating:", "Grade A"],
          ["Maintenance Schedule:", "Quarterly inspections"],
          [
            "Responsible Agency:",
            technicalDetails.serviceProvider || "Cebu City Engineering Dept.",
          ],
        ],
        statusTitle: "INFRASTRUCTURE OPERATIONAL STATUS",
        statusDetails: [
          "Structural integrity monitoring: Real-time sensors active",
          "Primary power supply: Grid connection stable",
          "Water supply systems: Fully operational and tested",
          "Data network connectivity: High-speed fiber active",
          "Emergency backup systems: Tested monthly, 100% operational",
          "Safety systems: Fire suppression, evacuation routes certified",
          "Environmental controls: Air quality and noise within limits",
          "Access control: Security systems operational 24/7",
        ],
        maintenanceTitle: "INFRASTRUCTURE MAINTENANCE RECORDS",
      };

    case "Public Buildings":
      return {
        technicalTitle: "BUILDING SPECIFICATIONS",
        technicalDetails: [
          ["Year Built:", technicalDetails.installationDate || "2015-2018"],
          ["Total Floor Area:", "10,540 sq. meters"],
          ["Number of Floors:", "5 floors"],
          ["Occupancy Capacity:", "1,200 persons"],
          ["Building Classification:", site.subcategory],
          [
            "Operating Schedule:",
            technicalDetails.operatingHours || "8:00 AM - 5:00 PM",
          ],
          ["Accessibility Features:", "Full ADA compliance"],
          ["Energy Rating:", "LEED Gold Certified"],
          ["Fire Safety Rating:", "Class A"],
          ["Seismic Rating:", "Zone 4 Compliant"],
          ["HVAC System:", "Central air, 85% efficiency"],
          [
            "Managing Authority:",
            technicalDetails.serviceProvider || "Cebu City Administration",
          ],
        ],
        statusTitle: "BUILDING SYSTEMS STATUS",
        statusDetails: [
          "HVAC systems: Operational at 85% efficiency, recently serviced",
          "Fire safety systems: All detectors, alarms, and sprinklers active",
          "Elevator systems: 4 units operational, monthly safety inspections",
          "Backup generator: 500kW capacity, tested weekly",
          "Security systems: 24/7 monitoring, CCTV coverage complete",
          "Building automation: Smart systems managing lighting and climate",
          "Emergency systems: Evacuation routes clear, emergency lighting tested",
          "Telecommunications: High-speed internet and phone systems active",
        ],
        maintenanceTitle: "BUILDING MAINTENANCE HISTORY",
      };

    case "Natural Features":
      return {
        technicalTitle: "CONSERVATION SPECIFICATIONS",
        technicalDetails: [
          ["Protected Area Size:", "24.5 hectares"],
          ["Elevation Range:", "120-350 meters above sea level"],
          ["Climate Classification:", "Tropical monsoon"],
          ["Primary Ecosystem:", "Riparian Forest"],
          ["Protection Status:", "City-designated nature preserve"],
          ["Biodiversity Index:", "7.8/10 (High)"],
          ["Native Species Count:", "78 catalogued species"],
          ["Endangered Species:", "3 species under protection"],
          ["Water Quality Rating:", "Excellent (Class A)"],
          ["Air Quality Index:", "Good (42 AQI)"],
          ["Conservation Priority:", "High priority preservation zone"],
          [
            "Managing Agency:",
            technicalDetails.serviceProvider || "Cebu Environment Office",
          ],
        ],
        statusTitle: "ECOLOGICAL HEALTH STATUS",
        statusDetails: [
          "Biodiversity monitoring: High species diversity maintained",
          "Water quality systems: 3 monitoring stations active",
          "Invasive species control: Minimal presence, active management",
          "Wildlife monitoring: 6 camera traps recording continuously",
          "Trail maintenance: All visitor paths well-maintained and safe",
          "Soil conservation: Erosion control measures effective",
          "Vegetation health: Native flora thriving, restoration ongoing",
          "Visitor impact management: Low impact, sustainable tourism practices",
        ],
        maintenanceTitle: "CONSERVATION ACTIVITY RECORDS",
      };

    case "Environmental Risks":
      return {
        technicalTitle: "RISK ASSESSMENT SPECIFICATIONS",
        technicalDetails: [
          ["Primary Risk Type:", site.subcategory],
          [
            "Current Risk Level:",
            site.status === "critical"
              ? "High"
              : site.status === "warning"
              ? "Medium"
              : "Low",
          ],
          ["Affected Geographic Area:", "3.7 sq. kilometers"],
          ["Population at Risk:", "~15,000 residents"],
          ["Monitoring Sensor Network:", "12 active units"],
          ["Early Warning Range:", "5 km radius coverage"],
          ["Response Time Target:", "< 5 minutes"],
          ["Risk Probability:", "Moderate (seasonal)"],
          ["Historical Frequency:", "5 incidents in past 3 years"],
          ["Mitigation Effectiveness:", "89% success rate"],
          ["Community Preparedness:", "83% awareness level"],
          [
            "Managing Agency:",
            technicalDetails.serviceProvider || "Cebu DRRMO",
          ],
        ],
        statusTitle: "HAZARD MONITORING STATUS",
        statusDetails: [
          "Early warning system: Operational with AI-powered predictions",
          "Real-time sensor network: 12/12 sensors online and calibrated",
          "Community alert system: SMS, radio, and mobile app notifications",
          "Emergency response teams: 24/7 standby with 5-minute response time",
          "Data integration: Connected to PAGASA and NDRRMC systems",
          "Public awareness programs: Regular drills and education campaigns",
          "Evacuation routes: Clearly marked and regularly maintained",
          "Emergency supplies: Strategic stockpiles maintained at 3 locations",
        ],
        maintenanceTitle: "INCIDENT AND RESPONSE HISTORY",
      };

    case "Points of Interest":
      return {
        technicalTitle: "FACILITY SPECIFICATIONS",
        technicalDetails: [
          ["Establishment Date:", technicalDetails.installationDate || "2015"],
          ["Total Site Area:", "4.2 hectares"],
          ["Facility Classification:", site.subcategory],
          ["Daily Operating Hours:", "9:00 AM - 8:00 PM"],
          ["Peak Visitor Capacity:", "2,500 daily average"],
          ["Peak Operating Hours:", "2:00 PM - 5:00 PM"],
          [
            "Ownership Type:",
            site.subcategory.includes("Community") ? "Public" : "Private",
          ],
          ["Accessibility Rating:", "Full universal access"],
          ["Heritage Status:", "Culturally significant site"],
          ["Tourism Category:", "Major attraction"],
          ["Annual Visitor Count:", "850,000+ visitors"],
          [
            "Managing Authority:",
            technicalDetails.serviceProvider || "Cebu Tourism Office",
          ],
        ],
        statusTitle: "VISITOR SERVICES STATUS",
        statusDetails: [
          "WiFi infrastructure: High-speed internet (50 Mbps) available",
          "Audio guide systems: Available in 12 languages",
          "Security monitoring: 8 CCTV cameras with 24/7 coverage",
          "Emergency response: 4 strategically located emergency stations",
          "Digital visitor tracking: Real-time occupancy monitoring",
          "Accessibility services: Wheelchair access, audio descriptions",
          "Information services: Multi-lingual staff and digital displays",
          "Gift shop and amenities: Full visitor services operational",
        ],
        maintenanceTitle: "FACILITY MAINTENANCE RECORDS",
      };

    case "Population Data":
      return {
        technicalTitle: "DEMOGRAPHIC PROFILE SPECIFICATIONS",
        technicalDetails: [
          ["Geographic Classification:", site.subcategory],
          ["Total Population Count:", "68,750 residents"],
          ["Population Density:", "12,500 people per km²"],
          ["Annual Growth Rate:", "1.8% (above national average)"],
          ["Median Age:", "28.5 years"],
          ["Average Household Size:", "4.2 persons"],
          ["Survey Response Rate:", "74% participation"],
          ["Data Accuracy Level:", "95% confidence"],
          ["Census Methodology:", "Door-to-door + digital"],
          ["Update Frequency:", "Monthly updates, annual census"],
          ["Privacy Compliance:", "DPA compliant data handling"],
          [
            "Data Source Authority:",
            technicalDetails.serviceProvider || "PSA + Local Records",
          ],
        ],
        statusTitle: "COMMUNITY DEMOGRAPHIC INDICATORS",
        statusDetails: [
          "Age distribution: Balanced with 38% in prime working age (20-39)",
          "Education levels: 32% tertiary educated, 8% post-graduate",
          "Digital connectivity: 91% have regular internet access",
          "Public service utilization: 82% actively use city services",
          "Community program participation: 65% engage in local programs",
          "Economic indicators: Rising middle-class population",
          "Health metrics: Above-average life expectancy and wellness",
          "Quality of life index: 7.2/10 based on resident surveys",
        ],
        maintenanceTitle: "DATA COLLECTION HISTORY",
      };

    case "Internet Access":
    case "Free Public Internet":
      return {
        technicalTitle: "NETWORK INFRASTRUCTURE SPECIFICATIONS",
        technicalDetails: [
          [
            "Installation Date:",
            technicalDetails.installationDate || "2022-2023",
          ],
          ["Connection Technology:", "Fiber Optic Backbone"],
          ["Bandwidth Capacity:", "1 Gbps dedicated"],
          ["Average Download Speed:", "95 Mbps"],
          ["Average Upload Speed:", "45 Mbps"],
          ["Coverage Radius:", technicalDetails.coverageArea || "500 meters"],
          ["Operating Schedule:", "24/7 continuous service"],
          ["Maximum Concurrent Users:", "350 simultaneous connections"],
          ["Network Uptime:", "99.8% availability"],
          ["Security Protocol:", "WPA3 encryption"],
          ["Bandwidth Management:", "Fair usage policy implemented"],
          [
            "Service Provider:",
            technicalDetails.serviceProvider || "DICT Philippines",
          ],
        ],
        statusTitle: "NETWORK OPERATIONAL STATUS",
        statusDetails: [
          "Network availability: 99.8% uptime with redundant connections",
          "Signal strength: Excellent coverage (-65 dBm average)",
          "Latency performance: 18ms average response time",
          "Current device load: 8 active connections (normal load)",
          "Bandwidth utilization: 78% of capacity during peak hours",
          "User satisfaction: 4.6/5 rating from regular users",
          "Security status: No breaches, regular security updates applied",
          "Equipment status: All hardware operational, backup systems ready",
        ],
        maintenanceTitle: "NETWORK MAINTENANCE RECORDS",
      };

    case "National Broadband Project":
      return {
        technicalTitle: "NBP INFRASTRUCTURE SPECIFICATIONS",
        technicalDetails: [
          ["Project Phase:", "Phase 2 (2023-2025)"],
          ["Network Node Type:", site.subcategory],
          ["Bandwidth Capacity:", "10 Gbps backbone"],
          [
            "Coverage Radius:",
            technicalDetails.coverageArea || "3.2 km radius",
          ],
          ["Connection Technology:", "Fiber Optic Network"],
          ["Power Infrastructure:", "Grid + Solar backup system"],
          ["Connected Institutions:", "Educational (8), Government (12)"],
          ["Public Access Points:", "24 locations operational"],
          ["Network Reliability:", "99.95% uptime target"],
          ["Deployment Status:", "85% complete"],
          ["Integration Level:", "Full government network integration"],
          ["Project Authority:", "DICT - National Broadband Program"],
        ],
        statusTitle: "NETWORK CONNECTIVITY STATUS",
        statusDetails: [
          "Backbone connection: Active fiber link to national network",
          "Last mile distribution: Operational to all target locations",
          "Government network integration: 100% of offices connected",
          "Educational institution connectivity: 8 schools online",
          "Public WiFi access: 24 hotspots providing free internet",
          "Network performance: 99.95% availability maintained",
          "User adoption rate: 86% of target population using services",
          "Technical support: 24/7 monitoring and rapid response team",
        ],
        maintenanceTitle: "DEPLOYMENT AND MAINTENANCE HISTORY",
      };

    case "Traffic Data":
      return {
        technicalTitle: "TRAFFIC MONITORING SPECIFICATIONS",
        technicalDetails: [
          [
            "Monitoring Start Date:",
            technicalDetails.installationDate || "2023",
          ],
          ["Sensor Technology:", "Inductive loop + Camera system"],
          ["Data Collection Interval:", "Real-time every 30 seconds"],
          ["Average Daily Volume:", "18,500 vehicles"],
          ["Peak Traffic Hours:", "7-9 AM, 5-7 PM weekdays"],
          ["Data Accuracy Rate:", "99.8% measurement precision"],
          [
            "Current Congestion Level:",
            site.status === "critical" ? "High" : "Medium",
          ],
          ["Speed Monitoring Range:", "5-80 km/h detection"],
          ["Vehicle Classification:", "Cars, trucks, motorcycles, buses"],
          ["Weather Compensation:", "Auto-adjust for conditions"],
          ["Storage Capacity:", "2 years historical data"],
          [
            "Managing Authority:",
            technicalDetails.serviceProvider || "Cebu Traffic Management",
          ],
        ],
        statusTitle: "TRAFFIC MONITORING SYSTEM STATUS",
        statusDetails: [
          "Traffic sensor array: 6 units active with redundant coverage",
          "Data processing: Real-time analytics with trend prediction",
          "Alert system: Automated congestion warnings operational",
          "Current traffic volume: 1,847 vehicles/hour (normal flow)",
          "Average speed monitoring: 45 km/h in monitored zone",
          "Incident detection: Automated accident/breakdown alerts",
          "Data integration: Connected to city traffic management center",
          "Public information: Real-time updates via mobile apps and signs",
        ],
        maintenanceTitle: "TRAFFIC MONITORING HISTORY",
      };

    default:
      return {
        technicalTitle: "TECHNICAL SPECIFICATIONS",
        technicalDetails: [
          ["Installation Date:", technicalDetails.installationDate || "N/A"],
          ["System Type:", site.subcategory || "General Infrastructure"],
          ["Last Maintenance:", technicalDetails.lastMaintenance || "N/A"],
          ["Coverage Area:", technicalDetails.coverageArea || "N/A"],
          ["Operating Schedule:", technicalDetails.operatingHours || "N/A"],
          ["Service Provider:", technicalDetails.serviceProvider || "N/A"],
          ["Last Inspection:", technicalDetails.lastInspection || "N/A"],
          [
            "Operational Status:",
            site.status.charAt(0).toUpperCase() + site.status.slice(1),
          ],
          ["Maintenance Schedule:", "Regular as needed"],
          ["Performance Rating:", "Standard operational level"],
          ["Compliance Status:", "Meets all requirements"],
          ["Responsible Authority:", "Cebu City Government"],
        ],
        statusTitle: "OPERATIONAL STATUS",
        statusDetails: [
          "System status: Operational and within normal parameters",
          "Connectivity: Active connection to city networks",
          "Data quality: High accuracy and reliability maintained",
          "Performance: Meeting established service level agreements",
          "Maintenance: Regular schedule maintained",
          "Compliance: All regulatory requirements met",
          "Monitoring: Continuous oversight and reporting",
          "User services: Available and functioning as designed",
        ],
        maintenanceTitle: "ACTIVITY HISTORY",
      };
  }
}

// Helper function to get category-specific performance metrics
function getCategoryPerformanceMetrics(categoryName, site) {
  const baseMetrics = {
    Infrastructure: [
      "Structural condition rating: 86% (Excellent) - Above city average of 78%",
      "Maintenance efficiency: 92% improvement over 3-year period",
      "Service utilization rate: 78% of design capacity during peak periods",
      "Safety compliance: 100% certified with zero incidents in past 24 months",
      "Environmental impact assessment: Minimal negative impact, Grade A rating",
      "Public satisfaction score: 4.5/5 from quarterly user surveys",
      "Cost efficiency: 12% under budget with enhanced service delivery",
      "Infrastructure resilience: Exceeds seismic and weather resistance standards",
    ],
    "Public Buildings": [
      "Current occupancy utilization: 92% (High efficiency, optimal space usage)",
      "Energy efficiency performance: 85% (LEED Gold standard compliance)",
      "Operational cost reduction: 12% year-over-year through smart systems",
      "User satisfaction rating: 4.7/5 (Excellent) from monthly feedback surveys",
      "Safety incident rate: 0% (Perfect safety record for 18 consecutive months)",
      "Accessibility compliance: 100% ADA compliant with universal design features",
      "Technology integration: Smart building systems reduce energy consumption by 15%",
      "Maintenance cost per sq ft: ₱12.50 (20% below city average)",
    ],
    "Natural Features": [
      "Biodiversity health index: 7.8/10 (High) - stable ecosystem with increasing species count",
      "Water quality assessment: Good (92%) - exceeds national standards for protected areas",
      "Ecosystem preservation rate: 92% of original habitat intact and thriving",
      "Visitor impact sustainability: Low environmental impact maintained despite 15% visitor increase",
      "Conservation program effectiveness: High success rate in species protection",
      "Species population trends: Stable to increasing for 85% of monitored species",
      "Trail system condition: Excellent with minimal erosion and full accessibility",
      "Community engagement: 78% local participation in conservation programs",
    ],
    "Environmental Risks": [
      "Early warning system effectiveness: 95% accuracy in hazard prediction",
      "Community preparedness level: 83% of population trained in emergency response",
      "Average emergency response time: 8.4 minutes (exceeds 15-minute target)",
      "Risk mitigation success rate: 89% of identified risks successfully managed",
      "Public awareness and education: High (78%) community knowledge of risks and procedures",
      "Sensor network reliability: 99.2% uptime with redundant monitoring systems",
      "Incident prediction accuracy: 87% for weather-related events",
      "Community drill participation: 65% participation in quarterly emergency exercises",
    ],
    "Points of Interest": [
      "Visitor satisfaction rating: 4.8/5 (Outstanding) - highest in regional tourism survey",
      "Average visit duration: 72 minutes (exceeds target of 60 minutes)",
      "Return visitor rate: 68% (indicating high visitor loyalty and satisfaction)",
      "Digital engagement level: 89% of visitors use digital services and guides",
      "Facility condition rating: Excellent with proactive maintenance program",
      "Accessibility service rating: Good (90%) with ongoing improvements planned",
      "Economic impact: ₱125 average revenue per visitor contributing to local economy",
      "Cultural preservation score: 95% authentic experience maintained despite modernization",
    ],
    "Population Data": [
      "Survey participation rate: 74% (exceeds national average of 65%)",
      "Data collection accuracy: 95% confidence level with statistical validation",
      "Public service utilization: 82% of residents actively use city services",
      "Community program engagement: 65% participation in local government programs",
      "Digital literacy and access: 91% have regular internet access and digital skills",
      "Quality of life index: 7.2/10 based on comprehensive resident satisfaction surveys",
      "Economic mobility indicators: 6.8/10 showing positive trends in income growth",
      "Healthcare access: 89% have access to quality healthcare within 5km radius",
    ],
    "Internet Access": [
      "Network availability: 99.8% uptime (exceeds SLA of 99.5%)",
      "Average download speed: 95 Mbps (90% faster than minimum commitment)",
      "Average upload speed: 45 Mbps (supporting video calls and cloud services)",
      "Peak concurrent users: 350 (meeting maximum design capacity)",
      "User satisfaction rating: 4.6/5 from monthly user experience surveys",
      "Connection reliability: 99.2% stable connections with minimal dropouts",
      "Coverage effectiveness: 92% of target area receives excellent signal strength",
      "Support response time: Average 15 minutes for technical issues resolution",
    ],
    "Free Public Internet": [
      "Network availability: 99.8% uptime providing consistent free internet access",
      "Average connection speed: 95 Mbps download enabling full web functionality",
      "Daily active users: 280 average with peaks of 450 during events",
      "Peak usage periods: 2-6 PM (students) and 7-10 PM (general public)",
      "User satisfaction: 4.6/5 rating for free public internet service quality",
      "Data usage per session: 450 MB average supporting educational and business needs",
      "Service cost efficiency: ₱12.50 per user per day (excellent public value)",
      "Digital inclusion impact: 78% report improved access to online services and education",
    ],
    "National Broadband Project": [
      "Network availability: 99.95% uptime (exceeds national target of 99.9%)",
      "Bandwidth utilization: 78% average with capacity for growth",
      "User adoption rate: 86% of target institutions and residents connected",
      "Service quality rating: 4.7/5 from government and educational users",
      "Connection reliability: 99.9% with redundant fiber backbone",
      "Government integration: 100% of targeted government offices connected",
      "Educational connectivity: 8 schools connected with full internet access",
      "Economic impact: Estimated ₱2.3M annual economic benefit to local community",
    ],
    "Traffic Data": [
      "Average daily traffic volume: 18,500 vehicles (within sustainable capacity)",
      "Peak hour congestion index: Medium (manageable with current infrastructure)",
      "Traffic flow efficiency: 78% (good flow with minor bottlenecks during rush hour)",
      "Incident response time: 12 minutes average (meeting city standards)",
      "Data collection accuracy: 99.8% precision in vehicle counting and classification",
      "Sensor network uptime: 99.5% operational availability",
      "Traffic signal optimization: 15% improvement in flow efficiency through AI analytics",
      "Air quality correlation: Traffic-related emissions within acceptable limits",
    ],
  };

  return (
    baseMetrics[categoryName] || [
      "Overall performance rating: 87% (Good) - meeting established benchmarks",
      "Operational efficiency: 92% - optimized resource utilization",
      "Maintenance compliance: 98% - proactive maintenance program",
      "User satisfaction: 4.5/5 - positive community feedback",
      "System reliability: 99.2% - consistent service delivery",
      "Cost effectiveness: Within budget with value-added services",
      "Performance improvement: 8% year-over-year enhancement",
      "Future readiness: Infrastructure prepared for next 10 years of growth",
    ]
  );
}

// Helper function to get category-specific report sections
function getCategorySpecificReportSections(categoryName) {
  const sections = {
    Infrastructure: [
      "Structural Engineering Specifications",
      "Infrastructure Performance Metrics",
      "System Status & Connectivity",
      "Maintenance & Inspection Records",
    ],
    "Public Buildings": [
      "Building Specifications & Capacity",
      "Occupancy & Utilization Analytics",
      "Building Systems Status",
      "Facility Maintenance History",
    ],
    "Natural Features": [
      "Conservation Specifications",
      "Biodiversity & Ecological Health",
      "Environmental Monitoring Data",
      "Conservation Activity Records",
    ],
    "Environmental Risks": [
      "Risk Assessment & Classification",
      "Hazard Monitoring Performance",
      "Early Warning System Status",
      "Incident & Response History",
    ],
    "Points of Interest": [
      "Facility Specifications & Services",
      "Visitor Analytics & Engagement",
      "Operational Status & Amenities",
      "Maintenance & Events History",
    ],
    "Population Data": [
      "Demographic Profile & Statistics",
      "Community Engagement Metrics",
      "Data Quality & Collection Status",
      "Survey & Census History",
    ],
    "Internet Access": [
      "Network Infrastructure Specifications",
      "Connectivity Performance Metrics",
      "Service Status & Reliability",
      "Network Maintenance Records",
    ],
    "National Broadband Project": [
      "NBP Infrastructure Specifications",
      "Network Performance & Adoption",
      "Connectivity Status & Integration",
      "Deployment & Maintenance History",
    ],
    "Traffic Data": [
      "Traffic Monitoring Infrastructure",
      "Traffic Analytics & Flow Data",
      "Monitoring System Status",
      "Data Collection History",
    ],
  };

  return (
    sections[categoryName] || [
      "Technical Specifications",
      "Performance Analytics",
      "Operational Status",
      "Activity History",
    ]
  );
}

function loadDownloadReportContent(site, category) {
  const content = document.getElementById("download-report-content");
  if (content) {
    content.innerHTML = `
        <h4>Generate Comprehensive Report</h4>
        <p>Generate a detailed executive report for <strong>${
          site.name
        }</strong> including all technical specifications, performance analytics, maintenance history, and strategic recommendations.</p>
        
        <div class="report-preview-section" style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px;">
          <h5 style="margin-bottom: 10px; color: #FAD754;">Report Contents:</h5>
          <ul style="margin: 0; padding-left: 20px; color: rgba(255,255,255,0.8);">
            <li>Site Information & Classification</li>
            <li>${getCategorySpecificReportSections(category.displayInfo.title).join(
              "</li><li>"
            )}</li>
            <li>Strategic Recommendations</li>
          </ul>
        </div>
        
        <div class="site-actions">
          <div class="site-actions-row">
            <button class="btn-primary" id="generate-report-btn" style="width: 100%; padding: 12px; border-radius: 5px; border: none; cursor: pointer; font-weight: 500; background-color: #FAD754; color: #000;">
              <span style="margin-right: 8px;"></span>Generate Executive Report
            </button>
          </div>
        </div>
      `;

    const generateReportBtn = document.getElementById("generate-report-btn");
    if (generateReportBtn) {
      generateReportBtn.addEventListener("click", function () {
        // Show loading state
        const originalText = generateReportBtn.innerHTML;
        generateReportBtn.innerHTML =
          '<span style="margin-right: 8px;">⏳</span>Generating Report...';
        generateReportBtn.disabled = true;

        // Generate PDF report
        setTimeout(() => {
          downloadPDFReport(site, category);

          // Reset button state
          generateReportBtn.innerHTML = originalText;
          generateReportBtn.disabled = false;
        }, 800);
      });
    }
  }
}
