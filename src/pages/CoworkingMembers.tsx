import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { dataService } from '@/lib/dataService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Coffee, 
  Calendar,
  CreditCard,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const CoworkingMembers: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null);
  const [canRedeem, setCanRedeem] = useState(false);
  const [redemptionStats, setRedemptionStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [voucherCode, setVoucherCode] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      const [info, redeemStatus, stats] = await Promise.all([
        dataService.getMemberSubscriptionInfo(user.id),
        dataService.canRedeemVoucherToday(user.id),
        dataService.getMemberRedemptionStats(user.id)
      ]);

      setSubscriptionInfo(info);
      setCanRedeem(redeemStatus);
      setRedemptionStats(stats);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load subscription information',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedeemVoucher = async () => {
    if (!user?.id || !canRedeem) return;

    setIsRedeeming(true);
    try {
      const redemption = await dataService.redeemDailyVoucher(user.id, 150, 'member');
      setVoucherCode(redemption.voucherId);
      setCanRedeem(false);
      await loadData(); // Refresh stats
      
      toast({
        title: 'Voucher Redeemed',
        description: 'Your daily voucher has been redeemed successfully!',
      });
    } catch (error) {
      console.error('Error redeeming voucher:', error);
      toast({
        title: 'Error',
        description: 'Failed to redeem voucher. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsRedeeming(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDailyBalance = () => {
    return canRedeem ? 150 : 0;
  };

  const getNextResetTime = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-serif font-bold text-primary">
                Club 813 Members
              </h1>
              <p className="text-sm text-muted-foreground">Welcome, {user?.name}</p>
            </div>
            <Button onClick={handleLogout} variant="ghost" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Subscription Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-primary" />
              <span>Subscription</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {subscriptionInfo?.member && subscriptionInfo?.plan ? (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Plan</span>
                  <Badge variant="default" className="text-base px-3 py-1">
                    {subscriptionInfo.plan.name}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant={subscriptionInfo.member.status === 'active' ? 'default' : 'secondary'}>
                    {subscriptionInfo.member.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Paid Until</span>
                  <span className="font-medium">
                    {subscriptionInfo.currentPeriod 
                      ? formatDate(subscriptionInfo.currentPeriod.periodEnd)
                      : subscriptionInfo.nextPaymentDate
                      ? formatDate(subscriptionInfo.nextPaymentDate)
                      : 'N/A'}
                  </span>
                </div>
                {subscriptionInfo.currentPeriod && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Next Payment</span>
                      <span className="font-medium">
                        {formatDate(subscriptionInfo.nextPaymentDate)}
                      </span>
                    </div>
                    {subscriptionInfo.currentPeriod.markedAt && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Last Payment</span>
                        <span className="font-medium">
                          {formatDate(subscriptionInfo.currentPeriod.markedAt)}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No subscription information available
              </p>
            )}
          </CardContent>
        </Card>

        {/* Daily Voucher */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Coffee className="w-5 h-5 text-primary" />
              <span>Daily Voucher</span>
            </CardTitle>
            <CardDescription>
              Redeem up to ₱150 per day. Resets at midnight.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-3xl font-bold text-primary">₱{getDailyBalance()}</p>
              </div>
              <div className="text-right">
                {canRedeem ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <XCircle className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
            </div>

            {voucherCode && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <p className="font-semibold mb-1">Voucher Code:</p>
                  <p className="font-mono text-lg">{voucherCode}</p>
                  <p className="text-sm mt-2 text-muted-foreground">
                    Show this code to the barista to redeem your drink.
                  </p>
                </AlertDescription>
              </Alert>
            )}

            <Button 
              onClick={handleRedeemVoucher}
              disabled={!canRedeem || isRedeeming}
              className="w-full"
              size="lg"
            >
              {isRedeeming ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Coffee className="w-4 h-4 mr-2" />
                  Redeem Voucher (₱150)
                </>
              )}
            </Button>

            {!canRedeem && (
              <div className="text-center text-sm text-muted-foreground pt-2">
                <p>Voucher resets at {formatDate(getNextResetTime().toISOString())}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Redemption Stats */}
        {redemptionStats && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Redemption Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">{redemptionStats.totalThisMonth}</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">{redemptionStats.totalLast30Days}</p>
                  <p className="text-sm text-muted-foreground">Last 30 Days</p>
                </div>
              </div>
              {redemptionStats.lastRedemptionDate && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Last Redemption</span>
                  <span className="font-medium">{formatDate(redemptionStats.lastRedemptionDate)}</span>
                </div>
              )}
              {redemptionStats.recentRedemptions && redemptionStats.recentRedemptions.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Recent Redemptions</p>
                  <div className="space-y-2">
                    {redemptionStats.recentRedemptions.slice(0, 5).map((redemption: any) => (
                      <div key={redemption.id} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                        <span className="text-sm">{formatDate(redemption.redeemedAt)}</span>
                        <span className="text-sm font-medium">₱{redemption.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Member Info */}
        <Card>
          <CardHeader>
            <CardTitle>Member Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Name</span>
              <span className="font-medium">{user?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="font-medium">{user?.email}</span>
            </div>
            {subscriptionInfo?.member?.createdAt && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="font-medium">{formatDate(subscriptionInfo.member.createdAt)}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoworkingMembers;

