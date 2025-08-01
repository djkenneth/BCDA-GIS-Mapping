// script/data.js

const apps = [
  {
    name: "Guardian (UAC)",
    icon: "guardian-icon.png",
    url: "https://dict.itbsstudio.com/GUARDIAN/login",
  },
  {
    name: "NERVE",
    icon: "nerve-icon.png",
    url: "https://dict.itbsstudio.com/NERVE/MainDashboard",
  },
  {
    name: "LEDGER",
    icon: "ledger-icon.png",
    url: "https://dict.itbsstudio.com/LEDGER/login",
  },
  {
    name: "Pulse",
    icon: "pulse-icon.png",
    url: "https://dict.itbsstudio.com/PULSE/login",
  },
];

const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Maintenance Alert",
    message:
      "Scheduled maintenance for Cebu Infrastractrue 1 tomorrow at 10:00 AM.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    title: "Power Fluctuation",
    message: "Minor power fluctuations detected at Cebu Infrastractrue 2.",
    time: "3 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "System Update",
    message: "Infrastractrue monitoring system updated to version 2.4.1",
    time: "1 day ago",
    read: true,
  },
  {
    id: 4,
    type: "success",
    title: "Maintenance Complete",
    message:
      "Routine maintenance for Cebu Infrastractrue 3 completed successfully.",
    time: "2 days ago",
    read: true,
  },
];

const siteTechnicalDetails = {
  // Infrastructure
  roads_01: {
    installationDate: "2018-06-12",
    lastMaintenance: "2025-01-15",
    coverageArea: "3.2 km linear distance",
    operatingHours: "24/7",
    serviceProvider: "DPWH Cebu City",
    lastInspection: "2025-02-03",
  },
  highways_01: {
    installationDate: "2022-04-28",
    lastMaintenance: "2024-11-10",
    coverageArea: "8.9 km total length",
    operatingHours: "24/7",
    serviceProvider: "CCLEX Corporation",
    lastInspection: "2025-03-18",
  },
  transport_01: {
    installationDate: "2020-09-15",
    lastMaintenance: "2025-02-18",
    coverageArea: "12.4 km route length",
    operatingHours: "5:00-22:00",
    serviceProvider: "Cebu Public Transport Authority",
    lastInspection: "2025-04-02",
  },
  water_utility_01: {
    installationDate: "2019-03-10",
    lastMaintenance: "2025-03-18",
    coverageArea: "80% of Cebu City",
    operatingHours: "24/7",
    serviceProvider: "Metropolitan Cebu Water District (MCWD)",
    lastInspection: "2025-03-18",
  },

  // Public Buildings
  hospital_01: {
    installationDate: "2015-08-22",
    lastMaintenance: "2025-01-20",
    coverageArea: "350-bed capacity",
    operatingHours: "24/7",
    serviceProvider: "Cebu City Health Department",
    lastInspection: "2025-02-15",
  },
  school_01: {
    installationDate: "2012-06-15",
    lastMaintenance: "2024-12-10",
    coverageArea: "1,200 student capacity",
    operatingHours: "7:00-17:00 Mon-Fri",
    serviceProvider: "Department of Education - Cebu",
    lastInspection: "2025-01-05",
  },
  govt_01: {
    installationDate: "1937-02-24 (renovated 2019)",
    lastMaintenance: "2025-02-12",
    coverageArea: "Central administration for Cebu City",
    operatingHours: "8:00-17:00 Mon-Fri",
    serviceProvider: "Cebu City Government",
    lastInspection: "2025-03-01",
  },

  // Natural Features
  waterway_01: {
    installationDate: "N/A (Natural feature, monitoring since 2010)",
    lastMaintenance: "2025-01-08 (cleanup operation)",
    coverageArea: "6.5 km river length",
    operatingHours: "24/7 monitoring",
    serviceProvider: "Cebu Environment and Natural Resources Office",
    lastInspection: "2025-03-15",
  },

  // Default technical details
  default: {
    installationDate: "2020-01-01",
    lastMaintenance: "2025-01-15",
    coverageArea: "Varies by facility",
    operatingHours: "24/7",
    serviceProvider: "Cebu City Infrastructure Department",
    lastInspection: "2025-02-28",
  },
};

const siteNetworkInfo = {
  // Infrastructure
  roads_01: {
    status: "Active",
    uptime: "99.8%",
    bandwidth: "550 Mbps",
    latency: "15ms",
    signalStrength: "-60 dBm",
    connectedDevices: 12,
    lastUpdate: "2025-05-01 09:45:22",
  },
  communication_01: {
    status: "Active",
    uptime: "99.9%",
    bandwidth: "10 Gbps",
    latency: "5ms",
    signalStrength: "-45 dBm",
    connectedDevices: 128,
    lastUpdate: "2025-05-07 14:25:36",
  },

  // Public Buildings
  hospital_01: {
    status: "Active",
    uptime: "99.98%",
    bandwidth: "1 Gbps",
    latency: "8ms",
    signalStrength: "-55 dBm",
    connectedDevices: 240,
    lastUpdate: "2025-05-08 06:20:15",
  },

  // Traffic Data
  traffic_condition_01: {
    status: "Active",
    uptime: "99.5%",
    bandwidth: "750 Mbps",
    latency: "12ms",
    signalStrength: "-58 dBm",
    connectedDevices: 35,
    lastUpdate: "2025-05-08 08:15:30",
  },

  // Default network information
  default: {
    status: "Active",
    uptime: "99.8%",
    bandwidth: "450 Mbps",
    latency: "18ms",
    signalStrength: "-65 dBm",
    connectedDevices: 8,
    lastUpdate: "2025-05-07 14:25:36",
  },
};

