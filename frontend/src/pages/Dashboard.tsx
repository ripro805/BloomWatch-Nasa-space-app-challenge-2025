import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InteractiveMap from "@/components/InteractiveMap";
import { worldCountriesData, comprehensiveMockData } from "@/data/countries";
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

// Store selected location for dashboard state
let dashboardLocation: { country: string; region: string } | null = null;

// Get location data for dashboard-search integration
export const getDashboardLocation = () => dashboardLocation;
export const setDashboardLocation = (location: { country: string; region: string }) => {
  dashboardLocation = location;
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

function Dashboard() {
  const { user } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState("bangladesh");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const currentData = comprehensiveMockData[selectedCountry]?.[selectedRegion];
  const availableRegions = worldCountriesData[selectedCountry]?.regions || [];

  // Get map location data
  const mapLocation = currentData ? {
    country: selectedCountry,
    region: selectedRegion,
    lat: currentData.lat,
    lng: currentData.lng,
    zone: currentData.zone,
    percentage: currentData.pollinatorPercentage
  } : null;

  const handleUseMyLocation = () => {
    setIsDetectingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          // Mock location detection - in real app, use reverse geocoding API
          setSelectedCountry("bangladesh");
          setSelectedRegion("dhaka");
          setIsDetectingLocation(false);
        },
        (error) => {
          setIsDetectingLocation(false);
        }
      );
    } else {
      setIsDetectingLocation(false);
    }
  };

  useEffect(() => {
    if (availableRegions.length > 0 && !availableRegions.some(region => 
      region.toLowerCase().replace(/\s+/g, '-') === selectedRegion
    )) {
      setSelectedRegion("");
    }
  }, [selectedCountry, availableRegions]);

  useEffect(() => {
    if (selectedCountry && selectedRegion) {
      setDashboardLocation({ country: selectedCountry, region: selectedRegion });
    }
  }, [selectedCountry, selectedRegion]);

  // CSV download handler
  const handleDownloadCSV = () => {
    if (!selectedRegion || !currentData) return;
    const csvRows = [
      ["Country", "Region", "Pollinator %", "Zone", "Trend", "Recommendations"],
      [
        selectedCountry,
        selectedRegion,
        currentData.pollinatorPercentage,
        currentData.zone,
        currentData.trend,
        (currentData.recommendations || []).join("; ")
      ]
    ];
    const csvContent = csvRows.map(row => row.map(String).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dashboard_${selectedCountry}_${selectedRegion}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-space relative">
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
          <Button variant="outline" className="flex items-center space-x-2" onClick={handleDownloadCSV} disabled={!selectedRegion || !currentData}>
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
                      {Object.entries(worldCountriesData).map(([key, country]) => (
                        <SelectItem key={key} value={key}>
                          {country.flag} {country.name}
                        </SelectItem>
                      ))}
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
                      <SelectValue placeholder={availableRegions.length > 0 ? "Choose your region" : "Select country first"} />
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
        {selectedRegion && currentData && (
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

            {/* Regional Map Visualization */}
            <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Regional Map</span>
                </CardTitle>
                <CardDescription>
                  Pollination zone visualization for selected region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InteractiveMap 
                  selectedLocation={mapLocation}
                  userLocation={userLocation}
                  onLocationChange={(location) => setMapLocation(location)}
                  height="450px"
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recommendations */}
        {selectedRegion && currentData && (
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

export default Dashboard;