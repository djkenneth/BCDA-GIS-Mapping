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
      "Scheduled maintenance for Infrastractrue 1 tomorrow at 10:00 AM.",
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

const mapMarkers = [
  {
    category: "Government Buildings",
    id: "government_buildings",
    center: [14.5995, 120.9842], // Manila center
    checkboxConfig: {
      masterCheckboxId: "all-government",
    },
    displayInfo: {
      title: "Government Buildings",
      type: "Offices, Warehouses, Facilities",
      className: "nbp-bg",
      icon: "fas fa-building",
    },
    subcategoryConfigs: {
      "offices": {
        title: "Offices",
        type: "Government Offices",
        className: "nbp-bg",
        icon: "fas fa-building",
      },
      "warehouses": {
        title: "Warehouses",
        type: "Storage Facilities",
        className: "data-center-bg",
        icon: "fas fa-warehouse",
      },
      "facilities": {
        title: "Facilities",
        type: "General Facilities",
        className: "info-bg",
        icon: "fas fa-industry",
      },
    },
    sites: [
      // Manila NCR
      {
        id: "office_01",
        name: "Malacañang Palace Complex",
        location: [14.5995, 120.9842],
        status: "active",
        subcategory: "Offices",
        description: "Official residence and workplace of the President of the Philippines.",
      },
      {
        id: "office_02",
        name: "Supreme Court of the Philippines",
        location: [14.5901, 120.9794],
        status: "active",
        subcategory: "Offices",
        description: "Highest judicial court in the Philippines.",
      },
      {
        id: "office_03",
        name: "Senate Building",
        location: [14.5851, 120.9794],
        status: "active",
        subcategory: "Offices",
        description: "Upper chamber of the Congress of the Philippines.",
      },
      {
        id: "office_04",
        name: "House of Representatives Complex",
        location: [14.5803, 120.9765],
        status: "active",
        subcategory: "Offices",
        description: "Lower house of the Congress of the Philippines.",
      },
      {
        id: "office_05",
        name: "Department of Finance Main Office",
        location: [14.5832, 120.9797],
        status: "active",
        subcategory: "Offices",
        description: "Central office of the Department of Finance.",
      },
      
      // Cebu
      {
        id: "office_06",
        name: "Cebu City Hall",
        location: [10.293719, 123.902612],
        status: "active",
        subcategory: "Offices",
        description: "Primary government office building for Cebu city administration.",
      },
      {
        id: "office_07",
        name: "DOF Regional Office VII",
        location: [10.315700, 123.885400],
        status: "active",
        subcategory: "Offices",
        description: "Department of Finance regional headquarters for Central Visayas.",
      },
      {
        id: "office_08",
        name: "BIR Regional Office No. 13",
        location: [10.301500, 123.894200],
        status: "active",
        subcategory: "Offices",
        description: "Bureau of Internal Revenue regional office for Cebu.",
      },
      
      // Davao
      {
        id: "office_09",
        name: "Davao City Hall",
        location: [7.073150, 125.612831],
        status: "active",
        subcategory: "Offices",
        description: "Main government office for Davao City administration.",
      },
      {
        id: "office_10",
        name: "DOF Regional Office XI",
        location: [7.064250, 125.608200],
        status: "active",
        subcategory: "Offices",
        description: "Department of Finance regional office for Davao Region.",
      },
      
      // Iloilo
      {
        id: "office_11",
        name: "Iloilo Provincial Capitol",
        location: [10.721100, 122.562600],
        status: "active",
        subcategory: "Offices",
        description: "Provincial government headquarters of Iloilo.",
      },
      {
        id: "office_12",
        name: "BIR Regional Office No. 21",
        location: [10.696700, 122.564400],
        status: "warning",
        subcategory: "Offices",
        description: "Bureau of Internal Revenue office in Iloilo requiring maintenance.",
      },
      
      // Baguio
      {
        id: "office_13",
        name: "Baguio City Hall",
        location: [16.412000, 120.593600],
        status: "active",
        subcategory: "Offices",
        description: "Mountain city government center in Baguio.",
      },
      {
        id: "office_14",
        name: "Cordillera Administrative Region Office",
        location: [16.416200, 120.595800],
        status: "active",
        subcategory: "Offices",
        description: "Regional administrative headquarters for CAR.",
      },
      
      // Warehouses across Philippines
      {
        id: "warehouse_01",
        name: "National Food Authority Warehouse - Manila",
        location: [14.5622, 121.0198],
        status: "active",
        subcategory: "Warehouses",
        description: "Central grain storage facility in Metro Manila.",
      },
      {
        id: "warehouse_02",
        name: "Emergency Relief Warehouse - Cebu",
        location: [10.285300, 123.875100],
        status: "active",
        subcategory: "Warehouses",
        description: "Regional disaster response supplies storage.",
      },
      {
        id: "warehouse_03",
        name: "Government Printing Office Warehouse",
        location: [14.6042, 121.0122],
        status: "maintenance",
        subcategory: "Warehouses",
        description: "Storage for government documents and publications.",
      },
      {
        id: "warehouse_04",
        name: "Agricultural Supplies Depot - Davao",
        location: [7.108900, 125.627400],
        status: "active",
        subcategory: "Warehouses",
        description: "Farm equipment and supplies storage facility.",
      },
      {
        id: "warehouse_05",
        name: "Military Equipment Storage - Camp Aguinaldo",
        location: [14.6391, 121.0570],
        status: "active",
        subcategory: "Warehouses",
        description: "Military supplies and equipment warehouse.",
      },
      {
        id: "warehouse_06",
        name: "Medical Supplies Warehouse - Iloilo",
        location: [10.739200, 122.547800],
        status: "active",
        subcategory: "Warehouses",
        description: "Regional medical and pharmaceutical storage.",
      },
      {
        id: "warehouse_07",
        name: "Educational Materials Depot - Baguio",
        location: [16.404500, 120.582100],
        status: "active",
        subcategory: "Warehouses",
        description: "Textbooks and educational supplies storage.",
      },
      
      // Facilities
      {
        id: "facility_01",
        name: "Metropolitan Waterworks Pumping Station",
        location: [14.6506, 121.0170],
        status: "active",
        subcategory: "Facilities",
        description: "Main water treatment and distribution facility for Metro Manila.",
      },
      {
        id: "facility_02",
        name: "Cebu Public Works Maintenance Facility",
        location: [10.295600, 123.882700],
        status: "active",
        subcategory: "Facilities",
        description: "Municipal maintenance and repair facility.",
      },
      {
        id: "facility_03",
        name: "Davao Waste Management Facility",
        location: [7.121800, 125.594300],
        status: "active",
        subcategory: "Facilities",
        description: "Central waste processing and recycling facility.",
      },
      {
        id: "facility_04",
        name: "Power Plant Maintenance Facility - Bataan",
        location: [14.6839, 120.5739],
        status: "warning",
        subcategory: "Facilities",
        description: "Power generation equipment maintenance center.",
      },
      {
        id: "facility_05",
        name: "Iloilo Port Authority Service Center",
        location: [10.691400, 122.565600],
        status: "active",
        subcategory: "Facilities",
        description: "Port operations and vessel maintenance facility.",
      },
      {
        id: "facility_06",
        name: "Road Construction Equipment Depot - Baguio",
        location: [16.398700, 120.571200],
        status: "active",
        subcategory: "Facilities",
        description: "Heavy equipment storage and maintenance for road construction.",
      },
      {
        id: "facility_07",
        name: "Government Vehicle Service Center - Makati",
        location: [14.5547, 121.0244],
        status: "active",
        subcategory: "Facilities",
        description: "Central service facility for Metro Manila government fleet.",
      },
    ],
  },
  
  {
    category: "Land Properties",
    id: "land_properties",
    center: [12.8797, 121.7740], // Geographic center of Philippines
    checkboxConfig: {
      masterCheckboxId: "all-land",
    },
    displayInfo: {
      title: "Land Properties",
      type: "Lots, Parcels, Estates",
      className: "wifi-bg",
      icon: "fas fa-map",
    },
    subcategoryConfigs: {
      "lots": {
        title: "Lots",
        type: "Residential/Commercial Lots",
        className: "wifi-bg",
        icon: "fas fa-square",
      },
      "parcels": {
        title: "Parcels",
        type: "Land Parcels",
        className: "data-center-bg",
        icon: "fas fa-map-marked-alt",
      },
      "estates": {
        title: "Estates",
        type: "Large Properties",
        className: "info-bg",
        icon: "fas fa-home",
      },
    },
    sites: [
      // Luzon Lots
      {
        id: "lot_01",
        name: "Bonifacio Global City Commercial Lot BGC-1A",
        location: [14.5515, 121.0508],
        status: "active",
        subcategory: "Lots",
        description: "Prime commercial development lot in BGC, Taguig.",
      },
      {
        id: "lot_02",
        name: "Quezon City Government Center Lot QC-15",
        location: [14.6760, 121.0437],
        status: "active",
        subcategory: "Lots",
        description: "Government administrative complex expansion lot.",
      },
      {
        id: "lot_03",
        name: "Makati Central Business District Lot MKT-7B",
        location: [14.5593, 121.0229],
        status: "active",
        subcategory: "Lots",
        description: "Financial district commercial development lot.",
      },
      {
        id: "lot_04",
        name: "Subic Bay Freeport Development Lot SB-12",
        location: [14.8294, 120.2717],
        status: "active",
        subcategory: "Lots",
        description: "Industrial development lot in Subic Bay Economic Zone.",
      },
      {
        id: "lot_05",
        name: "Clark Special Economic Zone Lot CLK-9C",
        location: [15.1854, 120.5605],
        status: "active",
        subcategory: "Lots",
        description: "Aviation and logistics development lot in Clark.",
      },
      
      // Visayas Lots
      {
        id: "lot_06",
        name: "Cebu IT Park Expansion Lot CEB-18A",
        location: [10.327500, 123.907200],
        status: "active",
        subcategory: "Lots",
        description: "Technology park expansion lot in Cebu City.",
      },
      {
        id: "lot_07",
        name: "Iloilo Business Park Development Lot ILO-5D",
        location: [10.717800, 122.548300],
        status: "active",
        subcategory: "Lots",
        description: "Mixed-use development lot in Iloilo Business District.",
      },
      {
        id: "lot_08",
        name: "Bacolod Government Complex Lot BAC-3F",
        location: [10.6760, 122.9503],
        status: "active",
        subcategory: "Lots",
        description: "Government office complex development lot.",
      },
      
      // Mindanao Lots
      {
        id: "lot_09",
        name: "Davao Central Business District Lot DAV-11B",
        location: [7.063400, 125.588900],
        status: "active",
        subcategory: "Lots",
        description: "Commercial development lot in downtown Davao.",
      },
      {
        id: "lot_10",
        name: "Cagayan de Oro Industrial Lot CDO-22A",
        location: [8.4542, 124.6319],
        status: "warning",
        subcategory: "Lots",
        description: "Industrial zone development lot requiring environmental assessment.",
      },
      
      // Government Land Parcels
      {
        id: "parcel_01",
        name: "National Government Reserve Parcel NGR-001",
        location: [14.4378, 121.4298],
        status: "active",
        subcategory: "Parcels",
        description: "Strategic government reserve land in Rizal Province.",
      },
      {
        id: "parcel_02",
        name: "Military Reservation Parcel MIL-Fort-12",
        location: [14.5328, 121.0456],
        status: "active",
        subcategory: "Parcels",
        description: "Military training ground parcel in Fort Bonifacio.",
      },
      {
        id: "parcel_03",
        name: "Protected Area Buffer Zone PAR-LU-07",
        location: [16.9286, 120.8738],
        status: "active",
        subcategory: "Parcels",
        description: "Environmental protection buffer zone in Mountain Province.",
      },
      {
        id: "parcel_04",
        name: "Agricultural Research Station ARS-IRRI-3",
        location: [14.1591, 121.2570],
        status: "active",
        subcategory: "Parcels",
        description: "Rice research facility land parcel in Laguna.",
      },
      {
        id: "parcel_05",
        name: "Coastal Protection Reserve CPR-PAL-15",
        location: [9.7417, 118.7383],
        status: "active",
        subcategory: "Parcels",
        description: "Marine sanctuary protection area in Palawan.",
      },
      {
        id: "parcel_06",
        name: "Disaster Risk Reduction Reserve DRR-ALB-4",
        location: [13.1391, 123.7210],
        status: "active",
        subcategory: "Parcels",
        description: "Emergency evacuation area in Albay Province.",
      },
      {
        id: "parcel_07",
        name: "Indigenous Peoples Ancestral Domain IPAD-CAR-8",
        location: [17.0739, 120.9429],
        status: "active",
        subcategory: "Parcels",
        description: "Protected ancestral domain in Cordillera region.",
      },
      {
        id: "parcel_08",
        name: "Tourism Development Zone TDZ-BOH-11",
        location: [9.6437, 123.8539],
        status: "active",
        subcategory: "Parcels",
        description: "Tourism infrastructure development area in Bohol.",
      },
      
      // Government Estate Holdings
      {
        id: "estate_01",
        name: "Malacañang Palace Grounds and Gardens",
        location: [14.5995, 120.9842],
        status: "active",
        subcategory: "Estates",
        description: "Presidential palace estate with historic buildings and gardens.",
      },
      {
        id: "estate_02",
        name: "Camp John Hay Government Estate",
        location: [16.4023, 120.5960],
        status: "active",
        subcategory: "Estates",
        description: "Former US military base converted to government retreat center.",
      },
      {
        id: "estate_03",
        name: "Coconut Palace State Estate",
        location: [14.5789, 120.9761],
        status: "active",
        subcategory: "Estates",
        description: "Government guesthouse and cultural center estate.",
      },
      {
        id: "estate_04",
        name: "Burnham Park Government Estate",
        location: [16.4127, 120.5933],
        status: "active",
        subcategory: "Estates",
        description: "Historic urban park and recreational estate in Baguio.",
      },
      {
        id: "estate_05",
        name: "Mount Makiling Forest Reserve Estate",
        location: [14.1339, 121.1964],
        status: "active",
        subcategory: "Estates",
        description: "Government-managed forest research and conservation estate.",
      },
      {
        id: "estate_06",
        name: "Corregidor Island Historic Estate",
        location: [14.3850, 120.5883],
        status: "maintenance",
        subcategory: "Estates",
        description: "Historic island fortress and memorial park estate.",
      },
      {
        id: "estate_07",
        name: "Hundred Islands National Park Estate",
        location: [16.1939, 120.0833],
        status: "active",
        subcategory: "Estates",
        description: "Marine protected area and tourism estate in Pangasinan.",
      },
      {
        id: "estate_08",
        name: "Amanpulo Government Training Estate",
        location: [11.1589, 119.9528],
        status: "active",
        subcategory: "Estates",
        description: "Government executive training and conference estate.",
      },
    ],
  },

  {
    category: "Vehicles",
    id: "vehicles",
    center: [14.5995, 120.9842], // Manila center for vehicle fleet
    checkboxConfig: {
      masterCheckboxId: "all-vehicles",
    },
    displayInfo: {
      title: "Vehicles",
      type: "Fleet Management",
      className: "maintenance-bg",
      icon: "fas fa-car",
    },
    subcategoryConfigs: {
      "fleet-management": {
        title: "Fleet Management",
        type: "Government Vehicles",
        className: "maintenance-bg",
        icon: "fas fa-truck",
      },
    },
    sites: [
      // Presidential and Executive Fleet
      {
        id: "vehicle_001",
        name: "Presidential Limousine - Unit 1",
        location: [14.5995, 120.9842],
        status: "active",
        subcategory: "Fleet Management",
        description: "Official armored limousine for Presidential use.",
      },
      {
        id: "vehicle_002",
        name: "Presidential Security Detail Vehicle - PSD-12",
        location: [14.5995, 120.9842],
        status: "active",
        subcategory: "Fleet Management",
        description: "Security escort vehicle for Presidential convoy.",
      },
      {
        id: "vehicle_003",
        name: "Vice Presidential Vehicle - VP-1",
        location: [14.5851, 120.9794],
        status: "active",
        subcategory: "Fleet Management",
        description: "Official vehicle for Vice Presidential office.",
      },
      
      // Manila NCR Fleet
      {
        id: "vehicle_004",
        name: "Senate Official Vehicle - SEN-15",
        location: [14.5851, 120.9794],
        status: "active",
        subcategory: "Fleet Management",
        description: "Official transport for Senate operations.",
      },
      {
        id: "vehicle_005",
        name: "Supreme Court Justice Vehicle - SC-7",
        location: [14.5901, 120.9794],
        status: "active",
        subcategory: "Fleet Management",
        description: "Official vehicle assigned to Supreme Court.",
      },
      {
        id: "vehicle_006",
        name: "DOF Secretary Vehicle - DOF-1",
        location: [14.5832, 120.9797],
        status: "active",
        subcategory: "Fleet Management",
        description: "Official vehicle for Department of Finance Secretary.",
      },
      {
        id: "vehicle_007",
        name: "Manila City Mayor Vehicle - MLA-1",
        location: [14.5964, 120.9797],
        status: "active",
        subcategory: "Fleet Management",
        description: "Official vehicle for Manila City Mayor.",
      },
      {
        id: "vehicle_008",
        name: "Makati City Fire Truck - MKT-FD-23",
        location: [14.5547, 121.0244],
        status: "active",
        subcategory: "Fleet Management",
        description: "Emergency response fire truck for Makati City.",
      },
      {
        id: "vehicle_009",
        name: "Quezon City Ambulance - QC-MED-45",
        location: [14.6760, 121.0437],
        status: "active",
        subcategory: "Fleet Management",
        description: "Emergency medical response vehicle for QC.",
      },
      {
        id: "vehicle_010",
        name: "Pasig City Garbage Truck - PSG-SW-18",
        location: [14.5718, 121.0822],
        status: "maintenance",
        subcategory: "Fleet Management",
        description: "Waste collection vehicle currently under maintenance.",
      },
      
      // Regional Government Vehicles - Cebu
      {
        id: "vehicle_011",
        name: "Cebu Governor Vehicle - CEB-GOV-1",
        location: [10.293719, 123.902612],
        status: "active",
        subcategory: "Fleet Management",
        description: "Official vehicle for Cebu Provincial Governor.",
      },
      {
        id: "vehicle_012",
        name: "Cebu City Mayor Vehicle - CEB-MAYOR-1",
        location: [10.293719, 123.902612],
        status: "active",
        subcategory: "Fleet Management",
        description: "Official vehicle for Cebu City Mayor.",
      },
      {
        id: "vehicle_013",
        name: "Cebu Fire Truck - CEB-FD-Engine-12",
        location: [10.309600, 123.895200],
        status: "active",
        subcategory: "Fleet Management",
        description: "Fire department emergency response vehicle in Cebu.",
      },
      {
        id: "vehicle_014",
        name: "Cebu Police Patrol Car - CEB-PNP-089",
        location: [10.301200, 123.898500],
        status: "active",
        subcategory: "Fleet Management",
        description: "Police patrol vehicle for Cebu City law enforcement.",
      },
      {
        id: "vehicle_015",
        name: "Cebu Public Works Truck - CEB-PW-23",
        location: [10.295600, 123.882700],
        status: "warning",
        subcategory: "Fleet Management",
        description: "Road maintenance truck requiring inspection.",
      },
      
      // Regional Government Vehicles - Davao
      {
        id: "vehicle_016",
        name: "Davao City Mayor Vehicle - DAV-MAYOR-1",
        location: [7.073150, 125.612831],
        status: "active",
        subcategory: "Fleet Management",
        description: "Official vehicle for Davao City Mayor.",
      },
      {
        id: "vehicle_017",
        name: "Davao Emergency Response Vehicle - DAV-ERV-8",
        location: [7.064250, 125.608200],
        status: "active",
        subcategory: "Fleet Management",
        description: "Multi-purpose emergency response vehicle.",
      },
      {
        id: "vehicle_018",
        name: "Davao Airport Security Vehicle - DAV-AS-14",
        location: [7.125520, 125.645710],
        status: "active",
        subcategory: "Fleet Management",
        description: "Airport perimeter security patrol vehicle.",
      },
      
      // Regional Government Vehicles - Iloilo
      {
        id: "vehicle_019",
        name: "Iloilo Provincial Governor Vehicle - ILO-GOV-1",
        location: [10.721100, 122.562600],
        status: "active",
        subcategory: "Fleet Management",
        description: "Official vehicle for Iloilo Provincial Governor.",
      },
      {
        id: "vehicle_020",
        name: "Iloilo Port Authority Patrol Boat - ILO-PA-Marine-3",
        location: [10.691400, 122.565600],
        status: "active",
        subcategory: "Fleet Management",
        description: "Maritime patrol vessel for port security.",
      },
      
      // Regional Government Vehicles - Baguio
      {
        id: "vehicle_021",
        name: "Baguio City Mayor Vehicle - BAG-MAYOR-1",
        location: [16.412000, 120.593600],
        status: "active",
        subcategory: "Fleet Management",
        description: "Official vehicle for Baguio City Mayor.",
      },
      {
        id: "vehicle_022",
        name: "CAR Regional Director Vehicle - CAR-RD-1",
        location: [16.416200, 120.595800],
        status: "active",
        subcategory: "Fleet Management",
        description: "Official vehicle for CAR Regional Director.",
      },
      {
        id: "vehicle_023",
        name: "Baguio Mountain Rescue Vehicle - BAG-MR-5",
        location: [16.404500, 120.582100],
        status: "active",
        subcategory: "Fleet Management",
        description: "Specialized mountain rescue and emergency vehicle.",
      },
      
      // Specialized Government Vehicles
      {
        id: "vehicle_024",
        name: "Presidential Helicopter - PAF-1",
        location: [14.5181, 121.0196],
        status: "active",
        subcategory: "Fleet Management",
        description: "Official helicopter for Presidential air transport.",
      },
      {
        id: "vehicle_025",
        name: "Coast Guard Patrol Vessel - PCG-Sarong-1",
        location: [14.5925, 120.9722],
        status: "active",
        subcategory: "Fleet Management",
        description: "Philippine Coast Guard maritime patrol vessel.",
      },
      {
        id: "vehicle_026",
        name: "Bureau of Customs X-Ray Truck - BOC-XR-11",
        location: [14.5622, 121.0198],
        status: "active",
        subcategory: "Fleet Management",
        description: "Mobile cargo inspection vehicle.",
      },
      {
        id: "vehicle_027",
        name: "DILG Command Vehicle - DILG-CMD-7",
        location: [14.5547, 121.0244],
        status: "active",
        subcategory: "Fleet Management",
        description: "Mobile command center for disaster response.",
      },
      {
        id: "vehicle_028",
        name: "DOH Medical Response Vehicle - DOH-MED-19",
        location: [14.5901, 120.9794],
        status: "maintenance",
        subcategory: "Fleet Management",
        description: "Mobile medical unit currently under maintenance.",
      },
    ],
  },

  {
    category: "IT Infrastructure",
    id: "it_infrastructure",
    center: [14.5995, 120.9842], // Manila IT hub center
    checkboxConfig: {
      masterCheckboxId: "all-it",
    },
    displayInfo: {
      title: "IT Infrastructure",
      type: "Servers, Network Equipment",
      className: "data-center-bg",
      icon: "fas fa-server",
    },
    subcategoryConfigs: {
      "servers": {
        title: "Servers",
        type: "Server Equipment",
        className: "data-center-bg",
        icon: "fas fa-server",
      },
      "network-equipment": {
        title: "Network Equipment",
        type: "Networking Hardware",
        className: "info-bg",
        icon: "fas fa-network-wired",
      },
    },
    sites: [
      // National Government Data Centers - Manila NCR
      {
        id: "server_001",
        name: "National Government Data Center - Primary",
        location: [14.5832, 120.9797],
        status: "active",
        subcategory: "Servers",
        description: "Primary government data center hosting critical national systems.",
      },
      {
        id: "server_002",
        name: "National Government Data Center - Backup",
        location: [14.6506, 121.0170],
        status: "active",
        subcategory: "Servers",
        description: "Disaster recovery data center for government operations.",
      },
      {
        id: "server_003",
        name: "Supreme Court IT Server Farm",
        location: [14.5901, 120.9794],
        status: "active",
        subcategory: "Servers",
        description: "Judicial system servers for court management systems.",
      },
      {
        id: "server_004",
        name: "Senate IT Infrastructure Hub",
        location: [14.5851, 120.9794],
        status: "active",
        subcategory: "Servers",
        description: "Legislative information system servers.",
      },
      {
        id: "server_005",
        name: "DOF Financial Systems Server Cluster",
        location: [14.5832, 120.9797],
        status: "active",
        subcategory: "Servers",
        description: "Core financial management system servers.",
      },
      {
        id: "server_006",
        name: "BIR Tax Collection System Servers",
        location: [14.5832, 120.9797],
        status: "warning",
        subcategory: "Servers",
        description: "Tax processing servers requiring performance optimization.",
      },
      {
        id: "server_007",
        name: "BSP Banking Supervision Server Farm",
        location: [14.5832, 120.9797],
        status: "active",
        subcategory: "Servers",
        description: "Central bank regulatory system servers.",
      },
      {
        id: "server_008",
        name: "PAGCOR Gaming Regulation Servers",
        location: [14.5547, 121.0244],
        status: "active",
        subcategory: "Servers",
        description: "Gaming industry regulatory and monitoring systems.",
      },
      
      // Regional Government Data Centers
      {
        id: "server_009",
        name: "Region VII Government Data Center - Cebu",
        location: [10.315700, 123.885400],
        status: "active",
        subcategory: "Servers",
        description: "Central Visayas regional government server infrastructure.",
      },
      {
        id: "server_010",
        name: "Cebu City LGU Server Farm",
        location: [10.293719, 123.902612],
        status: "active",
        subcategory: "Servers",
        description: "Local government unit servers for city services.",
      },
      {
        id: "server_011",
        name: "Region XI Government Data Center - Davao",
        location: [7.064250, 125.608200],
        status: "active",
        subcategory: "Servers",
        description: "Davao Region government server infrastructure.",
      },
      {
        id: "server_012",
        name: "Region VI Government Data Center - Iloilo",
        location: [10.696700, 122.564400],
        status: "active",
        subcategory: "Servers",
        description: "Western Visayas regional server infrastructure.",
      },
      {
        id: "server_013",
        name: "CAR Government Data Center - Baguio",
        location: [16.416200, 120.595800],
        status: "maintenance",
        subcategory: "Servers",
        description: "Cordillera Administrative Region servers under maintenance.",
      },
      
      // Specialized Government IT Systems
      {
        id: "server_014",
        name: "COMELEC Election Systems Server",
        location: [14.5622, 121.0198],
        status: "active",
        subcategory: "Servers",
        description: "Electoral system servers for automated elections.",
      },
      {
        id: "server_015",
        name: "PSA National Statistics Server Farm",
        location: [14.5547, 121.0244],
        status: "active",
        subcategory: "Servers",
        description: "National statistical data processing servers.",
      },
      {
        id: "server_016",
        name: "DOST-ASTI Scientific Computing Cluster",
        location: [14.6506, 121.0170],
        status: "active",
        subcategory: "Servers",
        description: "High-performance computing for research and development.",
      },
      
      // Network Infrastructure - Core Systems
      {
        id: "network_001",
        name: "National Government Network Core Switch - NGN-1",
        location: [14.5832, 120.9797],
        status: "active",
        subcategory: "Network Equipment",
        description: "Primary network backbone for government communications.",
      },
      {
        id: "network_002",
        name: "Government Unified Network Core Router - GUN-CR-1",
        location: [14.5832, 120.9797],
        status: "active",
        subcategory: "Network Equipment",
        description: "Core routing infrastructure for inter-agency connectivity.",
      },
      {
        id: "network_003",
        name: "Presidential Security Network Hub - PSN-1",
        location: [14.5995, 120.9842],
        status: "active",
        subcategory: "Network Equipment",
        description: "Secure communications network for presidential operations.",
      },
      {
        id: "network_004",
        name: "Supreme Court Network Infrastructure - SC-NET-1",
        location: [14.5901, 120.9794],
        status: "active",
        subcategory: "Network Equipment",
        description: "Judicial network infrastructure for court systems.",
      },
      {
        id: "network_005",
        name: "Legislative Network Hub - LNH-Senate-1",
        location: [14.5851, 120.9794],
        status: "active",
        subcategory: "Network Equipment",
        description: "Network infrastructure for legislative operations.",
      },
      
      // Regional Network Infrastructure
      {
        id: "network_006",
        name: "Region VII Network Hub - Cebu",
        location: [10.315700, 123.885400],
        status: "active",
        subcategory: "Network Equipment",
        description: "Central Visayas regional network distribution hub.",
      },
      {
        id: "network_007",
        name: "Cebu Fiber Optic Distribution Hub - FOH-CEB-1",
        location: [10.308900, 123.896800],
        status: "active",
        subcategory: "Network Equipment",
        description: "High-speed fiber optic network distribution point.",
      },
      {
        id: "network_008",
        name: "Region XI Network Hub - Davao",
        location: [7.064250, 125.608200],
        status: "active",
        subcategory: "Network Equipment",
        description: "Davao Region government network infrastructure hub.",
      },
      {
        id: "network_009",
        name: "Region VI Network Hub - Iloilo",
        location: [10.696700, 122.564400],
        status: "warning",
        subcategory: "Network Equipment",
        description: "Western Visayas network hub requiring firmware updates.",
      },
      {
        id: "network_010",
        name: "CAR Network Hub - Baguio",
        location: [16.416200, 120.595800],
        status: "active",
        subcategory: "Network Equipment",
        description: "Cordillera region network distribution center.",
      },
      
      // Specialized Network Equipment
      {
        id: "network_011",
        name: "DICT National Broadband Network Node - NBN-1",
        location: [14.5547, 121.0244],
        status: "active",
        subcategory: "Network Equipment",
        description: "National broadband infrastructure backbone node.",
      },
      {
        id: "network_012",
        name: "Emergency Communications Network Hub - ECN-1",
        location: [14.6391, 121.0570],
        status: "active",
        subcategory: "Network Equipment",
        description: "Disaster response communications network hub.",
      },
      {
        id: "network_013",
        name: "Financial Network Security Gateway - FNSG-1",
        location: [14.5832, 120.9797],
        status: "active",
        subcategory: "Network Equipment",
        description: "Secure gateway for financial institution communications.",
      },
      {
        id: "network_014",
        name: "Border Control Network Interface - BCNI-NAIA",
        location: [14.5086, 121.0198],
        status: "active",
        subcategory: "Network Equipment",
        description: "Immigration and customs network interface at NAIA.",
      },
      {
        id: "network_015",
        name: "Maritime Communications Hub - MCH-Manila-Bay",
        location: [14.5925, 120.9722],
        status: "active",
        subcategory: "Network Equipment",
        description: "Coastal and maritime communications network hub.",
      },
    ],
  },

  {
    category: "Office Equipment",
    id: "office_equipment",
    center: [14.5995, 120.9842], // Manila government center
    checkboxConfig: {
      masterCheckboxId: "all-office",
    },
    displayInfo: {
      title: "Office Equipment",
      type: "Furniture, Fixtures",
      className: "ai-bg",
      icon: "fas fa-chair",
    },
    subcategoryConfigs: {
      "furniture": {
        title: "Furniture",
        type: "Office Furniture",
        className: "ai-bg",
        icon: "fas fa-chair",
      },
      "fixtures": {
        title: "Fixtures",
        type: "Office Fixtures",
        className: "info-bg",
        icon: "fas fa-lamp",
      },
    },
    sites: [
      // Presidential and Executive Office Furniture
      {
        id: "furniture_001",
        name: "Presidential Executive Desk Set - Malacañang",
        location: [14.5995, 120.9842],
        status: "active",
        subcategory: "Furniture",
        description: "Premium mahogany executive desk set for Presidential office.",
      },
      {
        id: "furniture_002",
        name: "Cabinet Meeting Conference Table - Malacañang",
        location: [14.5995, 120.9842],
        status: "active",
        subcategory: "Furniture",
        description: "Historic cabinet meeting conference table and chairs.",
      },
      {
        id: "furniture_003",
        name: "State Reception Furniture Set - Malacañang",
        location: [14.5995, 120.9842],
        status: "active",
        subcategory: "Furniture",
        description: "Ceremonial furniture for state functions and receptions.",
      },
      {
        id: "furniture_004",
        name: "Vice Presidential Office Furniture - Coconut Palace",
        location: [14.5789, 120.9761],
        status: "active",
        subcategory: "Furniture",
        description: "Executive office furniture set for Vice Presidential office.",
      },
      
      // Supreme Court and Judicial Furniture
      {
        id: "furniture_005",
        name: "Supreme Court Chief Justice Bench",
        location: [14.5901, 120.9794],
        status: "active",
        subcategory: "Furniture",
        description: "Ceremonial bench and gavel set for Chief Justice.",
      },
      {
        id: "furniture_006",
        name: "Supreme Court Deliberation Room Table",
        location: [14.5901, 120.9794],
        status: "active",
        subcategory: "Furniture",
        description: "Conference table for Supreme Court deliberations.",
      },
      {
        id: "furniture_007",
        name: "Court of Appeals Hearing Room Furniture",
        location: [14.5901, 120.9794],
        status: "active",
        subcategory: "Furniture",
        description: "Complete hearing room furniture set for appellate court.",
      },
      
      // Legislative Branch Furniture
      {
        id: "furniture_008",
        name: "Senate Session Hall Furniture Set",
        location: [14.5851, 120.9794],
        status: "active",
        subcategory: "Furniture",
        description: "Complete furniture set for Senate plenary sessions.",
      },
      {
        id: "furniture_009",
        name: "Senate President Executive Desk",
        location: [14.5851, 120.9794],
        status: "active",
        subcategory: "Furniture",
        description: "Executive desk set for Senate President office.",
      },
      {
        id: "furniture_010",
        name: "House of Representatives Speaker Podium",
        location: [14.5803, 120.9765],
        status: "active",
        subcategory: "Furniture",
        description: "Official Speaker's podium and rostrum set.",
      },
      {
        id: "furniture_011",
        name: "Committee Hearing Room Tables - House",
        location: [14.5803, 120.9765],
        status: "active",
        subcategory: "Furniture",
        description: "Modular conference tables for committee hearings.",
      },
      
      // Department Executive Offices
      {
        id: "furniture_012",
        name: "DOF Secretary Executive Suite",
        location: [14.5832, 120.9797],
        status: "active",
        subcategory: "Furniture",
        description: "Premium executive furniture for Finance Secretary office.",
      },
      {
        id: "furniture_013",
        name: "BIR Commissioner Office Furniture",
        location: [14.5832, 120.9797],
        status: "active",
        subcategory: "Furniture",
        description: "Executive office furniture for BIR Commissioner.",
      },
      {
        id: "furniture_014",
        name: "BSP Governor Executive Desk Set",
        location: [14.5832, 120.9797],
        status: "active",
        subcategory: "Furniture",
        description: "Central bank governor's executive office furniture.",
      },
      
      // Regional Government Office Furniture
      {
        id: "furniture_015",
        name: "Cebu Governor Executive Office Suite",
        location: [10.293719, 123.902612],
        status: "active",
        subcategory: "Furniture",
        description: "Provincial governor's executive furniture set in Cebu.",
      },
      {
        id: "furniture_016",
        name: "Cebu City Council Session Furniture",
        location: [10.293719, 123.902612],
        status: "active",
        subcategory: "Furniture",
        description: "Council chamber furniture for city sessions.",
      },
      {
        id: "furniture_017",
        name: "DOF Region VII Conference Room Set",
        location: [10.315700, 123.885400],
        status: "active",
        subcategory: "Furniture",
        description: "Regional office conference furniture for Central Visayas.",
      },
      {
        id: "furniture_018",
        name: "Davao City Mayor Executive Furniture",
        location: [7.073150, 125.612831],
        status: "active",
        subcategory: "Furniture",
        description: "Executive office furniture for Davao City Mayor.",
      },
      {
        id: "furniture_019",
        name: "Iloilo Provincial Capitol Reception Set",
        location: [10.721100, 122.562600],
        status: "maintenance",
        subcategory: "Furniture",
        description: "Reception area furniture requiring refurbishment.",
      },
      {
        id: "furniture_020",
        name: "Baguio City Hall Executive Furniture",
        location: [16.412000, 120.593600],
        status: "active",
        subcategory: "Furniture",
        description: "Mountain city executive office furniture set.",
      },
      
      // Government Agency Work Stations
      {
        id: "furniture_021",
        name: "COMELEC Workstation Cluster - Main Office",
        location: [14.5622, 121.0198],
        status: "active",
        subcategory: "Furniture",
        description: "Modular workstations for election commission staff.",
      },
      {
        id: "furniture_022",
        name: "PSA Statistical Processing Workstations",
        location: [14.5547, 121.0244],
        status: "active",
        subcategory: "Furniture",
        description: "Ergonomic workstations for statistical data processing.",
      },
      {
        id: "furniture_023",
        name: "DOST Research Laboratory Furniture",
        location: [14.6506, 121.0170],
        status: "active",
        subcategory: "Furniture",
        description: "Specialized laboratory furniture for scientific research.",
      },
      
      // Office Fixtures - Lighting Systems
      {
        id: "fixture_001",
        name: "Malacañang Palace LED Lighting System",
        location: [14.5995, 120.9842],
        status: "active",
        subcategory: "Fixtures",
        description: "Historic palace LED lighting upgrade for energy efficiency.",
      },
      {
        id: "fixture_002",
        name: "Supreme Court Ceremonial Lighting",
        location: [14.5901, 120.9794],
        status: "active",
        subcategory: "Fixtures",
        description: "Ceremonial and ambient lighting for court proceedings.",
      },
      {
        id: "fixture_003",
        name: "Senate Session Hall Lighting System",
        location: [14.5851, 120.9794],
        status: "active",
        subcategory: "Fixtures",
        description: "Professional lighting system for legislative sessions.",
      },
      {
        id: "fixture_004",
        name: "DOF Building Smart Lighting Network",
        location: [14.5832, 120.9797],
        status: "active",
        subcategory: "Fixtures",
        description: "Automated smart lighting system for energy management.",
      },
      
      // Office Fixtures - Security Systems
      {
        id: "fixture_005",
        name: "Malacañang Security Camera Network",
        location: [14.5995, 120.9842],
        status: "active",
        subcategory: "Fixtures",
        description: "Comprehensive security camera system for presidential complex.",
      },
      {
        id: "fixture_006",
        name: "Supreme Court Access Control System",
        location: [14.5901, 120.9794],
        status: "active",
        subcategory: "Fixtures",
        description: "Biometric access control for judicial facilities.",
      },
      {
        id: "fixture_007",
        name: "Senate Building Security Infrastructure",
        location: [14.5851, 120.9794],
        status: "active",
        subcategory: "Fixtures",
        description: "Integrated security system for legislative complex.",
      },
      {
        id: "fixture_008",
        name: "DOF Vault Security System",
        location: [14.5832, 120.9797],
        status: "warning",
        subcategory: "Fixtures",
        description: "High-security vault access system requiring calibration.",
      },
      
      // Regional Office Fixtures
      {
        id: "fixture_009",
        name: "Cebu Capitol Building Lighting Upgrade",
        location: [10.293719, 123.902612],
        status: "active",
        subcategory: "Fixtures",
        description: "Energy-efficient lighting upgrade for provincial capitol.",
      },
      {
        id: "fixture_010",
        name: "Davao City Hall Security System",
        location: [7.073150, 125.612831],
        status: "active",
        subcategory: "Fixtures",
        description: "Comprehensive security system for city hall complex.",
      },
      {
        id: "fixture_011",
        name: "Iloilo Provincial Building HVAC Controls",
        location: [10.721100, 122.562600],
        status: "maintenance",
        subcategory: "Fixtures",
        description: "Climate control system requiring seasonal maintenance.",
      },
      {
        id: "fixture_012",
        name: "Baguio City Hall Mountain Climate Systems",
        location: [16.412000, 120.593600],
        status: "active",
        subcategory: "Fixtures",
        description: "Specialized climate control for mountain environment.",
      },
    ],
  },

  {
    category: "High-Value Assets",
    id: "high_value_assets",
    center: [14.5995, 120.9842], // Manila strategic center
    checkboxConfig: {
      masterCheckboxId: "all-highvalue",
    },
    displayInfo: {
      title: "High-Value Assets",
      type: "Specialized Equipment",
      className: "critical-bg",
      icon: "fas fa-gem",
    },
    subcategoryConfigs: {
      "specialized-equipment": {
        title: "Specialized Equipment",
        type: "High-Value Equipment",
        className: "critical-bg",
        icon: "fas fa-cogs",
      },
    },
    sites: [
      // National Strategic Assets
      {
        id: "highvalue_001",
        name: "Presidential Emergency Command Center",
        location: [14.5995, 120.9842],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Advanced command and control center for national emergencies.",
      },
      {
        id: "highvalue_002",
        name: "National Defense Radar System - Baguio",
        location: [16.416200, 120.595800],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Strategic air defense radar installation in mountain region.",
      },
      {
        id: "highvalue_003",
        name: "BSP Gold Vault Security System",
        location: [14.5832, 120.9797],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Ultra-high security system for national gold reserves.",
      },
      {
        id: "highvalue_004",
        name: "PAGASA Weather Satellite Ground Station",
        location: [14.6391, 121.0570],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Satellite communication system for weather monitoring.",
      },
      {
        id: "highvalue_005",
        name: "National Printing Office Currency Press",
        location: [14.6042, 121.0122],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Specialized equipment for printing Philippine currency.",
      },
      
      // Critical Infrastructure Protection
      {
        id: "highvalue_006",
        name: "Manila Bay Port Authority Vessel Traffic System",
        location: [14.5925, 120.9722],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Advanced vessel tracking and management system.",
      },
      {
        id: "highvalue_007",
        name: "NAIA Air Traffic Control Radar System",
        location: [14.5086, 121.0198],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Primary radar system for international airport operations.",
      },
      {
        id: "highvalue_008",
        name: "Metropolitan Waterworks Master Control System",
        location: [14.6506, 121.0170],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Automated water distribution control for Metro Manila.",
      },
      {
        id: "highvalue_009",
        name: "National Grid Corporation Control Center",
        location: [14.5622, 121.0198],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "National power grid monitoring and control systems.",
      },
      {
        id: "highvalue_010",
        name: "PLDT National Telecommunications Hub",
        location: [14.5547, 121.0244],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Critical telecommunications infrastructure hub.",
      },
      
      // Regional Strategic Assets
      {
        id: "highvalue_011",
        name: "Cebu Mactan International Airport Radar",
        location: [10.308417, 123.979083],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Aviation radar system for Cebu international airport.",
      },
      {
        id: "highvalue_012",
        name: "Cebu Port Authority Container Tracking System",
        location: [10.288720, 123.896990],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Advanced cargo tracking and management system.",
      },
      {
        id: "highvalue_013",
        name: "Cebu Emergency Response Command Center",
        location: [10.293719, 123.902612],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Regional disaster response coordination center.",
      },
      {
        id: "highvalue_014",
        name: "Davao International Airport Security Scanner",
        location: [7.125520, 125.645710],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Advanced security screening equipment for aviation.",
      },
      {
        id: "highvalue_015",
        name: "Davao Seaport Customs X-Ray System",
        location: [7.063400, 125.588900],
        status: "warning",
        subcategory: "Specialized Equipment",
        description: "Large-scale cargo inspection system requiring calibration.",
      },
      {
        id: "highvalue_016",
        name: "Iloilo River Flood Control Monitoring System",
        location: [10.717800, 122.548300],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Automated flood monitoring and warning system.",
      },
      
      // Scientific and Research Equipment
      {
        id: "highvalue_017",
        name: "DOST-ASTI Supercomputer Cluster",
        location: [14.6506, 121.0170],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "High-performance computing system for research and development.",
      },
      {
        id: "highvalue_018",
        name: "PHIVOLCS Seismic Monitoring Network Hub",
        location: [14.6391, 121.0570],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "National earthquake monitoring and analysis system.",
      },
      {
        id: "highvalue_019",
        name: "UP NIGS Genome Sequencing Equipment",
        location: [14.6537, 121.0687],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Advanced DNA sequencing equipment for genomic research.",
      },
      {
        id: "highvalue_020",
        name: "IRRI Agricultural Research Equipment Cluster",
        location: [14.1591, 121.2570],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Specialized agricultural research and testing equipment.",
      },
      
      // Military and Defense Assets
      {
        id: "highvalue_021",
        name: "AFP Command and Control System - Camp Aguinaldo",
        location: [14.6391, 121.0570],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Military command and communication system.",
      },
      {
        id: "highvalue_022",
        name: "Philippine Navy Fleet Command Center",
        location: [14.5925, 120.9722],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Naval operations command and control center.",
      },
      {
        id: "highvalue_023",
        name: "PAF Tactical Operations Center - Villamor",
        location: [14.5181, 121.0196],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Air force tactical command and control systems.",
      },
      {
        id: "highvalue_024",
        name: "Coast Guard Rescue Coordination Center",
        location: [14.5925, 120.9722],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Maritime search and rescue coordination equipment.",
      },
      
      // Financial and Economic Infrastructure
      {
        id: "highvalue_025",
        name: "Philippine Stock Exchange Trading System",
        location: [14.5547, 121.0244],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "Electronic stock trading and settlement system.",
      },
      {
        id: "highvalue_026",
        name: "BSP Real-Time Gross Settlement System",
        location: [14.5832, 120.9797],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "High-value payment system for financial institutions.",
      },
      {
        id: "highvalue_027",
        name: "Bureau of Customs ASYCUDA World System",
        location: [14.5622, 121.0198],
        status: "maintenance",
        subcategory: "Specialized Equipment",
        description: "Automated customs processing system under upgrade.",
      },
      {
        id: "highvalue_028",
        name: "BIR Integrated Tax System Infrastructure",
        location: [14.5832, 120.9797],
        status: "active",
        subcategory: "Specialized Equipment",
        description: "National tax collection and processing system.",
      },
    ],
  },
];

const categoryMasterIds = mapMarkers.map(category => category.checkboxConfig.masterCheckboxId);

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