const sitesMaintenanceLogs = {
  roads_01: [
    {
      date: "2025-01-15",
      type: "Routine",
      technician: "Marco Santos",
      duration: "6 hours",
      description:
        "Quarterly inspection of road surface and drainage infrastructure.",
      findings:
        "Minor surface cracks on northern section, scheduled for spot repair.",
      followUpRequired: true,
      followUpDate: "2025-01-22",
      followUpNotes: "Surface cracks repaired, extension joints reinforced.",
    },
    {
      date: "2024-10-20",
      type: "Emergency",
      technician: "Lily Chen",
      duration: "10 hours",
      description: "Response to flash flooding damage after heavy rainfall.",
      findings:
        "Erosion at drainage points, temporary reinforcement installed.",
      followUpRequired: true,
      followUpDate: "2024-11-05",
      followUpNotes:
        "Permanent drainage repairs completed, added additional runoff channels.",
    },
  ],
  highways_01: [
    {
      date: "2024-11-10",
      type: "Annual",
      technician: "Roberto Mendoza",
      duration: "48 hours",
      description:
        "Annual structural assessment of CCLEX bridge supports and roadway.",
      findings:
        "All structural elements within safety parameters. Minor wear on expansion joints.",
      followUpRequired: true,
      followUpDate: "2024-12-05",
      followUpNotes:
        "Expansion joint wear addressed, structural integrity confirmed excellent.",
    },
  ],
  water_utility_01: [
    {
      date: "2025-03-18",
      type: "Annual",
      technician: "David Chen",
      duration: "12 hours",
      description:
        "Annual comprehensive inspection of water distribution network.",
      findings:
        "92% of system in excellent condition. Two valves at substation C require replacement.",
      followUpRequired: true,
      followUpDate: "2025-03-25",
      followUpNotes: "Valve replacement completed successfully.",
    },
    {
      date: "2024-12-05",
      type: "Routine",
      technician: "Sarah Johnson",
      duration: "5 hours",
      description: "Regular pressure testing and quality assessment.",
      findings:
        "All parameters within acceptable ranges. Increased chlorine levels as per new regulations.",
      followUpRequired: false,
    },
  ],
  hospital_01: [
    {
      date: "2025-01-20",
      type: "Routine",
      technician: "Elena Cruz",
      duration: "4 hours",
      description: "Quarterly safety inspection and emergency systems check.",
      findings:
        "All systems operational. Backup generator required preventive maintenance.",
      followUpRequired: true,
      followUpDate: "2025-01-25",
      followUpNotes: "Generator maintenance completed, performance optimal.",
    },
    {
      date: "2024-11-08",
      type: "Emergency",
      technician: "Juan Reyes",
      duration: "3 hours",
      description:
        "Emergency response to power fluctuation affecting critical care units.",
      findings:
        "UPS system activated properly. Identified voltage regulator issue in electrical room B.",
      followUpRequired: true,
      followUpDate: "2024-11-09",
      followUpNotes: "Voltage regulator replaced, system stability restored.",
    },
  ],
  school_01: [
    {
      date: "2024-12-10",
      type: "Routine",
      technician: "Maria Gonzales",
      duration: "6 hours",
      description: "End-of-semester facility inspection and maintenance.",
      findings:
        "Science laboratory ventilation system requires filter replacement.",
      followUpRequired: true,
      followUpDate: "2024-12-15",
      followUpNotes:
        "Ventilation filters replaced, system efficiency restored to 100%.",
    },
  ],
  waterway_01: [
    {
      date: "2025-01-08",
      type: "Emergency",
      technician: "Rafael Suarez",
      duration: "14 hours",
      description: "Cleanup operation following upstream debris accumulation.",
      findings:
        "Significant plastic waste buildup at monitoring points 3 and 7.",
      followUpRequired: true,
      followUpDate: "2025-01-15",
      followUpNotes:
        "Completed full cleanup, implemented additional debris catch barriers.",
    },
    {
      date: "2024-10-30",
      type: "Routine",
      technician: "Felipe Lorenzo",
      duration: "8 hours",
      description:
        "Pre-rainy season channel clearance and embankment inspection.",
      findings:
        "Channel capacity at 85%, minor embankment erosion at coordinates 10.3182, 123.8889.",
      followUpRequired: true,
      followUpDate: "2024-11-15",
      followUpNotes:
        "Embankment reinforced, channel capacity restored to 100%.",
    },
  ],
  flood_01: [
    {
      date: "2025-04-05",
      type: "Emergency",
      technician: "Carlos Mendoza",
      duration: "12 hours",
      description: "Pump system failure during heavy rainfall.",
      findings:
        "Main drainage pumps overloaded. Emergency backup systems deployed successfully.",
      followUpRequired: true,
      followUpDate: "2025-04-12",
      followUpNotes:
        "Pump capacity increased by 30% to handle similar future events.",
    },
    {
      date: "2025-02-20",
      type: "Routine",
      technician: "Maria Rodriguez",
      duration: "6 hours",
      description: "Pre-rainy season inspection of flood mitigation systems.",
      findings: "Drainage channels at 85% capacity due to sediment buildup.",
      followUpRequired: true,
      followUpDate: "2025-03-05",
      followUpNotes: "Channels cleared and capacity restored to 100%.",
    },
  ],
  default: [
    {
      date: "2025-03-10",
      type: "Routine",
      technician: "John Smith",
      duration: "4 hours",
      description: "Standard quarterly maintenance and inspection.",
      findings: "All systems operating within normal parameters.",
      followUpRequired: false,
    },
    {
      date: "2024-11-15",
      type: "Annual",
      technician: "Anna Wong",
      duration: "8 hours",
      description:
        "Comprehensive annual assessment and preventive maintenance.",
      findings:
        "Systems operating at 94% efficiency. Minor adjustments made to improve performance.",
      followUpRequired: false,
    },
  ],
};

const publicAlerts = [
  { text: "Construction: Escario Street", class: "alert-construction" },
  { text: "Road closure: IT Park area", class: "alert-closure" },
  { text: "Weather alert: Heavy rainfall", class: "alert-weather" },
  { text: "Traffic advisory: Osmeña Blvd", class: "alert-traffic" },
  { text: "Accident: Fuente Circle", class: "alert-accident" },
  { text: "Event traffic: SM City Cebu", class: "alert-event" },
  { text: "Flooding alert: Mabolo area", class: "alert-flooding" },
];

const cityEvents = [
  {
    icon: "S",
    text: "Sinulog Festival 2025",
    date: "Jan 19",
    class: "event-festival",
    status: "upcoming",
  },
  {
    icon: "M",
    text: "Public Meeting: Budget 2025",
    date: "Feb 15",
    class: "event-meeting",
    status: "upcoming",
  },
  {
    icon: "C",
    text: "Community Cleanup Drive",
    date: "Feb 20",
    class: "event-community",
    status: "upcoming",
  },
  {
    icon: "H",
    text: "Health & Wellness Fair",
    date: "Mar 1-3",
    class: "event-health",
    status: "upcoming",
  },
  {
    icon: "F",
    text: "Food Festival at Plaza",
    date: "Mar 14-16",
    class: "event-ongoing",
    status: "ongoing",
  },
  {
    icon: "T",
    text: "Tech Summit 2025",
    date: "Apr 5",
    class: "event-tech",
    status: "upcoming",
  },
  {
    icon: "E",
    text: "Environmental Fair",
    date: "Apr 22",
    class: "event-community",
    status: "upcoming",
  },
  {
    icon: "B",
    text: "Barangay Sports Festival",
    date: "May 1-3",
    class: "event-ongoing",
    status: "ongoing",
  },
];

