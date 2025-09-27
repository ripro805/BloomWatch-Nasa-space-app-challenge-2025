// Comprehensive world country and region data
export const worldCountriesData = {
  // Asia
  "afghanistan": {
    name: "Afghanistan",
    flag: "🇦🇫",
    regions: [
      "Kabul", "Kandahar", "Herat", "Mazar-i-Sharif", "Jalalabad", 
      "Kunduz", "Ghazni", "Farah", "Lashkar Gah", "Khost",
      "Bamyan", "Gardez", "Zaranj", "Taloqan", "Chaghcharan"
    ]
  },
  "bangladesh": {
    name: "Bangladesh",
    flag: "🇧🇩",
    regions: [
      "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh",
      "Comilla", "Narayanganj", "Gazipur", "Tangail", "Jamalpur", "Sherpur", "Netrokona",
      "Kishoreganj", "Manikganj", "Munshiganj", "Faridpur", "Gopalganj", "Madaripur", "Shariatpur",
      "Rajbari", "Magura", "Narail", "Jessore", "Jhenaidah", "Kushtia", "Chuadanga", "Meherpur",
      "Satkhira", "Bagerhat", "Pirojpur", "Jhalokati", "Patuakhali", "Barguna", "Bhola",
      "Lakshmipur", "Noakhali", "Feni", "Chandpur", "Brahmanbaria", "Habiganj", "Moulvibazar",
      "Sunamganj", "Narsingdi", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh",
      "Thakurgaon", "Dinajpur", "Joypurhat", "Bogra", "Naogaon", "Natore", "Chapainawabganj",
      "Pabna", "Sirajganj", "Bandarban", "Rangamati", "Khagrachhari", "Cox's Bazar"
    ]
  },
  "india": {
    name: "India",
    flag: "🇮🇳",
    regions: [
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
      "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
      "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
      "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
      "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry",
      "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Lakshadweep", "Andaman and Nicobar"
    ]
  },
  "pakistan": {
    name: "Pakistan",
    flag: "🇵🇰",
    regions: [
      "Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Gilgit-Baltistan", "Azad Kashmir",
      "Islamabad Capital Territory", "Karachi", "Lahore", "Faisalabad", "Rawalpindi", "Gujranwala",
      "Peshawar", "Multan", "Hyderabad", "Quetta", "Bahawalpur", "Sargodha", "Sialkot", "Sukkur"
    ]
  },
  "china": {
    name: "China",
    flag: "🇨🇳",
    regions: [
      "Beijing", "Shanghai", "Guangdong", "Shandong", "Henan", "Sichuan", "Jiangsu", "Hebei",
      "Hunan", "Anhui", "Hubei", "Guangxi", "Zhejiang", "Yunnan", "Jiangxi", "Liaoning",
      "Heilongjiang", "Shaanxi", "Fujian", "Shanxi", "Guizhou", "Chongqing", "Jilin", "Gansu",
      "Inner Mongolia", "Xinjiang", "Tibet", "Qinghai", "Ningxia", "Hainan", "Tianjin", "Hong Kong", "Macau"
    ]
  },

  // North America
  "united-states": {
    name: "United States",
    flag: "🇺🇸",
    regions: [
      "California", "Texas", "Florida", "New York", "Pennsylvania", "Illinois", "Ohio", "Georgia",
      "North Carolina", "Michigan", "New Jersey", "Virginia", "Washington", "Arizona", "Massachusetts",
      "Tennessee", "Indiana", "Missouri", "Maryland", "Wisconsin", "Colorado", "Minnesota", "South Carolina",
      "Alabama", "Louisiana", "Kentucky", "Oregon", "Oklahoma", "Connecticut", "Utah", "Iowa", "Nevada",
      "Arkansas", "Mississippi", "Kansas", "New Mexico", "Nebraska", "West Virginia", "Idaho", "Hawaii",
      "New Hampshire", "Maine", "Montana", "Rhode Island", "Delaware", "South Dakota", "North Dakota",
      "Alaska", "Vermont", "Wyoming", "Washington DC"
    ]
  },
  "canada": {
    name: "Canada",
    flag: "🇨🇦",
    regions: [
      "Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba", "Saskatchewan",
      "Nova Scotia", "New Brunswick", "Newfoundland and Labrador", "Prince Edward Island",
      "Northwest Territories", "Yukon", "Nunavut"
    ]
  },
  "mexico": {
    name: "Mexico",
    flag: "🇲🇽",
    regions: [
      "Mexico City", "Jalisco", "Nuevo León", "Puebla", "Guanajuato", "Chihuahua", "Baja California",
      "Michoacán", "Oaxaca", "Chiapas", "Veracruz", "Hidalgo", "San Luis Potosí", "Sinaloa",
      "Tamaulipas", "Sonora", "Coahuila", "Durango", "Guerrero", "Zacatecas", "Morelos",
      "Quintana Roo", "Yucatán", "Tabasco", "Nayarit", "Campeche", "Aguascalientes", "Tlaxcala",
      "Querétaro", "Colima", "Baja California Sur"
    ]
  },

  // Europe
  "germany": {
    name: "Germany",
    flag: "🇩🇪",
    regions: [
      "North Rhine-Westphalia", "Bavaria", "Baden-Württemberg", "Lower Saxony", "Hesse",
      "Saxony", "Rhineland-Palatinate", "Berlin", "Schleswig-Holstein", "Brandenburg",
      "Saxony-Anhalt", "Thuringia", "Hamburg", "Mecklenburg-Vorpommern", "Saarland", "Bremen"
    ]
  },
  "france": {
    name: "France",
    flag: "🇫🇷",
    regions: [
      "Île-de-France", "Auvergne-Rhône-Alpes", "Hauts-de-France", "Occitanie", "Nouvelle-Aquitaine",
      "Grand Est", "Provence-Alpes-Côte d'Azur", "Pays de la Loire", "Normandy", "Brittany",
      "Bourgogne-Franche-Comté", "Centre-Val de Loire", "Corsica"
    ]
  },
  "united-kingdom": {
    name: "United Kingdom",
    flag: "🇬🇧",
    regions: [
      "England", "Scotland", "Wales", "Northern Ireland", "London", "Manchester", "Birmingham",
      "Glasgow", "Edinburgh", "Cardiff", "Belfast", "Liverpool", "Bristol", "Sheffield",
      "Leeds", "Newcastle", "Nottingham", "Leicester"
    ]
  },
  "italy": {
    name: "Italy",
    flag: "🇮🇹",
    regions: [
      "Lombardy", "Lazio", "Campania", "Sicily", "Veneto", "Emilia-Romagna", "Piedmont",
      "Apulia", "Tuscany", "Calabria", "Sardinia", "Liguria", "Marche", "Abruzzo",
      "Friuli-Venezia Giulia", "Trentino-Alto Adige", "Umbria", "Basilicata", "Molise", "Aosta Valley"
    ]
  },
  "spain": {
    name: "Spain",
    flag: "🇪🇸",
    regions: [
      "Andalusia", "Catalonia", "Madrid", "Valencia", "Galicia", "Castile and León",
      "Basque Country", "Canary Islands", "Castile-La Mancha", "Murcia", "Aragon",
      "Balearic Islands", "Extremadura", "Asturias", "Navarre", "Cantabria", "La Rioja"
    ]
  },

  // Africa
  "nigeria": {
    name: "Nigeria",
    flag: "🇳🇬",
    regions: [
      "Lagos", "Kano", "Kaduna", "Ibadan", "Port Harcourt", "Benin City", "Maiduguri",
      "Zaria", "Aba", "Jos", "Ilorin", "Onitsha", "Warri", "Okene", "Calabar",
      "Uyo", "Abeokuta", "Akure", "Bauchi", "Sokoto", "Gombe", "Enugu", "Katsina",
      "Yola", "Jalingo", "Lafia", "Ikeja", "Owerri", "Asaba", "Lokoja", "Yenagoa",
      "Makurdi", "Dutse", "Birnin Kebbi", "Gusau", "Damaturu", "Minna"
    ]
  },
  "south-africa": {
    name: "South Africa",
    flag: "🇿🇦",
    regions: [
      "Gauteng", "KwaZulu-Natal", "Western Cape", "Eastern Cape", "Limpopo",
      "Mpumalanga", "North West", "Free State", "Northern Cape"
    ]
  },
  "kenya": {
    name: "Kenya",
    flag: "🇰🇪",
    regions: [
      "Nairobi", "Central", "Coast", "Eastern", "North Eastern", "Nyanza",
      "Rift Valley", "Western", "Mombasa", "Kisumu", "Nakuru", "Eldoret",
      "Meru", "Thika", "Malindi", "Kitale", "Garissa", "Kakamega"
    ]
  },
  "ethiopia": {
    name: "Ethiopia",
    flag: "🇪🇹",
    regions: [
      "Addis Ababa", "Oromia", "Amhara", "Tigray", "Sidama", "Southern Nations",
      "Somali", "Benishangul-Gumuz", "Afar", "Gambela", "Harari"
    ]
  },
  "egypt": {
    name: "Egypt",
    flag: "🇪🇬",
    regions: [
      "Cairo", "Giza", "Alexandria", "Qalyubia", "Port Said", "Suez", "Luxor",
      "Aswan", "Asyut", "Beheira", "Beni Suef", "Dakahlia", "Damietta",
      "Fayyum", "Gharbia", "Ismailia", "Kafr el-Sheikh", "Matrouh", "Minya",
      "Monufia", "New Valley", "North Sinai", "Qena", "Red Sea", "Sharqia",
      "Sohag", "South Sinai"
    ]
  },

  // South America
  "brazil": {
    name: "Brazil",
    flag: "🇧🇷",
    regions: [
      "São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Paraná", "Rio Grande do Sul",
      "Pernambuco", "Ceará", "Pará", "Santa Catarina", "Maranhão", "Goiás", "Paraíba",
      "Espírito Santo", "Piauí", "Alagoas", "Rio Grande do Norte", "Mato Grosso",
      "Mato Grosso do Sul", "Distrito Federal", "Sergipe", "Rondônia", "Acre",
      "Amazonas", "Roraima", "Amapá", "Tocantins"
    ]
  },
  "argentina": {
    name: "Argentina",
    flag: "🇦🇷",
    regions: [
      "Buenos Aires", "Córdoba", "Santa Fe", "Mendoza", "Tucumán", "Entre Ríos",
      "Salta", "Misiones", "Chaco", "Corrientes", "Santiago del Estero", "San Juan",
      "Jujuy", "Río Negro", "Formosa", "Neuquén", "Chubut", "San Luis", "Catamarca",
      "La Rioja", "La Pampa", "Santa Cruz", "Tierra del Fuego"
    ]
  },

  // Oceania
  "australia": {
    name: "Australia",
    flag: "🇦🇺",
    regions: [
      "New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia",
      "Tasmania", "Northern Territory", "Australian Capital Territory"
    ]
  },
  "new-zealand": {
    name: "New Zealand",
    flag: "🇳🇿",
    regions: [
      "Auckland", "Canterbury", "Wellington", "Waikato", "Bay of Plenty", "Otago",
      "Manawatu-Wanganui", "Hawke's Bay", "Northland", "Taranaki", "Southland",
      "Gisborne", "Tasman", "Nelson", "Marlborough", "West Coast"
    ]
  }
};

