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
    { text: 'Construction: Escario Street', class: 'alert-construction' },
    { text: 'Road closure: IT Park area', class: 'alert-closure' },
    { text: 'Weather alert: Heavy rainfall', class: 'alert-weather' },
    { text: 'Traffic advisory: Osmeña Blvd', class: 'alert-traffic' },
    { text: 'Accident: Fuente Circle', class: 'alert-accident' },
    { text: 'Event traffic: SM City Cebu', class: 'alert-event' },
    { text: 'Flooding alert: Mabolo area', class: 'alert-flooding' }
  ];
  
  const cityEvents = [
    { 
      icon: 'S', 
      text: 'Sinulog Festival 2025', 
      date: 'Jan 19',
      class: 'event-festival',
      status: 'upcoming'
    },
    { 
      icon: 'M', 
      text: 'Public Meeting: Budget 2025', 
      date: 'Feb 15',
      class: 'event-meeting',
      status: 'upcoming'
    },
    { 
      icon: 'C', 
      text: 'Community Cleanup Drive', 
      date: 'Feb 20',
      class: 'event-community',
      status: 'upcoming'
    },
    { 
      icon: 'H', 
      text: 'Health & Wellness Fair', 
      date: 'Mar 1-3',
      class: 'event-health',
      status: 'upcoming'
    },
    { 
      icon: 'F', 
      text: 'Food Festival at Plaza', 
      date: 'Mar 14-16',
      class: 'event-ongoing',
      status: 'ongoing'
    },
    { 
      icon: 'T', 
      text: 'Tech Summit 2025', 
      date: 'Apr 5',
      class: 'event-tech',
      status: 'upcoming'
    },
    { 
      icon: 'E', 
      text: 'Environmental Fair', 
      date: 'Apr 22',
      class: 'event-community',
      status: 'upcoming'
    },
    { 
      icon: 'B', 
      text: 'Barangay Sports Festival', 
      date: 'May 1-3',
      class: 'event-ongoing',
      status: 'ongoing'
    }
  ];

const mapMarkers = [
  {
    category: "Infrastructure",
    id: "infrastructure",
    center: [10.3157, 123.8854],
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
        location: [10.3157, 123.8854],
        status: "active",
        subcategory: "DOF Regional Office",
        description: "Bureau of Internal Revenue Regional Office No. 7 serving Central Visayas region, located in Cebu City."
      },
      {
        id: "dof_cebu_02",
        name: "BOC Port of Cebu Office",
        location: [10.3157, 123.8854],
        status: "active",
        subcategory: "DOF Port Office",
        description: "Bureau of Customs office at Port of Cebu handling maritime cargo and passenger customs clearance."
      },
      {
        id: "dof_cebu_03",
        name: "BLGF Regional Office VII - Cebu City",
        location: [10.3157, 123.8854],
        status: "active",
        subcategory: "DOF Regional Office",
        description: "Bureau of Local Government Finance Regional Office VII serving Central Visayas region."
      }
    ]
  },

  {
    category: "Public Buildings",
    id: "public_buildings",
    center: [10.3157, 123.8854],
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
        description: "Department of Finance Revenue District Office serving Cebu City and surrounding areas.",
      }
    ]
  },

  {
    category: "Natural Features",
    id: "natural_features",
    center: [10.3157, 123.8854],
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
        location: [10.3580, 123.8320],
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
        location: [10.3380, 123.8690],
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
        description: "Main DOF Building located at BSP Complex, Roxas Boulevard, Manila. Houses the Office of the Secretary and various DOF departments.",
      }
    ]
  },

  {
    category: "Environmental Risks",
    id: "environmental_risks",
    center: [10.3157, 123.8854],
    sites: [
      {
        id: "flood_01",
        name: "Lahug Creek Flood Zone",
        location: [10.3380, 123.8690],
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
      }
    ]
  },

  {
    category: "Points of Interest",
    id: "points_of_interest",
    center: [10.3157, 123.8854],
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
        location: [10.3380, 123.8690],
        status: "active",
        subcategory: "Community Centers",
        description: "Community facility in Lahug district.",
      }
    ]
  },

  {
    category: "Population Data",
    id: "population_data",
    center: [10.3157, 123.8854],
    sites: [
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
        description: "Area with high concentration of educational institutions.",
      },
      {
        id: "education_02",
        name: "Capitol Site Education Zone",
        location: [10.3157, 123.8954],
        status: "active",
        subcategory: "Education Levels",
        description: "Residential area with good access to educational facilities.",
      },
      {
        id: "bir_hq_01",
        name: "BIR National Office - Quezon City",
        location: [14.6506, 121.0378],
        status: "active",
        subcategory: "BIR Headquarters",
        description: "Bureau of Internal Revenue National Office located in Quezon City, main headquarters for tax administration."
      },
      {
        id: "bir_region_01",
        name: "BIR Regional Office No. 1 - Ilocos",
        location: [17.9688, 120.5739], // Laoag City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering Ilocos Norte, Ilocos Sur, La Union, and Pangasinan.",
      },
      {
        id: "bir_region_02",
        name: "BIR Regional Office No. 2 - Cordillera",
        location: [16.4023, 120.5960], // Baguio City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering Cordillera Administrative Region including Baguio City.",
      },
      {
        id: "bir_region_03",
        name: "BIR Regional Office No. 3 - Central Luzon",
        location: [15.3794, 120.6200], // San Fernando, Pampanga
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering Central Luzon region including Pampanga, Bulacan, Nueva Ecija.",
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
        description: "BIR Regional Office covering Central Visayas region including Cebu.",
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
        location: [6.9214, 122.0790], // Zamboanga City
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
      }
    ]
  }
];

// Export the data for use in other files
window.siteTechnicalDetails = siteTechnicalDetails;
window.siteNetworkInfo = siteNetworkInfo;
window.sitesMaintenanceLogs = sitesMaintenanceLogs;
window.mapMarkers = mapMarkers;
