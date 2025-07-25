const siteTechnicalDetails = {
  // Infrastructure
  "roads_01": {
    installationDate: "2018-06-12",
    lastMaintenance: "2025-01-15",
    coverageArea: "3.2 km linear distance",
    operatingHours: "24/7",
    serviceProvider: "DPWH Cebu City",
    lastInspection: "2025-02-03"
  },
  "highways_01": {
    installationDate: "2022-04-28",
    lastMaintenance: "2024-11-10",
    coverageArea: "8.9 km total length",
    operatingHours: "24/7",
    serviceProvider: "CCLEX Corporation",
    lastInspection: "2025-03-18"
  },
  "transport_01": {
    installationDate: "2020-09-15",
    lastMaintenance: "2025-02-18",
    coverageArea: "12.4 km route length",
    operatingHours: "5:00-22:00",
    serviceProvider: "Cebu Public Transport Authority",
    lastInspection: "2025-04-02"
  },
  "water_utility_01": {
    installationDate: "2019-03-10",
    lastMaintenance: "2025-03-18",
    coverageArea: "80% of Cebu City",
    operatingHours: "24/7",
    serviceProvider: "Metropolitan Cebu Water District (MCWD)",
    lastInspection: "2025-03-18"
  },
  
  // Public Buildings
  "hospital_01": {
    installationDate: "2015-08-22",
    lastMaintenance: "2025-01-20",
    coverageArea: "350-bed capacity",
    operatingHours: "24/7",
    serviceProvider: "Cebu City Health Department",
    lastInspection: "2025-02-15"
  },
  "school_01": {
    installationDate: "2012-06-15",
    lastMaintenance: "2024-12-10",
    coverageArea: "1,200 student capacity",
    operatingHours: "7:00-17:00 Mon-Fri",
    serviceProvider: "Department of Education - Cebu",
    lastInspection: "2025-01-05"
  },
  "govt_01": {
    installationDate: "1937-02-24 (renovated 2019)",
    lastMaintenance: "2025-02-12",
    coverageArea: "Central administration for Cebu City",
    operatingHours: "8:00-17:00 Mon-Fri",
    serviceProvider: "Cebu City Government",
    lastInspection: "2025-03-01"
  },
  
  // Natural Features
  "waterway_01": {
    installationDate: "N/A (Natural feature, monitoring since 2010)",
    lastMaintenance: "2025-01-08 (cleanup operation)",
    coverageArea: "6.5 km river length",
    operatingHours: "24/7 monitoring",
    serviceProvider: "Cebu Environment and Natural Resources Office",
    lastInspection: "2025-03-15"
  },
  
  // Default technical details
  "default": {
    installationDate: "2020-01-01",
    lastMaintenance: "2025-01-15",
    coverageArea: "Varies by facility",
    operatingHours: "24/7",
    serviceProvider: "Cebu City Infrastructure Department",
    lastInspection: "2025-02-28"
  }
};

const siteNetworkInfo = {
  // Infrastructure
  "roads_01": {
    status: "Active",
    uptime: "99.8%",
    bandwidth: "550 Mbps",
    latency: "15ms",
    signalStrength: "-60 dBm",
    connectedDevices: 12,
    lastUpdate: "2025-05-01 09:45:22"
  },
  "communication_01": {
    status: "Active",
    uptime: "99.9%",
    bandwidth: "10 Gbps",
    latency: "5ms",
    signalStrength: "-45 dBm",
    connectedDevices: 128,
    lastUpdate: "2025-05-07 14:25:36"
  },
  
  
  // Public Buildings
  "hospital_01": {
    status: "Active",
    uptime: "99.98%",
    bandwidth: "1 Gbps",
    latency: "8ms",
    signalStrength: "-55 dBm",
    connectedDevices: 240,
    lastUpdate: "2025-05-08 06:20:15"
  },
  
  // Traffic Data
  "traffic_condition_01": {
    status: "Active",
    uptime: "99.5%",
    bandwidth: "750 Mbps",
    latency: "12ms",
    signalStrength: "-58 dBm",
    connectedDevices: 35,
    lastUpdate: "2025-05-08 08:15:30"
  },
  
  // Default network information
  "default": {
    status: "Active",
    uptime: "99.8%",
    bandwidth: "450 Mbps",
    latency: "18ms",
    signalStrength: "-65 dBm",
    connectedDevices: 8,
    lastUpdate: "2025-05-07 14:25:36"
  }
};

const sitesMaintenanceLogs = {
  "roads_01": [
    {
      date: "2025-01-15",
      type: "Routine",
      technician: "Marco Santos",
      duration: "6 hours",
      description: "Quarterly inspection of road surface and drainage infrastructure.",
      findings: "Minor surface cracks on northern section, scheduled for spot repair.",
      followUpRequired: true,
      followUpDate: "2025-01-22",
      followUpNotes: "Surface cracks repaired, extension joints reinforced."
    },
    {
      date: "2024-10-20",
      type: "Emergency",
      technician: "Lily Chen",
      duration: "10 hours",
      description: "Response to flash flooding damage after heavy rainfall.",
      findings: "Erosion at drainage points, temporary reinforcement installed.",
      followUpRequired: true,
      followUpDate: "2024-11-05",
      followUpNotes: "Permanent drainage repairs completed, added additional runoff channels."
    }
  ],
  "highways_01": [
    {
      date: "2024-11-10",
      type: "Annual",
      technician: "Roberto Mendoza",
      duration: "48 hours",
      description: "Annual structural assessment of CCLEX bridge supports and roadway.",
      findings: "All structural elements within safety parameters. Minor wear on expansion joints.",
      followUpRequired: true,
      followUpDate: "2024-12-05",
      followUpNotes: "Expansion joint wear addressed, structural integrity confirmed excellent."
    }
  ],
  "water_utility_01": [
    {
      date: "2025-03-18",
      type: "Annual",
      technician: "David Chen",
      duration: "12 hours",
      description: "Annual comprehensive inspection of water distribution network.",
      findings: "92% of system in excellent condition. Two valves at substation C require replacement.",
      followUpRequired: true,
      followUpDate: "2025-03-25",
      followUpNotes: "Valve replacement completed successfully."
    },
    {
      date: "2024-12-05",
      type: "Routine",
      technician: "Sarah Johnson",
      duration: "5 hours",
      description: "Regular pressure testing and quality assessment.",
      findings: "All parameters within acceptable ranges. Increased chlorine levels as per new regulations.",
      followUpRequired: false
    }
  ],
  "hospital_01": [
    {
      date: "2025-01-20",
      type: "Routine",
      technician: "Elena Cruz",
      duration: "4 hours",
      description: "Quarterly safety inspection and emergency systems check.",
      findings: "All systems operational. Backup generator required preventive maintenance.",
      followUpRequired: true,
      followUpDate: "2025-01-25",
      followUpNotes: "Generator maintenance completed, performance optimal."
    },
    {
      date: "2024-11-08",
      type: "Emergency",
      technician: "Juan Reyes",
      duration: "3 hours",
      description: "Emergency response to power fluctuation affecting critical care units.",
      findings: "UPS system activated properly. Identified voltage regulator issue in electrical room B.",
      followUpRequired: true,
      followUpDate: "2024-11-09",
      followUpNotes: "Voltage regulator replaced, system stability restored."
    }
  ],
  "school_01": [
    {
      date: "2024-12-10",
      type: "Routine",
      technician: "Maria Gonzales",
      duration: "6 hours",
      description: "End-of-semester facility inspection and maintenance.",
      findings: "Science laboratory ventilation system requires filter replacement.",
      followUpRequired: true,
      followUpDate: "2024-12-15",
      followUpNotes: "Ventilation filters replaced, system efficiency restored to 100%."
    }
  ],
  "waterway_01": [
    {
      date: "2025-01-08",
      type: "Emergency",
      technician: "Rafael Suarez",
      duration: "14 hours",
      description: "Cleanup operation following upstream debris accumulation.",
      findings: "Significant plastic waste buildup at monitoring points 3 and 7.",
      followUpRequired: true,
      followUpDate: "2025-01-15",
      followUpNotes: "Completed full cleanup, implemented additional debris catch barriers."
    },
    {
      date: "2024-10-30",
      type: "Routine",
      technician: "Felipe Lorenzo",
      duration: "8 hours",
      description: "Pre-rainy season channel clearance and embankment inspection.",
      findings: "Channel capacity at 85%, minor embankment erosion at coordinates 10.3182, 123.8889.",
      followUpRequired: true,
      followUpDate: "2024-11-15",
      followUpNotes: "Embankment reinforced, channel capacity restored to 100%."
    }
  ],
  "flood_01": [
    {
      date: "2025-04-05",
      type: "Emergency",
      technician: "Carlos Mendoza",
      duration: "12 hours",
      description: "Pump system failure during heavy rainfall.",
      findings: "Main drainage pumps overloaded. Emergency backup systems deployed successfully.",
      followUpRequired: true,
      followUpDate: "2025-04-12",
      followUpNotes: "Pump capacity increased by 30% to handle similar future events."
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
      followUpNotes: "Channels cleared and capacity restored to 100%."
    }
  ],
  "default": [
    {
      date: "2025-03-10",
      type: "Routine",
      technician: "John Smith",
      duration: "4 hours",
      description: "Standard quarterly maintenance and inspection.",
      findings: "All systems operating within normal parameters.",
      followUpRequired: false
    },
    {
      date: "2024-11-15",
      type: "Annual",
      technician: "Anna Wong",
      duration: "8 hours",
      description: "Comprehensive annual assessment and preventive maintenance.",
      findings: "Systems operating at 94% efficiency. Minor adjustments made to improve performance.",
      followUpRequired: false
    }
  ]
};

