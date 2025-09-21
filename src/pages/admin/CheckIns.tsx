import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  UserCheck, 
  UserX, 
  Calendar,
  TrendingUp,
  Activity,
  BarChart3,
  Download,
  RefreshCw,
  MapPin,
  Timer
} from 'lucide-react';

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
  workspace?: string;
}

interface CheckInStats {
  totalCheckIns: number;
  currentlyIn: number;
  averageDuration: number;
  peakHours: string[];
  mostActiveMembers: Array<{ name: string; visits: number }>;
  dailyBreakdown: Array<{ date: string; checkIns: number; hours: number }>;
}

const CheckIns: React.FC = () => {
  const [checkIns, setCheckIns] = useState<CheckInRecord[]>([]);
  const [stats, setStats] = useState<CheckInStats>({
    totalCheckIns: 0,
    currentlyIn: 0,
    averageDuration: 0,
    peakHours: [],
    mostActiveMembers: [],
    dailyBreakdown: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('today');
  const [filterTier, setFilterTier] = useState('all');

  // Mock data - in production, this would come from your database
  useEffect(() => {
    const mockCheckIns: CheckInRecord[] = [
      {
        id: '1',
        memberId: '1',
        memberName: 'John Doe',
        memberTier: 'growth',
        checkInTime: '2024-01-20T09:00:00Z',
        status: 'checked-in',
        checkedInBy: 'self',
        workspace: 'Desk A1'
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
        checkedInBy: 'staff',
        workspace: 'Desk B2'
      },
      {
        id: '3',
        memberId: '3',
        memberName: 'Mike Chen',
        memberTier: 'resident',
        checkInTime: '2024-01-20T08:15:00Z',
        checkOutTime: '2024-01-20T17:30:00Z',
        duration: 555,
        status: 'checked-out',
        checkedInBy: 'self',
        workspace: 'Desk C3'
      },
      {
        id: '4',
        memberId: '4',
        memberName: 'Lisa Park',
        memberTier: 'save',
        checkInTime: '2024-01-20T11:00:00Z',
        status: 'checked-in',
        checkedInBy: 'staff',
        workspace: 'Desk D4'
      },
      {
        id: '5',
        memberId: '1',
        memberName: 'John Doe',
        memberTier: 'growth',
        checkInTime: '2024-01-19T09:30:00Z',
        checkOutTime: '2024-01-19T15:45:00Z',
        duration: 375,
        status: 'checked-out',
        checkedInBy: 'self',
        workspace: 'Desk A1'
      },
      {
        id: '6',
        memberId: '2',
        memberName: 'Sarah Wilson',
        memberTier: 'flex',
        checkInTime: '2024-01-19T14:00:00Z',
        checkOutTime: '2024-01-19T18:30:00Z',
        duration: 270,
        status: 'checked-out',
        checkedInBy: 'self',
        workspace: 'Desk B2'
      }
    ];

    setCheckIns(mockCheckIns);

    // Calculate stats
    const totalCheckIns = mockCheckIns.length;
    const currentlyIn = mockCheckIns.filter(c => c.status === 'checked-in').length;
    const completedCheckIns = mockCheckIns.filter(c => c.duration);
    const averageDuration = completedCheckIns.length > 0 
      ? Math.round(completedCheckIns.reduce((sum, c) => sum + (c.duration || 0), 0) / completedCheckIns.length)
      : 0;

    // Calculate most active members
    const memberVisits = mockCheckIns.reduce((acc, checkIn) => {
      acc[checkIn.memberName] = (acc[checkIn.memberName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostActiveMembers = Object.entries(memberVisits)
      .map(([name, visits]) => ({ name, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 5);

    // Calculate daily breakdown
    const dailyBreakdown = mockCheckIns.reduce((acc, checkIn) => {
      const date = new Date(checkIn.checkInTime).toDateString();
      if (!acc[date]) {
        acc[date] = { date, checkIns: 0, hours: 0 };
      }
      acc[date].checkIns += 1;
      if (checkIn.duration) {
        acc[date].hours += checkIn.duration;
      }
      return acc;
    }, {} as Record<string, { date: string; checkIns: number; hours: number }>);

    setStats({
      totalCheckIns,
      currentlyIn,
      averageDuration,
      peakHours: ['9:00 AM', '2:00 PM', '4:00 PM'],
      mostActiveMembers,
      dailyBreakdown: Object.values(dailyBreakdown).slice(-7) // Last 7 days
    });
  }, []);

  const filteredCheckIns = checkIns.filter(checkIn => {
    const matchesSearch = checkIn.memberName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || checkIn.status === filterStatus;
    const matchesTier = filterTier === 'all' || checkIn.memberTier === filterTier;
    
    let matchesDate = true;
    if (filterDate === 'today') {
      const today = new Date().toDateString();
      matchesDate = new Date(checkIn.checkInTime).toDateString() === today;
    } else if (filterDate === 'week') {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      matchesDate = new Date(checkIn.checkInTime) >= weekAgo;
    }

    return matchesSearch && matchesStatus && matchesTier && matchesDate;
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
      case 'checked-in': return 'bg-green-100 text-green-800';
      case 'checked-out': return 'bg-gray-100 text-gray-800';
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleForceCheckOut = (checkInId: string) => {
    setCheckIns(prev => prev.map(c => 
      c.id === checkInId 
        ? { 
            ...c, 
            status: 'checked-out' as const,
            checkOutTime: new Date().toISOString(),
            duration: Math.floor((new Date().getTime() - new Date(c.checkInTime).getTime()) / (1000 * 60))
          }
        : c
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Check-in Management</h1>
          <p className="text-muted-foreground">Monitor member check-ins and workspace usage</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Check-ins</p>
                <p className="text-2xl font-bold">{stats.totalCheckIns}</p>
              </div>
              <Activity className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Currently In</p>
                <p className="text-2xl font-bold text-green-600">{stats.currentlyIn}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Duration</p>
                <p className="text-2xl font-bold text-blue-600">{formatDuration(stats.averageDuration)}</p>
              </div>
              <Timer className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Peak Hours</p>
                <p className="text-sm font-bold text-orange-600">{stats.peakHours.join(', ')}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by member name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="checked-in">Checked In</SelectItem>
            <SelectItem value="checked-out">Checked Out</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterDate} onValueChange={setFilterDate}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
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
      </div>

      {/* Main Content */}
      <Tabs defaultValue="checkins" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="checkins">Check-ins</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
        </TabsList>

        {/* Check-ins Tab */}
        <TabsContent value="checkins" className="space-y-6">
          <div className="grid gap-4">
            {filteredCheckIns.map((checkIn) => (
              <Card key={checkIn.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        checkIn.status === 'checked-in' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg">{checkIn.memberName}</h3>
                          <Badge className={getTierColor(checkIn.memberTier)}>
                            {checkIn.memberTier}
                          </Badge>
                          <Badge className={getStatusColor(checkIn.status)}>
                            {checkIn.status}
                          </Badge>
                          <Badge variant="outline">
                            {checkIn.checkedInBy}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>In: {formatTime(checkIn.checkInTime)}</span>
                          </div>
                          {checkIn.checkOutTime && (
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>Out: {formatTime(checkIn.checkOutTime)}</span>
                            </div>
                          )}
                          {checkIn.duration && (
                            <div className="flex items-center space-x-1">
                              <Timer className="w-4 h-4" />
                              <span>Duration: {formatDuration(checkIn.duration)}</span>
                            </div>
                          )}
                        </div>
                        {checkIn.workspace && (
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                            <MapPin className="w-4 h-4" />
                            <span>Workspace: {checkIn.workspace}</span>
                          </div>
                        )}
                        <div className="text-sm text-muted-foreground mt-1">
                          {formatDate(checkIn.checkInTime)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {checkIn.status === 'checked-in' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleForceCheckOut(checkIn.id)}
                        >
                          <UserX className="w-4 h-4 mr-2" />
                          Force Check-out
                        </Button>
                      )}
                    </div>
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
                <CardTitle>Most Active Members</CardTitle>
                <CardDescription>Members with the most check-ins</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.mostActiveMembers.map((member, index) => (
                    <div key={member.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="font-medium">{member.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{member.visits} visits</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Activity</CardTitle>
                <CardDescription>Check-ins and hours over the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.dailyBreakdown.map((day, index) => (
                    <div key={day.date} className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{formatDate(day.date)}</span>
                        <p className="text-sm text-muted-foreground">{day.checkIns} check-ins</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium">{formatDuration(day.hours)}</span>
                        <p className="text-sm text-muted-foreground">total hours</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Workspace Tab */}
        <TabsContent value="workspace" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workspace Occupancy</CardTitle>
              <CardDescription>Current workspace usage and availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {['Desk A1', 'Desk B2', 'Desk C3', 'Desk D4'].map(workspace => {
                  const isOccupied = checkIns.some(c => c.workspace === workspace && c.status === 'checked-in');
                  return (
                    <div key={workspace} className={`p-4 rounded-lg border ${
                      isOccupied ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{workspace}</span>
                        <div className={`w-3 h-3 rounded-full ${
                          isOccupied ? 'bg-red-500' : 'bg-green-500'
                        }`} />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {isOccupied ? 'Occupied' : 'Available'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CheckIns;
