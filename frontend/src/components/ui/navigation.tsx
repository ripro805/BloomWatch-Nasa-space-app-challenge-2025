import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import UserProfile from "@/components/UserProfile";
import { 
  Home, 
  BarChart3, 
  Search, 
  Users, 
  LogIn,
  Satellite,
  Menu,
  X
} from "lucide-react";

const navigationItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
  { name: "Search", path: "/search", icon: Search },
  { name: "Community", path: "/community", icon: Users },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const getInitials = () => {
    if (!user) return "U";
    if (user.fullName) {
      const names = user.fullName.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return user.fullName.substring(0, 2).toUpperCase();
    }
    return user.email.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <UserProfile open={profileOpen} onOpenChange={setProfileOpen} />
      {/* Main Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Satellite className="h-8 w-8 text-primary group-hover:animate-pulse-glow transition-all" />
              <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-md group-hover:bg-primary/40 transition-all" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BloomWatch
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "flex items-center space-x-2 transition-all",
                      isActive && "bg-primary/20 text-primary shadow-glow-primary"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Auth & Mobile Menu */}
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <button
                className="hidden md:flex items-center space-x-2 rounded-full hover:opacity-80 transition-opacity"
                onClick={() => setProfileOpen(true)}
                title="View Profile"
              >
                <Avatar className="h-9 w-9 border-2 border-primary shadow-md cursor-pointer">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold text-sm">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden lg:block">{user?.fullName || user?.email}</span>
              </button>
            ) : (
              <Link to="/login" className="hidden md:block">
                <Button variant="outline" size="sm" className="border-primary/30 hover:border-primary">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-md border-t border-border">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start space-x-2",
                        isActive && "bg-primary/20 text-primary"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-border">
                {isAuthenticated ? (
                  <button
                    className="w-full flex items-center space-x-2 p-3 rounded-md hover:bg-accent transition-colors"
                    onClick={() => {
                      setIsOpen(false);
                      setProfileOpen(true);
                    }}
                  >
                    <Avatar className="h-8 w-8 border-2 border-primary">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold text-xs">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user?.fullName || user?.email}</span>
                  </button>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start space-x-2 border-primary/30">
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
}