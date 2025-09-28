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
  // Asia - Bangladesh (all 64 districts)
  "bangladesh": {
    "dhaka": { pollinatorPercentage: 78, zone: "healthy", trend: "up", lat: 23.8103, lng: 90.4125, recommendations: ["Rice (Oryza sativa) - Peak flowering in 15 days", "Jute (Corchorus capsularis) - Optimal pollination period", "Mustard (Brassica rapa) - Good bee activity expected"] },
    "chittagong": { pollinatorPercentage: 65, zone: "healthy", trend: "up", lat: 22.3569, lng: 91.7832, recommendations: ["Tea (Camellia sinensis) - Good pollinator activity", "Banana (Musa acuminata) - Optimal conditions", "Jackfruit (Artocarpus heterophyllus) - Peak season"] },
    "rajshahi": { pollinatorPercentage: 72, zone: "healthy", trend: "up", lat: 24.3636, lng: 88.6241, recommendations: ["Mango (Mangifera indica) - Excellent flowering conditions", "Lychee (Litchi chinensis) - Peak pollination time", "Silk cotton (Bombax ceiba) - Good bee activity"] },
    "khulna": { pollinatorPercentage: 58, zone: "at-risk", trend: "stable", lat: 22.8456, lng: 89.5403, recommendations: ["Shrimp cultivation support crops - Monitor conditions", "Coconut (Cocos nucifera) - Enhance pollinator habitat", "Betel nut (Areca catechu) - Support native bees"] },
    "barisal": { pollinatorPercentage: 62, zone: "healthy", trend: "up", lat: 22.7010, lng: 90.3535, recommendations: ["Coconut (Cocos nucifera) - Good coastal conditions", "Betel nut (Areca catechu) - Optimal pollination", "Date palm (Phoenix dactylifera) - Peak season"] },
    "sylhet": { pollinatorPercentage: 71, zone: "healthy", trend: "up", lat: 24.8949, lng: 91.8687, recommendations: ["Tea (Camellia sinensis) - Premium growing conditions", "Pineapple (Ananas comosus) - Excellent pollinator activity", "Orange (Citrus sinensis) - Peak flowering time"] },
    "rangpur": { pollinatorPercentage: 69, zone: "healthy", trend: "up", lat: 25.7439, lng: 89.2752, recommendations: ["Tobacco (Nicotiana tabacum) - Good bee activity", "Potato (Solanum tuberosum) - Optimal growing conditions", "Maize (Zea mays) - Peak pollination season"] },
    "mymensingh": { pollinatorPercentage: 74, zone: "healthy", trend: "up", lat: 24.7471, lng: 90.4203, recommendations: ["Rice (Oryza sativa) - Excellent conditions", "Wheat (Triticum aestivum) - Good wind pollination", "Mustard (Brassica rapa) - Peak flowering"] },
    "comilla": { pollinatorPercentage: 66, zone: "healthy", trend: "stable", lat: 23.4607, lng: 91.1809, recommendations: ["Cotton (Gossypium hirsutum) - Good bee activity", "Sugarcane (Saccharum officinarum) - Optimal conditions", "Jute (Corchorus capsularis) - Peak season"] },
    "narayanganj": { pollinatorPercentage: 63, zone: "healthy", trend: "up", lat: 23.6238, lng: 90.4990, recommendations: ["Industrial crops - Monitor air quality", "Vegetable cultivation - Urban farming support", "Medicinal plants - Enhanced bee habitat"] },
    "gazipur": { pollinatorPercentage: 70, zone: "healthy", trend: "up", lat: 23.9999, lng: 90.4203, recommendations: ["Garments industry crops", "Fruits and vegetables", "Ornamental plants"] },
    "tangail": { pollinatorPercentage: 67, zone: "healthy", trend: "stable", lat: 24.2513, lng: 89.9167, recommendations: ["Handloom support crops", "Rice varieties", "Seasonal vegetables"] },
    "jamalpur": { pollinatorPercentage: 65, zone: "healthy", trend: "up", lat: 24.9375, lng: 89.9370, recommendations: ["River delta crops", "Flood-resistant varieties", "Aquaculture support"] },
    "sherpur": { pollinatorPercentage: 68, zone: "healthy", trend: "up", lat: 25.0204, lng: 90.0152, recommendations: ["Highland crops", "Forest boundary agriculture", "Sustainable farming"] },
    "netrokona": { pollinatorPercentage: 64, zone: "healthy", trend: "stable", lat: 24.8776, lng: 90.7279, recommendations: ["Wetland agriculture", "Fish farming support", "Water management crops"] },
    "kishoreganj": { pollinatorPercentage: 63, zone: "healthy", trend: "up", lat: 24.4449, lng: 90.7897, recommendations: ["River crops", "Traditional varieties", "Monsoon agriculture"] },
    "manikganj": { pollinatorPercentage: 69, zone: "healthy", trend: "up", lat: 23.8644, lng: 90.0047, recommendations: ["Peri-urban agriculture", "Market gardening", "Cash crops"] },
    "munshiganj": { pollinatorPercentage: 61, zone: "healthy", trend: "stable", lat: 23.5422, lng: 90.5305, recommendations: ["River island crops", "Flood management", "Seasonal planting"] },
    "faridpur": { pollinatorPercentage: 66, zone: "healthy", trend: "up", lat: 23.6070, lng: 89.8429, recommendations: ["Sugar industry crops", "Rice cultivation", "Vegetable farming"] },
    "gopalganj": { pollinatorPercentage: 64, zone: "healthy", trend: "stable", lat: 23.0050, lng: 89.8266, recommendations: ["Wetland crops", "Traditional rice", "Fish-rice farming"] },
    "madaripur": { pollinatorPercentage: 62, zone: "healthy", trend: "up", lat: 23.1641, lng: 90.1897, recommendations: ["River agriculture", "Seasonal crops", "Flood-resistant varieties"] },
    "shariatpur": { pollinatorPercentage: 60, zone: "at-risk", trend: "stable", lat: 23.2423, lng: 90.4348, recommendations: ["Enhanced pollinator habitat", "Crop diversification", "Bee conservation"] },
    "rajbari": { pollinatorPercentage: 65, zone: "healthy", trend: "up", lat: 23.7574, lng: 89.6444, recommendations: ["Traditional farming", "Organic methods", "Pollinator-friendly crops"] },
    "magura": { pollinatorPercentage: 67, zone: "healthy", trend: "up", lat: 23.4869, lng: 89.4198, recommendations: ["Agricultural diversity", "Sustainable practices", "Bee-friendly cultivation"] },
    "narail": { pollinatorPercentage: 68, zone: "healthy", trend: "up", lat: 23.1725, lng: 89.5125, recommendations: ["Border agriculture", "Cross-pollination crops", "Regional varieties"] },
    "jessore": { pollinatorPercentage: 70, zone: "healthy", trend: "up", lat: 23.1685, lng: 89.2081, recommendations: ["Commercial agriculture", "Export crops", "Modern techniques"] },
    "jhenaidah": { pollinatorPercentage: 69, zone: "healthy", trend: "up", lat: 23.5448, lng: 89.1539, recommendations: ["Agricultural hub", "Crop processing", "Value addition"] },
    "kushtia": { pollinatorPercentage: 71, zone: "healthy", trend: "up", lat: 23.9013, lng: 89.1200, recommendations: ["Sugar crops", "Industrial agriculture", "Processing support"] },
    "chuadanga": { pollinatorPercentage: 66, zone: "healthy", trend: "stable", lat: 23.6401, lng: 88.8410, recommendations: ["Border trade crops", "Specialized varieties", "Quality production"] },
    "meherpur": { pollinatorPercentage: 68, zone: "healthy", trend: "up", lat: 23.7622, lng: 88.6318, recommendations: ["Small-scale farming", "Intensive cultivation", "High-value crops"] },
    "satkhira": { pollinatorPercentage: 55, zone: "at-risk", trend: "down", lat: 22.7185, lng: 89.0705, recommendations: ["Salinity management", "Salt-tolerant varieties", "Coastal adaptation"] },
    "bagerhat": { pollinatorPercentage: 57, zone: "at-risk", trend: "stable", lat: 22.6602, lng: 89.7895, recommendations: ["Mangrove agriculture", "Shrimp farming support", "Coastal crops"] },
    "pirojpur": { pollinatorPercentage: 59, zone: "at-risk", trend: "up", lat: 22.5841, lng: 89.9720, recommendations: ["Coastal management", "Climate resilience", "Adaptive farming"] },
    "jhalokati": { pollinatorPercentage: 61, zone: "healthy", trend: "up", lat: 22.6406, lng: 90.1987, recommendations: ["River delta farming", "Integrated systems", "Sustainable methods"] },
    "patuakhali": { pollinatorPercentage: 56, zone: "at-risk", trend: "stable", lat: 22.3596, lng: 90.3298, recommendations: ["Cyclone-resistant crops", "Disaster management", "Recovery agriculture"] },
    "barguna": { pollinatorPercentage: 54, zone: "at-risk", trend: "down", lat: 22.1596, lng: 90.1276, recommendations: ["Climate adaptation", "Coastal protection", "Resilient varieties"] },
    "bhola": { pollinatorPercentage: 52, zone: "at-risk", trend: "down", lat: 22.6859, lng: 90.6482, recommendations: ["Island agriculture", "Storm resistance", "Emergency crops"] },
    "lakshmipur": { pollinatorPercentage: 58, zone: "at-risk", trend: "stable", lat: 22.9424, lng: 90.8413, recommendations: ["Coastal farming", "Soil management", "Water conservation"] },
    "noakhali": { pollinatorPercentage: 60, zone: "healthy", trend: "up", lat: 22.8696, lng: 91.0991, recommendations: ["Embankment farming", "Flood control", "Seasonal adaptation"] },
    "feni": { pollinatorPercentage: 62, zone: "healthy", trend: "up", lat: 23.0159, lng: 91.3976, recommendations: ["Border cultivation", "Trade crops", "Quality focus"] },
    "chandpur": { pollinatorPercentage: 64, zone: "healthy", trend: "up", lat: 23.2513, lng: 90.6732, recommendations: ["River junction farming", "Transport advantage", "Market access"] },
    "brahmanbaria": { pollinatorPercentage: 66, zone: "healthy", trend: "up", lat: 23.9571, lng: 91.1115, recommendations: ["Gas field agriculture", "Energy support", "Modern farming"] },
    "habiganj": { pollinatorPercentage: 72, zone: "healthy", trend: "up", lat: 24.3745, lng: 91.4156, recommendations: ["Tea garden support", "Hill agriculture", "Premium crops"] },
    "moulvibazar": { pollinatorPercentage: 74, zone: "healthy", trend: "up", lat: 24.4829, lng: 91.7775, recommendations: ["Forest edge farming", "Biodiversity support", "Eco-agriculture"] },
    "sunamganj": { pollinatorPercentage: 68, zone: "healthy", trend: "stable", lat: 25.0658, lng: 91.3950, recommendations: ["Wetland management", "Haor agriculture", "Water crops"] },
    "narsingdi": { pollinatorPercentage: 67, zone: "healthy", trend: "up", lat: 23.9322, lng: 90.7151, recommendations: ["Industrial area farming", "Urban agriculture", "Value crops"] },
    "gaibandha": { pollinatorPercentage: 70, zone: "healthy", trend: "up", lat: 25.3284, lng: 89.5286, recommendations: ["Northern agriculture", "Cold tolerance", "Winter crops"] },
    "kurigram": { pollinatorPercentage: 65, zone: "healthy", trend: "stable", lat: 25.8055, lng: 89.6361, recommendations: ["Border farming", "River erosion management", "Resilient crops"] },
    "lalmonirhat": { pollinatorPercentage: 68, zone: "healthy", trend: "up", lat: 25.9923, lng: 89.2847, recommendations: ["Northern varieties", "Cross-border trade", "Quality production"] },
    "nilphamari": { pollinatorPercentage: 69, zone: "healthy", trend: "up", lat: 25.9311, lng: 88.8563, recommendations: ["Sugar industry support", "Processing crops", "Industrial agriculture"] },
    "panchagarh": { pollinatorPercentage: 71, zone: "healthy", trend: "up", lat: 26.3411, lng: 88.5542, recommendations: ["Northernmost farming", "Cold climate crops", "Border agriculture"] },
    "thakurgaon": { pollinatorPercentage: 70, zone: "healthy", trend: "up", lat: 26.0336, lng: 88.4616, recommendations: ["Agricultural diversity", "Multiple cropping", "Intensive farming"] },
    "dinajpur": { pollinatorPercentage: 72, zone: "healthy", trend: "up", lat: 25.6217, lng: 88.6354, recommendations: ["Major agricultural center", "Crop research", "Modern techniques"] },
    "joypurhat": { pollinatorPercentage: 68, zone: "healthy", trend: "stable", lat: 25.0968, lng: 89.0227, recommendations: ["Sugar belt agriculture", "Industrial support", "Cash crops"] },
    "bogra": { pollinatorPercentage: 73, zone: "healthy", trend: "up", lat: 24.8465, lng: 89.3776, recommendations: ["Agricultural hub", "Processing center", "Value addition"] },
    "naogaon": { pollinatorPercentage: 71, zone: "healthy", trend: "up", lat: 24.7936, lng: 88.9318, recommendations: ["Mango cultivation", "Fruit processing", "Export quality"] },
    "natore": { pollinatorPercentage: 70, zone: "healthy", trend: "up", lat: 24.4206, lng: 89.0000, recommendations: ["Silk production", "Mulberry cultivation", "Traditional crafts"] },
    "chapainawabganj": { pollinatorPercentage: 69, zone: "healthy", trend: "up", lat: 24.5965, lng: 88.2775, recommendations: ["Mango capital", "Export fruit", "Quality focus"] },
    "pabna": { pollinatorPercentage: 67, zone: "healthy", trend: "stable", lat: 24.0064, lng: 89.2372, recommendations: ["River agriculture", "Flood management", "Diverse cropping"] },
    "sirajganj": { pollinatorPercentage: 66, zone: "healthy", trend: "up", lat: 24.4533, lng: 89.7006, recommendations: ["River port agriculture", "Transport hub", "Market access"] },
    "bandarban": { pollinatorPercentage: 58, zone: "at-risk", trend: "stable", lat: 22.1953, lng: 92.2207, recommendations: ["Hill farming", "Tribal agriculture", "Sustainable practices"] },
    "rangamati": { pollinatorPercentage: 60, zone: "healthy", trend: "up", lat: 22.6533, lng: 92.1751, recommendations: ["Lake agriculture", "Tourism support", "Eco-farming"] },
    "khagrachhari": { pollinatorPercentage: 59, zone: "at-risk", trend: "stable", lat: 23.1193, lng: 91.9847, recommendations: ["Hill district farming", "Forestry support", "Conservation agriculture"] },
    "cox's-bazar": { pollinatorPercentage: 55, zone: "at-risk", trend: "down", lat: 21.4272, lng: 92.0058, recommendations: ["Coastal agriculture", "Tourism impact management", "Salt tolerance"] }
  },

  // India - All major states
  "india": {
    "andhra-pradesh": { pollinatorPercentage: 58, zone: "at-risk", trend: "stable", lat: 15.9129, lng: 79.7400, recommendations: ["Rice cultivation", "Spice farming", "Coastal crops"] },
    "arunachal-pradesh": { pollinatorPercentage: 72, zone: "healthy", trend: "up", lat: 28.2180, lng: 94.7278, recommendations: ["Mountain agriculture", "Organic farming", "Biodiversity conservation"] },
    "assam": { pollinatorPercentage: 68, zone: "healthy", trend: "up", lat: 26.2006, lng: 92.9376, recommendations: ["Tea cultivation", "Rice varieties", "Flood management"] },
    "bihar": { pollinatorPercentage: 52, zone: "at-risk", trend: "down", lat: 25.0961, lng: 85.3131, recommendations: ["Crop intensification", "Pollinator conservation", "Sustainable practices"] },
    "chhattisgarh": { pollinatorPercentage: 65, zone: "healthy", trend: "up", lat: 21.2787, lng: 81.8661, recommendations: ["Forest agriculture", "Tribal farming", "Rice cultivation"] },
    "goa": { pollinatorPercentage: 69, zone: "healthy", trend: "stable", lat: 15.2993, lng: 74.1240, recommendations: ["Spice cultivation", "Coconut farming", "Tourism crops"] },
    "gujarat": { pollinatorPercentage: 61, zone: "healthy", trend: "up", lat: 23.0225, lng: 72.5714, recommendations: ["Cotton cultivation", "Groundnut farming", "Industrial crops"] },
    "haryana": { pollinatorPercentage: 64, zone: "healthy", trend: "stable", lat: 29.0588, lng: 76.0856, recommendations: ["Wheat cultivation", "Green revolution", "Modern farming"] },
    "himachal-pradesh": { pollinatorPercentage: 75, zone: "healthy", trend: "up", lat: 31.1048, lng: 77.1734, recommendations: ["Apple orchards", "Hill farming", "Organic cultivation"] },
    "jharkhand": { pollinatorPercentage: 59, zone: "at-risk", trend: "stable", lat: 23.6102, lng: 85.2799, recommendations: ["Tribal agriculture", "Forest farming", "Sustainable methods"] },
    "karnataka": { pollinatorPercentage: 66, zone: "healthy", trend: "up", lat: 15.3173, lng: 75.7139, recommendations: ["Coffee cultivation", "IT agriculture", "Modern techniques"] },
    "kerala": { pollinatorPercentage: 71, zone: "healthy", trend: "up", lat: 10.8505, lng: 76.2711, recommendations: ["Spice cultivation", "Coconut farming", "Backwater agriculture"] },
    "madhya-pradesh": { pollinatorPercentage: 63, zone: "healthy", trend: "stable", lat: 22.9734, lng: 78.6569, recommendations: ["Soybean cultivation", "Wheat farming", "Central India crops"] },
    "maharashtra": { pollinatorPercentage: 67, zone: "healthy", trend: "up", lat: 19.7515, lng: 75.7139, recommendations: ["Sugarcane cultivation", "Cotton farming", "Commercial agriculture"] },
    "manipur": { pollinatorPercentage: 70, zone: "healthy", trend: "up", lat: 24.6637, lng: 93.9063, recommendations: ["Hill agriculture", "Organic farming", "Traditional crops"] },
    "meghalaya": { pollinatorPercentage: 74, zone: "healthy", trend: "up", lat: 25.4670, lng: 91.3662, recommendations: ["High rainfall crops", "Hill farming", "Biodiversity support"] },
    "mizoram": { pollinatorPercentage: 73, zone: "healthy", trend: "up", lat: 23.1645, lng: 92.9376, recommendations: ["Jhum cultivation", "Hill crops", "Sustainable practices"] },
    "nagaland": { pollinatorPercentage: 71, zone: "healthy", trend: "up", lat: 26.1584, lng: 94.5624, recommendations: ["Tribal farming", "Hill agriculture", "Traditional methods"] },
    "odisha": { pollinatorPercentage: 60, zone: "healthy", trend: "stable", lat: 20.9517, lng: 85.0985, recommendations: ["Rice cultivation", "Coastal farming", "Cyclone resistance"] },
    "punjab": { pollinatorPercentage: 65, zone: "healthy", trend: "stable", lat: 31.1471, lng: 75.3412, recommendations: ["Wheat cultivation", "Green revolution", "Intensive farming"] },
    "rajasthan": { pollinatorPercentage: 48, zone: "critical", trend: "down", lat: 27.0238, lng: 74.2179, recommendations: ["Desert agriculture", "Water conservation", "Drought resistance"] },
    "sikkim": { pollinatorPercentage: 78, zone: "healthy", trend: "up", lat: 27.5330, lng: 88.5122, recommendations: ["Organic state", "Mountain farming", "Biodiversity conservation"] },
    "tamil-nadu": { pollinatorPercentage: 62, zone: "healthy", trend: "stable", lat: 11.1271, lng: 78.6569, recommendations: ["Rice cultivation", "Coconut farming", "Industrial crops"] },
    "telangana": { pollinatorPercentage: 64, zone: "healthy", trend: "up", lat: 18.1124, lng: 79.0193, recommendations: ["IT agriculture", "Modern farming", "Technology adoption"] },
    "tripura": { pollinatorPercentage: 69, zone: "healthy", trend: "up", lat: 23.9408, lng: 91.9882, recommendations: ["Hill agriculture", "Bamboo cultivation", "Traditional crops"] },
    "uttar-pradesh": { pollinatorPercentage: 55, zone: "at-risk", trend: "stable", lat: 26.8467, lng: 80.9462, recommendations: ["Wheat cultivation", "Sugarcane farming", "Crop diversification"] },
    "uttarakhand": { pollinatorPercentage: 72, zone: "healthy", trend: "up", lat: 30.0668, lng: 79.0193, recommendations: ["Hill farming", "Organic cultivation", "Mountain agriculture"] },
    "west-bengal": { pollinatorPercentage: 66, zone: "healthy", trend: "up", lat: 22.9868, lng: 87.8550, recommendations: ["Rice cultivation", "Fish farming", "Delta agriculture"] },
    "delhi": { pollinatorPercentage: 45, zone: "critical", trend: "down", lat: 28.7041, lng: 77.1025, recommendations: ["Urban agriculture", "Pollution management", "Vertical farming"] }
  },

  // United States - All 50 states
  "united-states": {
    "california": { pollinatorPercentage: 75, zone: "healthy", trend: "up", lat: 36.7783, lng: -119.4179, recommendations: ["Almond cultivation", "Avocado farming", "Wine grapes"] },
    "texas": { pollinatorPercentage: 52, zone: "at-risk", trend: "down", lat: 31.9686, lng: -99.9018, recommendations: ["Cotton cultivation", "Cattle ranching", "Oil seed crops"] },
    "florida": { pollinatorPercentage: 68, zone: "healthy", trend: "stable", lat: 27.7663, lng: -81.6868, recommendations: ["Citrus cultivation", "Sugar cane", "Tropical fruits"] },
    "new-york": { pollinatorPercentage: 71, zone: "healthy", trend: "up", lat: 42.1657, lng: -74.9481, recommendations: ["Apple orchards", "Grape cultivation", "Dairy farming"] },
    "pennsylvania": { pollinatorPercentage: 69, zone: "healthy", trend: "stable", lat: 40.5908, lng: -77.2098, recommendations: ["Corn cultivation", "Dairy farming", "Mushroom production"] },
    "illinois": { pollinatorPercentage: 66, zone: "healthy", trend: "stable", lat: 40.3495, lng: -88.9861, recommendations: ["Corn cultivation", "Soybean farming", "Livestock feed"] },
    "ohio": { pollinatorPercentage: 67, zone: "healthy", trend: "up", lat: 40.3888, lng: -82.7649, recommendations: ["Corn cultivation", "Soybean farming", "Vegetable crops"] },
    "georgia": { pollinatorPercentage: 63, zone: "healthy", trend: "stable", lat: 33.0406, lng: -83.6431, recommendations: ["Peach cultivation", "Peanut farming", "Cotton crops"] },
    "north-carolina": { pollinatorPercentage: 65, zone: "healthy", trend: "up", lat: 35.6301, lng: -79.8064, recommendations: ["Tobacco cultivation", "Sweet potato", "Blueberry farming"] },
    "michigan": { pollinatorPercentage: 70, zone: "healthy", trend: "up", lat: 43.3266, lng: -84.5361, recommendations: ["Cherry orchards", "Apple cultivation", "Soybean farming"] },
    "new-jersey": { pollinatorPercentage: 68, zone: "healthy", trend: "stable", lat: 40.2989, lng: -74.5210, recommendations: ["Blueberry cultivation", "Cranberry farming", "Tomato crops"] },
    "virginia": { pollinatorPercentage: 66, zone: "healthy", trend: "up", lat: 37.7693, lng: -78.2057, recommendations: ["Tobacco cultivation", "Apple orchards", "Peanut farming"] },
    "washington": { pollinatorPercentage: 73, zone: "healthy", trend: "up", lat: 47.4009, lng: -121.4905, recommendations: ["Apple orchards", "Wine grapes", "Hop cultivation"] },
    "arizona": { pollinatorPercentage: 48, zone: "critical", trend: "down", lat: 33.7298, lng: -111.4312, recommendations: ["Desert agriculture", "Cotton cultivation", "Citrus farming"] },
    "massachusetts": { pollinatorPercentage: 72, zone: "healthy", trend: "up", lat: 42.2081, lng: -71.0275, recommendations: ["Cranberry cultivation", "Apple orchards", "Blueberry farming"] },
    "tennessee": { pollinatorPercentage: 64, zone: "healthy", trend: "stable", lat: 35.7478, lng: -86.7923, recommendations: ["Tobacco cultivation", "Soybean farming", "Cotton crops"] },
    "indiana": { pollinatorPercentage: 65, zone: "healthy", trend: "stable", lat: 39.8494, lng: -86.2583, recommendations: ["Corn cultivation", "Soybean farming", "Pumpkin crops"] },
    "missouri": { pollinatorPercentage: 62, zone: "healthy", trend: "stable", lat: 38.4561, lng: -92.2884, recommendations: ["Soybean farming", "Corn cultivation", "Rice crops"] },
    "maryland": { pollinatorPercentage: 67, zone: "healthy", trend: "up", lat: 39.0639, lng: -76.8021, recommendations: ["Seafood support crops", "Tobacco cultivation", "Vegetable farming"] },
    "wisconsin": { pollinatorPercentage: 71, zone: "healthy", trend: "up", lat: 44.2619, lng: -89.6165, recommendations: ["Dairy farming", "Corn cultivation", "Cranberry crops"] },
    "colorado": { pollinatorPercentage: 59, zone: "at-risk", trend: "stable", lat: 39.0598, lng: -105.3111, recommendations: ["High altitude crops", "Potato cultivation", "Sunflower farming"] },
    "minnesota": { pollinatorPercentage: 69, zone: "healthy", trend: "up", lat: 45.6945, lng: -93.9002, recommendations: ["Corn cultivation", "Soybean farming", "Sugar beet crops"] },
    "south-carolina": { pollinatorPercentage: 64, zone: "healthy", trend: "stable", lat: 33.8191, lng: -80.9066, recommendations: ["Peach cultivation", "Cotton farming", "Tobacco crops"] },
    "alabama": { pollinatorPercentage: 61, zone: "healthy", trend: "stable", lat: 32.3617, lng: -86.7918, recommendations: ["Cotton cultivation", "Peanut farming", "Soybean crops"] },
    "louisiana": { pollinatorPercentage: 58, zone: "at-risk", trend: "stable", lat: 31.1695, lng: -91.8678, recommendations: ["Sugar cane", "Rice cultivation", "Soybean farming"] },
    "kentucky": { pollinatorPercentage: 63, zone: "healthy", trend: "stable", lat: 37.6681, lng: -84.6701, recommendations: ["Tobacco cultivation", "Corn farming", "Soybean crops"] },
    "oregon": { pollinatorPercentage: 74, zone: "healthy", trend: "up", lat: 44.5672, lng: -122.1269, recommendations: ["Hazelnut cultivation", "Wine grapes", "Berry farming"] },
    "oklahoma": { pollinatorPercentage: 57, zone: "at-risk", trend: "stable", lat: 35.5653, lng: -96.9289, recommendations: ["Wheat cultivation", "Cotton farming", "Peanut crops"] },
    "connecticut": { pollinatorPercentage: 70, zone: "healthy", trend: "up", lat: 41.5978, lng: -72.7554, recommendations: ["Tobacco cultivation", "Apple orchards", "Nursery crops"] },
    "utah": { pollinatorPercentage: 61, zone: "healthy", trend: "stable", lat: 40.1500, lng: -111.8947, recommendations: ["Fruit orchards", "Alfalfa farming", "Vegetable crops"] },
    "iowa": { pollinatorPercentage: 68, zone: "healthy", trend: "up", lat: 41.5868, lng: -93.6250, recommendations: ["Corn cultivation", "Soybean farming", "Pork production"] },
    "nevada": { pollinatorPercentage: 45, zone: "critical", trend: "down", lat: 38.3135, lng: -117.0554, recommendations: ["Desert agriculture", "Water conservation", "Drought resistance"] },
    "arkansas": { pollinatorPercentage: 60, zone: "healthy", trend: "stable", lat: 34.9697, lng: -92.3731, recommendations: ["Rice cultivation", "Soybean farming", "Cotton crops"] },
    "mississippi": { pollinatorPercentage: 59, zone: "at-risk", trend: "stable", lat: 32.7767, lng: -89.6711, recommendations: ["Cotton cultivation", "Soybean farming", "Catfish aquaculture"] },
    "kansas": { pollinatorPercentage: 63, zone: "healthy", trend: "stable", lat: 38.5266, lng: -96.7265, recommendations: ["Wheat cultivation", "Corn farming", "Sorghum crops"] },
    "new-mexico": { pollinatorPercentage: 51, zone: "at-risk", trend: "down", lat: 34.8405, lng: -106.2485, recommendations: ["Desert agriculture", "Chile cultivation", "Pecan farming"] },
    "nebraska": { pollinatorPercentage: 66, zone: "healthy", trend: "stable", lat: 41.1254, lng: -98.2681, recommendations: ["Corn cultivation", "Soybean farming", "Beef production"] },
    "west-virginia": { pollinatorPercentage: 65, zone: "healthy", trend: "stable", lat: 38.4680, lng: -80.9696, recommendations: ["Tobacco cultivation", "Apple orchards", "Forage crops"] },
    "idaho": { pollinatorPercentage: 67, zone: "healthy", trend: "up", lat: 44.2405, lng: -114.4788, recommendations: ["Potato cultivation", "Wheat farming", "Sugar beet crops"] },
    "hawaii": { pollinatorPercentage: 72, zone: "healthy", trend: "stable", lat: 21.0943, lng: -157.4983, recommendations: ["Tropical fruits", "Coffee cultivation", "Macadamia nuts"] },
    "new-hampshire": { pollinatorPercentage: 73, zone: "healthy", trend: "up", lat: 43.4525, lng: -71.5639, recommendations: ["Apple orchards", "Maple syrup", "Blueberry farming"] },
    "maine": { pollinatorPercentage: 74, zone: "healthy", trend: "up", lat: 44.6939, lng: -69.3819, recommendations: ["Blueberry cultivation", "Potato farming", "Lobster support"] },
    "montana": { pollinatorPercentage: 64, zone: "healthy", trend: "stable", lat: 47.0527, lng: -110.2148, recommendations: ["Wheat cultivation", "Barley farming", "Cattle ranching"] },
    "rhode-island": { pollinatorPercentage: 71, zone: "healthy", trend: "up", lat: 41.6809, lng: -71.5118, recommendations: ["Nursery crops", "Turf farming", "Seafood support"] },
    "delaware": { pollinatorPercentage: 68, zone: "healthy", trend: "stable", lat: 39.3185, lng: -75.5071, recommendations: ["Soybean farming", "Corn cultivation", "Broiler chickens"] },
    "south-dakota": { pollinatorPercentage: 65, zone: "healthy", trend: "stable", lat: 44.2998, lng: -99.4388, recommendations: ["Corn cultivation", "Soybean farming", "Wheat crops"] },
    "north-dakota": { pollinatorPercentage: 67, zone: "healthy", trend: "up", lat: 47.5289, lng: -99.7840, recommendations: ["Wheat cultivation", "Sunflower farming", "Sugar beet crops"] },
    "alaska": { pollinatorPercentage: 58, zone: "at-risk", trend: "stable", lat: 61.0700, lng: -165.4048, recommendations: ["Short season crops", "Greenhouse farming", "Cold hardy varieties"] },
    "vermont": { pollinatorPercentage: 75, zone: "healthy", trend: "up", lat: 44.0459, lng: -72.7107, recommendations: ["Maple syrup", "Apple orchards", "Dairy farming"] },
    "wyoming": { pollinatorPercentage: 60, zone: "healthy", trend: "stable", lat: 42.7559, lng: -107.3025, recommendations: ["Cattle ranching", "Wheat cultivation", "Sugar beet crops"] }
  },

  // Generate data for other major countries
  "canada": {
    "ontario": { pollinatorPercentage: 69, zone: "healthy", trend: "up", lat: 51.2538, lng: -85.3232, recommendations: ["Corn cultivation", "Soybean farming", "Apple orchards"] },
    "quebec": { pollinatorPercentage: 71, zone: "healthy", trend: "up", lat: 53.9133, lng: -73.5370, recommendations: ["Maple syrup", "Dairy farming", "Blueberry cultivation"] },
    "british-columbia": { pollinatorPercentage: 73, zone: "healthy", trend: "up", lat: 53.7267, lng: -127.6476, recommendations: ["Wine grapes", "Berry farming", "Fruit orchards"] },
    "alberta": { pollinatorPercentage: 65, zone: "healthy", trend: "stable", lat: 53.9333, lng: -116.5765, recommendations: ["Wheat cultivation", "Canola farming", "Cattle ranching"] },
    "manitoba": { pollinatorPercentage: 67, zone: "healthy", trend: "up", lat: 53.7609, lng: -98.8139, recommendations: ["Wheat cultivation", "Canola farming", "Sunflower crops"] },
    "saskatchewan": { pollinatorPercentage: 68, zone: "healthy", trend: "up", lat: 52.9399, lng: -106.4509, recommendations: ["Wheat cultivation", "Canola farming", "Pulse crops"] },
    "nova-scotia": { pollinatorPercentage: 72, zone: "healthy", trend: "up", lat: 44.6820, lng: -63.7443, recommendations: ["Apple orchards", "Blueberry cultivation", "Wine grapes"] },
    "new-brunswick": { pollinatorPercentage: 70, zone: "healthy", trend: "up", lat: 46.5653, lng: -66.4619, recommendations: ["Potato cultivation", "Blueberry farming", "Forest products"] }
  },

  "germany": {
    "north-rhine-westphalia": { pollinatorPercentage: 68, zone: "healthy", trend: "stable", lat: 51.4332, lng: 7.6616, recommendations: ["Sugar beet cultivation", "Wheat farming", "Industrial crops"] },
    "bavaria": { pollinatorPercentage: 72, zone: "healthy", trend: "up", lat: 48.7904, lng: 11.4979, recommendations: ["Rapeseed cultivation", "Apple orchards", "Beer hops"] },
    "baden-wurttemberg": { pollinatorPercentage: 74, zone: "healthy", trend: "up", lat: 48.6616, lng: 9.3501, recommendations: ["Wine grapes", "Fruit orchards", "Vegetable crops"] },
    "lower-saxony": { pollinatorPercentage: 69, zone: "healthy", trend: "stable", lat: 52.6367, lng: 9.8451, recommendations: ["Sugar beet cultivation", "Rapeseed farming", "Potato crops"] },
    "hesse": { pollinatorPercentage: 70, zone: "healthy", trend: "up", lat: 50.6520, lng: 9.1624, recommendations: ["Apple orchards", "Rapeseed cultivation", "Wine grapes"] }
  },

  "brazil": {
    "sao-paulo": { pollinatorPercentage: 64, zone: "healthy", trend: "stable", lat: -23.5505, lng: -46.6333, recommendations: ["Soybean cultivation", "Orange orchards", "Sugar cane"] },
    "rio-de-janeiro": { pollinatorPercentage: 62, zone: "healthy", trend: "stable", lat: -22.9068, lng: -43.1729, recommendations: ["Tropical fruits", "Coffee cultivation", "Sugar cane"] },
    "minas-gerais": { pollinatorPercentage: 66, zone: "healthy", trend: "up", lat: -18.5122, lng: -44.5550, recommendations: ["Coffee cultivation", "Soybean farming", "Corn crops"] },
    "bahia": { pollinatorPercentage: 61, zone: "healthy", trend: "stable", lat: -12.9704, lng: -38.5124, recommendations: ["Soybean cultivation", "Cotton farming", "Fruit production"] },
    "parana": { pollinatorPercentage: 68, zone: "healthy", trend: "up", lat: -24.8980, lng: -51.0694, recommendations: ["Soybean cultivation", "Corn farming", "Coffee production"] }
  },

  "australia": {
    "new-south-wales": { pollinatorPercentage: 63, zone: "healthy", trend: "stable", lat: -31.2532, lng: 146.9211, recommendations: ["Wheat cultivation", "Cotton farming", "Canola crops"] },
    "victoria": { pollinatorPercentage: 67, zone: "healthy", trend: "up", lat: -36.5986, lng: 144.6780, recommendations: ["Wheat cultivation", "Dairy farming", "Wine grapes"] },
    "queensland": { pollinatorPercentage: 65, zone: "healthy", trend: "stable", lat: -22.1646, lng: 144.2780, recommendations: ["Sugar cane", "Cotton farming", "Tropical fruits"] },
    "western-australia": { pollinatorPercentage: 61, zone: "healthy", trend: "stable", lat: -25.2744, lng: 122.2187, recommendations: ["Wheat cultivation", "Canola farming", "Lupins crops"] },
    "south-australia": { pollinatorPercentage: 64, zone: "healthy", trend: "up", lat: -30.0002, lng: 136.2092, recommendations: ["Wine grapes", "Wheat cultivation", "Barley crops"] }
  },

  // Add abbreviated data for remaining countries to ensure all have some coverage
  "china": {
    "beijing": { pollinatorPercentage: 45, zone: "critical", trend: "down", lat: 39.9042, lng: 116.4074, recommendations: ["Urban agriculture", "Pollution resistant crops", "Greenhouse farming"] },
    "shanghai": { pollinatorPercentage: 48, zone: "critical", trend: "down", lat: 31.2304, lng: 121.4737, recommendations: ["Urban farming", "Vertical agriculture", "Protected cultivation"] },
    "guangdong": { pollinatorPercentage: 58, zone: "at-risk", trend: "stable", lat: 23.3790, lng: 113.7633, recommendations: ["Rice cultivation", "Tropical fruits", "Vegetable crops"] },
    "shandong": { pollinatorPercentage: 62, zone: "healthy", trend: "stable", lat: 36.3427, lng: 118.1498, recommendations: ["Wheat cultivation", "Cotton farming", "Fruit orchards"] }
  },

  "nigeria": {
    "lagos": { pollinatorPercentage: 52, zone: "at-risk", trend: "down", lat: 6.5244, lng: 3.3792, recommendations: ["Urban agriculture", "Cocoa cultivation", "Plantain farming"] },
    "kano": { pollinatorPercentage: 48, zone: "critical", trend: "down", lat: 12.0022, lng: 8.5920, recommendations: ["Cotton cultivation", "Millet farming", "Groundnut crops"] },
    "kaduna": { pollinatorPercentage: 50, zone: "at-risk", trend: "stable", lat: 10.5105, lng: 7.4165, recommendations: ["Cotton cultivation", "Maize farming", "Rice crops"] }
  },

  "mexico": {
    "mexico-city": { pollinatorPercentage: 46, zone: "critical", trend: "down", lat: 19.4326, lng: -99.1332, recommendations: ["Urban agriculture", "Pollution management", "Vertical farming"] },
    "jalisco": { pollinatorPercentage: 61, zone: "healthy", trend: "stable", lat: 20.6597, lng: -103.3496, recommendations: ["Agave cultivation", "Corn farming", "Bean crops"] },
    "nuevo-leon": { pollinatorPercentage: 58, zone: "at-risk", trend: "stable", lat: 25.5922, lng: -99.9962, recommendations: ["Industrial crops", "Citrus farming", "Cattle ranching"] }
  }
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