import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cropSearchDatabase } from "@/data/countries";
import { getDashboardLocation } from "@/pages/Dashboard";
import { 
  Search as SearchIcon, 
  MapPin, 
  Calendar,
  Leaf,
  Download,
  Play,
  Clock,
  Globe
} from "lucide-react";

// Get comprehensive search results from database

function getZoneBadge(zone: string, percentage: number) {
  switch (zone) {
    case "healthy":
      return <Badge className="zone-healthy">✅ Healthy ({percentage}%)</Badge>;
    case "at-risk":
      return <Badge className="zone-at-risk">⚠️ At Risk ({percentage}%)</Badge>;
    case "critical":
      return <Badge className="zone-critical">❌ Critical ({percentage}%)</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
}

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any>(null);
  const [dashboardLocation, setDashboardLocation] = useState<{country: string, region: string} | null>(null);

  // Get dashboard location on component mount and updates
  useEffect(() => {
    const location = getDashboardLocation();
    setDashboardLocation(location);
    console.log("Search using dashboard location:", location);
  }, []);

  const handleSearch = () => {
    console.log("Search triggered with query:", searchQuery);
    const query = searchQuery.toLowerCase().trim();
    
    // Search in comprehensive database
    if (cropSearchDatabase[query as keyof typeof cropSearchDatabase]) {
      console.log("Found results for:", query);
      setSearchResults(cropSearchDatabase[query as keyof typeof cropSearchDatabase]);
    } else {
      // Try partial matching for user-friendly search
      const partialMatch = Object.keys(cropSearchDatabase).find(key => 
        key.includes(query) || query.includes(key)
      );
      
      if (partialMatch) {
        console.log("Found partial match:", partialMatch);
        setSearchResults(cropSearchDatabase[partialMatch as keyof typeof cropSearchDatabase]);
      } else {
        console.log("No results found for:", query);
        setSearchResults(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-space">
      <Navigation />
      
      <main className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold flex items-center justify-center space-x-2">
            <SearchIcon className="h-8 w-8 text-primary" />
            <span>Crop & Flower Search</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Search for specific crops or flowers to get location-based pollination data, 
            flowering times, and AI-powered recommendations.
          </p>
        </div>

        {/* Search Interface */}
        <Card className="bg-card/80 backdrop-blur-sm max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Search Database</CardTitle>
            <CardDescription>
              Search any crop or flower for detailed pollination analysis based on your selected location
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="e.g., Rice, Coffee, Sunflower, Wheat, Cotton, Apple..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={!searchQuery.trim()}>
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            
            {/* Dashboard Location Integration */}
            {dashboardLocation && (
              <div className="bg-primary/10 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  🎯 Search results automatically based on your selected location: 
                  <span className="font-medium ml-1 capitalize">
                    {dashboardLocation.region}, {dashboardLocation.country.replace('-', ' ')}
                  </span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults && (
          <div className="space-y-6">
            {/* Basic Information */}
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  <span>{searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)} Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Scientific Name</h4>
                    <p className="text-muted-foreground italic">{searchResults.scientificName}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Flowering Time</span>
                    </h4>
                    <p className="text-muted-foreground">{searchResults.floweringTime}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Required Pollinators</h4>
                  <div className="flex flex-wrap gap-2">
                    {searchResults.requiredPollinators.map((pollinator: string, index: number) => (
                      <Badge key={index} variant="outline">{pollinator}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Zone Classification Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Global Zone Data */}
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <span>Global Classification</span>
                  </CardTitle>
                  <CardDescription>
                    Worldwide pollination status for {searchQuery}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="text-3xl font-bold">{searchResults.globalZone.percentage}%</div>
                  {getZoneBadge(searchResults.globalZone.zone, searchResults.globalZone.percentage)}
                  <p className="text-sm text-muted-foreground">Global average pollinator activity</p>
                </CardContent>
              </Card>

              {/* Local Zone Data - Dashboard Integration */}
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Local Classification</span>
                  </CardTitle>
                  <CardDescription>
                    {dashboardLocation 
                      ? `Pollination status in ${dashboardLocation.region}, ${dashboardLocation.country.replace('-', ' ')}`
                      : "Regional breakdown by major locations"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {dashboardLocation && searchResults.zoneData[dashboardLocation.country] ? (
                    <div className="text-center space-y-4">
                      <div className="text-3xl font-bold">
                        {searchResults.zoneData[dashboardLocation.country].percentage}%
                      </div>
                      {getZoneBadge(
                        searchResults.zoneData[dashboardLocation.country].zone, 
                        searchResults.zoneData[dashboardLocation.country].percentage
                      )}
                      <p className="text-sm text-muted-foreground">
                        Local pollinator activity for {searchQuery} in your selected location
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3">
                      {Object.entries(searchResults.zoneData).slice(0, 4).map(([location, data]: [string, any]) => (
                        <div key={location} className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                          <h5 className="font-medium capitalize">{location.replace('-', ' ')}</h5>
                          {getZoneBadge(data.zone, data.percentage)}
                        </div>
                      ))}
                      {!dashboardLocation && (
                        <p className="text-xs text-muted-foreground text-center mt-2">
                          💡 Select a location in Dashboard for personalized results
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* AI Solution & Downloads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>AI-Powered Solutions</CardTitle>
                  <CardDescription>
                    Smart recommendations for optimal pollination
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="hero" className="w-full" disabled>
                    <Play className="h-4 w-4 mr-2" />
                    Watch Solution Video
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    AI analysis requires Supabase integration
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Data Export</CardTitle>
                  <CardDescription>
                    Download detailed pollination data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full" disabled>
                    <Download className="h-4 w-4 mr-2" />
                    Download CSV Data
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Full data access requires backend integration
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* No Results */}
        {searchQuery && !searchResults && searchQuery.trim() && (
          <Card className="bg-card/80 backdrop-blur-sm max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Results Found</h3>
              <p className="text-muted-foreground mb-4">
                Try searching for: rice, coffee, or sunflower
              </p>
              <p className="text-xs text-muted-foreground">
                Full NASA database search requires Supabase integration
              </p>
            </CardContent>
          </Card>
        )}

        {/* Quick Search Suggestions */}
        {!searchResults && (
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Popular Searches</CardTitle>
              <CardDescription>
                Try these commonly monitored crops and flowers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.keys(cropSearchDatabase).map((crop) => (
                  <Button
                    key={crop}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery(crop);
                      setSearchResults(cropSearchDatabase[crop as keyof typeof cropSearchDatabase]);
                    }}
                    className="justify-start"
                  >
                    <Leaf className="h-4 w-4 mr-2" />
                    {crop.charAt(0).toUpperCase() + crop.slice(1)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}