import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity,
  MapPin,
  Calendar,
  Users,
  Satellite,
  Leaf,
  Camera,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for recent observations
const recentObservations = [
  {
    id: 1,
    location: "Bangladesh, Dhaka Division",
    crop: "Rice (Oryza sativa)",
    pollinatorCount: 85,
    zone: "healthy",
    trend: "up",
    timeAgo: "2 hours ago",
    contributor: "Dr. Rahman"
  },
  {
    id: 2,
    location: "Kenya, Central Province",
    crop: "Coffee (Coffea arabica)",
    pollinatorCount: 45,
    zone: "at-risk",
    trend: "down",
    timeAgo: "4 hours ago",
    contributor: "Sarah M."
  },
  {
    id: 3,
    location: "Brazil, São Paulo",
    crop: "Sunflower (Helianthus annuus)",
    pollinatorCount: 92,
    zone: "healthy",
    trend: "up",
    timeAgo: "6 hours ago",
    contributor: "Carlos Silva"
  },
  {
    id: 4,
    location: "India, Punjab",
    crop: "Mustard (Brassica juncea)",
    pollinatorCount: 28,
    zone: "critical",
    trend: "down",
    timeAgo: "8 hours ago",
    contributor: "Prof. Sharma"
  }
];

const globalStats = [
  { label: "Active Monitoring Zones", value: "2,847", icon: MapPin, trend: "+12%" },
  { label: "Community Contributors", value: "15,432", icon: Users, trend: "+8%" },
  { label: "Observations Today", value: "1,256", icon: Camera, trend: "+23%" },
  { label: "Satellite Updates", value: "4", icon: Satellite, trend: "24h" }
];

function getZoneBadge(zone: string) {
  switch (zone) {
    case "healthy":
      return <Badge className="zone-healthy">✅ Healthy Zone</Badge>;
    case "at-risk":
      return <Badge className="zone-at-risk">⚠️ At Risk</Badge>;
    case "critical":
      return <Badge className="zone-critical">❌ Critical</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
}

export function HomePage() {
  return (
    <div className="space-y-8 p-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-earth p-8 text-center">
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-8 w-8 text-zone-healthy mr-2 animate-float" />
            <span className="text-3xl font-bold">Global Pollination Monitor</span>
            <Satellite className="h-8 w-8 text-accent ml-2 animate-orbit" />
          </div>
          <p className="text-lg text-foreground/90 mb-6 max-w-2xl mx-auto">
            Real-time monitoring of pollination patterns worldwide using NASA Earth Science data 
            and community observations to protect our planet's biodiversity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button variant="hero" size="lg" className="group">
                Explore Dashboard
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/community">
              <Button variant="outline" size="lg">
                <Camera className="mr-2 h-4 w-4" />
                Submit Observation
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-4 w-16 h-16 border border-foreground/30 rounded-full animate-orbit" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border border-foreground/20 rounded-full animate-orbit" style={{ animationDuration: "15s" }} />
        </div>
      </div>

      {/* Global Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {globalStats.map((stat, index) => (
          <Card key={index} className="bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all hover:shadow-glow-primary/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-400">{stat.trend}</p>
                </div>
                <stat.icon className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Observations */}
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>Recent Global Observations</span>
              </CardTitle>
              <CardDescription>
                Latest pollination monitoring data from our global network
              </CardDescription>
            </div>
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentObservations.map((observation) => (
              <div key={observation.id} className="flex items-center justify-between p-4 rounded-lg bg-surface/50 hover:bg-surface/80 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{observation.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{observation.crop}</p>
                  <div className="flex items-center space-x-3">
                    {getZoneBadge(observation.zone)}
                    <span className="text-sm text-muted-foreground">
                      {observation.pollinatorCount}% pollinator activity
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    {observation.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                    <span className="text-sm text-muted-foreground">{observation.timeAgo}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">by {observation.contributor}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Join the Global Monitoring Network</h3>
          <p className="text-muted-foreground mb-4">
            Help scientists track pollination patterns and protect biodiversity worldwide. 
            Your observations make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/community">
              <Button variant="default">
                <Camera className="mr-2 h-4 w-4" />
                Submit Observation
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Join Community
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}