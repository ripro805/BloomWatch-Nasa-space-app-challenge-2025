import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Removed Leaflet imports - using simplified map visualization
import { 
  MapPin, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Download,
  Globe,
  BarChart3,
  Satellite,
  Navigation as NavigationIcon
} from "lucide-react";

// Simplified map visualization without external dependencies

// Enhanced mock data for global location analysis
const mockLocationData = {
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
    }
  },
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
    }
  },
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
  "india": {
    "maharashtra": {
      pollinatorPercentage: 58,
      zone: "at-risk",
      trend: "stable",
      lat: 19.7515,
      lng: 75.7139,
      recommendations: [
        "Cotton (Gossypium arboreum) - Monitor bee populations",
        "Grape (Vitis vinifera) - Support native pollinators",
        "Onion (Allium cepa) - Enhance habitat corridors"
      ]
    }
  }
};

// Countries and their regions
const countryRegions = {
  "united-states": ["California", "Texas", "Florida", "New York"],
  "bangladesh": ["Dhaka", "Chittagong", "Sylhet", "Rajshahi"],
  "kenya": ["Central", "Coast", "Rift Valley", "Eastern"],
  "brazil": ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia"],
  "india": ["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat"],
  "canada": ["Ontario", "Quebec", "British Columbia", "Alberta"],
  "australia": ["New South Wales", "Victoria", "Queensland", "Western Australia"],
  "germany": ["Bavaria", "North Rhine-Westphalia", "Baden-Württemberg", "Lower Saxony"]
};

function getZoneBadge(zone: string, percentage: number) {
  switch (zone) {
    case "healthy":
      return <Badge className="zone-healthy">✅ Healthy Zone ({percentage}%)</Badge>;
    case "at-risk":
      return <Badge className="zone-at-risk">⚠️ At Risk ({percentage}%)</Badge>;
    case "critical":
      return <Badge className="zone-critical">❌ Critical ({percentage}%)</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
}

export default function Dashboard() {
  console.log("Dashboard component rendering");
  
  const [selectedCountry, setSelectedCountry] = useState("bangladesh");
  const [selectedRegion, setSelectedRegion] = useState("dhaka");
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  
  console.log("Selected country:", selectedCountry);
  console.log("Selected region:", selectedRegion);
  
  const currentData = mockLocationData[selectedCountry as keyof typeof mockLocationData]?.[selectedRegion as keyof any];
  const availableRegions = countryRegions[selectedCountry as keyof typeof countryRegions] || [];

  const handleUseMyLocation = () => {
    console.log("Use my location clicked");
    setIsDetectingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Location detected:", latitude, longitude);
          setUserLocation({ lat: latitude, lng: longitude });
          
          // Mock location detection - in real app, use reverse geocoding API
          // For demo, we'll set to a default location
          setSelectedCountry("bangladesh");
          setSelectedRegion("dhaka");
          setIsDetectingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsDetectingLocation(false);
        }
      );
    } else {
      console.log("Geolocation not supported");
      setIsDetectingLocation(false);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered, country changed to:", selectedCountry);
    console.log("Available regions:", availableRegions);
    
    // Reset region when country changes
    if (availableRegions.length > 0) {
      const newRegion = availableRegions[0].toLowerCase().replace(/\s+/g, '-');
      console.log("Setting new region:", newRegion);
      setSelectedRegion(newRegion);
    }
  }, [selectedCountry]);

  // Simplified zone visualization without external map dependencies

  return (
    <div className="min-h-screen bg-gradient-space">
      <Navigation />
      
      <main className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-primary" />
              <span>Pollination Dashboard</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Location-based analysis and zone classification
            </p>
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Download Data</span>
          </Button>
        </div>

        {/* Location Selector */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-primary" />
              <span>Select Location</span>
            </CardTitle>
            <CardDescription>
              Choose country and region for detailed pollination analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Country</label>
                  <Select 
                    value={selectedCountry} 
                    onValueChange={(value) => {
                      console.log("Country selection changed to:", value);
                      setSelectedCountry(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="united-states">🇺🇸 United States</SelectItem>
                      <SelectItem value="bangladesh">🇧🇩 Bangladesh</SelectItem>
                      <SelectItem value="kenya">🇰🇪 Kenya</SelectItem>
                      <SelectItem value="brazil">🇧🇷 Brazil</SelectItem>
                      <SelectItem value="india">🇮🇳 India</SelectItem>
                      <SelectItem value="canada">🇨🇦 Canada</SelectItem>
                      <SelectItem value="australia">🇦🇺 Australia</SelectItem>
                      <SelectItem value="germany">🇩🇪 Germany</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Region</label>
                  <Select 
                    value={selectedRegion} 
                    onValueChange={(value) => {
                      console.log("Region selection changed to:", value);
                      setSelectedRegion(value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRegions.map((region) => (
                        <SelectItem key={region} value={region.toLowerCase().replace(/\s+/g, '-')}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={handleUseMyLocation}
                  disabled={isDetectingLocation}
                  className="flex items-center space-x-2"
                >
                  <NavigationIcon className="h-4 w-4" />
                  <span>{isDetectingLocation ? "Detecting..." : "Use My Location"}</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Content */}
        {currentData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Zone Status */}
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span>Zone Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-4xl font-bold">{currentData.pollinatorPercentage}%</div>
                <div>
                  {getZoneBadge(currentData.zone, currentData.pollinatorPercentage)}
                </div>
                <div className="flex items-center justify-center space-x-2">
                  {currentData.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {currentData.trend === "up" ? "Improving" : "Declining"} trend
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Map */}
            <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Regional Map</span>
                </CardTitle>
                <CardDescription>
                  Interactive pollination zone visualization with NASA data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 rounded-lg overflow-hidden">
                  {currentData ? (
                    <div className="h-full bg-gradient-to-b from-primary/10 to-accent/10 rounded-lg flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20"></div>
                      <div className="text-center space-y-3 z-10">
                        <div 
                          className="w-6 h-6 rounded-full mx-auto shadow-lg"
                          style={{ 
                            backgroundColor: currentData.zone === "healthy" ? "#22c55e" : 
                                           currentData.zone === "at-risk" ? "#eab308" : "#ef4444" 
                          }}
                        ></div>
                        <div>
                          <h4 className="font-medium text-lg">{selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)}</h4>
                          <p className="text-sm text-muted-foreground">{currentData.pollinatorPercentage}% Pollinator Activity</p>
                          <div className="mt-2">
                            {getZoneBadge(currentData.zone, currentData.pollinatorPercentage)}
                          </div>
                        </div>
                        <MapPin className="h-8 w-8 text-primary mx-auto animate-pulse" />
                      </div>
                    </div>
                  ) : (
                    <div className="h-full bg-gradient-to-b from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Satellite className="h-12 w-12 text-primary mx-auto animate-orbit" />
                        <p className="text-muted-foreground">Select a location to view data</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-3 text-xs text-muted-foreground text-center">
                  <p>Map powered by OpenStreetMap • Data integration requires Supabase for real-time NASA feeds</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recommendations */}
        {currentData && (
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Crop & Flower Recommendations</CardTitle>
              <CardDescription>
                Based on current pollinator activity levels in your selected region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentData.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 bg-surface/50 rounded-lg">
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notice */}
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              🚀 This is a demonstration interface. Connect to Supabase for real NASA data integration and full functionality.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}