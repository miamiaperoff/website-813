import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { dataService } from '@/lib/dataService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Gift, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  User,
  Calendar,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GuestPass } from '@/lib/types';

const GuestPasses: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [guestPasses, setGuestPasses] = useState<GuestPass[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [weeklyReset, setWeeklyReset] = useState<Date | null>(null);

  // Mock guest passes data
  const mockGuestPasses: GuestPass[] = [
    {
      id: '1',
      memberId: user?.id || '',
      issuedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      code: 'ABC123',
      status: 'active'
    },
    {
      id: '2',
      memberId: user?.id || '',
      issuedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      usedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      code: 'DEF456',
      status: 'used'
    }
  ];

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    loadGuestPasses();
    calculateWeeklyReset();
  }, [user, navigate]);

  const loadGuestPasses = async () => {
    try {
      setGuestPasses(mockGuestPasses);
    } catch (error) {
      console.error('Error loading guest passes:', error);
    }
  };

  const calculateWeeklyReset = () => {
    const now = new Date();
    const nextSunday = new Date(now);
    nextSunday.setDate(now.getDate() + (7 - now.getDay())); // Next Sunday
    nextSunday.setHours(0, 0, 0, 0); // 12:00 AM
    setWeeklyReset(nextSunday);
  };

  const generateGuestCode = (): string => {
    // Generate 6-digit code (3 letters + 3 numbers)
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    
    let code = '';
    for (let i = 0; i < 3; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 3; i++) {
      code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    
    return code;
  };

  const handleIssueGuestPass = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      // Check if member has available guest passes
      const memberPlan = 'growth'; // In real app, get from user data
      const maxPasses = memberPlan === 'growth' ? 1 : memberPlan === 'resident' ? 2 : 0;
      
      const currentWeekPasses = guestPasses.filter(pass => {
        const passDate = new Date(pass.issuedAt);
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay()); // Start of current week
        weekStart.setHours(0, 0, 0, 0);
        
        return passDate >= weekStart;
      });

      if (currentWeekPasses.length >= maxPasses) {
        setMessage({ 
          type: 'error', 
          text: `You have reached your weekly limit of ${maxPasses} guest pass${maxPasses > 1 ? 'es' : ''}` 
        });
        return;
      }

      // Create new guest pass
      const newPass: GuestPass = {
        id: `pass_${Date.now()}`,
        memberId: user?.id || '',
        issuedAt: new Date().toISOString(),
        code: generateGuestCode(),
        status: 'active'
      };

      setGuestPasses(prev => [newPass, ...prev]);
      setMessage({ 
        type: 'success', 
        text: `Guest pass created! Code: ${newPass.code}` 
      });

    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create guest pass' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseGuestPass = async (passId: string) => {
    try {
      setGuestPasses(prev => 
        prev.map(pass => 
          pass.id === passId 
            ? { ...pass, usedAt: new Date().toISOString(), status: 'used' as const }
            : pass
        )
      );
      setMessage({ type: 'success', text: 'Guest pass marked as used' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to mark guest pass as used' });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeUntilReset = () => {
    if (!weeklyReset) return '';
    
    const now = new Date();
    const diff = weeklyReset.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return 'Less than 1 hour';
    }
  };

  const getCurrentWeekPasses = () => {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay()); // Start of current week
    weekStart.setHours(0, 0, 0, 0);
    
    return guestPasses.filter(pass => new Date(pass.issuedAt) >= weekStart);
  };

  const currentWeekPasses = getCurrentWeekPasses();
  const usedThisWeek = currentWeekPasses.filter(pass => pass.status === 'used').length;
  const availableThisWeek = currentWeekPasses.filter(pass => pass.status === 'active').length;

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-primary">
                Guest Passes
              </h1>
              <p className="text-muted-foreground">Invite guests to use the coworking space</p>
            </div>
            <Button onClick={() => navigate('/member')} variant="outline">
              <User className="w-4 h-4 mr-2" />
              Member Portal
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Messages */}
        {message && (
          <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className="mb-6">
            {message.type === 'error' ? (
              <XCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {/* Weekly Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Gift className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Available This Week</p>
                  <p className="text-2xl font-bold text-primary">{availableThisWeek}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Used This Week</p>
                  <p className="text-2xl font-bold text-primary">{usedThisWeek}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <RefreshCw className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Reset In</p>
                  <p className="text-2xl font-bold text-primary">{getTimeUntilReset()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="passes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="passes">My Guest Passes</TabsTrigger>
            <TabsTrigger value="create">Create New Pass</TabsTrigger>
          </TabsList>

          <TabsContent value="passes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Current Week Guest Passes</span>
                </CardTitle>
                <CardDescription>
                  Guest passes reset every Sunday at 12:00 AM
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentWeekPasses.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No guest passes this week
                  </p>
                ) : (
                  <div className="space-y-4">
                    {currentWeekPasses.map(pass => (
                      <div key={pass.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Gift className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">Guest Pass {pass.code}</p>
                            <p className="text-sm text-muted-foreground">
                              Issued: {formatDate(pass.issuedAt)}
                            </p>
                            {pass.usedAt && (
                              <p className="text-sm text-muted-foreground">
                                Used: {formatDate(pass.usedAt)}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={pass.status === 'active' ? 'default' : 'secondary'}>
                            {pass.status}
                          </Badge>
                          {pass.status === 'active' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleUseGuestPass(pass.id)}
                            >
                              Mark as Used
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="w-5 h-5 text-primary" />
                  <span>Create Guest Pass</span>
                </CardTitle>
                <CardDescription>
                  Issue a new guest pass for this week
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Your Plan Benefits</h3>
                    <div className="space-y-2 text-sm">
                      <p>• Growth Plan: 1 guest pass per week</p>
                      <p>• Resident Plan: 2 guest passes per week</p>
                      <p>• Guest passes reset every Sunday at 12:00 AM</p>
                      <p>• Guest passes are valid for open seating only</p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold mb-2 text-blue-900">How Guest Passes Work</h3>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p>1. Create a guest pass with a 6-digit code</p>
                      <p>2. Share the code with your guest</p>
                      <p>3. Guest shows the code at check-in</p>
                      <p>4. Guest can use the space during open seating hours</p>
                      <p>5. Pass is automatically marked as used when guest checks in</p>
                    </div>
                  </div>

                  <Button 
                    onClick={handleIssueGuestPass}
                    disabled={isLoading || availableThisWeek >= 2} // Assuming max 2 for resident plan
                    className="w-full"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Gift className="w-4 h-4 mr-2" />
                        Create Guest Pass
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Usage Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  <span>Usage Guidelines</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Guest passes are valid during open seating hours only</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Guests cannot use reserved desks during Members-Only hours</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Guest passes expire at the end of the day</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>You are responsible for your guests' behavior</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GuestPasses;
