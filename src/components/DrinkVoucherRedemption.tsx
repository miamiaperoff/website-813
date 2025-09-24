import React, { useState, useEffect } from 'react';
import { dataService } from '@/lib/dataService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Coffee, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User,
  AlertCircle
} from 'lucide-react';

interface DrinkVoucherRedemptionProps {
  userRole?: 'cafe' | 'admin';
}

const DrinkVoucherRedemption: React.FC<DrinkVoucherRedemptionProps> = ({ userRole = 'cafe' }) => {
  const [voucherCode, setVoucherCode] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [todayRedemptions, setTodayRedemptions] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    loadTodayRedemptions();
    return () => clearInterval(interval);
  }, []);

  const loadTodayRedemptions = async () => {
    // In a real app, this would fetch from the database
    // For now, we'll use mock data
    const mockRedemptions = [
      {
        id: '1',
        memberName: 'John Doe',
        redeemedAt: new Date().toISOString(),
        amount: 150,
        status: 'redeemed'
      },
      {
        id: '2',
        memberName: 'Sarah Wilson',
        redeemedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        amount: 120,
        status: 'redeemed'
      }
    ];
    setTodayRedemptions(mockRedemptions);
  };

  const handleRedeemVoucher = async () => {
    if (!voucherCode) return;
    
    setIsLoading(true);
    setMessage(null);
    
    try {
      // Mock voucher validation and redemption
      // In a real app, this would validate the voucher code and create a redemption record
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful redemption
      const newRedemption = {
        id: `redemption_${Date.now()}`,
        memberName: 'Member Name',
        redeemedAt: new Date().toISOString(),
        amount: 150,
        status: 'redeemed'
      };
      
      setTodayRedemptions(prev => [newRedemption, ...prev]);
      setMessage({ 
        type: 'success', 
        text: `Voucher redeemed successfully! Amount: ₱150` 
      });
      setVoucherCode('');
      
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to redeem voucher. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const totalToday = todayRedemptions.reduce((sum, redemption) => sum + redemption.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-warm p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">
            Drink Voucher Redemption
          </h1>
          <p className="text-lg text-muted-foreground">
            {userRole === 'cafe' ? 'Barista Interface' : 'Admin Interface'}
          </p>
          <div className="mt-4">
            <Badge variant="outline" className="text-sm">
              {currentTime.toLocaleString()}
            </Badge>
          </div>
        </div>

        {/* Voucher Redemption */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Coffee className="w-5 h-5 text-primary" />
              <span>Redeem Voucher</span>
            </CardTitle>
            <CardDescription>
              Enter the 6-digit voucher code to redeem a member's daily free drink
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <Input
                placeholder="Enter 6-digit voucher code (e.g., ABC123)"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                maxLength={6}
                className="text-center text-lg font-mono"
              />
              
              <Button 
                onClick={handleRedeemVoucher}
                disabled={!voucherCode || isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Coffee className="w-4 h-4 mr-2" />
                    Redeem Voucher
                  </>
                )}
              </Button>
            </div>

            {message && (
              <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
                {message.type === 'error' ? (
                  <XCircle className="h-4 w-4" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Today's Redemptions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <span>Today's Redemptions</span>
            </CardTitle>
            <CardDescription>
              Total redeemed today: ₱{totalToday}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {todayRedemptions.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No redemptions today
              </p>
            ) : (
              <div className="space-y-3">
                {todayRedemptions.map(redemption => (
                  <div key={redemption.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Coffee className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{redemption.memberName}</p>
                        <p className="text-sm text-muted-foreground">
                          Redeemed at {formatTime(redemption.redeemedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">₱{redemption.amount}</p>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Redeemed
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Daily Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Coffee className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Redemptions Today</p>
                  <p className="text-2xl font-bold text-primary">{todayRedemptions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold text-primary">₱{totalToday}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Daily Limit</p>
                  <p className="text-2xl font-bold text-primary">₱150</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg">How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>1. Member shows their voucher code on their phone</p>
              <p>2. Enter the 6-digit code in the field above</p>
              <p>3. Click "Redeem Voucher" to process</p>
              <p>4. Voucher is automatically marked as used</p>
              <p>5. Member can only redeem once per day</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DrinkVoucherRedemption;