const mapMarkers = [
  {
    category: "Infrastructure",
    id: "infrastructure",
    center: [10.3157, 123.8854],
    checkboxConfig: {
      masterCheckboxId: "all-infrastructure",
      subcategoryCheckboxIds: [
        "highways",
        "main-roads",
        "streets",
        "public-transport",
        "traffic-data",
        "water-supply",
        "electricity",
        "sewage",
        "communication",
        "waste-management",
        "nbp",
        "wifi-hotspots",
        "internet-centers",
        "dof-regional-office"
      ],
    },
    displayInfo: {
      title: "Infrastructure",
      type: "Roads, Utilities, Comm",
      className: "wifi-bg",
      icon: "fas fa-road",
    },
    subcategoryConfigs: {
      highways: {
        title: "Highways",
        type: "Major Highway Routes",
        className: "wifi-bg",
        icon: "fas fa-highway",
      },
      "main-roads": {
        title: "Main Roads",
        type: "Primary Road Network",
        className: "nbp-bg",
        icon: "fas fa-road",
      },
      streets: {
        title: "Streets",
        type: "Local Street Network",
        className: "data-center-bg",
        icon: "fas fa-map-signs",
      },
      "public-transport": {
        title: "Public Transport",
        type: "Mass Transit Systems",
        className: "info-bg",
        icon: "fas fa-bus",
      },
      "traffic-data": {
        title: "Traffic Data",
        type: "Traffic Monitoring",
        className: "warning-bg",
        icon: "fas fa-traffic-light",
      },
      "water-supply": {
        title: "Water Supply",
        type: "Water Infrastructure",
        className: "active-bg",
        icon: "fas fa-tint",
      },
      electricity: {
        title: "Electricity",
        type: "Power Infrastructure",
        className: "maintenance-bg",
        icon: "fas fa-bolt",
      },
      sewage: {
        title: "Sewage",
        type: "Wastewater Systems",
        className: "critical-bg",
        icon: "fas fa-water",
      },
      communication: {
        title: "Communication Lines",
        type: "Telecom Infrastructure",
        className: "ai-bg",
        icon: "fas fa-broadcast-tower",
      },
      "waste-management": {
        title: "Waste Management",
        type: "Waste Facilities",
        className: "warning-bg",
        icon: "fas fa-trash",
      },
      nbp: {
        title: "National Broadband Project",
        type: "Government Broadband",
        className: "nbp-bg",
        icon: "fas fa-wifi",
      },
      "wifi-hotspots": {
        title: "WiFi Hotspots",
        type: "Public Internet Access",
        className: "wifi-bg",
        icon: "fas fa-wifi",
      },
      "internet-centers": {
        title: "Public Internet Centers",
        type: "Community Internet",
        className: "data-center-bg",
        icon: "fas fa-desktop",
      },
    },
    sites: [
      // Roads & Transportation
      {
        id: "highway_01",
        name: "South Road Properties Highway",
        location: [10.2513, 123.8437],
        status: "active",
        subcategory: "Highways",
        description: "Major highway connecting southern Cebu City areas.",
      },
      {
        id: "mainroad_01",
        name: "Colon Street",
        location: [10.2936, 123.9015],
        status: "active",
        subcategory: "Main Roads",
        description: "Historic main road and commercial center of Cebu City.",
      },
      {
        id: "street_01",
        name: "Capitol Site Streets",
        location: [10.3157, 123.8954],
        status: "active",
        subcategory: "Streets",
        description: "Local street network in Capitol Site area.",
      },
      {
        id: "transport_01",
        name: "BRT System",
        location: [10.3157, 123.8954],
        status: "active",
        subcategory: "Public Transportation",
        description: "Bus Rapid Transit system serving Cebu City.",
      },
      {
        id: "traffic_01",
        name: "Traffic Monitoring Center",
        location: [10.2936, 123.9015],
        status: "active",
        subcategory: "Traffic Data",
        description: "Central traffic monitoring and data collection facility.",
      },

      // Utilities
      {
        id: "water_01",
        name: "Metropolitan Cebu Water District",
        location: [10.3157, 123.8954],
        status: "active",
        subcategory: "Water Supply",
        description: "Main water supply facility for Cebu City.",
      },
      {
        id: "power_01",
        name: "VECO Substation Capitol",
        location: [10.3157, 123.8954],
        status: "active",
        subcategory: "Electricity",
        description: "Primary electrical substation serving Capitol area.",
      },
      {
        id: "sewage_01",
        name: "Cebu City Sewage Treatment Plant",
        location: [10.2513, 123.8437],
        status: "active",
        subcategory: "Sewage",
        description: "Main sewage treatment facility for the city.",
      },
      {
        id: "comm_01",
        name: "PLDT Central Office",
        location: [10.2936, 123.9015],
        status: "active",
        subcategory: "Communication Lines",
        description: "Major telecommunications hub for Cebu City.",
      },
      {
        id: "waste_01",
        name: "Inayawan Sanitary Landfill",
        location: [10.2513, 123.8437],
        status: "warning",
        subcategory: "Waste Management",
        description: "Primary waste management facility for Cebu City.",
      },
      {
        id: "nbp_01",
        name: "National Broadband Project Hub",
        location: [10.3157, 123.8954],
        status: "active",
        subcategory: "National Broadband Project",
        description: "Government broadband infrastructure hub.",
      },
      {
        id: "wifi_01",
        name: "Cebu City WiFi Hotspot - Plaza Independencia",
        location: [10.2936, 123.9015],
        status: "active",
        subcategory: "WiFi Hotspots",
        description: "Public WiFi access point in Plaza Independencia.",
      },
      {
        id: "internet_01",
        name: "Public Internet Center - Balamban",
        location: [10.4769, 123.7436],
        status: "active",
        subcategory: "Public Internet Centers",
        description: "Public internet access facility in Balamban.",
      },
      {
        id: "dof_cebu_01",
        name: "BIR Regional Office No. 7 - Cebu City",
        location: [10.3157, 123.883],
        status: "active",
        subcategory: "DOF Regional Office",
        description:
          "Bureau of Internal Revenue Regional Office No. 7 serving Central Visayas region, located in Cebu City.",
      },
      {
        id: "dof_cebu_02",
        name: "BOC Port of Cebu Office",
        location: [10.3157, 123.8854],
        status: "active",
        subcategory: "DOF Regional Office",
        description:
          "Bureau of Customs office at Port of Cebu handling maritime cargo and passenger customs clearance.",
      },
      {
        id: "dof_cebu_03",
        name: "BLGF Regional Office VII - Cebu City",
        location: [10.3157, 123.884],
        status: "active",
        subcategory: "DOF Regional Office",
        description:
          "Bureau of Local Government Finance Regional Office VII serving Central Visayas region.",
      },
      {
        id: "dof_pampana_03",
        name: "BLGF Regional Office III - Pampanga",
        location: [10.3157, 123.886],
        status: "active",
        subcategory: "DOF Regional Office",
        description:
          "Bureau of Local Government Finance Regional Office III serving Central Visayas region.",
      },
      {
        id: "density_01",
        name: "Downtown High Density Zone",
        location: [10.2936, 123.9015],
        status: "active",
        subcategory: "Population Density",
        description: "High population density area in downtown Cebu City.",
      },
      {
        id: "density_02",
        name: "IT Park Residential Density",
        location: [10.3269, 123.9063],
        status: "active",
        subcategory: "Population Density",
        description: "Growing residential density around IT Park area.",
      },
      {
        id: "income_01",
        name: "Ayala Business District Economic Zone",
        location: [10.3269, 123.9063],
        status: "active",
        subcategory: "Income Distribution",
        description: "High-income economic zone in Ayala area.",
      },
      {
        id: "income_02",
        name: "Carbon Market Economic Zone",
        location: [10.2936, 123.9015],
        status: "active",
        subcategory: "Income Distribution",
        description: "Mixed-income commercial and residential area.",
      },
      {
        id: "education_01",
        name: "University Belt Education Hub",
        location: [10.2936, 123.9015],
        status: "active",
        subcategory: "Education Levels",
        description:
          "Area with high concentration of educational institutions.",
      },
      {
        id: "education_02",
        name: "Capitol Site Education Zone",
        location: [10.3157, 123.8954],
        status: "active",
        subcategory: "Education Levels",
        description:
          "Residential area with good access to educational facilities.",
      },
      {
        id: "bir_hq_01",
        name: "BIR National Office - Quezon City",
        location: [14.6506, 121.0378],
        status: "active",
        subcategory: "BIR Headquarters",
        description:
          "Bureau of Internal Revenue National Office located in Quezon City, main headquarters for tax administration.",
      },
      {
        id: "bir_region_01",
        name: "BIR Regional Office No. 1 - Ilocos",
        location: [17.9688, 120.5739], // Laoag City
        status: "active",
        subcategory: "BIR Regional Office",
        description:
          "BIR Regional Office covering Ilocos Norte, Ilocos Sur, La Union, and Pangasinan.",
      },
      {
        id: "bir_region_02",
        name: "BIR Regional Office No. 2 - Cordillera",
        location: [16.4023, 120.596], // Baguio City
        status: "active",
        subcategory: "BIR Regional Office",
        description:
          "BIR Regional Office covering Cordillera Administrative Region including Baguio City.",
      },
      {
        id: "bir_region_03",
        name: "BIR Regional Office No. 3 - Central Luzon",
        location: [15.3794, 120.62], // San Fernando, Pampanga
        status: "active",
        subcategory: "BIR Regional Office",
        description:
          "BIR Regional Office covering Central Luzon region including Pampanga, Bulacan, Nueva Ecija.",
      },
      {
        id: "bir_region_04",
        name: "BIR Regional Office No. 4 - CALABARZON",
        location: [14.2691, 121.1121], // Laguna
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering CALABARZON region.",
      },
      {
        id: "bir_region_05",
        name: "BIR Regional Office No. 5 - Bicol",
        location: [13.1391, 123.7437], // Legazpi City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering Bicol Region.",
      },
      {
        id: "bir_region_06",
        name: "BIR Regional Office No. 6 - Western Visayas",
        location: [10.7202, 122.5621], // Iloilo City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering Western Visayas region.",
      },
      {
        id: "bir_region_07",
        name: "BIR Regional Office No. 7 - Central Visayas",
        location: [10.3157, 123.8854], // Cebu City
        status: "active",
        subcategory: "BIR Regional Office",
        description:
          "BIR Regional Office covering Central Visayas region including Cebu.",
      },
      {
        id: "bir_region_08",
        name: "BIR Regional Office No. 8 - Eastern Visayas",
        location: [11.2442, 125.0045], // Tacloban City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering Eastern Visayas region.",
      },
      {
        id: "bir_region_09",
        name: "BIR Regional Office No. 9 - Zamboanga Peninsula",
        location: [6.9214, 122.079], // Zamboanga City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering Zamboanga Peninsula.",
      },
      {
        id: "bir_region_10",
        name: "BIR Regional Office No. 10 - Northern Mindanao",
        location: [8.4542, 124.6319], // Cagayan de Oro City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering Northern Mindanao region.",
      },
      {
        id: "bir_region_11",
        name: "BIR Regional Office No. 11 - Davao Region",
        location: [7.0731, 125.6128], // Davao City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering Davao Region.",
      },
      {
        id: "bir_region_12",
        name: "BIR Regional Office No. 12 - SOCCSKSARGEN",
        location: [6.1164, 125.1716], // General Santos City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering SOCCSKSARGEN region.",
      },
      {
        id: "bir_region_13",
        name: "BIR Regional Office No. 13 - CARAGA",
        location: [9.3477, 125.4849], // Butuan City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering CARAGA region.",
      },
    ],
  },

  {
    category: "Public Buildings",
    id: "public_buildings",
    center: [10.3157, 123.8854],
    checkboxConfig: {
      masterCheckboxId: "all-buildings",
      subcategoryCheckboxIds: [
        "hospitals",
        "schools",
        "government-offices",
        "police-stations",
        "fire-departments",
      ],
    },
    displayInfo: {
      title: "Public Buildings",
      type: "Hospitals, Schools, Govt",
      className: "nbp-bg",
      icon: "fas fa-building",
    },
    subcategoryConfigs: {
      hospitals: {
        title: "Hospitals",
        type: "Medical Facilities",
        className: "critical-bg",
        icon: "fas fa-hospital",
      },
      schools: {
        title: "Schools",
        type: "Educational Institutions",
        className: "info-bg",
        icon: "fas fa-school",
      },
      "government-offices": {
        title: "Government Offices",
        type: "Public Administration",
        className: "ai-bg",
        icon: "fas fa-landmark",
      },
      "police-stations": {
        title: "Police Stations",
        type: "Law Enforcement",
        className: "active-bg",
        icon: "fas fa-shield-alt",
      },
      "fire-departments": {
        title: "Fire Departments",
        type: "Emergency Services",
        className: "maintenance-bg",
        icon: "fas fa-fire-extinguisher",
      },
    },
    sites: [
      {
        id: "hospital_01",
        name: "Vicente Sotto Memorial Medical Center",
        location: [10.3157, 123.8954],
        status: "active",
        subcategory: "Hospitals",
        description: "Major public hospital serving Central Visayas region.",
      },
      {
        id: "hospital_02",
        name: "Cebu City Medical Center",
        location: [10.2936, 123.9015],
        status: "active",
        subcategory: "Hospitals",
        description: "Primary public hospital for Cebu City residents.",
      },
      {
        id: "school_01",
        name: "University of the Philippines Cebu",
        location: [10.2936, 123.9015],
        status: "active",
        subcategory: "Schools",
        description: "Premier state university in Cebu.",
      },
      {
        id: "school_02",
        name: "Cebu Normal University",
        location: [10.2936, 123.9015],
        status: "active",
        subcategory: "Schools",
        description: "Leading teacher education institution in Cebu.",
      },
      {
        id: "govt_01",
        name: "Cebu City Hall",
        location: [10.293401960635979, 123.90172170516787],
        status: "active",
        subcategory: "Government Offices",
        description: "Main administrative center for Cebu City government.",
      },
      {
        id: "govt_02",
        name: "Capitol Building",
        location: [10.3157, 123.8954],
        status: "active",
        subcategory: "Government Offices",
        description: "Provincial Capitol building of Cebu Province.",
      },
      {
        id: "police_01",
        name: "Cebu City Police Office",
        location: [10.2936, 123.9015],
        status: "active",
        subcategory: "Police Stations",
        description: "Main police headquarters for Cebu City.",
      },
      {
        id: "police_02",
        name: "Fuente Police Station",
        location: [10.3157, 123.8954],
        status: "active",
        subcategory: "Police Stations",
        description: "Police station serving Fuente Circle area.",
      },
      {
        id: "fire_01",
        name: "Cebu City Fire Department Central",
        location: [10.2936, 123.9015],
        status: "active",
        subcategory: "Fire Departments",
        description: "Central fire station for Cebu City.",
      },
      {
        id: "fire_02",
        name: "Capitol Fire Station",
        location: [10.3157, 123.8954],
        status: "active",
        subcategory: "Fire Departments",
        description: "Fire station serving Capitol Site area.",
      },
      {
        id: "govt_01",
        name: "Cebu City Hall",
        location: [10.293401960635979, 123.90172170516787],
        status: "active",
        subcategory: "Government Offices",
        description: "Main administrative center for Cebu City government.",
      },
      {
        id: "govt_dof_01",
        name: "DOF Revenue District Office - Cebu City",
        location: [10.3157, 123.8854],
        status: "active",
        subcategory: "DOF District Office",
        description:
          "Department of Finance Revenue District Office serving Cebu City and surrounding areas.",
      },
    ],
  },
  {
    category: "Natural Features",
    id: "natural_features",
    center: [10.3157, 123.8854],
    checkboxConfig: {
      masterCheckboxId: "all-natural",
      subcategoryCheckboxIds: ["topography", "waterways", "parks"],
    },
    displayInfo: {
      title: "Natural Features",
      type: "Parks, Waterways",
      className: "data-center-bg",
      icon: "fas fa-leaf",
    },
    subcategoryConfigs: {
      topography: {
        title: "Topography",
        type: "Terrain Features",
        className: "data-center-bg",
        icon: "fas fa-mountain",
      },
      waterways: {
        title: "Waterways",
        type: "Rivers & Streams",
        className: "active-bg",
        icon: "fas fa-water",
      },
      parks: {
        title: "Parks & Green Spaces",
        type: "Recreation Areas",
        className: "maintenance-bg",
        icon: "fas fa-tree",
      },
    },
    sites: [
      {
        id: "topo_01",
        name: "Temple of Leah Viewpoint",
        location: [10.3157, 123.8437],
        status: "active",
        subcategory: "Topography",
        description: "Elevated viewpoint showcasing Cebu's topography.",
      },
      {
        id: "topo_02",
        name: "Sirao Hills",
        location: [10.358, 123.832],
        status: "active",
        subcategory: "Topography",
        description: "Highland area with scenic mountain views.",
      },
      {
        id: "water_01",
        name: "Guadalupe River",
        location: [10.2936, 123.9015],
        status: "active",
        subcategory: "Waterways",
        description: "Major river system flowing through Cebu City.",
      },
      {
        id: "water_02",
        name: "Lahug River",
        location: [10.338, 123.869],
        status: "active",
        subcategory: "Waterways",
        description: "River system in northern Cebu City area.",
      },
      {
        id: "park_01",
        name: "Plaza Independencia",
        location: [10.2936, 123.9015],
        status: "active",
        subcategory: "Parks & Green Spaces",
        description: "Historic central park and plaza of Cebu City.",
      },
      {
        id: "park_02",
        name: "Cebu IT Park",
        location: [10.3269, 123.9063],
        status: "active",
        subcategory: "Parks & Green Spaces",
        description: "Modern business park with green spaces.",
      },
      {
        id: "dof_main_01",
        name: "Department of Finance Building - BSP Complex",
        location: [14.5832, 120.9797],
        status: "active",
        subcategory: "DOF Central Office",
        description:
          "Main DOF Building located at BSP Complex, Roxas Boulevard, Manila. Houses the Office of the Secretary and various DOF departments.",
      },
    ],
  },

  {
    category: "Environmental Risks",
    id: "environmental_risks",
    center: [10.3157, 123.8854],
    checkboxConfig: {
      masterCheckboxId: "all-risks",
      subcategoryCheckboxIds: [
        "flood-zones",
        "pollution-zones",
        "other-hazards",
      ],
    },
    displayInfo: {
      title: "Environmental Risks",
      type: "Flood, Pollution Zones",
      className: "critical-bg",
      icon: "fas fa-exclamation-triangle",
    },
    subcategoryConfigs: {
      "flood-zones": {
        title: "Flood Prone Areas",
        type: "Flooding Risk Zones",
        className: "critical-bg",
        icon: "fas fa-water",
      },
      "pollution-zones": {
        title: "Pollution Zones",
        type: "Contaminated Areas",
        className: "warning-bg",
        icon: "fas fa-smog",
      },
      "other-hazards": {
        title: "Other Hazards",
        type: "Environmental Risks",
        className: "critical-bg",
        icon: "fas fa-exclamation-triangle",
      },
    },
    sites: [
      {
        id: "flood_01",
        name: "Lahug Creek Flood Zone",
        location: [10.338, 123.869],
        status: "warning",
        subcategory: "Flood Prone Areas",
        description: "Area prone to flooding during heavy rainfall.",
      },
      {
        id: "flood_02",
        name: "Guadalupe Low-lying Areas",
        location: [10.2936, 123.9015],
        status: "critical",
        subcategory: "Flood Prone Areas",
        description: "Critical flood-prone areas in Guadalupe district.",
      },
      {
        id: "pollution_01",
        name: "Carbon Market Air Quality Zone",
        location: [10.2936, 123.9015],
        status: "warning",
        subcategory: "Pollution Zones",
        description: "Area with elevated air pollution levels.",
      },
      {
        id: "pollution_02",
        name: "Cebu Harbor Water Pollution Zone",
        location: [10.2936, 123.9115],
        status: "critical",
        subcategory: "Pollution Zones",
        description: "Harbor area with water contamination issues.",
      },
      {
        id: "hazard_01",
        name: "Landslide Risk Area - Temple of Leah",
        location: [10.3157, 123.8437],
        status: "warning",
        subcategory: "Other Environmental Hazards",
        description: "Steep terrain with potential landslide risk.",
      },
      {
        id: "hazard_02",
        name: "Coastal Erosion Zone - SRP",
        location: [10.2513, 123.8437],
        status: "warning",
        subcategory: "Other Environmental Hazards",
        description: "Coastal area experiencing erosion issues.",
      },
    ],
  },
  {
    category: "Points of Interest",
    id: "points_of_interest",
    center: [10.3157, 123.8854],
    checkboxConfig: {
      masterCheckboxId: "all-poi",
      subcategoryCheckboxIds: [
        "businesses",
        "recreational",
        "community-centers",
      ],
    },
    displayInfo: {
      title: "Points of Interest",
      type: "Business, Recreation",
      className: "ai-bg",
      icon: "fas fa-star",
    },
    subcategoryConfigs: {
      businesses: {
        title: "Businesses",
        type: "Commercial Areas",
        className: "ai-bg",
        icon: "fas fa-building",
      },
      recreational: {
        title: "Recreational Areas",
        type: "Entertainment Venues",
        className: "maintenance-bg",
        icon: "fas fa-gamepad",
      },
      "community-centers": {
        title: "Community Centers",
        type: "Community Facilities",
        className: "info-bg",
        icon: "fas fa-users",
      },
    },
    sites: [
      {
        id: "business_01",
        name: "Ayala Center Cebu",
        location: [10.3269, 123.9063],
        status: "active",
        subcategory: "Businesses",
        description: "Major shopping and business complex in Cebu City.",
      },
      {
        id: "business_02",
        name: "SM City Cebu",
        location: [10.3157, 123.8954],
        status: "active",
        subcategory: "Businesses",
        description: "Large shopping mall and commercial center.",
      },
      {
        id: "recreation_01",
        name: "Crown Regency Sky Experience",
        location: [10.3157, 123.8954],
        status: "active",
        subcategory: "Recreational Areas",
        description: "Adventure and entertainment facility with city views.",
      },
      {
        id: "recreation_02",
        name: "Cebu Heritage Monument",
        location: [10.2936, 123.9015],
        status: "active",
        subcategory: "Recreational Areas",
        description: "Historical monument and tourist attraction.",
      },
      {
        id: "community_01",
        name: "Barangay Capitol Site Community Center",
        location: [10.3157, 123.8954],
        status: "active",
        subcategory: "Community Centers",
        description: "Local community center serving Capitol Site residents.",
      },
      {
        id: "community_02",
        name: "Lahug Community Center",
        location: [10.338, 123.869],
        status: "active",
        subcategory: "Community Centers",
        description: "Community facility in Lahug district.",
      },
    ],
  },
];