// Enhanced mock data for comprehensive global coverage
export const comprehensiveMockData: Record<string, Record<string, any>> = {
  // Asia - Bangladesh (comprehensive)
  "bangladesh": {
    "dhaka": {
      pollinatorPercentage: 78,
      zone: "healthy",
      trend: "up",
      lat: 23.8103,
      lng: 90.4125,
      recommendations: [
        "Rice (Oryza sativa) - Peak flowering in 15 days",
        "Jute (Corchorus capsularis) - Optimal pollination period", 
        "Mustard (Brassica rapa) - Good bee activity expected"
      ]
    },
    "chittagong": {
      pollinatorPercentage: 65,
      zone: "healthy", 
      trend: "up",
      lat: 22.3569,
      lng: 91.7832,
      recommendations: [
        "Tea (Camellia sinensis) - Good pollinator activity",
        "Banana (Musa acuminata) - Optimal conditions",
        "Jackfruit (Artocarpus heterophyllus) - Peak season"
      ]
    },
    "rajshahi": {
      pollinatorPercentage: 72,
      zone: "healthy",
      trend: "up", 
      lat: 24.3636,
      lng: 88.6241,
      recommendations: [
        "Mango (Mangifera indica) - Excellent flowering conditions",
        "Lychee (Litchi chinensis) - Peak pollination time",
        "Silk cotton (Bombax ceiba) - Good bee activity"
      ]
    },
    "khulna": {
      pollinatorPercentage: 58,
      zone: "at-risk",
      trend: "stable",
      lat: 22.8456,
      lng: 89.5403,
      recommendations: [
        "Shrimp cultivation support crops - Monitor conditions",
        "Coconut (Cocos nucifera) - Enhance pollinator habitat", 
        "Betel nut (Areca catechu) - Support native bees"
      ]
    }
  },

  // North America - United States (sample states)
  "united-states": {
    "california": {
      pollinatorPercentage: 75,
      zone: "healthy",
      trend: "up",
      lat: 36.7783,
      lng: -119.4179,
      recommendations: [
        "Almond (Prunus dulcis) - Peak flowering in February-March",
        "Sunflower (Helianthus annuus) - Optimal for summer planting",
        "Strawberry (Fragaria × ananassa) - Good bee activity expected"
      ]
    },
    "texas": {
      pollinatorPercentage: 52,
      zone: "at-risk",
      trend: "down",
      lat: 31.9686,
      lng: -99.9018,
      recommendations: [
        "Cotton (Gossypium hirsutum) - Monitor bee populations",
        "Watermelon (Citrullus lanatus) - Consider bee box placement",
        "Pecan (Carya illinoinensis) - Wind pollination supplement"
      ]
    },
    "iowa": {
      pollinatorPercentage: 68,
      zone: "healthy",
      trend: "up",
      lat: 41.5868,
      lng: -93.6250,
      recommendations: [
        "Corn (Zea mays) - Good wind pollination conditions",
        "Soybean (Glycine max) - Self-pollinating, good conditions",
        "Pumpkin (Cucurbita pepo) - Excellent bee activity expected"
      ]
    }
  },

  // Africa - Kenya (comprehensive)
  "kenya": {
    "central": {
      pollinatorPercentage: 45,
      zone: "at-risk",
      trend: "down",
      lat: -0.0236,
      lng: 37.9062,
      recommendations: [
        "Coffee (Coffea arabica) - Consider bee box placement",
        "Maize (Zea mays) - Monitor wind pollination",
        "Bean (Phaseolus vulgaris) - Enhance native pollinator habitat"
      ]
    },
    "coast": {
      pollinatorPercentage: 38,
      zone: "critical",
      trend: "down",
      lat: -3.2194,
      lng: 40.1169,
      recommendations: [
        "Coconut (Cocos nucifera) - Critical pollinator shortage",
        "Cashew (Anacardium occidentale) - Immediate intervention needed",
        "Mango (Mangifera indica) - Enhanced bee conservation required"
      ]
    }
  },

  // Europe - Germany (sample states)
  "germany": {
    "bavaria": {
      pollinatorPercentage: 82,
      zone: "healthy",
      trend: "up",
      lat: 48.7904,
      lng: 11.4979,
      recommendations: [
        "Rapeseed (Brassica napus) - Excellent conditions",
        "Apple (Malus domestica) - Peak orchard pollination",
        "Sunflower (Helianthus annuus) - Optimal bee activity"
      ]
    }
  },

  // South America - Brazil (sample states)
  "brazil": {
    "sao-paulo": {
      pollinatorPercentage: 68,
      zone: "healthy", 
      trend: "up",
      lat: -23.5505,
      lng: -46.6333,
      recommendations: [
        "Soybean (Glycine max) - Good pollination conditions",
        "Orange (Citrus × sinensis) - Peak flowering season",
        "Sugarcane (Saccharum officinarum) - Wind pollination optimal"
      ]
    }
  },

  // Add more countries as needed...
};

