import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Coffee, 
  CheckCircle, 
  XCircle, 
  Search, 
  Clock,
  User,
  CreditCard,
  AlertTriangle
} from 'lucide-react';

interface Voucher {
  code: string;
  memberId: string;
  memberName: string;
  memberTier: string;
  generatedAt: string;
  validUntil: string;
  redeemed: boolean;
  redeemedAt: string | null;
  discountAmount: number;
  type: string;
  status: string;
}

const BaristaVoucherRedemption: React.FC = () => {
  const [voucherCode, setVoucherCode] = useState('');
  const [foundVoucher, setFoundVoucher] = useState<Voucher | null>(null);
  const [searchResult, setSearchResult] = useState<'none' | 'found' | 'redeemed' | 'expired' | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [recentRedemptions, setRecentRedemptions] = useState<Voucher[]>([]);

  // Load recent redemptions on component mount
  useEffect(() => {
    loadRecentRedemptions();
  }, []);

  const loadRecentRedemptions = () => {
    const redemptions = JSON.parse(localStorage.getItem('813_recent_redemptions') || '[]');
    setRecentRedemptions(redemptions.slice(0, 10)); // Show last 10 redemptions
  };

  const searchVoucher = () => {
    if (!voucherCode.trim()) {
      setSearchResult('none');
      setFoundVoucher(null);
      return;
    }

    // Get all active vouchers from POS system
    const posVouchers: Voucher[] = JSON.parse(localStorage.getItem('813_pos_vouchers') || '[]');
    const voucher = posVouchers.find(v => v.code === voucherCode.trim());

    if (!voucher) {
      setSearchResult('none');
      setFoundVoucher(null);
      return;
    }

    // Check if voucher is expired
    const now = new Date();
    const validUntil = new Date(voucher.validUntil);
    if (now > validUntil) {
      setSearchResult('expired');
      setFoundVoucher(voucher);
      return;
    }

    // Check if already redeemed
    if (voucher.redeemed) {
      setSearchResult('redeemed');
      setFoundVoucher(voucher);
      return;
    }

    // Valid voucher found
    setSearchResult('found');
    setFoundVoucher(voucher);
  };

  const redeemVoucher = async () => {
    if (!foundVoucher) return;

    setIsRedeeming(true);

    try {
      // Update voucher status in POS system
      const posVouchers: Voucher[] = JSON.parse(localStorage.getItem('813_pos_vouchers') || '[]');
      const updatedVouchers = posVouchers.map(v => 
        v.code === foundVoucher.code 
          ? { 
              ...v, 
              redeemed: true, 
              redeemedAt: new Date().toISOString(),
              status: 'redeemed'
            }
          : v
      );
      localStorage.setItem('813_pos_vouchers', JSON.stringify(updatedVouchers));

      // Update member's voucher in their storage
      const memberVouchers = JSON.parse(localStorage.getItem('813_vouchers') || '[]');
      const updatedMemberVouchers = memberVouchers.map((v: any) => 
        v.code === foundVoucher.code 
          ? { 
              ...v, 
              redeemed: true, 
              redeemedAt: new Date().toISOString()
            }
          : v
      );
      localStorage.setItem('813_vouchers', JSON.stringify(updatedMemberVouchers));

      // Add to recent redemptions
      const recentRedemptions = JSON.parse(localStorage.getItem('813_recent_redemptions') || '[]');
      recentRedemptions.unshift({
        ...foundVoucher,
        redeemed: true,
        redeemedAt: new Date().toISOString(),
        status: 'redeemed'
      });
      localStorage.setItem('813_recent_redemptions', JSON.stringify(recentRedemptions.slice(0, 50))); // Keep last 50

      // Update local state
      setFoundVoucher({
        ...foundVoucher,
        redeemed: true,
        redeemedAt: new Date().toISOString(),
        status: 'redeemed'
      });
      setSearchResult('redeemed');
      loadRecentRedemptions();

      // Clear form after successful redemption
      setTimeout(() => {
        setVoucherCode('');
        setFoundVoucher(null);
        setSearchResult(null);
      }, 3000);

    } catch (error) {
      console.error('Error redeeming voucher:', error);
    } finally {
      setIsRedeeming(false);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'resident': return 'bg-purple-100 text-purple-800';
      case 'growth': return 'bg-blue-100 text-blue-800';
      case 'save': return 'bg-green-100 text-green-800';
      case 'flex': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Coffee className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">
            Barista Voucher Redemption
          </h1>
          <p className="text-muted-foreground">
            Redeem member daily drink vouchers
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Voucher Search & Redemption */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-primary" />
                <span>Redeem Voucher</span>
              </CardTitle>
              <CardDescription>
                Enter the voucher code to redeem a member's daily drink
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter voucher code..."
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchVoucher()}
                  className="flex-1"
                />
                <Button onClick={searchVoucher} disabled={!voucherCode.trim()}>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>

              {/* Search Results */}
              {searchResult === 'none' && (
                <Alert>
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    Voucher not found. Please check the code and try again.
                  </AlertDescription>
                </Alert>
              )}

              {searchResult === 'expired' && foundVoucher && (
                <Alert variant="destructive">
                  <Clock className="h-4 w-4" />
                  <AlertDescription>
                    This voucher has expired. Vouchers are valid for 24 hours from generation.
                  </AlertDescription>
                </Alert>
              )}

              {searchResult === 'redeemed' && foundVoucher && (
                <Alert variant="destructive">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    This voucher has already been redeemed on {formatDate(foundVoucher.redeemedAt!)} at {formatTime(foundVoucher.redeemedAt!)}.
                  </AlertDescription>
                </Alert>
              )}

              {searchResult === 'found' && foundVoucher && (
                <div className="space-y-4">
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Valid voucher found! Ready to redeem.
                    </AlertDescription>
                  </Alert>

                  {/* Voucher Details */}
                  <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Member:</span>
                      <span>{foundVoucher.memberName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Member ID:</span>
                      <span>{foundVoucher.memberId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Tier:</span>
                      <Badge className={getTierColor(foundVoucher.memberTier)}>
                        {foundVoucher.memberTier}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Discount:</span>
                      <span className="font-semibold text-green-600">
                        ₱{foundVoucher.discountAmount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Valid Until:</span>
                      <span className="text-sm">
                        {formatDate(foundVoucher.validUntil)} at {formatTime(foundVoucher.validUntil)}
                      </span>
                    </div>
                  </div>

                  {/* Redeem Button */}
                  <Button 
                    onClick={redeemVoucher}
                    disabled={isRedeeming}
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
                        <CheckCircle className="w-4 h-4 mr-2" />
                        REDEEM VOUCHER
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Redemptions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary" />
                <span>Recent Redemptions</span>
              </CardTitle>
              <CardDescription>
                Last 10 voucher redemptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentRedemptions.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No recent redemptions
                </p>
              ) : (
                <div className="space-y-3">
                  {recentRedemptions.map((redemption, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-green-600" />
                          <span className="font-medium">{redemption.memberName}</span>
                          <Badge className={getTierColor(redemption.memberTier)}>
                            {redemption.memberTier}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(redemption.redeemedAt!)} at {formatTime(redemption.redeemedAt!)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">₱{redemption.discountAmount}</p>
                        <p className="text-xs text-muted-foreground">Redeemed</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Daily Reset Notice */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Daily Reset</p>
                <p className="text-sm text-blue-700">
                  New daily drink vouchers are automatically generated at 12:00 AM each day. 
                  Members can redeem one voucher per day.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BaristaVoucherRedemption;
