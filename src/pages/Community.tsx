import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Camera,
  MapPin,
  Calendar,
  Upload,
  Download,
  User,
  Leaf,
  Image,
  FileText
} from "lucide-react";

// Mock community observations
const mockObservations = [
  {
    id: 1,
    contributor: "Dr. Sarah Rahman",
    location: "Dhaka, Bangladesh",
    coordinates: "23.8103°N, 90.4125°E",
    species: "Rice (Oryza sativa)",
    pollinators: "Honeybees, Wind",
    date: "2024-01-15",
    notes: "High bee activity observed during morning hours. Wind pollination dominant.",
    image: "rice-field.jpg"
  },
  {
    id: 2,
    contributor: "James Wanjiku",
    location: "Nairobi, Kenya", 
    coordinates: "1.2921°S, 36.8219°E",
    species: "Coffee (Coffea arabica)",
    pollinators: "Native bees, Butterflies",
    date: "2024-01-14",
    notes: "Decreased pollinator visits compared to last season. May need intervention.",
    image: "coffee-flowers.jpg"
  },
  {
    id: 3,
    contributor: "Maria Santos",
    location: "São Paulo, Brazil",
    coordinates: "23.5505°S, 46.6333°W", 
    species: "Sunflower (Helianthus annuus)",
    pollinators: "Honeybees, Bumblebees",
    date: "2024-01-13",
    notes: "Excellent pollination activity. Perfect weather conditions.",
    image: "sunflower-bees.jpg"
  }
];

export default function Community() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    species: "",
    location: "",
    coordinates: "",
    pollinators: "",
    notes: "",
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally submit to a backend
    alert("Thank you for your observation! (Backend integration required)");
    setShowForm(false);
    setFormData({
      species: "",
      location: "",
      coordinates: "",
      pollinators: "",
      notes: "",
      date: new Date().toISOString().split('T')[0]
    });
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude.toFixed(4);
        const lng = position.coords.longitude.toFixed(4);
        setFormData(prev => ({
          ...prev,
          coordinates: `${lat}°N, ${lng}°E`
        }));
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-space">
      <Navigation />
      
      <main className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <span>Community Observations</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Contribute to global pollination monitoring and view community data
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" disabled>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={() => setShowForm(!showForm)} variant="hero">
              <Camera className="h-4 w-4 mr-2" />
              Add Observation
            </Button>
          </div>
        </div>

        {/* Submission Form */}
        {showForm && (
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5 text-primary" />
                <span>Submit New Observation</span>
              </CardTitle>
              <CardDescription>
                Help scientists track pollination patterns worldwide
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="species">Plant Species</Label>
                    <Input
                      id="species"
                      placeholder="e.g., Rice (Oryza sativa)"
                      value={formData.species}
                      onChange={(e) => setFormData(prev => ({ ...prev, species: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pollinators">Observed Pollinators</Label>
                    <Input
                      id="pollinators"
                      placeholder="e.g., Honeybees, Butterflies, Wind"
                      value={formData.pollinators}
                      onChange={(e) => setFormData(prev => ({ ...prev, pollinators: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location Name</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Dhaka, Bangladesh"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="coordinates">Coordinates</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="coordinates"
                        placeholder="e.g., 23.8103°N, 90.4125°E"
                        value={formData.coordinates}
                        onChange={(e) => setFormData(prev => ({ ...prev, coordinates: e.target.value }))}
                        required
                      />
                      <Button type="button" variant="outline" size="sm" onClick={useCurrentLocation}>
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Observation Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Describe pollinator behavior, weather conditions, or any other relevant observations..."
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">Photo Evidence</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Photo upload requires backend integration
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" variant="hero" className="flex-1">
                    Submit Observation
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Community Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Community Observations</h2>
            <Badge variant="outline">{mockObservations.length} observations</Badge>
          </div>

          {mockObservations.map((observation) => (
            <Card key={observation.id} className="bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{observation.contributor}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{observation.location}</span>
                        <span>•</span>
                        <Calendar className="h-3 w-3" />
                        <span>{observation.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" disabled>
                    <Image className="h-4 w-4 mr-2" />
                    View Photo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h5 className="font-medium text-sm mb-1 flex items-center space-x-1">
                      <Leaf className="h-4 w-4" />
                      <span>Species</span>
                    </h5>
                    <p className="text-sm text-muted-foreground">{observation.species}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm mb-1">Pollinators</h5>
                    <p className="text-sm text-muted-foreground">{observation.pollinators}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="font-medium text-sm mb-1">Coordinates</h5>
                  <p className="text-sm text-muted-foreground font-mono">{observation.coordinates}</p>
                </div>

                <div>
                  <h5 className="font-medium text-sm mb-1 flex items-center space-x-1">
                    <FileText className="h-4 w-4" />
                    <span>Observation Notes</span>
                  </h5>
                  <p className="text-sm text-muted-foreground">{observation.notes}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Notice */}
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              🌍 Join our global community of scientists, researchers, and nature enthusiasts monitoring Earth's pollination patterns.
              Full functionality requires Supabase integration for data storage and user management.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}