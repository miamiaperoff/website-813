import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  QrCode,
  DollarSign,
  Activity,
  MapPin,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  TrendingDown,
  UserCheck,
  UserX,
  Clock3,
  Zap
} from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  memberTier: 'flex' | 'save' | 'growth' | 'resident';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastVisit: string;
  totalVisits: number;
  totalHours: number;
  qrCode: string;
  paymentStatus: 'current' | 'overdue' | 'pending';
  nextPaymentDate?: string;
  monthlyFee: number;
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
  memberTier: string;
  checkInTime: string;
  checkOutTime?: string;
  duration?: number;
  status: 'checked-in' | 'checked-out';
  checkedInBy: 'staff' | 'self';
}

interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  currentlyIn: number;
  todayCheckIns: number;
  monthlyRevenue: number;
  overduePayments: number;
  averageVisitDuration: number;
  peakHours: string[];
}

const EnhancedAdminDashboard: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [checkIns, setCheckIns] = useState<CheckInRecord[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    activeMembers: 0,
    currentlyIn: 0,
    todayCheckIns: 0,
    monthlyRevenue: 0,
    overduePayments: 0,
    averageVisitDuration: 0,
    peakHours: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isEditingMember, setIsEditingMember] = useState(false);
  const [newMember, setNewMember] = useState<Partial<Member>>({});

  // Mock data - in production, this would come from your database
  useEffect(() => {
    const mockMembers: Member[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+63 912 345 6789',
        memberTier: 'growth',
        status: 'active',
        joinDate: '2024-01-15',
        lastVisit: '2024-01-20T10:30:00Z',
        totalVisits: 45,
        totalHours: 180,
        qrCode: 'MEMBER_001',
        paymentStatus: 'current',
        nextPaymentDate: '2024-02-15',
        monthlyFee: 4000
      },
      {
        id: '2',
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        phone: '+63 912 345 6788',
        memberTier: 'flex',
        status: 'active',
        joinDate: '2024-01-10',
        lastVisit: '2024-01-19T14:20:00Z',
        totalVisits: 32,
        totalHours: 120,
        qrCode: 'MEMBER_002',
        paymentStatus: 'current',
        nextPaymentDate: '2024-02-10',
        monthlyFee: 5000
      },
      {
        id: '3',
        name: 'Mike Chen',
        email: 'mike@example.com',
        phone: '+63 912 345 6787',
        memberTier: 'resident',
        status: 'active',
        joinDate: '2024-01-05',
        lastVisit: '2024-01-20T09:15:00Z',
        totalVisits: 58,
        totalHours: 240,
        qrCode: 'MEMBER_003',
        paymentStatus: 'current',
        nextPaymentDate: '2024-02-05',
        monthlyFee: 3500
      },
      {
        id: '4',
        name: 'Ana Calubiran',
        email: 'ana@813cafe.com',
        phone: '+63 970 961 7206',
        memberTier: 'resident',
        status: 'active',
        joinDate: '2024-01-01',
        lastVisit: '2024-01-20T08:00:00Z',
        totalVisits: 65,
        totalHours: 300,
        qrCode: 'ADMIN_001',
        paymentStatus: 'current',
        nextPaymentDate: '2024-02-01',
        monthlyFee: 3500
      },
      {
        id: '5',
        name: 'Lisa Park',
        email: 'lisa@example.com',
        phone: '+63 912 345 6786',
        memberTier: 'save',
        status: 'active',
        joinDate: '2024-01-12',
        lastVisit: '2024-01-18T16:45:00Z',
        totalVisits: 28,
        totalHours: 95,
        qrCode: 'MEMBER_004',
        paymentStatus: 'overdue',
        nextPaymentDate: '2024-01-12',
        monthlyFee: 4500
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
        workspace: 'Desk A1',
        status: 'confirmed',
        createdAt: '2024-01-20T10:00:00Z'
      },
      {
        id: '2',
        memberId: '2',
        memberName: 'Sarah Wilson',
        date: '2024-01-21',
        startTime: '10:00',
        endTime: '15:00',
        workspace: 'Desk B2',
        status: 'confirmed',
        createdAt: '2024-01-20T11:00:00Z'
      }
    ];

    const mockCheckIns: CheckInRecord[] = [
      {
        id: '1',
        memberId: '1',
        memberName: 'John Doe',
        memberTier: 'growth',
        checkInTime: '2024-01-20T09:00:00Z',
        status: 'checked-in',
        checkedInBy: 'self'
      },
      {
        id: '2',
        memberId: '2',
        memberName: 'Sarah Wilson',
        memberTier: 'flex',
        checkInTime: '2024-01-20T10:30:00Z',
        checkOutTime: '2024-01-20T16:00:00Z',
        duration: 330,
        status: 'checked-out',
        checkedInBy: 'staff'
      }
    ];

    setMembers(mockMembers);
    setBookings(mockBookings);
    setCheckIns(mockCheckIns);

    // Calculate stats
    const totalMembers = mockMembers.length;
    const activeMembers = mockMembers.filter(m => m.status === 'active').length;
    const currentlyIn = mockCheckIns.filter(c => c.status === 'checked-in').length;
    const todayCheckIns = mockCheckIns.filter(c => 
      new Date(c.checkInTime).toDateString() === new Date().toDateString()
    ).length;
    const monthlyRevenue = mockMembers
      .filter(m => m.status === 'active')
      .reduce((sum, m) => sum + m.monthlyFee, 0);
    const overduePayments = mockMembers.filter(m => m.paymentStatus === 'overdue').length;
    const averageVisitDuration = mockCheckIns
      .filter(c => c.duration)
      .reduce((sum, c) => sum + (c.duration || 0), 0) / mockCheckIns.filter(c => c.duration).length || 0;

    setStats({
      totalMembers,
      activeMembers,
      currentlyIn,
      todayCheckIns,
      monthlyRevenue,
      overduePayments,
      averageVisitDuration: Math.round(averageVisitDuration),
      peakHours: ['9:00 AM', '2:00 PM', '4:00 PM']
    });
  }, []);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.qrCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === 'all' || member.memberTier === filterTier;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'resident': return 'bg-purple-100 text-purple-800';
      case 'growth': return 'bg-blue-100 text-blue-800';
      case 'save': return 'bg-green-100 text-green-800';
      case 'flex': return 'bg-orange-100 text-orange-800';
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

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
    // In production, this would make an API call
    const newMemberData: Member = {
      id: `member_${Date.now()}`,
      name: newMember.name || '',
      email: newMember.email || '',
      phone: newMember.phone || '',
      memberTier: newMember.memberTier || 'flex',
      status: 'active',
      joinDate: new Date().toISOString(),
      lastVisit: '',
      totalVisits: 0,
      totalHours: 0,
      qrCode: `MEMBER_${String(members.length + 1).padStart(3, '0')}`,
      paymentStatus: 'current',
      nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      monthlyFee: newMember.memberTier === 'resident' ? 3500 : 
                  newMember.memberTier === 'growth' ? 4000 :
                  newMember.memberTier === 'save' ? 4500 : 5000
    };

    setMembers(prev => [...prev, newMemberData]);
    setNewMember({});
    setIsAddingMember(false);
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setIsEditingMember(true);
  };

  const handleUpdateMember = () => {
    if (selectedMember) {
      setMembers(prev => prev.map(m => m.id === selectedMember.id ? selectedMember : m));
      setIsEditingMember(false);
      setSelectedMember(null);
    }
  };

  const handleDeleteMember = (memberId: string) => {
    setMembers(prev => prev.filter(m => m.id !== memberId));
  };

  const handleSuspendMember = (memberId: string) => {
    setMembers(prev => prev.map(m => 
      m.id === memberId 
        ? { ...m, status: m.status === 'suspended' ? 'active' : 'suspended' }
        : m
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your coworking space and members</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm" onClick={() => setIsAddingMember(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold">{stats.totalMembers}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {stats.activeMembers} active
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Currently In</p>
                <p className="text-2xl font-bold">{stats.currentlyIn}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-muted-foreground">
                {stats.todayCheckIns} check-ins today
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.monthlyRevenue)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-muted-foreground">
                {stats.overduePayments} overdue payments
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Visit Duration</p>
                <p className="text-2xl font-bold">{stats.averageVisitDuration}m</p>
              </div>
              <Clock3 className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-muted-foreground">
                Peak hours: {stats.peakHours.join(', ')}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {stats.overduePayments > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You have {stats.overduePayments} members with overdue payments. 
            <Button variant="link" className="p-0 h-auto ml-2">
              View Details
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="members" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="checkins">Check-ins</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
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
                <SelectItem value="flex">Flex</SelectItem>
                <SelectItem value="save">Save</SelectItem>
                <SelectItem value="growth">Growth</SelectItem>
                <SelectItem value="resident">Resident</SelectItem>
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

          {/* Members List */}
          <div className="grid gap-4">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <p className="text-muted-foreground">{member.email}</p>
                        <p className="text-sm text-muted-foreground">
                          Joined {formatDate(member.joinDate)} • {member.totalVisits} visits • {member.totalHours}h total
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getTierColor(member.memberTier)}>
                        {member.memberTier}
                      </Badge>
                      <Badge className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                      <Badge className={getPaymentStatusColor(member.paymentStatus)}>
                        {member.paymentStatus}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditMember(member)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSuspendMember(member.id)}
                        >
                          {member.status === 'suspended' ? (
                            <UserCheck className="w-4 h-4" />
                          ) : (
                            <UserX className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteMember(member.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Check-ins Tab */}
        <TabsContent value="checkins" className="space-y-6">
          <div className="grid gap-4">
            {checkIns.map((checkIn) => (
              <Card key={checkIn.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        checkIn.status === 'checked-in' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      <div>
                        <h3 className="font-semibold">{checkIn.memberName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {checkIn.status === 'checked-in' 
                            ? `Checked in at ${formatTime(checkIn.checkInTime)}`
                            : `Checked out at ${formatTime(checkIn.checkOutTime!)} (${checkIn.duration}m)`
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getTierColor(checkIn.memberTier)}>
                        {checkIn.memberTier}
                      </Badge>
                      <Badge variant="outline">
                        {checkIn.checkedInBy}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-6">
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Calendar className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold">{booking.memberName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(booking.date)} • {booking.startTime} - {booking.endTime}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Workspace: {booking.workspace}
                        </p>
                      </div>
                    </div>
                    <Badge className={
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }>
                      {booking.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Member Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['resident', 'growth', 'save', 'flex'].map(tier => {
                    const count = members.filter(m => m.memberTier === tier).length;
                    const percentage = (count / members.length) * 100;
                    return (
                      <div key={tier} className="flex items-center justify-between">
                        <span className="capitalize">{tier}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['resident', 'growth', 'save', 'flex'].map(tier => {
                    const tierMembers = members.filter(m => m.memberTier === tier);
                    const revenue = tierMembers.reduce((sum, m) => sum + m.monthlyFee, 0);
                    return (
                      <div key={tier} className="flex items-center justify-between">
                        <span className="capitalize">{tier}</span>
                        <span className="font-medium">{formatCurrency(revenue)}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Member Dialog */}
      <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
            <DialogDescription>
              Add a new member to your coworking space
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newMember.name || ''}
                  onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newMember.email || ''}
                  onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={newMember.phone || ''}
                onChange={(e) => setNewMember(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="tier">Member Tier</Label>
              <Select value={newMember.memberTier || ''} onValueChange={(value) => setNewMember(prev => ({ ...prev, memberTier: value as any }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flex">Flex Plan (₱5,000/month)</SelectItem>
                  <SelectItem value="save">Save Plan (₱4,500/3 months)</SelectItem>
                  <SelectItem value="growth">Growth Plan (₱4,000/6 months)</SelectItem>
                  <SelectItem value="resident">Resident Plan (₱3,500/12 months)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddingMember(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMember}>
                Add Member
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={isEditingMember} onOpenChange={setIsEditingMember}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>
              Update member information
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedMember.name}
                    onChange={(e) => setSelectedMember(prev => prev ? { ...prev, name: e.target.value } : null)}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={selectedMember.email}
                    onChange={(e) => setSelectedMember(prev => prev ? { ...prev, email: e.target.value } : null)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={selectedMember.phone}
                  onChange={(e) => setSelectedMember(prev => prev ? { ...prev, phone: e.target.value } : null)}
                />
              </div>
              <div>
                <Label htmlFor="edit-tier">Member Tier</Label>
                <Select value={selectedMember.memberTier} onValueChange={(value) => setSelectedMember(prev => prev ? { ...prev, memberTier: value as any } : null)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flex">Flex Plan</SelectItem>
                    <SelectItem value="save">Save Plan</SelectItem>
                    <SelectItem value="growth">Growth Plan</SelectItem>
                    <SelectItem value="resident">Resident Plan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditingMember(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateMember}>
                  Update Member
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedAdminDashboard;
