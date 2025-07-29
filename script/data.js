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
  // DOF Central/National Office
  {
    category: "DOF Central Office",
    id: "dof_central",
    center: [14.5832, 120.9797], // Manila/BSP Complex
    sites: [
      {
        id: "dof_main_01",
        name: "Department of Finance Building - BSP Complex",
        location: [14.5832, 120.9797],
        status: "active",
        subcategory: "DOF Central Office",
        description: "Main DOF Building located at BSP Complex, Roxas Boulevard, Manila. Houses the Office of the Secretary and various DOF departments.",
        technicalDetails: {
          address: "DOF Bldg., BSP Complex, Roxas Blvd., Manila, 1004, Philippines",
          contactNumber: "(632) 8525-0244",
          email: "osec@dof.gov.ph",
          operatingHours: "8:00 AM - 5:00 PM",
          buildingType: "Government Office Building",
          floorCount: "Multiple floors",
          yearEstablished: "1987"
        }
      }
    ]
  },

  // Bureau of Internal Revenue (BIR) - DOF Agency
  {
    category: "Bureau of Internal Revenue",
    id: "bir_facilities",
    center: [14.6506, 121.0378], // Quezon City BIR HQ
    sites: [
      {
        id: "bir_hq_01",
        name: "BIR National Office - Quezon City",
        location: [14.6506, 121.0378],
        status: "active",
        subcategory: "BIR Headquarters",
        description: "Bureau of Internal Revenue National Office located in Quezon City, main headquarters for tax administration.",
        technicalDetails: {
          address: "BIR National Office, BIR Road, Diliman, Quezon City",
          contactNumber: "+63 285383200",
          email: "contact_us@bir.gov.ph",
          buildingType: "Government Office Building",
          regionalOffices: "17 Regional Offices Nationwide"
        }
      },
      {
        id: "bir_region_01",
        name: "BIR Regional Office No. 1 - Ilocos",
        location: [17.9688, 120.5739], // Laoag City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering Ilocos Norte, Ilocos Sur, La Union, and Pangasinan.",
        technicalDetails: {
          address: "2nd & 3rd Floor, BIR Building, Mc Arthur Hi-way, Calasiao, Pangasinan",
          contactNumber: "(075) 522-38-66",
          coverage: "Ilocos Norte, Ilocos Sur, La Union, Pangasinan"
        }
      },
      {
        id: "bir_region_02",
        name: "BIR Regional Office No. 2 - Cordillera",
        location: [16.4023, 120.5960], // Baguio City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering Cordillera Administrative Region including Baguio City.",
        technicalDetails: {
          address: "No. 69 Leonard Wood Road, Baguio City 2600",
          contactNumber: "(074) 442-69-60",
          coverage: "Cordillera Administrative Region"
        }
      },
      {
        id: "bir_region_03",
        name: "BIR Regional Office No. 3 - Central Luzon",
        location: [15.3794, 120.6200], // San Fernando, Pampanga
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering Central Luzon region including Pampanga, Bulacan, Nueva Ecija.",
        technicalDetails: {
          address: "BIR Bldg. Capitol Compound Sto. Nino, San Fernando, Pampanga",
          contactNumber: "(045) 961-17-72",
          coverage: "Pampanga, Bulacan, Nueva Ecija, Tarlac, Zambales, Aurora"
        }
      },
      {
        id: "bir_region_04",
        name: "BIR Regional Office No. 4 - CALABARZON",
        location: [14.2691, 121.1121], // Laguna
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering CALABARZON region.",
        technicalDetails: {
          coverage: "Cavite, Laguna, Batangas, Rizal, Quezon"
        }
      },
      {
        id: "bir_region_05",
        name: "BIR Regional Office No. 5 - Bicol",
        location: [13.1391, 123.7437], // Legazpi City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering Bicol Region.",
        technicalDetails: {
          address: "BIR Bldg. Camia St. Imperial Court Subd. Legazpi City",
          contactNumber: "(052) 820-13-13",
          coverage: "Albay, Camarines Norte, Camarines Sur, Catanduanes, Masbate, Sorsogon"
        }
      },
      {
        id: "bir_region_06",
        name: "BIR Regional Office No. 6 - Western Visayas",
        location: [10.7202, 122.5621], // Iloilo City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering Western Visayas region.",
        technicalDetails: {
          address: "BIR Building, M.H.Del Pilar St. Molo, Iloilo City",
          contactNumber: "(033) 338-14-65",
          coverage: "Aklan, Antique, Capiz, Guimaras, Iloilo, Negros Occidental"
        }
      },
      {
        id: "bir_region_07",
        name: "BIR Regional Office No. 7 - Central Visayas",
        location: [10.3157, 123.8854], // Cebu City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering Central Visayas region including Cebu.",
        technicalDetails: {
          coverage: "Bohol, Cebu, Negros Oriental, Siquijor"
        }
      },
      {
        id: "bir_region_08",
        name: "BIR Regional Office No. 8 - Eastern Visayas",
        location: [11.2442, 125.0045], // Tacloban City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering Eastern Visayas region.",
        technicalDetails: {
          coverage: "Biliran, Eastern Samar, Leyte, Northern Samar, Samar, Southern Leyte"
        }
      },
      {
        id: "bir_region_09",
        name: "BIR Regional Office No. 9 - Zamboanga Peninsula",
        location: [6.9214, 122.0790], // Zamboanga City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering Zamboanga Peninsula.",
        technicalDetails: {
          coverage: "Zamboanga del Norte, Zamboanga del Sur, Zamboanga Sibugay"
        }
      },
      {
        id: "bir_region_10",
        name: "BIR Regional Office No. 10 - Northern Mindanao",
        location: [8.4542, 124.6319], // Cagayan de Oro City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering Northern Mindanao region.",
        technicalDetails: {
          coverage: "Bukidnon, Camiguin, Lanao del Norte, Misamis Occidental, Misamis Oriental"
        }
      },
      {
        id: "bir_region_11",
        name: "BIR Regional Office No. 11 - Davao Region",
        location: [7.0731, 125.6128], // Davao City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering Davao Region.",
        technicalDetails: {
          coverage: "Davao de Oro, Davao del Norte, Davao del Sur, Davao Occidental, Davao Oriental"
        }
      },
      {
        id: "bir_region_12",
        name: "BIR Regional Office No. 12 - SOCCSKSARGEN",
        location: [6.1164, 125.1716], // General Santos City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering SOCCSKSARGEN region.",
        technicalDetails: {
          coverage: "South Cotabato, Cotabato, Sultan Kudarat, Sarangani, General Santos City"
        }
      },
      {
        id: "bir_region_13",
        name: "BIR Regional Office No. 13 - CARAGA",
        location: [9.3477, 125.4849], // Butuan City
        status: "active",
        subcategory: "BIR Regional Office",
        description: "BIR Regional Office covering CARAGA region.",
        technicalDetails: {
          coverage: "Agusan del Norte, Agusan del Sur, Dinagat Islands, Surigao del Norte, Surigao del Sur"
        }
      }
    ]
  },

  // Bureau of Customs (BOC) - DOF Agency
  {
    category: "Bureau of Customs",
    id: "boc_facilities",
    center: [14.5832, 120.9751], // Manila Port Area
    sites: [
      {
        id: "boc_hq_01",
        name: "Bureau of Customs Headquarters - Manila",
        location: [14.5832, 120.9751],
        status: "active",
        subcategory: "BOC Headquarters",
        description: "Bureau of Customs main headquarters located at South Harbor, Port Area, Manila.",
        technicalDetails: {
          address: "G/F OCOM Building, 16th Street, South Harbor, Port Area, Manila",
          contactNumber: "(02) 87056000",
          email: "boc.cares@customs.gov.ph",
          operatingHours: "24/7 for port operations",
          buildingType: "Government Office Building"
        }
      },
      {
        id: "boc_naia_01",
        name: "BOC NAIA - Ninoy Aquino International Airport",
        location: [14.5086, 121.0194],
        status: "active",
        subcategory: "BOC Port/Airport Office",
        description: "Bureau of Customs office at Ninoy Aquino International Airport handling passenger and cargo clearance.",
        technicalDetails: {
          address: "NAIA Complex, Pasay City",
          contactNumber: "(632) 879-6003",
          operatingHours: "24/7",
          facilityType: "Airport Customs Office"
        }
      },
      {
        id: "boc_cebu_01",
        name: "BOC Cebu - Port of Cebu",
        location: [10.3157, 123.8854],
        status: "active",
        subcategory: "BOC Port Office",
        description: "Bureau of Customs office at Port of Cebu handling maritime cargo and passenger clearance.",
        technicalDetails: {
          address: "Port of Cebu, Cebu City",
          facilityType: "Port Customs Office",
          operatingHours: "24/7"
        }
      },
      {
        id: "boc_davao_01",
        name: "BOC Davao - Port of Davao",
        location: [7.0731, 125.6128],
        status: "active",
        subcategory: "BOC Port Office",
        description: "Bureau of Customs office at Port of Davao serving Mindanao region.",
        technicalDetails: {
          address: "Port of Davao, Davao City",
          facilityType: "Port Customs Office"
        }
      },
      {
        id: "boc_iloilo_01",
        name: "BOC Iloilo - Port of Iloilo",
        location: [10.7202, 122.5621],
        status: "active",
        subcategory: "BOC Port Office",
        description: "Bureau of Customs office at Port of Iloilo serving Western Visayas region.",
        technicalDetails: {
          address: "Port of Iloilo, Iloilo City",
          facilityType: "Port Customs Office"
        }
      },
      {
        id: "boc_zamboanga_01",
        name: "BOC Zamboanga - Port of Zamboanga",
        location: [6.9214, 122.0790],
        status: "active",
        subcategory: "BOC Port Office",
        description: "Bureau of Customs office at Port of Zamboanga serving Zamboanga Peninsula.",
        technicalDetails: {
          address: "Port of Zamboanga, Zamboanga City",
          facilityType: "Port Customs Office"
        }
      }
    ]
  },

  // Bureau of Local Government Finance (BLGF) - DOF Agency
  {
    category: "Bureau of Local Government Finance",
    id: "blgf_facilities",
    center: [14.5832, 120.9797], // Manila BSP Complex
    sites: [
      {
        id: "blgf_central_01",
        name: "BLGF Central Office - Manila",
        location: [14.5832, 120.9797],
        status: "active",
        subcategory: "BLGF Central Office",
        description: "Bureau of Local Government Finance Central Office located at BSP Complex, Manila.",
        technicalDetails: {
          address: "8th Floor EDPC Building, Bangko Sentral ng Pilipinas Complex, Roxas Boulevard, Manila",
          operatingHours: "8:00 AM - 5:00 PM",
          buildingType: "Government Office Building",
          regionalOffices: "15 Regional Offices Nationwide"
        }
      },
      {
        id: "blgf_region_01",
        name: "BLGF Regional Office I - Ilocos",
        location: [17.9688, 120.5739],
        status: "active",
        subcategory: "BLGF Regional Office",
        description: "BLGF Regional Office serving Ilocos Region for local government finance supervision.",
        technicalDetails: {
          coverage: "Ilocos Norte, Ilocos Sur, La Union, Pangasinan"
        }
      },
      {
        id: "blgf_region_02",
        name: "BLGF Regional Office II - Cagayan Valley",
        location: [17.6129, 121.7270],
        status: "active",
        subcategory: "BLGF Regional Office",
        description: "BLGF Regional Office serving Cagayan Valley Region.",
        technicalDetails: {
          coverage: "Batanes, Cagayan, Isabela, Nueva Vizcaya, Quirino"
        }
      },
      {
        id: "blgf_region_03",
        name: "BLGF Regional Office III - Central Luzon",
        location: [15.3794, 120.6200],
        status: "active",
        subcategory: "BLGF Regional Office",
        description: "BLGF Regional Office serving Central Luzon Region.",
        technicalDetails: {
          coverage: "Aurora, Bataan, Bulacan, Nueva Ecija, Pampanga, Tarlac, Zambales"
        }
      },
      {
        id: "blgf_region_04a",
        name: "BLGF Regional Office IV-A - CALABARZON",
        location: [14.2691, 121.1121],
        status: "active",
        subcategory: "BLGF Regional Office",
        description: "BLGF Regional Office serving CALABARZON Region.",
        technicalDetails: {
          coverage: "Cavite, Laguna, Batangas, Rizal, Quezon"
        }
      },
      {
        id: "blgf_region_04b",
        name: "BLGF Regional Office IV-B - MIMAROPA",
        location: [13.4051, 121.0089],
        status: "active",
        subcategory: "BLGF Regional Office",
        description: "BLGF Regional Office serving MIMAROPA Region.",
        technicalDetails: {
          coverage: "Marinduque, Occidental Mindoro, Oriental Mindoro, Palawan, Romblon"
        }
      },
      {
        id: "blgf_region_05",
        name: "BLGF Regional Office V - Bicol",
        location: [13.1391, 123.7437],
        status: "active",
        subcategory: "BLGF Regional Office",
        description: "BLGF Regional Office serving Bicol Region.",
        technicalDetails: {
          coverage: "Albay, Camarines Norte, Camarines Sur, Catanduanes, Masbate, Sorsogon"
        }
      },
      {
        id: "blgf_region_06",
        name: "BLGF Regional Office VI - Western Visayas",
        location: [10.7202, 122.5621],
        status: "active",
        subcategory: "BLGF Regional Office",
        description: "BLGF Regional Office serving Western Visayas Region.",
        technicalDetails: {
          coverage: "Aklan, Antique, Capiz, Guimaras, Iloilo, Negros Occidental"
        }
      },
      {
        id: "blgf_region_07",
        name: "BLGF Regional Office VII - Central Visayas",
        location: [10.3157, 123.8854],
        status: "active",
        subcategory: "BLGF Regional Office",
        description: "BLGF Regional Office serving Central Visayas Region.",
        technicalDetails: {
          coverage: "Bohol, Cebu, Negros Oriental, Siquijor"
        }
      },
      {
        id: "blgf_region_08",
        name: "BLGF Regional Office VIII - Eastern Visayas",
        location: [11.2442, 125.0045],
        status: "active",
        subcategory: "BLGF Regional Office",
        description: "BLGF Regional Office serving Eastern Visayas Region.",
        technicalDetails: {
          coverage: "Biliran, Eastern Samar, Leyte, Northern Samar, Samar, Southern Leyte"
        }
      },
      {
        id: "blgf_region_09",
        name: "BLGF Regional Office IX - Zamboanga Peninsula",
        location: [6.9214, 122.0790],
        status: "active",
        subcategory: "BLGF Regional Office",
        description: "BLGF Regional Office serving Zamboanga Peninsula.",
        technicalDetails: {
          coverage: "Zamboanga del Norte, Zamboanga del Sur, Zamboanga Sibugay"
        }
      },
      {
        id: "blgf_region_10",
        name: "BLGF Regional Office X - Northern Mindanao",
        location: [8.4542, 124.6319],
        status: "active",
        subcategory: "BLGF Regional Office",
        description: "BLGF Regional Office serving Northern Mindanao Region.",
        technicalDetails: {
          coverage: "Bukidnon, Camiguin, Lanao del Norte, Misamis Occidental, Misamis Oriental"
        }
      },
      {
        id: "blgf_region_11",
        name: "BLGF Regional Office XI - Davao Region",
        location: [7.0731, 125.6128],
        status: "active",
        subcategory: "BLGF Regional Office",
        description: "BLGF Regional Office serving Davao Region.",
        technicalDetails: {
          coverage: "Davao de Oro, Davao del Norte, Davao del Sur, Davao Occidental, Davao Oriental"
        }
      },
      {
        id: "blgf_region_12",
        name: "BLGF Regional Office XII - SOCCSKSARGEN",
        location: [6.1164, 125.1716],
        status: "active",
        subcategory: "BLGF Regional Office",
        description: "BLGF Regional Office serving SOCCSKSARGEN Region.",
        technicalDetails: {
          coverage: "South Cotabato, Cotabato, Sultan Kudarat, Sarangani"
        }
      },
      {
        id: "blgf_region_13",
        name: "BLGF Regional Office XIII - CARAGA",
        location: [9.3477, 125.4849],
        status: "active",
        subcategory: "BLGF Regional Office",
        description: "BLGF Regional Office serving CARAGA Region.",
        technicalDetails: {
          coverage: "Agusan del Norte, Agusan del Sur, Dinagat Islands, Surigao del Norte, Surigao del Sur"
        }
      }
    ]
  },

  // Other DOF Agencies and Properties
  {
    category: "DOF Attached Agencies",
    id: "dof_attached_agencies",
    center: [14.5995, 121.0346], // Metro Manila
    sites: [
      {
        id: "dof_agency_01",
        name: "Insurance Commission - Makati",
        location: [14.5547, 121.0244],
        status: "active",
        subcategory: "DOF Attached Agency",
        description: "Insurance Commission office regulating insurance, pre-need, and HMO industries under DOF supervision.",
        technicalDetails: {
          address: "Makati City",
          function: "Insurance regulation and supervision",
          buildingType: "Government Office Building"
        }
      },
      {
        id: "dof_agency_02",
        name: "Securities and Exchange Commission - Mandaluyong",
        location: [14.5794, 121.0359],
        status: "active",
        subcategory: "DOF Attached Agency",
        description: "Securities and Exchange Commission under DOF supervision for corporate and capital market regulation.",
        technicalDetails: {
          address: "Mandaluyong City",
          function: "Corporate and securities regulation",
          buildingType: "Government Office Building"
        }
      },
      {
        id: "dof_agency_03",
        name: "Philippine Tax Academy - Quezon City",
        location: [14.6506, 121.0378],
        status: "active",
        subcategory: "DOF Training Institution",
        description: "Philippine Tax Academy serving as learning institution for tax collectors and administrators.",
        technicalDetails: {
          address: "Quezon City",
          function: "Tax education and training",
          buildingType: "Educational/Training Facility"
        }
      },
      {
        id: "dof_agency_04",
        name: "National Tax Research Center - Manila",
        location: [14.5832, 120.9797],
        status: "active",
        subcategory: "DOF Research Center",
        description: "National Tax Research Center conducting research on taxation to improve tax system and policy.",
        technicalDetails: {
          address: "Manila",
          function: "Tax research and policy development",
          buildingType: "Research Facility"
        }
      },
      {
        id: "dof_agency_05",
        name: "Philippine Guarantee Corporation - Makati",
        location: [14.5547, 121.0244],
        status: "active",
        subcategory: "DOF Government Corporation",
        description: "Philippine Guarantee Corporation providing guarantee systems for trade, investments, and priority sectors.",
        technicalDetails: {
          address: "Makati City",
          function: "State guarantee finance",
          buildingType: "Corporate Office Building"
        }
      }
    ]
  },

  // Regional DOF Properties and Support Facilities
  {
    category: "DOF Regional Support Facilities",
    id: "dof_regional_support",
    center: [12.8797, 121.7740], // Central Philippines
    sites: [
      {
        id: "dof_support_01",
        name: "DOF Northern Luzon Coordination Office",
        location: [16.4023, 120.5960],
        status: "active",
        subcategory: "DOF Regional Coordination",
        description: "DOF coordination office for Northern Luzon operations and inter-agency coordination.",
        technicalDetails: {
          coverage: "Northern Luzon coordination",
          function: "Regional coordination and support"
        }
      },
      {
        id: "dof_support_02",
        name: "DOF Southern Luzon Coordination Office",
        location: [13.1391, 123.7437],
        status: "active",
        subcategory: "DOF Regional Coordination",
        description: "DOF coordination office for Southern Luzon operations.",
        technicalDetails: {
          coverage: "Southern Luzon coordination",
          function: "Regional coordination and support"
        }
      },
      {
        id: "dof_support_03",
        name: "DOF Visayas Coordination Office",
        location: [10.3157, 123.8854],
        status: "active",
        subcategory: "DOF Regional Coordination",
        description: "DOF coordination office for Visayas region operations and support.",
        technicalDetails: {
          coverage: "Visayas region coordination",
          function: "Regional coordination and support"
        }
      },
      {
        id: "dof_support_04",
        name: "DOF Mindanao Coordination Office",
        location: [7.0731, 125.6128],
        status: "active",
        subcategory: "DOF Regional Coordination",
        description: "DOF coordination office for Mindanao region operations and support.",
        technicalDetails: {
          coverage: "Mindanao region coordination",
          function: "Regional coordination and support"
        }
      }
    ]
  },

  // Existing Cebu City Data (Enhanced)
  {
    category: "Infrastructure",
    id: "infrastructure",
    center: [10.3157, 123.8854],
    sites: [
      // DOF-related infrastructure in Cebu
      {
        id: "dof_cebu_01",
        name: "BIR Regional Office No. 7 - Cebu City",
        location: [10.3157, 123.8854],
        status: "active",
        subcategory: "DOF Regional Office",
        description: "Bureau of Internal Revenue Regional Office No. 7 serving Central Visayas region, located in Cebu City.",
        technicalDetails: {
          address: "Cebu City",
          coverage: "Bohol, Cebu, Negros Oriental, Siquijor",
          buildingType: "Government Office Building",
          function: "Tax administration and collection"
        }
      },
      {
        id: "dof_cebu_02",
        name: "BOC Port of Cebu Office",
        location: [10.3157, 123.8854],
        status: "active",
        subcategory: "DOF Port Office",
        description: "Bureau of Customs office at Port of Cebu handling maritime cargo and passenger customs clearance.",
        technicalDetails: {
          address: "Port of Cebu, Cebu City",
          function: "Customs administration and revenue collection",
          operatingHours: "24/7",
          facilityType: "Port Customs Office"
        }
      },
      {
        id: "dof_cebu_03",
        name: "BLGF Regional Office VII - Cebu City",
        location: [10.3157, 123.8854],
        status: "active",
        subcategory: "DOF Regional Office",
        description: "Bureau of Local Government Finance Regional Office VII serving Central Visayas region.",
        technicalDetails: {
          address: "Cebu City",
          coverage: "Bohol, Cebu, Negros Oriental, Siquijor",
          function: "Local government finance supervision"
        }
      }
    ]
  },

  // Continue with existing categories from original data.js...
  {
    category: "Public Buildings",
    id: "public_buildings",
    center: [10.3157, 123.8854],
    sites: [
      // Government offices including DOF-related facilities
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
        technicalDetails: {
          function: "Local tax administration and revenue collection",
          coverage: "Cebu City District",
          buildingType: "Government Office Building"
        }
      }
    ]
  }
];

// Export the data for use in other files
window.siteTechnicalDetails = siteTechnicalDetails;
window.siteNetworkInfo = siteNetworkInfo;
window.sitesMaintenanceLogs = sitesMaintenanceLogs;
window.mapMarkers = mapMarkers;
