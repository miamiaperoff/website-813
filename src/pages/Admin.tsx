import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { dataService } from '@/lib/dataService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  Clock, 
  DollarSign, 
  Settings, 
  LogOut,
  CheckCircle,
  XCircle,
  AlertCircle,
  Coffee,
  Calendar,
  Building,
  MessageSquare,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Member, SubscriptionPeriod, PolicySettings } from '@/lib/types';

const Admin: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [members, setMembers] = useState<Member[]>([]);
  const [subscriptionPeriods, setSubscriptionPeriods] = useState<SubscriptionPeriod[]>([]);
  const [policySettings, setPolicySettings] = useState<PolicySettings | null>(null);
  const [activeSessions, setActiveSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/auth');
      return;
    }

    loadData();
  }, [isAdmin, navigate]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const membersData = await dataService.getMembers();
      const periodsData = await dataService.getSubscriptionPeriods();
      const settingsData = await dataService.getPolicySettings();
      const sessionsData = await dataService.getActiveSessions();

      setMembers(membersData);
      setSubscriptionPeriods(periodsData);
      setPolicySettings(settingsData);
      setActiveSessions(sessionsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const togglePeriodPayment = async (periodId: string, isPaid: boolean) => {
    const updatedPeriod = dataService.updatePeriodPayment(
      periodId, 
      isPaid, 
      user?.email || 'admin',
      isPaid ? 'Payment received' : 'Payment pending'
    );
    
    if (updatedPeriod) {
      setSubscriptionPeriods(prev => 
        prev.map(p => p.id === periodId ? updatedPeriod : p)
      );
    }
  };

  const updatePolicySetting = (key: keyof PolicySettings, value: any) => {
    if (!policySettings) return;
    
    const updatedSettings = { ...policySettings, [key]: value };
    dataService.updatePolicySettings(updatedSettings);
    setPolicySettings(updatedSettings);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-primary">
                813 Cafe Admin Dashboard
              </h1>
              <p className="text-muted-foreground">Welcome back, {user?.name}</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                  <p className="text-2xl font-bold text-primary">{members.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Currently In</p>
                  <p className="text-2xl font-bold text-primary">{activeSessions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Paid This Period</p>
                  <p className="text-2xl font-bold text-primary">
                    {subscriptionPeriods?.filter(p => p.isPaid).length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Unpaid</p>
                  <p className="text-2xl font-bold text-orange-500">
                    {subscriptionPeriods?.filter(p => !p.isPaid).length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Member Management</CardTitle>
                <CardDescription>
                  Manage member subscriptions and status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {members.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                          {member.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Plan: {member.planId}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Management</CardTitle>
                <CardDescription>
                  Toggle payment status for current period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscriptionPeriods?.map(period => {
                    const member = members.find(m => m.id === period.memberId);
                    return (
                      <div key={period.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{member?.name}</h3>
                          <p className="text-sm text-muted-foreground">{member?.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Period: {new Date(period.periodStart).toLocaleDateString()} - {new Date(period.periodEnd).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={period.isPaid}
                              onCheckedChange={(checked) => togglePeriodPayment(period.id, checked)}
                            />
                            <Label className="text-sm">
                              {period.isPaid ? 'Paid' : 'Unpaid'}
                            </Label>
                          </div>
                          {period.isPaid ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </div>
                    );
                  }) || (
                    <p className="text-center text-muted-foreground py-4">
                      No subscription periods found
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>
                  Monitor current member sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeSessions.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No active sessions
                    </p>
                  ) : (
                    activeSessions.map(session => {
                      const member = members.find(m => m.id === session.memberId);
                      return (
                        <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-semibold">{member?.name}</h3>
                            <p className="text-sm text-muted-foreground">Code: {session.code}</p>
                            <p className="text-xs text-muted-foreground">
                              Started: {new Date(session.startedAt).toLocaleString()}
                            </p>
                          </div>
                          <Badge variant="default">Active</Badge>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Features</CardTitle>
                <CardDescription>
                  Access and manage all coworking system features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Check-in System</h3>
                    <Button onClick={() => navigate('/checkin')} className="w-full">
                      <Users className="w-4 h-4 mr-2" />
                      Check-in Interface
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Drink Redemption</h3>
                    <Button onClick={() => navigate('/redemption')} className="w-full">
                      <Coffee className="w-4 h-4 mr-2" />
                      Barista Interface
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Friday Reservations</h3>
                    <Button onClick={() => navigate('/friday')} className="w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Reservations
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Guest Passes</h3>
                    <Button onClick={() => navigate('/guests')} className="w-full">
                      <Users className="w-4 h-4 mr-2" />
                      Guest Management
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Meeting Room</h3>
                    <Button onClick={() => navigate('/meeting')} className="w-full">
                      <Building className="w-4 h-4 mr-2" />
                      Room Booking
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Support Tickets</h3>
                    <Button onClick={() => navigate('/support')} className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Ticket System
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
                <CardDescription>
                  Generate reports and export data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button onClick={() => navigate('/reports')} className="w-full" size="lg">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Reports Dashboard
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Access comprehensive reporting with CSV exports for sessions, payments, redemptions, guest uses, and reservations
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Policy Settings</CardTitle>
                <CardDescription>
                  Configure system policies and limits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {policySettings && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="idleTimeout">Idle Timeout (minutes)</Label>
                        <Input
                          id="idleTimeout"
                          type="number"
                          value={policySettings.idleTimeout}
                          onChange={(e) => updatePolicySetting('idleTimeout', parseInt(e.target.value))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lockoutThreshold">Lockout Threshold (attempts)</Label>
                        <Input
                          id="lockoutThreshold"
                          type="number"
                          value={policySettings.lockoutThreshold}
                          onChange={(e) => updatePolicySetting('lockoutThreshold', parseInt(e.target.value))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity (max members)</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={policySettings.capacity}
                          onChange={(e) => updatePolicySetting('capacity', parseInt(e.target.value))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="fridaySlotSize">Friday Slot Size (hours)</Label>
                        <Input
                          id="fridaySlotSize"
                          type="number"
                          value={policySettings.fridaySlotSize}
                          onChange={(e) => updatePolicySetting('fridaySlotSize', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="graceLabelText">Grace Label Text</Label>
                      <Input
                        id="graceLabelText"
                        value={policySettings.graceLabelText}
                        onChange={(e) => updatePolicySetting('graceLabelText', e.target.value)}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
