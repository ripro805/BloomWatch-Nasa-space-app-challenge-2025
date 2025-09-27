import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Download,
  Globe,
  BarChart3,
  Satellite
} from "lucide-react";

// Mock data for location analysis
const mockLocationData = {
  "bangladesh": {
    "dhaka": {
      pollinatorPercentage: 78,
      zone: "healthy",
      trend: "up",
      recommendations: [
        "Rice (Oryza sativa) - Peak flowering in 15 days",
        "Jute (Corchorus capsularis) - Optimal pollination period",
        "Mustard (Brassica rapa) - Good bee activity expected"
      ]
    }
  },
  "kenya": {
    "central": {
      pollinatorPercentage: 45,
      zone: "at-risk",
      trend: "down",
      recommendations: [
        "Coffee (Coffea arabica) - Consider bee box placement",
        "Maize (Zea mays) - Monitor wind pollination",
        "Bean (Phaseolus vulgaris) - Enhance native pollinator habitat"
      ]
    }
  }
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
  const [selectedCountry, setSelectedCountry] = useState("bangladesh");
  const [selectedRegion, setSelectedRegion] = useState("dhaka");
  
  const currentData = mockLocationData[selectedCountry as keyof typeof mockLocationData]?.[selectedRegion as keyof any];

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bangladesh">🇧🇩 Bangladesh</SelectItem>
                    <SelectItem value="kenya">🇰🇪 Kenya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCountry === "bangladesh" && (
                      <SelectItem value="dhaka">Dhaka Division</SelectItem>
                    )}
                    {selectedCountry === "kenya" && (
                      <SelectItem value="central">Central Province</SelectItem>
                    )}
                  </SelectContent>
                </Select>
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

            {/* Map Placeholder */}
            <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Regional Map</span>
                </CardTitle>
                <CardDescription>
                  Interactive pollination zone visualization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-b from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Satellite className="h-12 w-12 text-primary mx-auto animate-orbit" />
                    <p className="text-muted-foreground">Interactive map with NASA data</p>
                    <p className="text-sm text-muted-foreground">Requires Supabase integration for full functionality</p>
                  </div>
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