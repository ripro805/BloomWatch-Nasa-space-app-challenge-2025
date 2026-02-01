import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Satellite, Eye, EyeOff, Globe, Leaf } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    fullName: "",
    country: "",
    organization: "",
  });
  
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(loginData.email, loginData.password);
      toast({
        title: "Login successful!",
        description: "Welcome back to BloomWatch",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await register(signupData);
      toast({
        title: "Registration successful!",
        description: "Welcome to BloomWatch community",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-zone-healthy rounded-full animate-pulse opacity-50" />
        <div className="absolute bottom-20 right-40 w-2 h-2 bg-accent rounded-full animate-pulse opacity-30" />
        
        {/* Orbital Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/20 rounded-full animate-orbit" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-accent/20 rounded-full animate-orbit" style={{ animationDuration: "30s" }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 group mb-6">
            <div className="relative">
              <Satellite className="h-12 w-12 text-primary group-hover:animate-pulse-glow transition-all" />
              <div className="absolute inset-0 h-12 w-12 bg-primary/20 rounded-full blur-md group-hover:bg-primary/40 transition-all" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BloomWatch
            </span>
          </Link>
          
          <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-2">
            <Globe className="h-4 w-4" />
            <span className="text-sm">Earth Observation Platform</span>
            <Leaf className="h-4 w-4" />
          </div>
          
          <p className="text-sm text-muted-foreground">
            Monitor global pollination patterns with satellite precision
          </p>
        </div>

        {/* Login/Signup Card */}
        <Card className="bg-card/80 backdrop-blur-md border-border shadow-glow-primary/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Access your BloomWatch mission control
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="astronaut@bloomwatch.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      className="bg-input/50 border-border focus:border-primary transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                        className="bg-input/50 border-border focus:border-primary transition-colors pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                    variant="hero"
                  >
                    {isLoading ? "Accessing Mission Control..." : "Launch Mission"}
                  </Button>
                </form>
                
                <div className="text-center">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Forgot your access code?
                  </Link>
                </div>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4 mt-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Dr. Jane Smith"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                      className="bg-input/50 border-border focus:border-primary transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="jane.smith@research.org"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                      className="bg-input/50 border-border focus:border-primary transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-country">Country (Optional)</Label>
                    <Input
                      id="signup-country"
                      type="text"
                      placeholder="Your country"
                      value={signupData.country}
                      onChange={(e) => setSignupData({ ...signupData, country: e.target.value })}
                      className="bg-input/50 border-border focus:border-primary transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-organization">Organization (Optional)</Label>
                    <Input
                      id="signup-organization"
                      type="text"
                      placeholder="Your organization"
                      value={signupData.organization}
                      onChange={(e) => setSignupData({ ...signupData, organization: e.target.value })}
                      className="bg-input/50 border-border focus:border-primary transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showSignupPassword ? "text" : "password"}
                        placeholder="Create a secure password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                        className="bg-input/50 border-border focus:border-primary transition-colors pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                      >
                        {showSignupPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                    variant="hero"
                  >
                    {isLoading ? "Joining Mission..." : "Join the Mission"}
                  </Button>
                </form>
                
                <p className="text-xs text-muted-foreground text-center">
                  By signing up, you agree to contribute to global environmental monitoring
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Powered by NASA Earth Science Data • Contributing to SDG 15: Life on Land
          </p>
        </div>
      </div>
    </div>
  );
}