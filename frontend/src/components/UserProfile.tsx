import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, MapPin, Building2, Calendar, LogOut } from "lucide-react";

interface UserProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserProfile({ open, onOpenChange }: UserProfileProps) {
  const { user, logout } = useAuth();

  if (!user) return null;

  const getInitials = () => {
    if (user.fullName) {
      const names = user.fullName.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return user.fullName.substring(0, 2).toUpperCase();
    }
    return user.email.substring(0, 2).toUpperCase();
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">User Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Avatar and Name */}
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="h-20 w-20 border-4 border-primary shadow-lg">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-2xl font-bold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="font-bold text-xl">{user.fullName}</h3>
              <Badge variant="secondary" className="mt-1">
                {user.role}
              </Badge>
            </div>
          </div>

          {/* User Details */}
          <Card>
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">{user.email}</p>
                </div>
              </div>

              {user.country && (
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Country</p>
                    <p className="text-sm font-medium">{user.country}</p>
                  </div>
                </div>
              )}

              {user.organization && (
                <div className="flex items-start space-x-3">
                  <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Organization</p>
                    <p className="text-sm font-medium">{user.organization}</p>
                  </div>
                </div>
              )}

              {user.createdAt && (
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Member Since</p>
                    <p className="text-sm font-medium">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Logout Button */}
          <Button 
            variant="destructive" 
            onClick={logout} 
            className="w-full"
            size="lg"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