// Crop search database with global and location-specific data
export const cropSearchDatabase: Record<string, any> = {
  "rice": {
    scientificName: "Oryza sativa",
    floweringTime: "15-20 days before harvest",
    requiredPollinators: ["Wind (primary)", "Bees (supplementary)"],
    globalZone: { zone: "at-risk", percentage: 58 },
    zoneData: {
      bangladesh: { zone: "healthy", percentage: 78 },
      india: { zone: "at-risk", percentage: 55 },
      china: { zone: "healthy", percentage: 71 },
      thailand: { zone: "healthy", percentage: 82 },
      vietnam: { zone: "at-risk", percentage: 52 },
      philippines: { zone: "healthy", percentage: 69 },
      indonesia: { zone: "at-risk", percentage: 49 }
    }
  },
  "coffee": {
    scientificName: "Coffea arabica",
    floweringTime: "After rainy season (March-May)",
    requiredPollinators: ["Honeybees", "Native bees", "Butterflies"],
    globalZone: { zone: "critical", percentage: 42 },
    zoneData: {
      kenya: { zone: "at-risk", percentage: 45 },
      ethiopia: { zone: "critical", percentage: 28 },
      colombia: { zone: "healthy", percentage: 75 },
      brazil: { zone: "healthy", percentage: 68 },
      guatemala: { zone: "at-risk", percentage: 48 },
      vietnam: { zone: "at-risk", percentage: 51 },
      honduras: { zone: "critical", percentage: 35 }
    }
  },
  "sunflower": {
    scientificName: "Helianthus annuus", 
    floweringTime: "60-90 days after planting",
    requiredPollinators: ["Honeybees", "Bumblebees", "Solitary bees"],
    globalZone: { zone: "healthy", percentage: 71 },
    zoneData: {
      ukraine: { zone: "at-risk", percentage: 52 },
      argentina: { zone: "healthy", percentage: 88 },
      "united-states": { zone: "healthy", percentage: 71 },
      russia: { zone: "at-risk", percentage: 49 },
      turkey: { zone: "healthy", percentage: 76 },
      romania: { zone: "healthy", percentage: 73 }
    }
  },
  "cotton": {
    scientificName: "Gossypium hirsutum",
    floweringTime: "65-95 days after planting", 
    requiredPollinators: ["Bees", "Butterflies", "Native pollinators"],
    globalZone: { zone: "at-risk", percentage: 54 },
    zoneData: {
      india: { zone: "at-risk", percentage: 48 },
      china: { zone: "healthy", percentage: 72 },
      "united-states": { zone: "at-risk", percentage: 52 },
      pakistan: { zone: "critical", percentage: 38 },
      brazil: { zone: "healthy", percentage: 69 },
      uzbekistan: { zone: "at-risk", percentage: 45 }
    }
  },
  "maize": {
    scientificName: "Zea mays",
    floweringTime: "50-80 days after planting",
    requiredPollinators: ["Wind (primary)", "Insects (supplementary)"],
    globalZone: { zone: "healthy", percentage: 76 },
    zoneData: {
      "united-states": { zone: "healthy", percentage: 81 },
      china: { zone: "healthy", percentage: 74 },
      brazil: { zone: "healthy", percentage: 78 },
      argentina: { zone: "healthy", percentage: 83 },
      mexico: { zone: "healthy", percentage: 72 },
      india: { zone: "at-risk", percentage: 59 }
    }
  },
  "soybean": {
    scientificName: "Glycine max",
    floweringTime: "45-65 days after planting",
    requiredPollinators: ["Self-pollinating", "Bees (increase yield)"],
    globalZone: { zone: "healthy", percentage: 73 },
    zoneData: {
      "united-states": { zone: "healthy", percentage: 78 },
      brazil: { zone: "healthy", percentage: 81 },
      argentina: { zone: "healthy", percentage: 79 },
      china: { zone: "healthy", percentage: 67 },
      india: { zone: "at-risk", percentage: 58 },
      paraguay: { zone: "healthy", percentage: 75 }
    }
  },
  "apple": {
    scientificName: "Malus domestica",
    floweringTime: "Spring (March-May depending on variety)",
    requiredPollinators: ["Honeybees", "Native bees", "Bumblebees"],
    globalZone: { zone: "healthy", percentage: 69 },
    zoneData: {
      china: { zone: "healthy", percentage: 71 },
      "united-states": { zone: "healthy", percentage: 74 },
      turkey: { zone: "at-risk", percentage: 58 },
      poland: { zone: "healthy", percentage: 76 },
      italy: { zone: "healthy", percentage: 72 },
      france: { zone: "healthy", percentage: 79 }
    }
  },
  "wheat": {
    scientificName: "Triticum aestivum",
    floweringTime: "60-90 days after planting",
    requiredPollinators: ["Wind (primary)", "Self-pollinating"],
    globalZone: { zone: "healthy", percentage: 77 },
    zoneData: {
      china: { zone: "healthy", percentage: 75 },
      india: { zone: "healthy", percentage: 71 },
      russia: { zone: "healthy", percentage: 79 },
      "united-states": { zone: "healthy", percentage: 82 },
      france: { zone: "healthy", percentage: 84 },
      canada: { zone: "healthy", percentage: 86 }
    }
  }
};