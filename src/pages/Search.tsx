import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search as SearchIcon, 
  MapPin, 
  Calendar,
  Leaf,
  Download,
  Play,
  Clock
} from "lucide-react";

// Mock search results
const mockSearchResults = {
  "rice": {
    scientificName: "Oryza sativa",
    floweringTime: "15-20 days before harvest",
    requiredPollinators: ["Wind (primary)", "Bees (supplementary)"],
    zoneData: {
      bangladesh: { zone: "healthy", percentage: 78 },
      india: { zone: "at-risk", percentage: 45 },
      thailand: { zone: "healthy", percentage: 82 }
    }
  },
  "coffee": {
    scientificName: "Coffea arabica",
    floweringTime: "After rainy season (March-May)",
    requiredPollinators: ["Honeybees", "Native bees", "Butterflies"],
    zoneData: {
      kenya: { zone: "at-risk", percentage: 45 },
      ethiopia: { zone: "critical", percentage: 28 },
      colombia: { zone: "healthy", percentage: 75 }
    }
  },
  "sunflower": {
    scientificName: "Helianthus annuus",
    floweringTime: "60-90 days after planting",
    requiredPollinators: ["Honeybees", "Bumblebees", "Solitary bees"],
    zoneData: {
      ukraine: { zone: "at-risk", percentage: 52 },
      argentina: { zone: "healthy", percentage: 88 },
      usa: { zone: "healthy", percentage: 71 }
    }
  }
};

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
  const [selectedLocation, setSelectedLocation] = useState("global");

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    if (mockSearchResults[query as keyof typeof mockSearchResults]) {
      setSearchResults(mockSearchResults[query as keyof typeof mockSearchResults]);
    } else {
      setSearchResults(null);
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
        <Card className="bg-card/80 backdrop-blur-sm max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Search Database</CardTitle>
            <CardDescription>
              Enter crop or flower name (try: rice, coffee, sunflower)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="e.g., Rice, Coffee, Sunflower..."
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

            {/* Global Zone Data */}
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Global Zone Classification</span>
                </CardTitle>
                <CardDescription>
                  Pollination status across different regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(searchResults.zoneData).map(([location, data]: [string, any]) => (
                    <div key={location} className="p-4 bg-surface/50 rounded-lg">
                      <h5 className="font-medium capitalize mb-2">{location}</h5>
                      {getZoneBadge(data.zone, data.percentage)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
                {["Rice", "Coffee", "Sunflower", "Mustard", "Maize", "Beans", "Tomato", "Apple"].map((crop) => (
                  <Button
                    key={crop}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery(crop.toLowerCase());
                      if (mockSearchResults[crop.toLowerCase() as keyof typeof mockSearchResults]) {
                        setSearchResults(mockSearchResults[crop.toLowerCase() as keyof typeof mockSearchResults]);
                      }
                    }}
                    className="justify-start"
                  >
                    <Leaf className="h-4 w-4 mr-2" />
                    {crop}
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