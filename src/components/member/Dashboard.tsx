import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Coffee, 
  Clock, 
  Wifi, 
  Users, 
  Calendar,
  TrendingUp,
  Star,
  MapPin,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

const getTierInfo = (tier: string) => {
  switch (tier) {
    case 'flex':
      return {
        name: 'Flex Plan',
        price: '₱5,000/month',
        billing: 'Month-to-Month',
        benefits: ['24/7 coworking access', 'Reserved desk during Members-Only Hours', 'Fast WiFi & power', '1 free drink per day (up to ₱150)', 'Safe and secure access']
      };
    case 'save':
      return {
        name: 'Save Plan', 
        price: '₱4,500/month',
        billing: '3 Months',
        benefits: ['24/7 coworking access', 'Reserved desk during Members-Only Hours', 'Fast WiFi & power', '1 free drink per day (up to ₱150)', 'Safe and secure access']
      };
    case 'growth':
      return {
        name: 'Growth Plan',
        price: '₱4,000/month', 
        billing: '6 Months',
        benefits: ['24/7 coworking access', 'Reserved desk during Members-Only Hours', '1 guest day pass/week', 'Fast WiFi & power', '1 free drink per day (up to ₱150)', 'Safe and secure access']
      };
    case 'resident':
      return {
        name: 'Resident Plan',
        price: '₱3,500/month',
        billing: '12 Months', 
        benefits: ['24/7 coworking access', 'Reserved desk during Members-Only Hours', '2 guest passes/week', '1 meeting room hour/month', 'Fast WiFi & power', '1 free drink per day (up to ₱150)', 'Safe and secure access']
      };
    default:
      return {
        name: 'Unknown Plan',
        price: 'N/A',
        billing: 'N/A',
        benefits: []
      };
  }
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const tierInfo = getTierInfo(user?.memberTier || 'flex');

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'premium': return 'bg-blue-100 text-blue-800';
      case 'basic': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierBenefits = (tier: string) => {
    switch (tier) {
      case 'vip':
        return [
          '24/7 Access',
          'Private Workspace',
          'Meeting Rooms',
          'Priority Support',
          'Free Coffee'
        ];
      case 'premium':
        return [
          '24/7 Access',
          'Reserved Seating',
          'Meeting Rooms',
          'Priority Support'
        ];
      case 'basic':
        return [
          'WiFi Access',
          'Community Events',
          'Basic Support'
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl font-serif font-bold text-primary mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening at 813 Cafe
        </p>
      </div>

      {/* Member Status - Updated with flyer info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Coffee className="w-5 h-5 text-primary" />
                <span>Member Status</span>
              </CardTitle>
              <CardDescription>
                Your current membership and benefits
              </CardDescription>
            </div>
            <Badge className="bg-warm-accent text-warm-accent-foreground">
              {tierInfo.name}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Your Benefits</h4>
              <ul className="space-y-2">
                {tierInfo.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <Star className="w-4 h-4 text-warm-accent" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Plan Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan:</span>
                  <span className="font-medium">{tierInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-medium">{tierInfo.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Billing:</span>
                  <span className="font-medium">{tierInfo.billing}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Drinks Used Today:</span>
                  <span className="font-medium">{user?.drinkCreditsUsed || 0}/1</span>
                </div>
                {(user?.memberTier === 'growth' || user?.memberTier === 'resident') && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Guest Passes This Week:</span>
                    <span className="font-medium">
                      {user?.guestPassesUsed || 0}/{user?.memberTier === 'resident' ? '2' : '1'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members-Only Hours Notice */}
      <Alert>
        <Clock className="h-4 w-4" />
        <AlertDescription>
          <strong>Members-Only Hours:</strong> 8PM-11AM (except Fridays). Reserved desks are guaranteed during these hours.
        </AlertDescription>
      </Alert>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-accent transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6 text-center">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-medium text-foreground mb-2">Book Seat</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Choose your perfect workspace spot
            </p>
            <Button asChild size="sm" className="w-full">
              <Link to="/member/seat-booking">Select Seat</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-accent transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-medium text-foreground mb-2">Book Workspace</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Reserve your spot for productive work
            </p>
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link to="/member-portal/booking">Book Now</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-accent transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6 text-center">
            <Wifi className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-medium text-foreground mb-2">WiFi Access</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get your network credentials
            </p>
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link to="/member-portal/services">View Details</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-accent transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-medium text-foreground mb-2">Community</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect with other members
            </p>
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link to="/member-portal/community">Join Events</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-accent transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-medium text-foreground mb-2">Usage Stats</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Track your productivity
            </p>
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link to="/member-portal/profile">View Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>Recent Activity</span>
          </CardTitle>
          <CardDescription>
            Your latest coworking sessions and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-warm-accent rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Welcome to 813 Cafe!</p>
                <p className="text-xs text-muted-foreground">
                  You've joined our coworking community
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'Today'}
              </span>
            </div>
            
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No recent activity</p>
              <p className="text-sm">Start booking workspaces to see your activity here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