// Add these after the mapMarkers array, before any exports
const categoryMasterIds = mapMarkers.map(category => category.checkboxConfig.masterCheckboxId);

// Dynamic mapping from master checkbox IDs to category IDs
const categoryMasterCheckboxes = {
  all: "all_categories",
  ...Object.fromEntries(
    mapMarkers.map(category => [
      category.checkboxConfig.masterCheckboxId,
      category.id
    ])
  )
};

const searchData = {
  quickActions: [],
  categories: {
    "Hospitals & Healthcare": {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l11 11z"/></svg>`,
      items: [
        {
          title: "Cebu City Medical Center",
          description: "Public hospital with comprehensive services",
          distance: "1.2km",
          siteId: "hospital_01",
          category: "Public Buildings",
        },
        {
          title: "Vicente Sotto Memorial",
          description: "Major government tertiary care hospital",
          distance: "0.8km",
          siteId: "hospital_02",
          category: "Public Buildings",
        },
        {
          title: "Chong Hua Hospital",
          description: "Leading private hospital",
          distance: "1.5km",
          siteId: "hospital_10",
          category: "Public Buildings",
        },
        {
          title: "Cebu Doctors' University Hospital",
          description: "University hospital with comprehensive healthcare",
          distance: "0.9km",
          siteId: "hospital_04",
          category: "Public Buildings",
        },
        {
          title: "Adventist Hospital Cebu",
          description: "Faith-based hospital providing quality healthcare",
          distance: "1.1km",
          siteId: "hospital_05",
          category: "Public Buildings",
        },
      ],
    },
    "Government Services": {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></svg>`,
      items: [
        {
          title: "Cebu City Hall",
          description: "Main administrative center",
          distance: "0.3km",
          siteId: "govt_01",
          category: "Public Buildings",
        },
        {
          title: "Office of the City Civil Registrar",
          description: "Birth certificates, marriage licenses",
          distance: "0.5km",
          siteId: "govt_13",
          category: "Public Buildings",
        },
        {
          title: "Cebu City Health Department",
          description: "Public health services",
          distance: "0.7km",
          siteId: "govt_15",
          category: "Public Buildings",
        },
        {
          title: "DPWH Cebu City District Office",
          description: "Public works and highways office",
          distance: "0.4km",
          siteId: "govt_10",
          category: "Public Buildings",
        },
        {
          title: "DTI Cebu Provincial Office",
          description: "Trade and industry services",
          distance: "0.6km",
          siteId: "govt_05",
          category: "Public Buildings",
        },
      ],
    },
    Transportation: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"/><path d="M8 8v4"/><path d="M9 18h6"/></svg>`,
      items: [
        {
          title: "Route 01K: Urgello - SM - Parkmall",
          description: "Jeepney route through commercial areas",
          distance: "Multiple stops",
          siteId: "transport_route_01",
          category: "Traffic Data",
        },
        {
          title: "Route 04B: Lahug - Carbon Market",
          description: "Route through educational areas",
          distance: "Multiple stops",
          siteId: "transport_route_02",
          category: "Traffic Data",
        },
        {
          title: "Route 13C: Talamban - Colon",
          description: "Northern route to downtown",
          distance: "Multiple stops",
          siteId: "transport_route_03",
          category: "Traffic Data",
        },
        {
          title: "MyBus Terminal - SM City",
          description: "Bus routes to airport and Talisay",
          distance: "1.8km",
          siteId: "transport_02",
          category: "Infrastructure",
        },
        {
          title: "Jeepney Routes MI-03B",
          description: "Route from MEPZ to Cordova",
          distance: "Various",
          siteId: "transport_01",
          category: "Infrastructure",
        },
      ],
    },
    Education: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
      items: [
        {
          title: "University of the Philippines Cebu",
          description: "Public university campus",
          distance: "2.2km",
          siteId: "school_14",
          category: "Public Buildings",
        },
        {
          title: "Cebu City National Science High School",
          description: "Specialized science high school",
          distance: "1.5km",
          siteId: "school_01",
          category: "Public Buildings",
        },
        {
          title: "Cebu Institute of Technology - University",
          description: "Technology-focused university",
          distance: "0.9km",
          siteId: "school_12",
          category: "Public Buildings",
        },
        {
          title: "University of the Visayas - Main Campus",
          description: "Private university with various programs",
          distance: "1.1km",
          siteId: "school_13",
          category: "Public Buildings",
        },
        {
          title: "University of Cebu - Banilad Campus",
          description: "Private university campus",
          distance: "2.8km",
          siteId: "school_15",
          category: "Public Buildings",
        },
      ],
    },
    "Internet & Connectivity": {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><path d="M12 20h.01"/></svg>`,
      items: [
        {
          title: "Ayala Center Free WiFi",
          description: "Shopping mall WiFi access",
          distance: "1.2km",
          siteId: "wifi_01",
          category: "Internet Access",
        },
        {
          title: "IT Park Public WiFi",
          description: "High-speed internet in business district",
          distance: "2.5km",
          siteId: "wifi_03",
          category: "Internet Access",
        },
        {
          title: "Plaza Independencia WiFi",
          description: "Public WiFi at historic plaza",
          distance: "0.4km",
          siteId: "wifi_05",
          category: "Internet Access",
        },
        {
          title: "Cebu City Library Digital Center",
          description: "Free computer and internet access",
          distance: "0.7km",
          siteId: "internet_01",
          category: "Internet Access",
        },
        {
          title: "NBP Cebu City Gateway",
          description: "National broadband infrastructure",
          distance: "1.0km",
          siteId: "nbp_01",
          category: "National Broadband Project",
        },
      ],
    },
    "Shopping & Recreation": {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1z"/><path d="M9 12v4"/><path d="M15 12v4"/></svg>`,
      items: [
        {
          title: "Ayala Center Cebu",
          description: "Premier shopping destination",
          distance: "1.2km",
          siteId: "recreation_02",
          category: "Points of Interest",
        },
        {
          title: "SM Seaside City Cebu",
          description: "Large shopping mall with entertainment",
          distance: "2.8km",
          siteId: "recreation_01",
          category: "Points of Interest",
        },
        {
          title: "Cebu Business Park",
          description: "Mixed-use development with amenities",
          distance: "1.1km",
          siteId: "business_01",
          category: "Points of Interest",
        },
        {
          title: "Cebu IT Park",
          description: "Business and entertainment district",
          distance: "2.5km",
          siteId: "business_02",
          category: "Points of Interest",
        },
        {
          title: "Plaza Independencia",
          description: "Historic plaza and public space",
          distance: "0.4km",
          siteId: "recreation_05",
          category: "Points of Interest",
        },
      ],
    },
  },
};

