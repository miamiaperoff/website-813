import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ActivityLogService } from '@/services/activityLog';
import { dailyVoucherReset } from '@/services/dailyVoucherReset';
import { 
  Clock, 
  Users, 
  Wifi, 
  Coffee, 
  Shield, 
  Calendar,
  Star,
  LogOut,
  CheckCircle,
  Copy,
  Activity,
  TrendingUp,
  BarChart3
} from 'lucide-react';

const Membership: React.FC = () => {
  const { user, logout } = useAuth();
  const [drinksUsedToday, setDrinksUsedToday] = useState(0);
  const [showVoucher, setShowVoucher] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherStatus, setVoucherStatus] = useState('active'); // 'active', 'redeemed', 'expired'
  const [voucherData, setVoucherData] = useState(null);
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [showRedeemConfirm, setShowRedeemConfirm] = useState(false);

  const membershipBenefits = [
    { icon: Clock, text: "24/7 coworking access" },
    { icon: Users, text: "Reserved desk during Members-Only Hours" },
    { icon: Coffee, text: "1 free drink per day (up to ₱150)" },
    { icon: Wifi, text: "Fast WiFi & power at every desk" },
    { icon: Calendar, text: "Bi-weekly member events" },
    { icon: Shield, text: "Safe and secure access" },
  ];

  const getPlanDetails = (tier: string) => {
    switch (tier) {
      case 'Flex':
        return { price: '₱5,000', billing: 'Month-to-Month', guestPasses: 0, meetingHours: 0 };
      case 'Save':
        return { price: '₱4,500', billing: '3 Months', guestPasses: 0, meetingHours: 0 };
      case 'Growth':
        return { price: '₱4,000', billing: '6 Months', guestPasses: 1, meetingHours: 0 };
      case 'Resident':
        return { price: '₱3,500', billing: '12 Months', guestPasses: 2, meetingHours: 1 };
      default:
        return { price: '₱4,000', billing: '6 Months', guestPasses: 1, meetingHours: 0 };
    }
  };

  const planDetails = getPlanDetails(user?.memberTier || 'Growth');

  const getTodaysVoucher = () => {
    const today = new Date().toISOString().split('T')[0];
    const existingVouchers = JSON.parse(localStorage.getItem('813_vouchers') || '[]');
    
    // Find voucher for today
    const todaysVoucher = existingVouchers.find(voucher => {
      const voucherDate = new Date(voucher.generatedAt).toISOString().split('T')[0];
      return voucherDate === today && voucher.memberId === user?.id;
    });
    
    return todaysVoucher;
  };

  const generateVoucherCode = () => {
    // Generate 6-digit code: 3 letters + 3 numbers
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    
    let code = '';
    // Add 3 random letters
    for (let i = 0; i < 3; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    // Add 3 random numbers
    for (let i = 0; i < 3; i++) {
      code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    
    return code;
  };

  const redeemDailyDrink = () => {
    // Check if there's already a voucher for today
    const existingVoucher = getTodaysVoucher();
    
    if (existingVoucher) {
      // Show existing voucher
      setVoucherCode(existingVoucher.code);
      setVoucherStatus(existingVoucher.redeemed ? 'redeemed' : 'active');
      setVoucherData(existingVoucher);
      setShowVoucher(true);
      setDrinksUsedToday(1);
      return;
    }
    
    // Generate new voucher
    const code = generateVoucherCode();
    const newVoucherData = {
      code: code,
      memberId: user?.id || 'unknown',
      memberName: user?.name || 'Unknown Member',
      memberTier: user?.memberTier || 'Growth',
      generatedAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
      redeemed: false,
      redeemedAt: null,
      discountAmount: 150, // ₱150 max value
      type: 'daily_drink'
    };
    
    // Store voucher in localStorage (in a real app, this would go to a database)
    const existingVouchers = JSON.parse(localStorage.getItem('813_vouchers') || '[]');
    existingVouchers.push(newVoucherData);
    localStorage.setItem('813_vouchers', JSON.stringify(existingVouchers));
    
    // Also store in a separate admin-accessible location for POS validation
    const posVouchers = JSON.parse(localStorage.getItem('813_pos_vouchers') || '[]');
    posVouchers.push({
      ...newVoucherData,
      status: 'active'
    });
    localStorage.setItem('813_pos_vouchers', JSON.stringify(posVouchers));
    
    setVoucherCode(code);
    setVoucherStatus('active');
    setVoucherData(newVoucherData);
    setShowVoucher(true);
    setDrinksUsedToday(1);
    
    // Log voucher redemption
    ActivityLogService.logVoucherRedemption(user?.id || '', user?.name || '', code);
  };

  const copyVoucherCode = () => {
    navigator.clipboard.writeText(voucherCode);
    // You could add a toast notification here
  };

  const redeemVoucherForBarista = () => {
    setShowRedeemConfirm(true);
  };

  const confirmRedeemVoucher = () => {
    if (!voucherData) return;

    // Update voucher status in localStorage
    const existingVouchers = JSON.parse(localStorage.getItem('813_vouchers') || '[]');
    const updatedVouchers = existingVouchers.map((v: any) => 
      v.code === voucherData.code 
        ? { 
            ...v, 
            redeemed: true, 
            redeemedAt: new Date().toISOString()
          }
        : v
    );
    localStorage.setItem('813_vouchers', JSON.stringify(updatedVouchers));

    // Update POS vouchers
    const posVouchers = JSON.parse(localStorage.getItem('813_pos_vouchers') || '[]');
    const updatedPosVouchers = posVouchers.map((v: any) => 
      v.code === voucherData.code 
        ? { 
            ...v, 
            redeemed: true, 
            redeemedAt: new Date().toISOString(),
            status: 'redeemed'
          }
        : v
    );
    localStorage.setItem('813_pos_vouchers', JSON.stringify(updatedPosVouchers));

    // Add to recent redemptions
    const recentRedemptions = JSON.parse(localStorage.getItem('813_recent_redemptions') || '[]');
    recentRedemptions.unshift({
      ...voucherData,
      redeemed: true,
      redeemedAt: new Date().toISOString(),
      status: 'redeemed'
    });
    localStorage.setItem('813_recent_redemptions', JSON.stringify(recentRedemptions.slice(0, 50)));

    // Update local state
    setVoucherStatus('redeemed');
    setVoucherData({
      ...voucherData,
      redeemed: true,
      redeemedAt: new Date().toISOString()
    });

    // Log the redemption
    ActivityLogService.logVoucherRedemption(user?.id || '', user?.name || '', voucherData.code);

    // Close confirmation dialog
    setShowRedeemConfirm(false);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold text-primary mb-4">
          Welcome back, {user?.name || 'Member'}!
        </h1>
        <p className="text-xl text-muted-foreground">
          Here's your 813 Club Membership overview
        </p>
      </div>

      {/* Member Status Card */}
      <Card className="shadow-warm">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-serif">Your 813 Club Membership</CardTitle>
              <CardDescription>Your current membership and benefits</CardDescription>
            </div>
            <Badge className="bg-primary text-primary-foreground">
              {user?.memberTier || 'Growth'} Plan
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Benefits Section */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Your Benefits</h3>
              <div className="space-y-3">
                {membershipBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Plan Details */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Plan Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Plan:</span>
                  <span className="font-medium text-foreground">{user?.memberTier || 'Growth'} Plan</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Price:</span>
                  <span className="font-medium text-foreground">{planDetails.price}/month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Billing:</span>
                  <span className="font-medium text-foreground">{planDetails.billing}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Drinks Used Today:</span>
                  <span className="font-medium text-foreground">{drinksUsedToday}/1</span>
                </div>
                {planDetails.guestPasses > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Guest Passes This Week:</span>
                    <span className="font-medium text-foreground">0/{planDetails.guestPasses}</span>
                  </div>
                )}
                {planDetails.meetingHours > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Meeting Room Hours This Month:</span>
                    <span className="font-medium text-foreground">0/{planDetails.meetingHours}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members-Only Hours Notice */}
      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">
                <strong>Members-Only Hours:</strong> 8PM-11AM (except Fridays). Reserved desks are guaranteed during these hours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="hover:shadow-accent transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6 text-center">
            <Wifi className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-medium text-foreground mb-2">WiFi Access</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Network: 813-cafe | Password: olivegreen
            </p>
            <Button size="sm" variant="outline" className="w-full" disabled>
              Connected
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-accent transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6 text-center">
            <Coffee className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-medium text-foreground mb-2">Daily Drink</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {getTodaysVoucher() ? 'View your daily drink voucher' : 'Redeem your free daily drink'}
            </p>
            <Button 
              size="sm" 
              variant={getTodaysVoucher() ? "outline" : "default"}
              className="w-full" 
              onClick={redeemDailyDrink}
            >
              {getTodaysVoucher() ? 'View Voucher' : 'Redeem'}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-accent transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-medium text-foreground mb-2">Member Events</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Join bi-weekly member gatherings
            </p>
            <Button size="sm" variant="outline" className="w-full" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-accent transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6 text-center">
            <Activity className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-medium text-foreground mb-2">Activity Log</h3>
            <p className="text-sm text-muted-foreground mb-4">
              View your recent activities and stats
            </p>
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full"
              onClick={() => setShowActivityLog(true)}
            >
              View Log
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Contact Support */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-serif font-semibold mb-4">Need Help?</h3>
          <p className="text-primary-foreground/90 mb-6">
            Contact Ana Calubiran, Coworking Space Manager, for any questions about your membership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary"
              size="lg"
              onClick={() => window.open('tel:+639709617206', '_self')}
              className="bg-white text-primary hover:bg-white/90"
            >
              Call Ana: (+63) 9709617206
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => window.open('mailto:hey@813cafe.com', '_self')}
              className="border-white text-white hover:bg-white/10"
            >
              Email: hey@813cafe.com
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Voucher Dialog */}
      <Dialog open={showVoucher} onOpenChange={setShowVoucher}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-serif text-primary">
              {voucherStatus === 'redeemed' ? '✅ Voucher Used' : '🎉 Daily Drink Voucher'}
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              {voucherStatus === 'redeemed' 
                ? 'This voucher has already been used at the café'
                : 'Show this voucher to redeem your free daily drink (up to ₱150 value)'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Member Information */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Member Name</p>
                  <p className="font-semibold text-foreground">{voucherData?.memberName || user?.name || 'Unknown Member'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Number</p>
                  <p className="font-semibold text-foreground">{voucherData?.memberId || user?.qrCode || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Voucher Code Display */}
            <div className={`p-6 rounded-lg border-2 border-dashed ${
              voucherStatus === 'redeemed' 
                ? 'bg-gray-100 border-gray-300' 
                : 'bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30'
            }`}>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Your Voucher Code:</p>
                <div className="flex items-center justify-center space-x-2">
                  <code className={`text-2xl font-mono font-bold px-4 py-2 rounded border ${
                    voucherStatus === 'redeemed'
                      ? 'text-gray-500 bg-gray-200 border-gray-300'
                      : 'text-primary bg-white border-primary/30'
                  }`}>
                    {voucherCode}
                  </code>
                  {voucherStatus !== 'redeemed' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyVoucherCode}
                      className="h-10"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                {voucherStatus === 'redeemed' && (
                  <p className="text-sm text-gray-500 mt-2 font-medium">
                    Already Used
                  </p>
                )}
              </div>
            </div>

            {/* Instructions */}
            {voucherStatus !== 'redeemed' && (
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Present this code to the barista to redeem your free drink
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Valid for any drink up to ₱150 value
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Valid for today only - {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            {/* Daily Reset Information */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Daily Reset</span>
              </div>
              <p className="text-sm text-blue-700">
                New daily drink vouchers are automatically generated at 12:00 AM each day. 
                You can redeem one voucher per day.
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Next reset: {dailyVoucherReset.getNextResetTime().toLocaleString()}
              </p>
            </div>

            {/* Redeemed Message */}
            {voucherStatus === 'redeemed' && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Voucher Redeemed</p>
                    <p className="text-sm text-gray-500">
                      This voucher was used at the café and is no longer valid.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Barista Notice */}
            {voucherStatus !== 'redeemed' && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">For Barista</span>
                </div>
                <p className="text-sm text-green-700">
                  Click "REDEEM" to mark this voucher as used. The voucher cannot be used again after redemption.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button 
                onClick={() => setShowVoucher(false)} 
                variant="outline" 
                className="flex-1"
              >
                Close
              </Button>
              {voucherStatus !== 'redeemed' && (
                <>
                  <Button 
                    onClick={() => {
                      copyVoucherCode();
                      setShowVoucher(false);
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy & Close
                  </Button>
                  <Button 
                    onClick={redeemVoucherForBarista}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    REDEEM
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Activity Log Dialog */}
      <Dialog open={showActivityLog} onOpenChange={setShowActivityLog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-serif text-primary">
              📊 Your Activity Log & Stats
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Track your membership activities and usage statistics
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(() => {
                const userLogs = ActivityLogService.getActivityLogsByUser(user?.id || '');
                const totalActivities = userLogs.length;
                const voucherRedemptions = userLogs.filter(log => log.category === 'voucher').length;
                const loginCount = userLogs.filter(log => log.category === 'login').length;
                
                return (
                  <>
                    <Card className="p-4 text-center">
                      <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h3 className="text-2xl font-bold text-primary">{totalActivities}</h3>
                      <p className="text-sm text-muted-foreground">Total Activities</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <Coffee className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h3 className="text-2xl font-bold text-primary">{voucherRedemptions}</h3>
                      <p className="text-sm text-muted-foreground">Drinks Redeemed</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <Activity className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h3 className="text-2xl font-bold text-primary">{loginCount}</h3>
                      <p className="text-sm text-muted-foreground">Portal Logins</p>
                    </Card>
                  </>
                );
              })()}
            </div>

            {/* Recent Activities */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Recent Activities
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {ActivityLogService.getActivityLogsByUser(user?.id || '').slice(0, 10).map((log) => (
                  <Card key={log.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          log.category === 'login' ? 'bg-blue-500' :
                          log.category === 'voucher' ? 'bg-green-500' :
                          log.category === 'checkin' ? 'bg-purple-500' :
                          'bg-gray-500'
                        }`} />
                        <div>
                          <p className="font-medium text-foreground">{log.activity}</p>
                          <p className="text-sm text-muted-foreground">{log.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {new Date(log.timestamp).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end">
              <Button 
                onClick={() => setShowActivityLog(false)} 
                variant="outline"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Redeem Confirmation Dialog */}
      <Dialog open={showRedeemConfirm} onOpenChange={setShowRedeemConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Confirm Voucher Redemption</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to redeem this voucher? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Member</p>
                  <p className="font-semibold">{voucherData?.memberName || user?.name || 'Unknown Member'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Voucher Code</p>
                  <p className="font-mono font-semibold">{voucherCode}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={() => setShowRedeemConfirm(false)} 
                variant="outline" 
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmRedeemVoucher}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Redemption
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Membership;