const cebuCityMarkers = [
  // Infrastructure
  {
    category: "Infrastructure",
    id: "infrastructure",
    center: [10.3157, 123.8854], 
    sites: [
      {
        id: "roads_01",
        name: "Osmeña Boulevard",
        location: [10.3060, 123.8910],
        status: "active",
        subcategory: "Roads",
        description: "Major arterial road connecting M.J. Cuenco Avenue in San Roque to N. Escario Street in Capitol Site. Previously known as Jones Avenue; part of National Route 8 (N8)."
      },
      {
        id: "roads_02",
        name: "Natalio Bacalso Avenue",
        location: [10.3090, 123.8917],
        status: "active",
        subcategory: "Roads",
        description: "National highway starting at Fuente Osmeña Circle and extending southward. Also known as Cebu South Road; part of National Routes 8 (N8) and 830 (N830)."
      },
      {
        id: "streets_01",
        name: "Katipunan Street",
        location: [10.2965, 123.8780],
        status: "active",
        subcategory: "Streets",
        description: "National tertiary road from N. Bacalso Avenue and V. Rama Avenue in Barangay Calamba to F. Llamas Street in Barangay Tisa."
      },
      {
        id: "streets_02",
        name: "Tres de Abril Street",
        location: [10.2940, 123.8785],
        status: "warning",
        subcategory: "Streets",
        description: "National tertiary road from Spolarium Street in Barangay Pasil to F. Llamas Street in Barangay Punta Princesa."
      },
      {
        id: "highways_01",
        name: "Cebu–Cordova Link Expressway",
        location: [10.2870, 123.8800],
        status: "active",
        subcategory: "Highways",
        description: "8.9 km toll bridge expressway connecting South Road Properties in Cebu City to Cordova on Mactan Island. Longest sea-crossing bridge in the Philippines."
      },
      {
        id: "highways_02",
        name: "N815 Highway",
        location: [10.3230, 123.9050],
        status: "active",
        subcategory: "Highways",
        description: "National secondary road includes Juan Luna Avenue, Pope John Paul II Avenue, Salinas Drive, Veterans Drive, and Cebu–Balamban Transcentral Highway."
      },
      {
        id: "highways_03",
        name: "Cebu North Road (National Route 8)",
        location: [10.3795, 123.9528],
        status: "active",
        subcategory: "Highways",
        description: "A major highway connecting Cebu City to northern municipalities, facilitating regional transport and commerce."
      },
      {
        id: "transport_01",
        name: "Jeepney Routes MI-03B",
        location: [10.3100, 123.9490],
        status: "active",
        subcategory: "Public transportation networks",
        description: "Route from MEPZ 1 in Lapu-Lapu City to Cordova via various stops including Opon Public Market, Gaisano Mactan Island Mall, and Marina Mall."
      },
      {
        id: "transport_02",
        name: "MyBus Terminal - SM City Cebu",
        location: [10.3238, 123.9053],
        status: "active",
        subcategory: "Public transportation networks",
        description: "Bus terminal serving routes to Talisay City, SM Seaside City, and Mactan Airport."
      },
      {
        id: "water_utility_01",
        name: "MCWD Water Distribution Network",
        location: [10.3300, 123.8950],
        status: "active",
        subcategory: "Water Supply", 
        description: "Main water distribution system managed by the Metropolitan Cebu Water District (MCWD), serving Cebu City and neighboring areas."
      },
      {
        id: "electricity_utility_01",
        name: "VECO Power Distribution Grid",
        location: [10.3250, 123.9000],
        status: "active",
        subcategory: "Electricity Supply", 
        description: "Electricity distribution grid operated by Visayan Electric Company (VECO), covering Cebu City and surrounding municipalities."
      },
      {
        id: "sewage_utility_01",
        name: "Central Sewage Treatment Facility",
        location: [10.3150, 123.9100],
        status: "warning",
        subcategory: "Sewage System", 
        description: "Main sewage treatment facility handled by the Cebu City Government's Department of Public Services, with ongoing projects to improve sewage systems."
      },
      {
        id: "communication_01",
        name: "Underground Cabling Project",
        location: [10.3180, 123.8820],
        status: "maintenance",
        subcategory: "Communication lines",
        description: "Project to underground approximately 90 km of power and telecommunication lines to enhance urban aesthetics and safety."
      },
    {
      id: "communication_02",
      name: "PLDT Fiber Optic Network - Cebu City Central",
      location: [10.3100, 123.8950],
      status: "active",
      subcategory: "Communication lines",
      description: "High-capacity fiber optic network providing internet and telecommunications services to central Cebu City."
    },
    {
      id: "communication_03",
      name: "Globe Telecom Cell Tower - Lahug",
      location: [10.3260, 123.9030],
      status: "active",
      subcategory: "Communication lines",
      description: "Telecommunications tower providing cellular service and data connectivity to the Lahug area."
    },
    {
      id: "communication_04",
      name: "SmartTel Microwave Relay Station",
      location: [10.3350, 123.9150],
      status: "active",
      subcategory: "Communication lines",
      description: "Relay station facilitating wireless communications and backup connectivity during network outages."
    },
    {
      id: "communication_05",
      name: "Converge ICT Fiber Distribution Hub - Mandaue Boundary",
      location: [10.3500, 123.9230],
      status: "active",
      subcategory: "Communication lines",
      description: "Internet service provider's distribution hub connecting fiber networks across northern Cebu City."
    },
    {
      id: "communication_06",
      name: "Emergency Communications Tower - City Hall",
      location: [10.2934, 123.9017],
      status: "active",
      subcategory: "Communication lines",
      description: "Dedicated communications infrastructure for emergency services and disaster response coordination."
    },
    {
        id: "waste_01",
        name: "ARN Central Waste Management",
        location: [10.419560195400575, 123.94093539653379],
        status: "active",
        subcategory: "Waste Management Facilities",
        description: "Facility for waste collection, processing, and management."
      },
      {
        id: "waste_02",
        name: "Waste PH",
        location: [10.319934243510673, 123.92445590452405],
        status: "active",
        subcategory: "Waste Management Facilities",
        description: "Waste management company providing collection and disposal services."
      },
      {
        id: "waste_03",
        name: "Prime Waste Solutions Cebu",
        location: [10.420910837599825, 123.90831973526456],
        status: "active",
        subcategory: "Waste Management Facilities",
        description: "Company offering waste management and recycling solutions."
      },
      {
        id: "waste_04",
        name: "Inayawan Sanitary Landfill",
        location: [10.2651, 123.8745],
        status: "inactive",
        subcategory: "Waste Management Facilities",
        description: "15-hectare landfill, closed since 2015."
      },    
    ]
  },

// Internet Access
{
  category: "Internet Access",
  id: "internet_access",
  center: [10.3157, 123.8854],
  sites: [
    {
      id: "wifi_01",
      name: "Ayala Center Cebu Free WiFi Zone",
      location: [10.3183, 123.9055],
      status: "active",
      subcategory: "WiFi Hotspots",
      description: "Shopping mall providing free WiFi access throughout its premises, serving thousands of visitors daily."
    },
    {
      id: "wifi_02",
      name: "SM City Cebu WiFi Zone",
      location: [10.3119, 123.9196],
      status: "active",
      subcategory: "WiFi Hotspots",
      description: "Large shopping center offering complimentary wireless internet access to shoppers and visitors."
    },
    {
      id: "wifi_03",
      name: "Cebu IT Park Public WiFi",
      location: [10.3280, 123.9060],
      status: "active",
      subcategory: "WiFi Hotspots",
      description: "Free public WiFi network covering the IT Park area, supporting businesses and visitors with high-speed internet."
    },
    {
      id: "wifi_04",
      name: "Fuente Osmeña Circle WiFi Zone",
      location: [10.3070, 123.8950],
      status: "active",
      subcategory: "WiFi Hotspots",
      description: "Public WiFi access point at a major city landmark and gathering place."
    },
    {
      id: "wifi_05",
      name: "Plaza Independencia Free WiFi",
      location: [10.2932, 123.9062],
      status: "warning",
      subcategory: "WiFi Hotspots",
      description: "Municipal WiFi service covering the historic plaza, with occasional connectivity issues during peak hours."
    },
    {
      id: "internet_01",
      name: "Cebu City Central Library Digital Access Center",
      location: [10.2985, 123.9020],
      status: "active",
      subcategory: "Public Internet Centers",
      description: "Library-based facility providing free computer and internet access, digital literacy training, and e-government services."
    },
    {
      id: "internet_02",
      name: "Lahug Barangay Technology Center",
      location: [10.3250, 123.9020],
      status: "active",
      subcategory: "Public Internet Centers",
      description: "Community technology hub offering internet access, printing services, and basic computer training to residents."
    },
    {
      id: "internet_03",
      name: "Pardo Digital Community Center",
      location: [10.2780, 123.8470],
      status: "active",
      subcategory: "Public Internet Centers",
      description: "Public facility providing computer access, digital skills workshops, and online services to underserved communities."
    },
    {
      id: "internet_04",
      name: "Guadalupe Community Tech Hub",
      location: [10.3100, 123.8850],
      status: "active",
      subcategory: "Public Internet Centers",
      description: "Neighborhood center offering affordable internet access, computer usage, and technology education programs."
    },
    {
      id: "internet_05",
      name: "Basak Digital Empowerment Center",
      location: [10.3000, 123.8730],
      status: "maintenance",
      subcategory: "Public Internet Centers",
      description: "Public internet facility undergoing equipment upgrades and expansion of services."
    },
    
  ]
},

  // Public Buildings
  {
    category: "Public Buildings",
    id: "public_buildings",
    center: [10.3157, 123.8854],
    sites: [
      {
        "id": "hospital_01",
        "name": "Cebu City Medical Center",
        "location": [10.298238766000578, 123.89159988604682],
        "status": "active",
        "subcategory": "Hospitals",
        "description": "Public hospital serving the city with comprehensive medical services."
      },
      {
        "id": "hospital_02",
        "name": "Vicente Sotto Memorial Medical Center",
        "location": [10.308334083978739, 123.89139415672553],
        "status": "active",
        "subcategory": "Hospitals",
        "description": "Major government tertiary care hospital and referral center for the Central Visayas region."
      },
      {
        "id": "hospital_03",
        "name": "St. Vincent General Hospital Cebu, Inc.",
        "location": [10.302545584597969, 123.89777969555047],
        "status": "active",
        "subcategory": "Hospitals",
        "description": "Private general hospital providing medical services to Cebu City residents."
      },
      {
        "id": "hospital_04",
        "name": "Cebu Doctors' University Hospital",
        "location": [10.31571901726227, 123.89117073260907],
        "status": "active",
        "subcategory": "Hospitals",
        "description": "University hospital affiliated with Cebu Doctors' University offering comprehensive healthcare services."
      },
      {
        "id": "hospital_05",
        "name": "Adventist Hospital Cebu",
        "location": [10.297225388369254, 123.88516258448054],
        "status": "active",
        "subcategory": "Hospitals",
        "description": "Faith-based hospital formerly known as Miller Hospital providing quality healthcare services."
      },
      {
        "id": "hospital_06",
        "name": "Perpetual Succour Hospital of Cebu, Inc.",
        "location": [10.316647892356961, 123.90026878548946],
        "status": "active",
        "subcategory": "Hospitals",
        "description": "Private Catholic hospital managed by the Religious of the Virgin Mary congregation."
      },
      {
        "id": "hospital_07",
        "name": "Cebu North General Hospital",
        "location": [10.374622184200575, 123.91688438952787],
        "status": "active",
        "subcategory": "Hospitals",
        "description": "General hospital serving the northern areas of Cebu City and surrounding communities."
      },
      {
        "id": "hospital_08",
        "name": "Cebu Velez General Hospital",
        "location": [10.309179628664882, 123.89815894402746],
        "status": "active",
        "subcategory": "Hospitals",
        "description": "Private hospital providing healthcare services to the Cebu metropolitan area."
      },
      {
        "id": "hospital_09",
        "name": "VisayasMed Hospital",
        "location": [10.308081840858982, 123.89472571652541],
        "status": "active",
        "subcategory": "Hospitals",
        "description": "Modern healthcare facility serving patients throughout the Visayas region."
      },
      {
        "id": "hospital_10",
        "name": "Chong Hua Hospital",
        "location": [10.310304568568156, 123.89103000795832],
        "status": "active",
        "subcategory": "Hospitals",
        "description": "Leading private hospital in Cebu providing comprehensive medical care and specialized services."
      },
      {
        "id": "hospital_11",
        "name": "Vicente Gullas Memorial Hospital",
        "location": [10.34799552142234, 123.91722498060223],
        "status": "active",
        "subcategory": "Hospitals",
        "description": "Hospital serving the community and providing quality healthcare services."
      },
      {
        "id": "hospital_12",
        "name": "SWUMed - Southwestern University Medical Center",
        "location": [10.304064583893501, 123.89260834724799],
        "status": "active",
        "subcategory": "Hospitals",
        "description": "University hospital formerly known as Sacred Heart Hospital affiliated with Southwestern University."
      },
      {
        id: "school_01",
        name: "Cebu City National Science High School",
        location: [10.305188111488517, 123.87942884448371],
        status: "active",
        subcategory: "Schools",
        description: "Public science high school with specialized science and mathematics curriculum."
      },
      {
        id: "school_02",
        name: "Cebu City Don Carlos A. Gothong Memorial National High School",
        location: [10.297783682302445, 123.88986777581027],
        status: "active",
        subcategory: "Schools",
        description: "Public high school serving the local community."
      },
      {
        id: "school_03",
        name: "Don Vicente Rama Memorial National High School",
        location: [10.293507723179621, 123.86582432259009],
        status: "active",
        subcategory: "Schools",
        description: "Public high school providing secondary education to local students."
      },
      {
        id: "school_04",
        name: "Abellana National School",
        location: [10.30122810212619, 123.89699008930913],
        status: "active",
        subcategory: "Schools",
        description: "Public school offering primary and secondary education."
      },
      {
        id: "school_05",
        name: "Inayawan Elementary School",
        location: [10.272702963197748, 123.8566049439077],
        status: "active",
        subcategory: "Schools",
        description: "Public elementary school serving the Inayawan community."
      },
      {
        id: "school_06",
        name: "Bulacao Community School",
        location: [10.276967903364486, 123.85145510265465],
        status: "active",
        subcategory: "Schools",
        description: "Community school providing education to the Bulacao area."
      },
      {
        id: "school_07",
        name: "Mabolo National High School",
        location: [10.313365275107005, 123.917375044233],
        status: "active",
        subcategory: "Schools",
        description: "Public high school serving students in the Mabolo district."
      },
      {
        id: "school_08",
        name: "Barrio Luz National High School",
        location: [10.32518720557029, 123.90810532997753],
        status: "active",
        subcategory: "Schools",
        description: "Public high school providing education to students in Barrio Luz area."
      },
      {
        id: "school_09",
        name: "Apas National High School",
        location: [10.336945497792124, 123.90795285957677],
        status: "active",
        subcategory: "Schools",
        description: "Public high school serving the Apas community."
      },
      {
        id: "school_10",
        name: "Guadalupe Elementary School",
        location: [10.322095223112013, 123.8863889595768],
        status: "active",
        subcategory: "Schools",
        description: "Public elementary school providing primary education in Guadalupe."
      },
      {
        id: "school_11",
        name: "Don Vicente Rama Memorial Elementary School",
        location: [10.28976433903188, 123.86716459873259],
        status: "active",
        subcategory: "Schools",
        description: "Public elementary school providing primary education to local children."
      },
      {
        id: "school_12",
        name: "Cebu Institute of Technology - University",
        location: [10.295126494886482, 123.8809140686289],
        status: "active",
        subcategory: "Schools",
        description: "Private university focused on engineering, technology, and other academic disciplines."
      },
      {
        id: "school_13",
        name: "University of the Visayas - Main Campus",
        location: [10.299011117309355, 123.90254340189163],
        status: "active",
        subcategory: "Schools",
        description: "Private university offering a wide range of undergraduate and graduate programs."
      },
      {
        id: "school_14",
        name: "University of the Philippines Cebu",
        location: [10.323493989808542, 123.90167144264025],
        status: "active",
        subcategory: "Schools",
        description: "Public university offering undergraduate and graduate programs in various disciplines."
      },
      {
        id: "school_15",
        name: "University of Cebu - Banilad Campus",
        location: [10.339107624915384, 123.91391709767076],
        status: "active",
        subcategory: "Schools",
        description: "Private university campus offering various academic programs."
      },
      {
        id: "govt_01",
        name: "Cebu City Hall",
        location: [10.293401960635979, 123.90172170516787],
        status: "active",
        subcategory: "Government Offices",
        description: "Main administrative center for Cebu City government."
      },
      {
        id: "govt_02",
        name: "Human Resource and Development Office - Cebu City Government",
        location: [10.293384207358063, 123.90193822932032],
        status: "active",
        subcategory: "Government Offices",
        description: "Office managing human resources for the Cebu City government."
      },
      {
        id: "govt_03",
        name: "Philippine Statistics Authority - Regional Statistical Services Office VII",
        location: [10.296366744032362, 123.89798666353829],
        status: "active",
        subcategory: "Government Offices",
        description: "Government agency responsible for statistical data collection and analysis for Region VII."
      },
      {
        id: "govt_04",
        name: "Cebu City Government Department of Public Services - Administrative Division",
        location: [10.30503591754881, 123.90089421206046],
        status: "active",
        subcategory: "Government Offices",
        description: "Division managing public services for Cebu City residents."
      },
      {
        id: "govt_05",
        name: "DTI Cebu Provincial Office",
        location: [10.2943532948567, 123.9046493046408],
        status: "active",
        subcategory: "Government Offices",
        description: "Department of Trade and Industry provincial office serving Cebu."
      },
      {
        id: "govt_06",
        name: "Department of Labor and Employment - Region VII Central Visayas",
        location: [10.3111370949306, 123.90580801892276],
        status: "active",
        subcategory: "Government Offices",
        description: "Government agency overseeing labor and employment matters in Central Visayas."
      },
      {
        id: "govt_07",
        name: "Cebu City Environment and Natural Resources Office (CCENRO)",
        location: [10.293578826172636, 123.90153114222535],
        status: "active",
        subcategory: "Government Offices",
        description: "Office responsible for environmental protection and natural resources management in Cebu City."
      },
      {
        id: "govt_08",
        name: "Department of Agrarian Reform - Cebu Provincial Office",
        location: [10.294571103275274, 123.90406314750808],
        status: "active",
        subcategory: "Government Offices",
        description: "Provincial office implementing agrarian reform programs in Cebu."
      },
      {
        id: "govt_09",
        name: "Cebu City Cultural and Historical Affairs Office",
        location: [10.312296632653537, 123.89258988402251],
        status: "active",
        subcategory: "Government Offices",
        description: "Office managing cultural heritage and historical affairs in Cebu City."
      },
      {
        id: "govt_10",
        name: "DPWH Cebu City District Engineering Office",
        location: [10.298956323452884, 123.91009635280405],
        status: "active",
        subcategory: "Government Offices",
        description: "Department of Public Works and Highways district office for Cebu City."
      },
      {
        id: "govt_11",
        name: "Government Service Insurance System GSIS - Cebu",
        location: [10.298438484009232, 123.89686766444461],
        status: "active",
        subcategory: "Government Offices",
        description: "GSIS branch providing insurance and benefits to government employees in Cebu."
      },
      {
        id: "govt_12",
        name: "Cebu City Hall Satellite Office",
        location: [10.292885982632347, 123.90306893162017],
        status: "active",
        subcategory: "Government Offices",
        description: "Extension office of Cebu City Hall providing government services."
      },
      {
        id: "govt_13",
        name: "Office of the City Civil Registrar - Cebu",
        location: [10.308864993024608, 123.91108934433583],
        status: "active",
        subcategory: "Government Offices",
        description: "Office managing civil registration records for Cebu City residents."
      },
      {
        id: "govt_14",
        name: "CEBU IMMIGRATION DISTRICT OFFICE",
        location: [10.30977277711169, 123.9146084025254],
        status: "active",
        subcategory: "Government Offices",
        description: "Immigration office handling visa and immigration matters in Cebu."
      },
      {
        id: "govt_15",
        name: "Cebu City Health Department",
        location: [10.308020540362339, 123.90823547397477],
        status: "active",
        subcategory: "Government Offices",
        description: "Department responsible for public health services in Cebu City."
      },
      {
        id: "govt_16",
        name: "City Planning Development Office - City of Cebu",
        location: [10.292807080913503, 123.90057178931848],
        status: "active",
        subcategory: "Government Offices",
        description: "Office overseeing urban planning and development for Cebu City."
      },
      {
        id: "police_01",
        name: "Police Station 1 (Parian Police Station) - Cebu City Police Office",
        location: [10.301862026495945, 123.90867453060714],
        status: "active",
        subcategory: "Police Stations",
        description: "Police station serving the Parian area of Cebu City."
      },
      {
        id: "police_02",
        name: "Police Station 4 (Mabolo Police Station) - Cebu City Police Office",
        location: [10.315383708238953, 123.9215766184106],
        status: "active",
        subcategory: "Police Stations",
        description: "Police station serving the Mabolo district of Cebu City."
      },
      {
        id: "police_03",
        name: "Police Station 5 (Carbon Police Station) - Cebu City Police Office",
        location: [10.293721142406856, 123.91063789179462],
        status: "active",
        subcategory: "Police Stations",
        description: "Police station serving the Carbon area of Cebu City."
      },
      {
        id: "police_04",
        name: "Police Station 3 (Waterfront Police Station) - Cebu City Police Office",
        location: [10.294687020997658, 123.91232077281246],
        status: "active",
        subcategory: "Police Stations",
        description: "Police station serving the Waterfront area of Cebu City."
      },
      {
        id: "police_05",
        name: "Police Station 6 (Pasil Police Station) - Cebu City Police Office",
        location: [10.294135090736464, 123.89759556390638],
        status: "active",
        subcategory: "Police Stations",
        description: "Police station serving the Pasil area of Cebu City."
      },
      {
        id: "police_06",
        name: "Police Station 7 (Inayawan Police Station) - Cebu City Police Office",
        location: [10.281174396892089, 123.87019973633845],
        status: "active",
        subcategory: "Police Stations",
        description: "Police station serving the Inayawan area of Cebu City."
      },
      {
        id: "police_07",
        name: "Police Station 11 (Mambaling Police Station) - Cebu City Police Office",
        location: [10.295362109267767, 123.8760362230919],
        status: "active",
        subcategory: "Police Stations",
        description: "Police station serving the Mambaling area of Cebu City."
      },
      {
        id: "police_08",
        name: "Police Station 2 - Abellana, Cebu City",
        location: [10.303975766215547, 123.89011245585019],
        status: "active",
        subcategory: "Police Stations",
        description: "Police station serving the Abellana area of Cebu City."
      },
      {
        id: "police_09",
        name: "Police Station 8 (Talamban Police Station) - Cebu City Police Office",
        location: [10.372086568437723, 123.92673735893361],
        status: "active",
        subcategory: "Police Stations",
        description: "Police station serving the Talamban area of Cebu City."
      },
      {
        id: "police_10",
        name: "City Government Police Stations - WaterFront Police Station",
        location: [10.325985407405385, 123.910429528299],
        status: "active",
        subcategory: "Police Stations",
        description: "Police station operated by the city government serving the Waterfront area."
      },
      {
        id: "fire_01",
        name: "Bureau of Fire Protection - Regional Office VII",
        location: [10.298416278470773, 123.8922286907149],
        status: "active",
        subcategory: "Fire Departments",
        description: "Regional headquarters of the Bureau of Fire Protection for Central Visayas."
      },
      {
        id: "fire_02",
        name: "Pari-an Fire Sub Station",
        location: [10.299596283010846, 123.90335437132586],
        status: "active",
        subcategory: "Fire Departments",
        description: "Fire sub-station serving the Pari-an area of Cebu City."
      },
      {
        id: "fire_03",
        name: "Cebu Filipino-Chinese Volunteer Fire Brigade",
        location: [10.310693130864394, 123.89049349282145],
        status: "active",
        subcategory: "Fire Departments",
        description: "Volunteer fire brigade operated by the Filipino-Chinese community in Cebu."
      },
      {
        id: "fire_04",
        name: "Labangon Fire Station",
        location: [10.299733621814568, 123.88115077512616],
        status: "active",
        subcategory: "Fire Departments",
        description: "Fire station serving the Labangon area of Cebu City."
      },
      {
        id: "fire_05",
        name: "Apas Fire Sub Station",
        location: [10.337747871742383, 123.90848598867154],
        status: "active",
        subcategory: "Fire Departments",
        description: "Fire sub-station serving the Apas area of Cebu City."
      },
      {
        id: "fire_06",
        name: "Talamban Fire Station",
        location: [10.370573436405872, 123.91918287438965],
        status: "active",
        subcategory: "Fire Departments",
        description: "Fire station serving the Talamban area of Cebu City."
      },
      {
        id: "fire_07",
        name: "Pahina Central Fire Station",
        location: [10.298478944374898, 123.89249852254464],
        status: "active",
        subcategory: "Fire Departments",
        description: "Fire station serving the Pahina Central area of Cebu City."
      },
      {
        id: "fire_08",
        name: "Guadalupe Fire Sub Station",
        location: [10.323440123931785, 123.88534167545147],
        status: "active",
        subcategory: "Fire Departments",
        description: "Fire sub-station serving the Guadalupe area of Cebu City."
      },
      {
        id: "fire_09",
        name: "Mabolo Fire Sub Station",
        location: [10.313116030205054, 123.91953378867157],
        status: "active",
        subcategory: "Fire Departments",
        description: "Fire sub-station serving the Mabolo district of Cebu City."
      },
      {
        id: "fire_10",
        name: "Lahug Fire Sub - Station",
        location: [10.325011337546401, 123.90042657492056],
        status: "active",
        subcategory: "Fire Departments",
        description: "Fire sub-station serving the Lahug area of Cebu City."
      }
    ]
  },

  // Natural Features
  {
    category: "Natural Features",
    id: "natural_features",
    center: [10.3157, 123.8854],
    sites: [
      {
        id: "topo_01",
        name: "Central Cebu Protected Landscape",
        location: [10.556943285282983, 123.88466893470284],
        status: "active",
        subcategory: "Topography",
        description: "Protected natural landscape in central Cebu covering forested mountains and watersheds."
      },
      {
        id: "topo_02",
        name: "Sudlon National Park",
        location: [10.402660935157575, 123.853764462093],
        status: "active",
        subcategory: "Topography",
        description: "National park preserving natural habitats and biodiversity in Cebu."
      },
      {
        id: "topo_03",
        name: "Temple of Leah",
        location: [10.38746231618032, 123.93696881142718],
        status: "active",
        subcategory: "Topography",
        description: "Landmark structure located on elevated terrain with panoramic views of the city."
      },
      {
        id: "topo_04",
        name: "Magellan's Cross",
        location: [10.32315230105024, 123.91676204087462],
        status: "active",
        subcategory: "Topography",
        description: "Historical landmark marking the arrival of Christianity to the Philippines."
      },
      {
        id: "topo_05",
        name: "TOPS Cebu",
        location: [10.382785669295837, 123.93340291074145],
        status: "active",
        subcategory: "Topography",
        description: "Elevated viewpoint offering panoramic views of Cebu City."
      },
       {
      id: "waterway_01",
      name: "Central Cebu Protected Landscape (Watershed)",
      location: [10.545475071713037, 123.8604911412256],
      status: "active",
      subcategory: "Waterways",
      description: "Protected watershed area providing water resources for Cebu."
    },
    {
      id: "waterway_02",
      name: "Guadalupe River",
      location: [10.317704527797694, 123.88865197922283],
      status: "active",
      subcategory: "Waterways",
      description: "River flowing through the Guadalupe area of Cebu City."
    },
    {
      id: "waterway_03",
      name: "Kamputhaw River",
      location: [10.300238613265769, 123.91028534209605],
      status: "active",
      subcategory: "Waterways",
      description: "River passing through the Kamputhaw area of Cebu City."
    },
    {
      id: "waterway_04",
      name: "Kinalumsan River",
      location: [10.303653062650705, 123.86272050572256],
      status: "active",
      subcategory: "Waterways",
      description: "River flowing through parts of Cebu City."
    },
    {
      id: "waterway_05",
      name: "Subangdaku River",
      location: [10.331847446302016, 123.91929596390968],
      status: "active",
      subcategory: "Waterways",
      description: "Major river in the metropolitan area of Cebu."
    },
    {
      id: "waterway_06",
      name: "Butuanon River",
      location: [10.374595018266985, 123.94187318747643],
      status: "active",
      subcategory: "Waterways",
      description: "River system flowing through northern parts of Metro Cebu."
    },
    {
      id: "waterway_07",
      name: "Arrabal River",
      location: [10.298170682328504, 123.86880066819049],
      status: "active",
      subcategory: "Waterways",
      description: "River passing through the Arrabal area of Cebu City."
    },
    {
      id: "waterway_08",
      name: "Bulacao River",
      location: [10.271656656322426, 123.86006109777757],
      status: "active",
      subcategory: "Waterways",
      description: "River flowing through the Bulacao area of Cebu City."
    },
    {
      id: "waterway_09",
      name: "Mananga River",
      location: [10.317039667649041, 123.82825877210827],
      status: "active",
      subcategory: "Waterways",
      description: "Major river system in southern Cebu."
    },
      
      {
        id: "park_01",
        name: "D' Family Park",
        location: [10.36112267530041, 123.9172917314316],
        status: "active",
        subcategory: "Parks",
        description: "Family-oriented recreational park with various amenities."
      },
      {
        id: "park_02",
        name: "Cebu Ocean Park",
        location: [10.284618776695728, 123.87866792203381],
        status: "active",
        subcategory: "Parks",
        description: "Marine-themed attraction featuring aquatic wildlife and exhibits."
      },
      {
        id: "park_03",
        name: "Sky Park Garden",
        location: [10.284338639839207, 123.88169343856816],
        status: "active",
        subcategory: "Parks",
        description: "Elevated garden park offering green space and city views."
      },
      {
        id: "park_04",
        name: "Freedom Park",
        location: [10.297714826437149, 123.89820151601482],
        status: "active",
        subcategory: "Parks",
        description: "Public park area for gatherings and civic activities."
      },
      {
        id: "park_05",
        name: "Cebu IT Park",
        location: [10.332824615079318, 123.92369192971923],
        status: "active",
        subcategory: "Parks",
        description: "Mixed-use development with green spaces and business centers."
      },
      {
        id: "park_06",
        name: "Mountain View Nature's Park",
        location: [10.374855664377776, 123.88654875546425],
        status: "active",
        subcategory: "Parks",
        description: "Nature park with mountain views and natural landscapes."
      },
      {
        id: "park_07",
        name: "Sudlon National Park",
        location: [10.388201322120308, 123.80325122631511],
        status: "active",
        subcategory: "Parks",
        description: "National park with protected forest areas and natural trails."
      },
      {
        id: "park_08",
        name: "Family Park Talamban Entrance",
        location: [10.359495911920705, 123.93234058039123],
        status: "active",
        subcategory: "Parks",
        description: "Entrance to family-oriented recreational park in Talamban area."
      },
      {
        id: "park_09",
        name: "The Millennium Park",
        location: [10.322006065783794, 123.93920703539527],
        status: "active",
        subcategory: "Parks",
        description: "Public park offering recreational spaces for visitors."
      },
      {
        id: "park_10",
        name: "Plaza Independencia",
        location: [10.298023730059157, 123.93714709889404],
        status: "active",
        subcategory: "Parks",
        description: "Historic plaza and public park in downtown Cebu City."
      },
      {
        id: "park_11",
        name: "Kan-Irag Nature Park",
        location: [10.399682748453985, 123.88015552236044],
        status: "active",
        subcategory: "Parks",
        description: "Nature park preserving local flora and fauna with hiking trails."
      },
      {
        id: "park_12",
        name: "Cebu City Government - Parks and Playgrounds Commission",
        location: [10.294307993625171, 123.92513080263697],
        status: "active",
        subcategory: "Parks",
        description: "Government office overseeing parks and playgrounds in Cebu City."
      },
      {
        id: "green_01",
        name: "Plaza Independencia",
        location: [10.293407091217528, 123.90614543507638],
        status: "active",
        subcategory: "Green Spaces",
        description: "Historic plaza with green areas in the heart of Cebu City."
      },
      {
        id: "green_02",
        name: "Senior Citizen's Park",
        location: [10.292051883741381, 123.90155344873378],
        status: "active",
        subcategory: "Green Spaces",
        description: "Park dedicated to senior citizens with accessible green spaces."
      },
      {
        id: "green_03",
        name: "Cebu Safari and Adventure Park",
        location: [10.41, 123.86], // Approximate location as not provided in the original data
        status: "active",
        subcategory: "Green Spaces",
        description: "Wildlife and adventure park featuring various animal species and attractions."
      },
      {
        id: "green_04",
        name: "Sirao Pictorial Garden and Camping Site",
        location: [10.406390079777715, 123.86682541973404],
        status: "active",
        subcategory: "Green Spaces",
        description: "Flower garden and camping area known for its picturesque landscapes."
      }
    ]
  },

  // Environmental Risks
  {
      category: "Environmental Risks",
      id: "environmental_risks",
      center: [10.3157, 123.8854],
      sites: [
      {
        id: "flood_01",
        name: "Kasambagan Flood Zone",
        location: [10.3300, 123.9100],
        status: "critical",
        subcategory: "Areas vulnerable to flooding",
        description: "Area highly vulnerable to flooding."
      },
      {
        id: "flood_02",
        name: "Kinasang-an Flood Zone",
        location: [10.2850, 123.8800],
        status: "critical",
        subcategory: "Areas vulnerable to flooding",
        description: "Area highly vulnerable to flooding."
      },
      {
        id: "flood_03",
        name: "Labangon Flood Zone",
        location: [10.2950, 123.8850],
        status: "critical",
        subcategory: "Areas vulnerable to flooding",
        description: "Area highly vulnerable to flooding."
      },
      {
        id: "flood_04",
        name: "Mabolo Flood Zone",
        location: [10.3150, 123.9150],
        status: "critical",
        subcategory: "Areas vulnerable to flooding",
        description: "Area highly vulnerable to flooding."
      },
      {
        id: "flood_05",
        name: "Bonbon Flood Zone",
        location: [10.3700, 123.8900],
        status: "critical",
        subcategory: "Areas vulnerable to flooding",
        description: "Area highly vulnerable to flooding."
      },
      {
        id: "pollution_01",
        name: "Industrial Zone Pollution Area",
        location: [10.3000, 123.8700],
        status: "warning",
        subcategory: "Pollution zones",
        description: "Area with high levels of industrial emissions and air quality concerns."
      },
      {
        id: "pollution_02",
        name: "Traffic Congestion Pollution Zone",
        location: [10.3100, 123.8900],
        status: "warning",
        subcategory: "Pollution zones",
        description: "Urban corridor with elevated air pollution levels due to heavy traffic congestion."
      },
      {
        id: "pollution_03",
        name: "South Reclamation Project Pollution Zone",
        location: [10.2750, 123.8650],
        status: "warning",
        subcategory: "Pollution zones",
        description: "Coastal development area with elevated air pollution from construction activities and increased traffic congestion."
      },
      {
        id: "pollution_04",
        name: "Port Area Pollution Zone",
        location: [10.2930, 123.9050],
        status: "critical",
        subcategory: "Pollution zones",
        description: "Harbor and shipping area with significant maritime emissions and industrial pollutants affecting air quality."
      },
      {
        id: "pollution_05",
        name: "Inayawan Landfill Zone",
        location: [10.2651, 123.8745],
        status: "critical",
        subcategory: "Pollution zones",
        description: "Former landfill site with ongoing environmental concerns including soil contamination and methane emissions."
      },
      {
        id: "hazard_01",
        name: "Busay Landslide Risk Zone",
        location: [10.3400, 123.8700],
        status: "warning",
        subcategory: "Other environmental hazards",
        description: "Hillside area at risk of landslides during heavy rain due to steep slopes and soil conditions."
      },
      {
        id: "hazard_02",
        name: "Sirao Geological Hazard Area",
        location: [10.3700, 123.8500],
        status: "warning",
        subcategory: "Other environmental hazards",
        description: "Mountainous terrain identified as highly susceptible to landslides and soil erosion."
      },
      {
        id: "hazard_03",
        name: "Lusaran Landslide Zone",
        location: [10.4000, 123.8600],
        status: "warning",
        subcategory: "Other environmental hazards",
        description: "Area highly susceptible to landslides."
      },
      {
          id: "hazard_04",
        name: "Binaliw Landslide Zone",
        location: [10.4100, 123.8700],
        status: "warning",
        subcategory: "Other environmental hazards",
        description: "Area highly susceptible to landslides."
      },
      {
          id: "hazard_05",
        name: "Guba Landslide Zone",
        location: [10.4200, 123.8650],
        status: "warning",
        subcategory: "Other environmental hazards",
        description: "Area highly susceptible to landslides."
      }
    ]
  },

  // Points of Interest
  {
    category: "Points of Interest",
    id: "points_of_interest",
    center: [10.3157, 123.8854],
    sites: [
      {
        id: "business_01",
        name: "Cebu Business Park",
        location: [10.3183, 123.9055],
        status: "active",
        subcategory: "Businesses",
        description: "50-hectare master-planned development integrating business, residential, sports, recreation, and leisure facilities."
      },
      {
        id: "business_02",
        name: "Cebu IT Park",
        location: [10.3280, 123.9060],
        status: "active",
        subcategory: "Businesses",
        description: "27-hectare business park hosting numerous IT and BPO companies, residential condos, and commercial establishments."
      },
      {
        id: "business_03",
        name: "CityMall Bacalso",
        location: [10.2950, 123.8820],
        status: "active",
        subcategory: "Businesses",
        description: "Community mall located along N. Bacalso Avenue, offering retail shops and a grocery store."
      },
      {
          id: "business_04",
          name: "Downtown/Colon Street",
          location: [10.2970, 123.8977],
          status: "active",
          subcategory: "Businesses",
          description: "Oldest street and traditional commercial center."
        },
        {
          id: "business_05",
          name: "South Road Properties",
          location: [10.2750, 123.8799],
          status: "active",
          subcategory: "Businesses",
          description: "300-hectare reclaimed development."
        },
        {
          id: "business_06",
          name: "Cebu Port Area Business District",
          location: [10.2980, 123.9050],
          status: "active",
          subcategory: "Businesses",
          description: "Major shipping and commercial hub facilitating trade throughout the Visayas region."
        },
// Continuation of cebu-data.js

// Points of Interest continued
{
          id: "business_07",
          name: "Banilad Town Center",
          location: [10.3430, 123.9130],
          status: "active",
          subcategory: "Businesses",
          description: "Mixed-use commercial development with retail shops, restaurants, and service centers."
        },
        {
          id: "business_08",
          name: "Gaisano Country Mall",
          location: [10.3550, 123.9150],
          status: "active",
          subcategory: "Businesses",
          description: "Shopping center serving the northern areas of Cebu City with retail, dining, and entertainment options."
        },
      {
        id: "recreation_01",
        name: "SM Seaside City Cebu",
        location: [10.2804, 123.8818],
        status: "active",
        subcategory: "Recreational areas",
        description: "One of the largest shopping malls in the Philippines, featuring retail shops, restaurants, cinemas, and a rooftop park."
      },
      {
        id: "recreation_02",
        name: "Ayala Center Cebu",
        location: [10.3183, 123.9055],
        status: "active",
        subcategory: "Recreational areas",
        description: "Premier shopping mall offering a mix of retail, dining, and entertainment options, with landscaped gardens and open spaces."
      },
      {
        id: "recreation_03",
        name: "Garden Bloc (within Cebu IT Park)",
        location: [10.3280, 123.9060],
        status: "active",
        subcategory: "Recreational areas",
        description: "3-hectare open park development featuring restaurants, bars, and event spaces, popular for outdoor dining and leisure."
      },
      {
        id: "recreation_04",
        name: "Tops Lookout",
        location: [10.3828, 123.9334],
        status: "active",
        subcategory: "Recreational areas",
        description: "Popular mountain viewpoint offering panoramic views of Cebu City and surrounding areas, with food stalls and souvenir shops."
      },
      {
        id: "recreation_05",
        name: "Plaza Independencia",
        location: [10.2932, 123.9062],
        status: "active",
        subcategory: "Recreational areas",
        description: "Historic urban plaza with landscaped gardens, walking paths, and a central gazebo, surrounded by significant landmarks."
      },
      {
        id: "recreation_06",
        name: "Sugbu Chinese Heritage Museum",
        location: [10.2932, 123.9010],
        status: "active",
        subcategory: "Recreational areas",
        description: "Cultural museum showcasing the Chinese influence on Cebu's history and development, housed in a historic building."
      },
      {
        id: "community_01",
        name: "Cebu City Sports Center",
        location: [10.3050, 123.8880],
        status: "active",
        subcategory: "Community centers",
        description: "Multi-purpose stadium used for sports events, concerts, and community gatherings."
      },
      {
        id: "community_02",
        name: "Barangay Lahug Community Center",
        location: [10.3250, 123.9020],
        status: "active",
        subcategory: "Community centers",
        description: "Local government facility serving the residents of Barangay Lahug, hosting community events and services."
      },
      {
        id: "community_03",
        name: "Barangay Guadalupe Community Center",
        location: [10.3100, 123.8850],
        status: "active",
        subcategory: "Community centers",
        description: "Community center providing various services and programs for residents of Barangay Guadalupe."
      },
      {
        id: "community_04",
        name: "Talamban Community Center",
        location: [10.3730, 123.9100],
        status: "active",
        subcategory: "Community centers",
        description: "Multi-purpose facility serving the residents of Barangay Talamban, providing various community services and programs."
      },
      {
        id: "community_05",
        name: "Basak Community Center",
        location: [10.3000, 123.8730],
        status: "active",
        subcategory: "Community centers",
        description: "Local government facility providing services and hosting events for the Basak community."
      },
      {
        id: "community_06",
        name: "Inayawan Barangay Hall and Community Center",
        location: [10.2700, 123.8730],
        status: "active",
        subcategory: "Community centers",
        description: "Combined barangay government office and community facility serving Inayawan residents."
      }
    ]
  },

  // Population Data
  {
    category: "Population Data",
    id: "population_data",
    center: [10.3157, 123.8854],
    sites: [
      {
        id: "density_01",
        name: "Lorega San Miguel Density Zone",
        location: [10.3100, 123.9000],
        status: "warning",
        subcategory: "Population density",
        description: "Highly populated urban area with a density of 61,479 persons per square kilometer."
      },
      {
        id: "density_02",
        name: "Suba Density Zone",
        location: [10.2950, 123.8800],
        status: "critical",
        subcategory: "Population density",
        description: "One of the most densely populated areas in Cebu City with 109,691 persons per square kilometer."
      },
      {
        id: "density_03",
        name: "Pasil Density Zone",
        location: [10.2960, 123.8800],
        status: "critical",
        subcategory: "Population density",
        description: "Highly congested urban area with 105,003 persons per square kilometer."
      },
      {
        id: "density_04",
        name: "Mabolo Density Zone",
        location: [10.3150, 123.9170],
        status: "warning",
        subcategory: "Population density",
        description: "Urban area with high population concentration of approximately 38,000 persons per square kilometer."
      },
      {
        id: "density_05",
        name: "Punta Princesa Density Zone",
        location: [10.2980, 123.8700],
        status: "warning",
        subcategory: "Population density",
        description: "Densely populated residential area with approximately 42,000 persons per square kilometer."
      },
      {
        id: "density_06",
        name: "Lahug Density Zone",
        location: [10.3250, 123.9020],
        status: "warning",
        subcategory: "Population density",
        description: "Mixed residential and commercial area with population density of approximately 35,000 persons per square kilometer."
      },
      {
        id: "income_01",
        name: "Cebu Business Park Affluent Zone",
        location: [10.3183, 123.9055],
        status: "active",
        subcategory: "Income distribution",
        description: "High-income area with upscale residential developments, multinational companies, and premium commercial establishments."
      },
      {
        id: "income_02",
        name: "Cebu IT Park Economic Zone",
        location: [10.3280, 123.9060],
        status: "active",
        subcategory: "Income distribution",
        description: "Middle to high-income area with modern residential and commercial developments, hosting IT and BPO companies."
      },
      {
        id: "income_03",
        name: "Pasil Economic Challenge Zone",
        location: [10.2960, 123.8800],
        status: "warning",
        subcategory: "Income distribution",
        description: "Lower-income area facing challenges related to poverty and informal settlements, known for its fishing industry."
      },
      {
        id: "income_04",
        name: "Pardo Low-Income Zone",
        location: [10.2780, 123.8470],
        status: "warning",
        subcategory: "Income distribution",
        description: "Area with predominantly lower-income households facing economic challenges and limited access to resources."
      },
      {
        id: "income_05",
        name: "Talamban Middle-Income Zone",
        location: [10.3730, 123.9150],
        status: "active",
        subcategory: "Income distribution",
        description: "Growing residential area with predominantly middle-income households, featuring newer housing developments."
      },
      {
        id: "income_06",
        name: "Maria Luisa Estate Park Affluent Zone",
        location: [10.3450, 123.8800],
        status: "active",
        subcategory: "Income distribution",
        description: "Exclusive gated community with high-end residential properties and high-income households."
      },
      {
        id: "education_01",
        name: "University of San Carlos Educational Zone",
        location: [10.3100, 123.8900],
        status: "active",
        subcategory: "Education levels",
        description: "Area with high concentration of educational institutions and higher education attainment levels."
      },
      {
        id: "education_02",
        name: "University of the Philippines Cebu Educational Zone",
        location: [10.3250, 123.9020],
        status: "active",
        subcategory: "Education levels",
        description: "District with prominent educational institutions and high rates of college and post-graduate degrees."
      },
      {
        id: "education_03",
        name: "University of Cebu Educational Zone",
        location: [10.2950, 123.8800],
        status: "active",
        subcategory: "Education levels",
        description: "Area surrounding a prominent private university with diverse educational programs and accessibility."
      },
      {
        id: "education_04",
        name: "Cebu Institute of Technology Educational Zone",
        location: [10.2950, 123.8810],
        status: "active",
        subcategory: "Education levels",
        description: "Area surrounding a technology-focused university with high concentration of technical and engineering graduates."
      },
      {
        id: "education_05",
        name: "University of Southern Philippines Foundation Educational Zone",
        location: [10.3010, 123.8970],
        status: "active",
        subcategory: "Education levels",
        description: "District near a foundation university with diverse educational programs and relatively high tertiary education rates."
      },
      {
        id: "education_06",
        name: "Inayawan Education Challenge Zone",
        location: [10.2700, 123.8700],
        status: "warning",
        subcategory: "Education levels",
        description: "Area with lower educational attainment rates and challenges in accessing quality education resources."
      },
    ]
  },

  // Traffic Data
  {
    category: "Traffic Data",
    id: "traffic_data",
    center: [10.3157, 123.8854],
    sites: [
      {
        id: "traffic_condition_01",
        name: "Banilad-Talamban Corridor Traffic Monitor",
        location: [10.3550, 123.9100],
        status: "warning",
        subcategory: "Real-time traffic conditions",
        description: "Traffic monitoring system covering a persistent bottleneck due to narrow roads and the concentration of schools in Talamban."
      },
      {
        id: "traffic_condition_02",
        name: "Osmeña Boulevard Traffic Monitor",
        location: [10.3100, 123.8900],
        status: "warning",
        subcategory: "Real-time traffic conditions",
        description: "Live traffic monitoring system covering a major thoroughfare experiencing regular traffic congestion."
      },
      {
      id: "traffic_condition_03",
      name: "South Road Properties Junction",
      location: [10.2931, 123.8785],
      status: "warning",
      subcategory: "Congestion patterns",
      description: "Major traffic bottleneck at SRP junction."
      },
        {
      id: "traffic_condition_04",
      name: "N. Bacalso Avenue",
      location: [10.2980, 123.8709],
      status: "warning",
      subcategory: "Congestion patterns",
      description: "Major north-south thoroughfare with heavy traffic."
      },
      {
        id: "traffic_condition_05",
        name: "UN Avenue/Mandaue-Cebu Connection",
        location: [10.3192, 123.9220],
        status: "warning",
        subcategory: "Congestion patterns",
        description: "Inter-city connection with consistent congestion."
      },
      {
        id: "congestion_01",
        name: "Governor Cuenco Avenue Congestion Zone",
        location: [10.3400, 123.9100],
        status: "warning",
        subcategory: "Congestion patterns",
        description: "Area experiencing heavy traffic during peak hours (7:00–9:00 AM and 5:00–7:00 PM)."
      },
      {
        id: "congestion_02",
        name: "General Maxilom Avenue Congestion Zone",
        location: [10.3100, 123.8900],
        status: "warning",
        subcategory: "Congestion patterns",
        description: "Major commercial corridor known for traffic congestion, especially during rush hours."
      },
      {
        id: "congestion_03",
        name: "Natalio Bacalso Avenue Congestion Zone",
        location: [10.2900, 123.8800],
        status: "warning",
        subcategory: "Congestion patterns",
        description: "Key route with frequent traffic issues due to high volume of vehicles and commercial activity."
      },
      {
        id: "transport_route_01",
        name: "Route 01K: Urgello – SM City Cebu – Parkmall",
        location: [10.2960, 123.8880],
        status: "active",
        subcategory: "Public transport routes",
        description: "Jeepney route connecting the southern part of Cebu City to major commercial centers, passing through Urgello Street, E-Mall, Colon Street, SM City Cebu, and Parkmall."
      },
      {
        id: "transport_route_02",
        name: "Route 04B: Lahug – Carbon Market",
        location: [10.3250, 123.9020],
        status: "active",
        subcategory: "Public transport routes",
        description: "Key jeepney route traversing educational and commercial areas including JY Square Mall, UP Cebu, Provincial Capitol, Fuente Osmeña Circle, Colon Street, and Carbon Market."
      },
      {
        id: "transport_route_03",
        name: "Route 13C: Talamban – Colon",
        location: [10.3730, 123.9100],
        status: "active",
        subcategory: "Public transport routes",
        description: "Jeepney route serving students and commuters from northern barangays, passing through Banilad Town Center, Gaisano Country Mall, Ayala Center Cebu, and Colon Street."
      }
    ]
  },
  {
  category: "National Broadband Project",
  id: "national_broadband",
  center: [10.3157, 123.8854],
  sites: [
    {
      id: "nbp_01",
      name: "NBP Cebu City Gateway",
      location: [10.3000, 123.9100],
      status: "active",
      subcategory: "Core Infrastructure",
      description: "Primary interconnection facility linking Cebu City to the national government's broadband backbone network."
    },
    {
      id: "nbp_02",
      name: "NBP Data Center - Cebu City",
      location: [10.3150, 123.8950],
      status: "active",
      subcategory: "Data Centers",
      description: "Regional data center hosting government digital services and applications as part of the National Broadband Plan."
    },
    {
      id: "nbp_03",
      name: "Government Network Operations Center",
      location: [10.2950, 123.9010],
      status: "active",
      subcategory: "Operations",
      description: "24/7 facility monitoring and managing all NBP infrastructure and services across Cebu Province."
    },
    {
      id: "nbp_04",
      name: "Free WiFi for All - Plaza Independencia Site",
      location: [10.2930, 123.9060],
      status: "active",
      subcategory: "Public Access Points",
      description: "High-capacity public WiFi installation providing free internet access as part of the national connectivity program."
    },
    {
      id: "nbp_05",
      name: "Free WiFi for All - Cebu City Hospital",
      location: [10.2982, 123.8916],
      status: "active",
      subcategory: "Public Access Points",
      description: "Government-sponsored free WiFi access point serving patients, visitors, and staff at the public hospital."
    },
    {
      id: "nbp_06",
      name: "NBP Education Network Hub - Cebu City",
      location: [10.3010, 123.8980],
      status: "active",
      subcategory: "Specialized Networks",
      description: "Dedicated connectivity hub linking all public schools and educational institutions to the national education network."
    },
    {
      id: "nbp_07",
      name: "Government Fiber Distribution Point - North District",
      location: [10.3350, 123.9120],
      status: "active",
      subcategory: "Core Infrastructure",
      description: "Fiber distribution facility connecting government offices in northern Cebu City to the national backbone."
    },
    {
      id: "nbp_08",
      name: "Government Fiber Distribution Point - South District",
      location: [10.2800, 123.8700],
      status: "active",
      subcategory: "Core Infrastructure",
      description: "Fiber distribution facility connecting government offices in southern Cebu City to the national backbone."
    },
    {
      id: "nbp_09",
      name: "NBP Cellular Backhaul Station",
      location: [10.3200, 123.8800],
      status: "maintenance",
      subcategory: "Wireless Infrastructure",
      description: "Facility providing backhaul connectivity for mobile network operators as part of public-private partnership."
    },
    {
      id: "nbp_10",
      name: "Digital Government Service Center",
      location: [10.3050, 123.8920],
      status: "active",
      subcategory: "Service Centers",
      description: "Integrated facility offering access to e-government services and digital assistance to residents."
    }
  ]
}
];

// Export the data for use in other files
window.siteTechnicalDetails = siteTechnicalDetails;
window.siteNetworkInfo = siteNetworkInfo;
window.sitesMaintenanceLogs = sitesMaintenanceLogs;
window.cebuCityMarkers = cebuCityMarkers;