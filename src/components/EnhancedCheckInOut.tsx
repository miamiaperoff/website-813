import React, { useState, useEffect } from 'react';
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
  Search
} from 'lucide-react';

interface CheckInRecord {
  id: string;
  memberId: string;
  memberName: string;
  memberTier: 'flex' | 'save' | 'growth' | 'resident';
  checkInTime: string;
  checkOutTime?: string;
  duration?: number; // in minutes
  status: 'checked-in' | 'checked-out';
  checkedInBy: 'staff' | 'self';
}

interface Member {
  id: string;
  name: string;
  email: string;
  memberTier: 'flex' | 'save' | 'growth' | 'resident';
  qrCode: string;
  isActive: boolean;
  status: 'active' | 'inactive' | 'suspended';
  paymentStatus: 'current' | 'overdue' | 'pending';
}

const EnhancedCheckInOut: React.FC = () => {
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [memberCode, setMemberCode] = useState('');
  const [checkInRecords, setCheckInRecords] = useState<CheckInRecord[]>([]);
  const [currentlyIn, setCurrentlyIn] = useState<CheckInRecord[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);
  const [activeTab, setActiveTab] = useState('staff');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock members data - in production, this would come from your database
  const members: Member[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      memberTier: 'growth',
      qrCode: 'MEMBER_001',
      isActive: true,
      status: 'active',
      paymentStatus: 'current'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      memberTier: 'flex',
      qrCode: 'MEMBER_002',
      isActive: true,
      status: 'active',
      paymentStatus: 'current'
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@example.com',
      memberTier: 'resident',
      qrCode: 'MEMBER_003',
      isActive: true,
      status: 'active',
      paymentStatus: 'current'
    },
    {
      id: '4',
      name: 'Ana Calubiran',
      email: 'ana@813cafe.com',
      memberTier: 'resident',
      qrCode: 'ADMIN_001',
      isActive: true,
      status: 'active',
      paymentStatus: 'current'
    }
  ];

  useEffect(() => {
    // Load currently checked-in members
    const checkedIn = checkInRecords.filter(record => record.status === 'checked-in');
    setCurrentlyIn(checkedIn);
  }, [checkInRecords]);

  const handleCodeEntry = (code: string) => {
    const member = members.find(m => m.qrCode === code);
    if (!member) {
      setMessage({ type: 'error', text: 'Invalid member code. Please try again.' });
      return;
    }

    if (!member.isActive) {
      setMessage({ type: 'error', text: 'Membership is inactive. Please contact support.' });
      return;
    }

    if (member.status !== 'active') {
      setMessage({ type: 'error', text: 'Account is suspended. Please contact support.' });
      return;
    }

    if (member.paymentStatus === 'overdue') {
      setMessage({ type: 'error', text: 'Payment overdue. Please contact support to resolve.' });
      return;
    }

    setCurrentMember(member);
    setMemberCode(code);
  };

  const handleCheckIn = () => {
    if (!currentMember) return;

    const existingRecord = checkInRecords.find(
      record => record.memberId === currentMember.id && record.status === 'checked-in'
    );

    if (existingRecord) {
      setMessage({ type: 'error', text: 'You are already checked in!' });
      return;
    }

    const newRecord: CheckInRecord = {
      id: `checkin_${Date.now()}`,
      memberId: currentMember.id,
      memberName: currentMember.name,
      memberTier: currentMember.memberTier,
      checkInTime: new Date().toISOString(),
      status: 'checked-in',
      checkedInBy: activeTab === 'staff' ? 'staff' : 'self'
    };

    setCheckInRecords(prev => [...prev, newRecord]);
    setMessage({ 
      type: 'success', 
      text: `Welcome back, ${currentMember.name}! You're checked in.` 
    });
    
    // Reset for next entry
    setTimeout(() => {
      setCurrentMember(null);
      setMemberCode('');
      setMessage(null);
    }, 3000);
  };

  const handleCheckOut = () => {
    if (!currentMember) return;

    const activeRecord = checkInRecords.find(
      record => record.memberId === currentMember.id && record.status === 'checked-in'
    );

    if (!activeRecord) {
      setMessage({ type: 'error', text: 'You are not currently checked in!' });
      return;
    }

    const checkOutTime = new Date();
    const checkInTime = new Date(activeRecord.checkInTime);
    const duration = Math.floor((checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60)); // minutes

    const updatedRecord = {
      ...activeRecord,
      checkOutTime: checkOutTime.toISOString(),
      duration,
      status: 'checked-out' as const
    };

    setCheckInRecords(prev => 
      prev.map(record => record.id === activeRecord.id ? updatedRecord : record)
    );

    setMessage({ 
      type: 'success', 
      text: `Thank you, ${currentMember.name}! You were here for ${duration} minutes.` 
    });

    // Reset for next entry
    setTimeout(() => {
      setCurrentMember(null);
      setMemberCode('');
      setMessage(null);
    }, 3000);
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

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.qrCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                      Search for members by name, email, or member code
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
                            onClick={() => handleCodeEntry(member.qrCode)}
                          >
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-muted-foreground">{member.email}</p>
                            </div>
                            <Badge className={getTierColor(member.memberTier)}>
                              {member.memberTier}
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
                      Enter member code manually
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Enter member code (e.g., MEMBER_001)"
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
                          <p className="text-sm text-muted-foreground">Code: {currentMember.qrCode}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getTierColor(currentMember.memberTier)}>
                            {currentMember.memberTier.toUpperCase()}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {currentMember.paymentStatus}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button 
                          onClick={handleCheckIn}
                          className="flex-1"
                          disabled={currentlyIn.some(record => record.memberId === currentMember.id)}
                        >
                          <LogIn className="w-4 h-4 mr-2" />
                          Check In
                        </Button>
                        <Button 
                          onClick={handleCheckOut}
                          variant="outline"
                          className="flex-1"
                          disabled={!currentlyIn.some(record => record.memberId === currentMember.id)}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Check Out
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
                      <span>Currently In ({currentlyIn.length})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentlyIn.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">
                        No members currently checked in
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {currentlyIn.map(record => (
                          <div key={record.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                              <p className="font-medium">{record.memberName}</p>
                              <p className="text-sm text-muted-foreground">
                                Since {formatTime(record.checkInTime)}
                              </p>
                            </div>
                            <Badge className={getTierColor(record.memberTier)}>
                              {record.memberTier}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Today's Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>Today's Stats</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {checkInRecords.filter(r => r.status === 'checked-out').length}
                        </div>
                        <div className="text-sm text-muted-foreground">Check-ins</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {checkInRecords
                            .filter(r => r.status === 'checked-out' && r.duration)
                            .reduce((total, r) => total + (r.duration || 0), 0)
                          }
                        </div>
                        <div className="text-sm text-muted-foreground">Total Minutes</div>
                      </div>
                    </div>
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
                      Enter your member code to check in or out
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-muted/50 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Enter your member code (e.g., MEMBER_001)
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Input
                        placeholder="Enter your member code"
                        value={memberCode}
                        onChange={(e) => setMemberCode(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleCodeEntry(memberCode)}
                      />
                      
                      <Button 
                        onClick={() => handleCodeEntry(memberCode)}
                        className="w-full"
                        disabled={!memberCode}
                      >
                        Check Member Code
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
                          <p className="text-sm text-muted-foreground">Code: {currentMember.qrCode}</p>
                        </div>
                        <Badge className={getTierColor(currentMember.memberTier)}>
                          {currentMember.memberTier.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="flex space-x-3">
                        <Button 
                          onClick={handleCheckIn}
                          className="flex-1"
                          disabled={currentlyIn.some(record => record.memberId === currentMember.id)}
                        >
                          <LogIn className="w-4 h-4 mr-2" />
                          Check In
                        </Button>
                        <Button 
                          onClick={handleCheckOut}
                          variant="outline"
                          className="flex-1"
                          disabled={!currentlyIn.some(record => record.memberId === currentMember.id)}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Check Out
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
                      <span>Currently In ({currentlyIn.length})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentlyIn.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">
                        No members currently checked in
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {currentlyIn.map(record => (
                          <div key={record.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                              <p className="font-medium">{record.memberName}</p>
                              <p className="text-sm text-muted-foreground">
                                Since {formatTime(record.checkInTime)}
                              </p>
                            </div>
                            <Badge className={getTierColor(record.memberTier)}>
                              {record.memberTier}
                            </Badge>
                          </div>
                        ))}
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

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {checkInRecords.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No activity today
              </p>
            ) : (
              <div className="space-y-3">
                {checkInRecords
                  .sort((a, b) => new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime())
                  .slice(0, 10)
                  .map(record => (
                    <div key={record.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          record.status === 'checked-in' ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                        <div>
                          <p className="font-medium">{record.memberName}</p>
                          <p className="text-sm text-muted-foreground">
                            {record.status === 'checked-in' 
                              ? `Checked in at ${formatTime(record.checkInTime)}`
                              : `Checked out at ${formatTime(record.checkOutTime!)} (${formatDuration(record.duration || 0)})`
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getTierColor(record.memberTier)}>
                          {record.memberTier}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {record.checkedInBy}
                        </Badge>
                      </div>
                    </div>
                  ))
                }
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedCheckInOut;
