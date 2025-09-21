import React from 'react';
import MemberLayout from '@/components/member/MemberLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Calendar, Clock, Star, CreditCard, CheckCircle, XCircle, Crown, Coffee } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'vip': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'premium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'basic': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'vip': return <Crown className="w-5 h-5" />;
      case 'premium': return <Star className="w-5 h-5" />;
      case 'basic': return <Coffee className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  const getTierBenefits = (tier: string) => {
    switch (tier) {
      case 'vip':
        return [
          { name: '24/7 Access', description: 'Unlimited access to the space' },
          { name: 'Private Workspace', description: 'Dedicated desk and storage' },
          { name: 'Meeting Rooms', description: 'Free access to all meeting rooms' },
          { name: 'Priority Support', description: '24/7 dedicated support line' },
          { name: 'Free Coffee & Snacks', description: 'Unlimited premium beverages' },
          { name: 'Guest Passes', description: '2 free guest passes per month' }
        ];
      case 'premium':
        return [
          { name: '24/7 Access', description: 'Unlimited access to the space' },
          { name: 'Reserved Seating', description: 'Priority desk reservation' },
          { name: 'Meeting Rooms', description: 'Free access to meeting rooms' },
          { name: 'Priority Support', description: 'Extended support hours' },
          { name: 'Free Coffee', description: 'Unlimited coffee and tea' }
        ];
      case 'basic':
        return [
          { name: 'WiFi Access', description: 'High-speed internet connection' },
          { name: 'Community Events', description: 'Access to member events' },
          { name: 'Basic Support', description: 'Standard support during business hours' },
          { name: 'Flexible Seating', description: 'Access to open seating areas' }
        ];
      default:
        return [];
    }
  };

  // Mock payment status - in real app this would come from user data
  const isPaidThisMonth = true; // user?.paymentStatus === 'paid'
  const nextPaymentDate = '2024-02-15'; // user?.nextPaymentDate
  const membershipFee = user?.memberTier === 'vip' ? '$199' : user?.memberTier === 'premium' ? '$99' : '$49';

  return (
    <MemberLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">
            Your Membership
          </h1>
          <p className="text-muted-foreground">
            Manage your 813 Cafe membership and view your benefits
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Membership Status */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getTierIcon(user?.memberTier || 'basic')}
                    <div>
                      <CardTitle className="text-xl">
                        {user?.memberTier?.toUpperCase()} Membership
                      </CardTitle>
                      <CardDescription>
                        Your current membership tier and status
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={`${getTierColor(user?.memberTier || 'basic')} text-lg px-4 py-2`}>
                    {user?.memberTier?.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Status */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {isPaidThisMonth ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <div>
                      <p className="font-medium text-foreground">
                        {isPaidThisMonth ? 'Payment Current' : 'Payment Due'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isPaidThisMonth 
                          ? `Next payment due: ${new Date(nextPaymentDate).toLocaleDateString()}`
                          : 'Payment is overdue'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">{membershipFee}/month</p>
                    {!isPaidThisMonth && (
                      <Button size="sm" className="mt-2">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>

                {/* Member Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-foreground">Member Name</label>
                      <p className="text-sm text-muted-foreground mt-1">{user?.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-foreground">Member Since</label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Last Visit</label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {user?.lastVisit ? new Date(user.lastVisit).toLocaleDateString() : 'Never'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Membership Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-primary" />
                  <span>Your Benefits</span>
                </CardTitle>
                <CardDescription>
                  All the perks included with your {user?.memberTier} membership
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {getTierBenefits(user?.memberTier || 'basic').map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">{benefit.name}</p>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Usage Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Usage Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {user?.totalHours || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Hours</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-lg font-semibold text-foreground mb-1">
                    {user?.lastVisit ? new Date(user.lastVisit).toLocaleDateString() : 'Never'}
                  </div>
                  <p className="text-sm text-muted-foreground">Last Visit</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Update Payment Method
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Workspace
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default Profile;
