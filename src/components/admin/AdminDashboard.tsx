import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  Settings,
  UserPlus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Coffee,
  Wifi,
  CreditCard,
  Plus,
  MoreHorizontal,
  RefreshCw,
  QrCode
} from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  memberTier: 'basic' | 'premium' | 'vip';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastVisit: string;
  totalVisits: number;
  totalHours: number;
  qrCode: string;
  paymentStatus: 'current' | 'overdue' | 'pending';
}

interface Booking {
  id: string;
  memberId: string;
  memberName: string;
  date: string;
  startTime: string;
  endTime: string;
  workspace: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

interface CheckInRecord {
  id: string;
  memberId: string;
  memberName: string;
  checkInTime: string;
  checkOutTime?: string;
  duration?: number;
  status: 'checked-in' | 'checked-out';
}

const AdminDashboard: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [checkIns, setCheckIns] = useState<CheckInRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isEditingMember, setIsEditingMember] = useState(false);

  // Mock data - in production, this would come from your database
  useEffect(() => {
    const mockMembers: Member[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+63 912 345 6789',
        memberTier: 'premium',
        status: 'active',
        joinDate: '2024-01-15',
        lastVisit: '2024-01-20T10:30:00Z',
        totalVisits: 45,
        totalHours: 180,
        qrCode: 'MEMBER_001',
        paymentStatus: 'current'
      },
      {
        id: '2',
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        phone: '+63 912 345 6788',
        memberTier: 'basic',
        status: 'active',
        joinDate: '2024-01-10',
        lastVisit: '2024-01-19T14:20:00Z',
        totalVisits: 32,
        totalHours: 120,
        qrCode: 'MEMBER_002',
        paymentStatus: 'current'
      },
      {
        id: '3',
        name: 'Mike Chen',
        email: 'mike@example.com',
        phone: '+63 912 345 6787',
        memberTier: 'vip',
        status: 'active',
        joinDate: '2024-01-05',
        lastVisit: '2024-01-20T09:15:00Z',
        totalVisits: 58,
        totalHours: 240,
        qrCode: 'MEMBER_003',
        paymentStatus: 'current'
      },
      {
        id: '4',
        name: 'Ana Calubiran',
        email: 'ana@example.com',
        phone: '+63 912 345 6786',
        memberTier: 'vip',
        status: 'active',
        joinDate: '2024-01-08',
        lastVisit: '2024-01-18T16:45:00Z',
        totalVisits: 42,
        totalHours: 168,
        qrCode: 'MEMBER_004',
        paymentStatus: 'current'
      },
      {
        id: '5',
        name: 'David Kim',
        email: 'david@example.com',
        phone: '+63 912 345 6785',
        memberTier: 'premium',
        status: 'inactive',
        joinDate: '2024-01-12',
        lastVisit: '2024-01-15T11:30:00Z',
        totalVisits: 8,
        totalHours: 24,
        qrCode: 'MEMBER_005',
        paymentStatus: 'overdue'
      }
    ];

    const mockBookings: Booking[] = [
      {
        id: '1',
        memberId: '1',
        memberName: 'John Doe',
        date: '2024-01-21',
        startTime: '09:00',
        endTime: '17:00',
        workspace: 'Desk 1',
        status: 'confirmed',
        createdAt: '2024-01-20T10:00:00Z'
      },
      {
        id: '2',
        memberId: '3',
        memberName: 'Mike Chen',
        date: '2024-01-21',
        startTime: '10:00',
        endTime: '18:00',
        workspace: 'Desk 2',
        status: 'confirmed',
        createdAt: '2024-01-20T11:00:00Z'
      }
    ];

    const mockCheckIns: CheckInRecord[] = [
      {
        id: '1',
        memberId: '1',
        memberName: 'John Doe',
        checkInTime: '2024-01-20T09:00:00Z',
        checkOutTime: '2024-01-20T17:30:00Z',
        duration: 510,
        status: 'checked-out'
      },
      {
        id: '2',
        memberId: '3',
        memberName: 'Mike Chen',
        checkInTime: '2024-01-20T10:15:00Z',
        status: 'checked-in'
      }
    ];

    setMembers(mockMembers);
    setBookings(mockBookings);
    setCheckIns(mockCheckIns);
  }, []);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'premium': return 'bg-blue-100 text-blue-800';
      case 'basic': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === 'all' || member.memberTier === filterTier;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    
    return matchesSearch && matchesTier && matchesStatus;
  });

  const activeMembers = members.filter(m => m.status === 'active').length;
  const overduePayments = members.filter(m => m.paymentStatus === 'overdue').length;
  const currentlyIn = checkIns.filter(c => c.status === 'checked-in').length;
  const todayBookings = bookings.filter(b => b.date === new Date().toISOString().split('T')[0]).length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleAddMember = () => {
    setIsAddingMember(true);
    // In production, this would open a modal or navigate to add member page
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setIsEditingMember(true);
    // In production, this would open a modal or navigate to edit member page
  };

  const handleDeleteMember = (memberId: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      setMembers(members.filter(m => m.id !== memberId));
    }
  };

  const handleSuspendMember = (memberId: string) => {
    setMembers(members.map(m => 
      m.id === memberId 
        ? { ...m, status: m.status === 'suspended' ? 'active' : 'suspended' }
        : m
    ));
  };

  const handleGenerateQR = (member: Member) => {
    // In production, this would generate and display/download QR code
    alert(`Generating QR code for ${member.name} (${member.qrCode})`);
  };

  const handleExportData = () => {
    // In production, this would export data as CSV/Excel
    alert('Exporting data...');
  };

  const handleRefreshData = () => {
    // In production, this would refresh data from API
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage members, bookings, and monitor space usage
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleRefreshData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleExportData}>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button onClick={handleAddMember}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{activeMembers}</p>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{currentlyIn}</p>
                <p className="text-sm text-muted-foreground">Currently In</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{todayBookings}</p>
                <p className="text-sm text-muted-foreground">Today's Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{overduePayments}</p>
                <p className="text-sm text-muted-foreground">Overdue Payments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {overduePayments > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {overduePayments} member{overduePayments > 1 ? 's have' : ' has'} overdue payments. 
            <Button variant="link" className="p-0 h-auto ml-2">
              Review payments
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="members" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="checkins">Check-ins</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterTier} onValueChange={setFilterTier}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Members Table */}
          <Card>
            <CardHeader>
              <CardTitle>Members ({filteredMembers.length})</CardTitle>
              <CardDescription>
                Manage member accounts and view their activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Member</th>
                      <th className="text-left p-3 font-medium">Tier</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Payment</th>
                      <th className="text-left p-3 font-medium">Activity</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map(member => (
                      <tr key={member.id} className="border-b">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                            <p className="text-sm text-muted-foreground">{member.phone}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={getTierColor(member.memberTier)}>
                            {member.memberTier.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge className={getStatusColor(member.status)}>
                            {member.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge className={getPaymentStatusColor(member.paymentStatus)}>
                            {member.paymentStatus}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">
                            <p>{member.totalVisits} visits</p>
                            <p className="text-muted-foreground">{member.totalHours}h total</p>
                            <p className="text-muted-foreground">
                              Last: {formatDate(member.lastVisit)}
                            </p>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditMember(member)}
                              title="View/Edit Member"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleGenerateQR(member)}
                              title="Generate QR Code"
                            >
                              <QrCode className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleSuspendMember(member.id)}
                              title={member.status === 'suspended' ? 'Activate Member' : 'Suspend Member'}
                            >
                              {member.status === 'suspended' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteMember(member.id)}
                              title="Delete Member"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>
                Manage workspace bookings and reservations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium">{booking.memberName}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.workspace} • {booking.date} {booking.startTime}-{booking.endTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {booking.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Check-ins Tab */}
        <TabsContent value="checkins" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Check-ins</CardTitle>
              <CardDescription>
                Monitor member check-in/out activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {checkIns.map(checkIn => (
                  <div key={checkIn.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        checkIn.status === 'checked-in' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      <div>
                        <p className="font-medium">{checkIn.memberName}</p>
                        <p className="text-sm text-muted-foreground">
                          {checkIn.status === 'checked-in' 
                            ? `Checked in at ${formatTime(checkIn.checkInTime)}`
                            : `Checked out at ${formatTime(checkIn.checkOutTime!)} (${Math.floor((checkIn.duration || 0) / 60)}h ${(checkIn.duration || 0) % 60}m)`
                          }
                        </p>
                      </div>
                    </div>
                    <Badge className={
                      checkIn.status === 'checked-in' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }>
                      {checkIn.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">{members.length}</div>
                <div className="text-sm text-muted-foreground">Total Members</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{activeMembers}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{bookings.length}</div>
                <div className="text-sm text-muted-foreground">Total Bookings</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">{checkIns.length}</div>
                <div className="text-sm text-muted-foreground">Check-ins</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">{overduePayments}</div>
                <div className="text-sm text-muted-foreground">Overdue</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span>Member Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['basic', 'premium', 'vip'].map(tier => {
                    const count = members.filter(m => m.memberTier === tier).length;
                    const percentage = (count / members.length) * 100;
                    return (
                      <div key={tier} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge className={getTierColor(tier)}>
                            {tier.toUpperCase()}
                          </Badge>
                          <span>{count} members</span>
                        </div>
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Usage Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Check-ins Today</span>
                    <span className="font-semibold">{checkIns.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Session Length</span>
                    <span className="font-semibold">
                      {Math.round(checkIns.reduce((sum, c) => sum + (c.duration || 0), 0) / checkIns.length / 60)}h
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Peak Usage Hour</span>
                    <span className="font-semibold">2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Space Utilization</span>
                    <span className="font-semibold">
                      {Math.round((currentlyIn / 13) * 100)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