// Generate category-specific maintenance examples
const categoryMaintenance = {
  Infrastructure: [
    {
      date: "2025-04-15",
      type: "Comprehensive Structural Inspection",
      technician: "Civil Engineer Maria Santos, P.E.",
      duration: "6 hours",
      findings:
        "Infrastructure condition rated at 86% (Excellent). Minor concrete spalling observed on south wall requiring attention within 3 months. Overall structural integrity remains excellent with no immediate safety concerns. Recommended preventive concrete repair and protective coating application.",
    },
    {
      date: "2025-02-28",
      type: "Preventive Maintenance",
      technician: "Maintenance Team Alpha (4 members)",
      duration: "4 hours",
      findings:
        "All systems operational within specifications. Drainage systems cleaned and flow-tested. LED lighting system inspection completed - all fixtures operational. Safety equipment verified and emergency systems tested. Concrete surfaces cleaned and sealed.",
    },
    {
      date: "2025-01-10",
      type: "Quarterly Safety Inspection",
      technician: "Safety Inspector Carlos Mendoza",
      duration: "3 hours",
      findings:
        "Safety compliance at 100%. All emergency exits clear and properly marked. Fire safety equipment within service dates. Structural stability confirmed. No safety hazards identified. Certificate of compliance issued.",
    },
  ],
  "Public Buildings": [
    {
      date: "2025-05-10",
      type: "HVAC System Service",
      technician: "CoolAir Systems Inc. (Certified Contractor)",
      duration: "8 hours",
      findings:
        "Annual HVAC system maintenance completed successfully. All 5 units serviced, filters replaced with HEPA-grade filters. System efficiency improved by 12% through calibration. Energy consumption reduced by estimated 8%. Next service scheduled for May 2026.",
    },
    {
      date: "2025-03-22",
      type: "Fire Safety Inspection",
      technician: "Bureau of Fire Protection Inspector",
      duration: "3 hours",
      findings:
        "All fire safety systems operational and compliant. Emergency exits unobstructed and properly lit. Fire extinguishers serviced and within certification dates. Sprinkler system pressure tested and operational. 100% compliance rating achieved, certificate renewed for 12 months.",
    },
    {
      date: "2025-01-28",
      type: "Elevator Maintenance",
      technician: "Elevator Solutions Corp.",
      duration: "5 hours",
      findings:
        "All 4 elevator units inspected and serviced. Safety mechanisms tested and calibrated. Door sensors cleaned and adjusted. Emergency communication systems verified. All units operating within safety parameters with smooth operation.",
    },
  ],
  "Natural Features": [
    {
      date: "2025-04-30",
      type: "Ecological Assessment",
      technician: "Dr. Elena Rodriguez (Marine Biologist)",
      duration: "12 hours (2 days)",
      findings:
        "Comprehensive biodiversity assessment completed. Biodiversity index maintained at high level (7.8/10). Native species population stable with 3 new bird species documented. Water quality excellent in all test locations. Minimal invasive species encroachment successfully managed.",
    },
    {
      date: "2025-01-15",
      type: "Trail System Maintenance",
      technician: "Parks & Recreation Crew (6 members)",
      duration: "16 hours (4 days)",
      findings:
        "Complete trail system renovation completed. All visitor trails restored to excellent condition. New erosion control measures installed on steep sections. Trail signage updated with QR codes for digital guides. Waste removal and landscape restoration completed.",
    },
    {
      date: "2024-11-20",
      type: "Wildlife Monitoring System",
      technician: "Conservation Technology Team",
      duration: "6 hours",
      findings:
        "Wildlife camera network maintenance completed. 6 cameras cleaned, batteries replaced, and data downloaded. 847 wildlife images captured in past quarter showing healthy animal populations. Motion sensors calibrated for optimal detection range.",
    },
  ],
  "Environmental Risks": [
    {
      date: "2025-05-20",
      type: "Emergency Risk Assessment",
      technician: "Risk Management Office (5 specialists)",
      duration: "4 hours",
      findings:
        "Comprehensive risk evaluation triggered by weather alert. Water levels monitored across 12 sensor points. Early warning systems activated and tested - all communications functional. Community alert messages sent to 15,000 registered residents. Emergency response teams positioned strategically.",
    },
    {
      date: "2025-03-08",
      type: "Sensor Network Calibration",
      technician: "Environmental Monitoring Team",
      duration: "4 hours",
      findings:
        "All 12 environmental monitoring sensors calibrated and tested for accuracy. Data transmission verified at 99.8% reliability. Backup power systems tested and operational. Sensor housing cleaned and weatherproofing inspected. Real-time data feed to NDRRMC confirmed operational.",
    },
    {
      date: "2024-12-15",
      type: "Community Preparedness Drill",
      technician: "Emergency Response Coordinator",
      duration: "3 hours",
      findings:
        "Quarterly community emergency drill conducted with 65% resident participation. Evacuation routes tested and timing recorded. Emergency communication systems performed well. Community feedback collected for system improvements. Overall preparedness level rated at 83%.",
    },
  ],
  "Points of Interest": [
    {
      date: "2025-05-12",
      type: "Heritage Site Maintenance",
      technician: "Cultural Heritage Preservation Team",
      duration: "6 hours",
      findings:
        "Comprehensive facility cleaning and preservation work completed. Artifact preservation protocols verified and updated. Visitor area deep cleaning with heritage-safe products. All historical displays inspected and maintained. No disruption to normal operating hours during maintenance.",
    },
    {
      date: "2025-02-14",
      type: "Security System Upgrade",
      technician: "SecureGuard Systems (Licensed Contractor)",
      duration: "3 hours",
      findings:
        "CCTV system upgraded with 4K resolution cameras. Access control systems tested and user permissions updated. Motion detection calibrated for optimal coverage. Integration with city emergency response systems verified. Security coverage improved by 25% with new system.",
    },
    {
      date: "2024-12-10",
      type: "Visitor Experience Enhancement",
      technician: "Digital Experience Team",
      duration: "4 hours",
      findings:
        "Audio guide systems updated with new content in 12 languages. WiFi network expanded and speed increased to 50 Mbps. Interactive displays calibrated and software updated. QR code systems for contactless information access implemented successfully.",
    },
  ],
  "Internet Access": [
    {
      date: "2025-05-18",
      type: "Network Infrastructure Maintenance",
      technician: "DICT Technical Team (3 engineers)",
      duration: "3 hours",
      findings:
        "Comprehensive network equipment servicing completed. Router and switch firmware updated to latest security versions. Fiber optic connections cleaned and signal strength tested. Bandwidth optimization algorithms updated resulting in 15% performance improvement. 99.8% uptime maintained throughout service period.",
    },
    {
      date: "2025-04-02",
      type: "Equipment Upgrade and Security Patch",
      technician: "Network Solutions Inc. (Certified Partner)",
      duration: "6 hours",
      findings:
        "Core router hardware upgraded to support increased user demand. Critical security patches applied to all network equipment. User authentication system enhanced with improved encryption. Network monitoring tools updated for better performance tracking. Zero service interruption during upgrade process.",
    },
    {
      date: "2025-02-15",
      type: "Coverage Area Expansion",
      technician: "Installation Team (5 technicians)",
      duration: "8 hours",
      findings:
        "WiFi coverage area extended by 20% through strategic antenna placement. Signal strength improved in previously weak areas. New access points configured with load balancing. Coverage now reaches 92% of target area with excellent signal quality. User capacity increased to 400 concurrent connections.",
    },
  ],
  "Traffic Data": [
    {
      date: "2025-05-18",
      type: "Traffic Sensor Maintenance",
      technician: "Traffic Management Systems Team",
      duration: "2 hours",
      findings:
        "All 6 traffic counting sensors cleaned and recalibrated for accuracy. Inductive loop sensors tested for proper vehicle detection. Camera systems cleaned and focus adjusted for optimal image quality. Data accuracy verified at 99.8% through calibration vehicles. Real-time data feed confirmed operational.",
    },
    {
      date: "2025-04-03",
      type: "Quarterly Data Analysis",
      technician: "Traffic Engineering Office (Data Analyst)",
      duration: "4 hours",
      findings:
        "Q1 2025 traffic data comprehensive analysis completed. 15% increase in traffic volume during peak hours identified. Traffic flow patterns analyzed for optimization opportunities. Recommendations developed for signal timing adjustments. Historical data trends show consistent growth requiring infrastructure planning.",
    },
    {
      date: "2025-01-20",
      type: "System Integration Update",
      technician: "Smart City Technology Team",
      duration: "3 hours",
      findings:
        "Traffic monitoring system integrated with city-wide smart traffic management platform. Real-time data sharing with traffic signal controllers implemented. Mobile app integration completed for public traffic information. AI analytics module installed for predictive traffic modeling and incident detection.",
    },
  ],
};
