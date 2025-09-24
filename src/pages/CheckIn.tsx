import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { dataService } from '@/lib/dataService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Hash, 
  LogIn, 
  LogOut, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Coffee,
  Wifi,
  User,
  Settings,
  QrCode,
  Search,
  Lock,
  Unlock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Member, MemberSession } from '@/lib/types';

const CheckIn: React.FC = () => {
  const { user, isStaff } = useAuth();
  const navigate = useNavigate();
  
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [memberCode, setMemberCode] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);
  const [activeTab, setActiveTab] = useState('staff');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSessions, setActiveSessions] = useState<MemberSession[]>([]);
  const [isMembersOnly, setIsMembersOnly] = useState(false);
  const [capacity, setCapacity] = useState(13);

  // Mock members data
  const members: Member[] = [
    {
      id: '1',
      email: 'john@example.com',
      name: 'John Doe',
      planId: 'growth',
      status: 'active'
    },
    {
      id: '2',
      email: 'sarah@example.com',
      name: 'Sarah Wilson',
      planId: 'flex',
      status: 'active'
    },
    {
      id: '3',
      email: 'mike@example.com',
      name: 'Mike Chen',
      planId: 'resident',
      status: 'active'
    }
  ];

  useEffect(() => {
    if (!isStaff()) {
      navigate('/auth');
      return;
    }

    loadData();
    
    // Check Members-Only hours
    const checkMembersOnly = () => {
      setIsMembersOnly(dataService.isMembersOnlyHours());
    };
    
    checkMembersOnly();
    const interval = setInterval(checkMembersOnly, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [isStaff, navigate]);

  const loadData = async () => {
    try {
      const sessions = dataService.getActiveSessions();
      setActiveSessions(sessions);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleCodeEntry = (code: string) => {
    const member = members.find(m => m.email === code || m.id === code);
    if (!member) {
      setMessage({ type: 'error', text: 'Invalid member code. Please try again.' });
      return;
    }

    if (member.status !== 'active') {
      setMessage({ type: 'error', text: 'Account is inactive. Please contact support.' });
      return;
    }

    setCurrentMember(member);
    setMemberCode(code);
  };

  const handleStartSession = async () => {
    if (!currentMember) return;

    try {
      const result = dataService.startSession(currentMember.id);
      
      if (result.success && result.session) {
        setMessage({ 
          type: 'success', 
          text: `Session started! Code: ${result.session.code}` 
        });
        loadData();
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to start session' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    }
  };

  const handleEndSession = async () => {
    if (!currentMember) return;

    const activeSession = activeSessions.find(s => s.memberId === currentMember.id && s.isActive);
    if (!activeSession) {
      setMessage({ type: 'error', text: 'No active session found!' });
      return;
    }

    try {
      const result = dataService.endSession(activeSession.id);
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Session ended successfully' });
        loadData();
      } else {
        setMessage({ type: 'error', text: 'Failed to end session' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'resident': return 'bg-purple-100 text-purple-800';
      case 'growth': return 'bg-blue-100 text-blue-800';
      case 'save': return 'bg-green-100 text-green-800';
      case 'flex': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isAtCapacity = activeSessions.length >= capacity;
  const waitlistCount = Math.max(0, activeSessions.length - capacity);

  return (
    <div className="min-h-screen bg-gradient-warm p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">
            813 Cafe Check-In System
          </h1>
          <p className="text-lg text-muted-foreground">
            Staff-assisted and self-service check-in/out
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <Badge variant={isMembersOnly ? 'default' : 'secondary'}>
              {isMembersOnly ? 'Members-Only Hours Active' : 'Open Seating'}
            </Badge>
            <Badge variant={isAtCapacity ? 'destructive' : 'default'}>
              {activeSessions.length}/{capacity} Members
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="staff" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Staff Mode</span>
            </TabsTrigger>
            <TabsTrigger value="self" className="flex items-center space-x-2">
              <QrCode className="w-4 h-4" />
              <span>Self-Service</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="staff" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Staff Check-In Interface */}
              <div className="lg:col-span-2 space-y-6">
                {/* Member Search */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Search className="w-5 h-5 text-primary" />
                      <span>Find Member</span>
                    </CardTitle>
                    <CardDescription>
                      Search for members by name or email
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Search members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    
                    {searchTerm && (
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {filteredMembers.map(member => (
                          <div
                            key={member.id}
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                            onClick={() => handleCodeEntry(member.email)}
                          >
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-muted-foreground">{member.email}</p>
                            </div>
                            <Badge className={getTierColor(member.planId)}>
                              {member.planId}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Member Code Entry */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Hash className="w-5 h-5 text-primary" />
                      <span>Manual Code Entry</span>
                    </CardTitle>
                    <CardDescription>
                      Enter member email or ID manually
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Enter member email or ID"
                      value={memberCode}
                      onChange={(e) => setMemberCode(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleCodeEntry(memberCode)}
                    />
                    <Button 
                      onClick={() => handleCodeEntry(memberCode)}
                      className="w-full"
                      disabled={!memberCode}
                    >
                      Find Member
                    </Button>
                  </CardContent>
                </Card>

                {/* Member Info & Actions */}
                {currentMember && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-primary" />
                        <span>Member Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{currentMember.name}</h3>
                          <p className="text-muted-foreground">{currentMember.email}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getTierColor(currentMember.planId)}>
                            {currentMember.planId.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button 
                          onClick={handleStartSession}
                          className="flex-1"
                          disabled={activeSessions.some(s => s.memberId === currentMember.id && s.isActive)}
                        >
                          <LogIn className="w-4 h-4 mr-2" />
                          Start Session
                        </Button>
                        <Button 
                          onClick={handleEndSession}
                          variant="outline"
                          className="flex-1"
                          disabled={!activeSessions.some(s => s.memberId === currentMember.id && s.isActive)}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          End Session
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Status Messages */}
                {message && (
                  <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{message.text}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Currently In & Stats */}
              <div className="space-y-6">
                {/* Currently In */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span>Currently In ({activeSessions.length})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {activeSessions.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">
                        No members currently checked in
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {activeSessions.map(session => {
                          const member = members.find(m => m.id === session.memberId);
                          return (
                            <div key={session.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div>
                                <p className="font-medium">{member?.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Code: {session.code}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Since {formatTime(session.startedAt)}
                                </p>
                              </div>
                              <Badge variant="default">Active</Badge>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Capacity Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="w-5 h-5 text-primary" />
                      <span>Space Status</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {activeSessions.length}/{capacity}
                      </div>
                      <div className="text-sm text-muted-foreground">Members</div>
                    </div>
                    
                    {isAtCapacity && (
                      <Alert>
                        <Lock className="h-4 w-4" />
                        <AlertDescription>
                          Space is at capacity. New members will be added to waitlist.
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {waitlistCount > 0 && (
                      <div className="text-center">
                        <div className="text-lg font-semibold text-orange-600">
                          {waitlistCount} on waitlist
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="self" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Self-Service Interface */}
              <div className="lg:col-span-2 space-y-6">
                {/* Member Code Entry */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <QrCode className="w-5 h-5 text-primary" />
                      <span>Self-Service Check-In</span>
                    </CardTitle>
                    <CardDescription>
                      Enter your member email to check in or out
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-muted/50 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Enter your member email
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Input
                        placeholder="Enter your member email"
                        value={memberCode}
                        onChange={(e) => setMemberCode(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleCodeEntry(memberCode)}
                      />
                      
                      <Button 
                        onClick={() => handleCodeEntry(memberCode)}
                        className="w-full"
                        disabled={!memberCode}
                      >
                        Check Member
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Member Info & Actions */}
                {currentMember && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-primary" />
                        <span>Welcome, {currentMember.name}!</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-muted-foreground">{currentMember.email}</p>
                        </div>
                        <Badge className={getTierColor(currentMember.planId)}>
                          {currentMember.planId.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="flex space-x-3">
                        <Button 
                          onClick={handleStartSession}
                          className="flex-1"
                          disabled={activeSessions.some(s => s.memberId === currentMember.id && s.isActive)}
                        >
                          <LogIn className="w-4 h-4 mr-2" />
                          Start Session
                        </Button>
                        <Button 
                          onClick={handleEndSession}
                          variant="outline"
                          className="flex-1"
                          disabled={!activeSessions.some(s => s.memberId === currentMember.id && s.isActive)}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          End Session
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Status Messages */}
                {message && (
                  <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{message.text}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Currently In & Benefits */}
              <div className="space-y-6">
                {/* Currently In */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span>Currently In ({activeSessions.length})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {activeSessions.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">
                        No members currently checked in
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {activeSessions.map(session => {
                          const member = members.find(m => m.id === session.memberId);
                          return (
                            <div key={session.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div>
                                <p className="font-medium">{member?.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Since {formatTime(session.startedAt)}
                                </p>
                              </div>
                              <Badge className={getTierColor(member?.planId || '')}>
                                {member?.planId}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Member Benefits */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Coffee className="w-5 h-5 text-primary" />
                      <span>Your Benefits</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Wifi className="w-4 h-4 text-primary" />
                      <span className="text-sm">Free WiFi Access</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Coffee className="w-4 h-4 text-primary" />
                      <span className="text-sm">Daily Free Drink (up to ₱150)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm">Community Events</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CheckIn;
