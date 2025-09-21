import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ActivityLogService } from '@/services/activityLog';
import { 
  Users, 
  Clock, 
  DollarSign,
  UserCheck,
  AlertTriangle,
  Search,
  UserPlus,
  Edit,
  Trash2,
  RefreshCw,
  Activity,
  TrendingUp,
  BarChart3,
  Calendar,
  Coffee
} from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  memberTier: 'flex' | 'save' | 'growth' | 'resident';
  status: 'active' | 'inactive' | 'suspended';
  paymentStatus: 'current' | 'overdue' | 'pending';
  totalVisits: number;
  qrCode: string;
  monthlyFee: number;
}

interface CheckInRecord {
  id: string;
  memberName: string;
  checkInTime: string;
  status: 'checked-in' | 'checked-out';
}

const SimpleAdminDashboard: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [checkIns, setCheckIns] = useState<CheckInRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMember, setNewMember] = useState({ name: '', email: '', phone: '', tier: 'flex' });
  const [showActivityLog, setShowActivityLog] = useState(false);

  // Mock data
  useEffect(() => {
    const mockMembers: Member[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+63 912 345 6789',
        memberTier: 'growth',
        status: 'active',
        paymentStatus: 'current',
        totalVisits: 45,
        qrCode: 'MEMBER_001',
        monthlyFee: 4000
      },
      {
        id: '2',
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        phone: '+63 912 345 6788',
        memberTier: 'flex',
        status: 'active',
        paymentStatus: 'current',
        totalVisits: 32,
        qrCode: 'MEMBER_002',
        monthlyFee: 5000
      },
      {
        id: '3',
        name: 'Mike Chen',
        email: 'mike@example.com',
        phone: '+63 912 345 6787',
        memberTier: 'resident',
        status: 'active',
        paymentStatus: 'overdue',
        totalVisits: 58,
        qrCode: 'MEMBER_003',
        monthlyFee: 3500
      }
    ];

    const mockCheckIns: CheckInRecord[] = [
      {
        id: '1',
        memberName: 'John Doe',
        checkInTime: '2024-01-20T09:00:00Z',
        status: 'checked-in'
      },
      {
        id: '2',
        memberName: 'Sarah Wilson',
        checkInTime: '2024-01-20T10:30:00Z',
        status: 'checked-out'
      }
    ];

    setMembers(mockMembers);
    setCheckIns(mockCheckIns);
  }, []);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalMembers: members.length,
    currentlyIn: checkIns.filter(c => c.status === 'checked-in').length,
    overduePayments: members.filter(m => m.paymentStatus === 'overdue').length,
    monthlyRevenue: members.filter(m => m.status === 'active').reduce((sum, m) => sum + m.monthlyFee, 0)
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

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) return;

    const member: Member = {
      id: `member_${Date.now()}`,
      name: newMember.name,
      email: newMember.email,
      phone: newMember.phone,
      memberTier: newMember.tier as any,
      status: 'active',
      paymentStatus: 'current',
      totalVisits: 0,
      qrCode: `MEMBER_${String(members.length + 1).padStart(3, '0')}`,
      monthlyFee: newMember.tier === 'resident' ? 3500 : 
                  newMember.tier === 'growth' ? 4000 :
                  newMember.tier === 'save' ? 4500 : 5000
    };

    setMembers(prev => [...prev, member]);
    setNewMember({ name: '', email: '', phone: '', tier: 'flex' });
  };

  const handleDeleteMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const handleSuspendMember = (id: string) => {
    setMembers(prev => prev.map(m => 
      m.id === id ? { ...m, status: m.status === 'suspended' ? 'active' : 'suspended' } : m
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your coworking space</p>
        </div>
        <Button onClick={() => window.location.reload()}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold">{stats.totalMembers}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
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
                <p className="text-sm font-medium text-muted-foreground">Overdue Payments</p>
                <p className="text-2xl font-bold text-red-600">{stats.overduePayments}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.monthlyRevenue)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowActivityLog(true)}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Activity Log</p>
                <p className="text-2xl font-bold text-blue-600">{ActivityLogService.getActivityLogs().length}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Currently In */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-primary" />
            <span>Currently In ({stats.currentlyIn})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {checkIns.filter(c => c.status === 'checked-in').length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No members currently checked in</p>
          ) : (
            <div className="space-y-2">
              {checkIns.filter(c => c.status === 'checked-in').map(checkIn => (
                <div key={checkIn.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium">{checkIn.memberName}</p>
                    <p className="text-sm text-muted-foreground">
                      Since {new Date(checkIn.checkInTime).toLocaleTimeString()}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Checked In</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <span>Members ({members.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="mb-4">
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

          {/* Add Member */}
          <div className="mb-6 p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-3">Add New Member</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Input
                placeholder="Name"
                value={newMember.name}
                onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
              />
              <Input
                placeholder="Email"
                value={newMember.email}
                onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
              />
              <Input
                placeholder="Phone"
                value={newMember.phone}
                onChange={(e) => setNewMember(prev => ({ ...prev, phone: e.target.value }))}
              />
              <Button onClick={handleAddMember} disabled={!newMember.name || !newMember.email}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </div>
          </div>

          {/* Members List */}
          <div className="space-y-3">
            {filteredMembers.map(member => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold">{member.name}</h3>
                    <Badge className={getTierColor(member.memberTier)}>
                      {member.memberTier}
                    </Badge>
                    <Badge className={getPaymentStatusColor(member.paymentStatus)}>
                      {member.paymentStatus}
                    </Badge>
                    {member.status === 'suspended' && (
                      <Badge className="bg-red-100 text-red-800">Suspended</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                  <p className="text-sm text-muted-foreground">QR: {member.qrCode} • {member.totalVisits} visits</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSuspendMember(member.id)}
                  >
                    {member.status === 'suspended' ? 'Activate' : 'Suspend'}
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
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Log Dialog */}
      <Dialog open={showActivityLog} onOpenChange={setShowActivityLog}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-serif text-primary">
              📊 System Activity Log & Analytics
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Monitor all user activities and system statistics
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {(() => {
                const allLogs = ActivityLogService.getActivityLogs();
                const stats = ActivityLogService.getActivityStats();
                const memberLogs = ActivityLogService.getActivityLogsByRole('member');
                const adminLogs = ActivityLogService.getActivityLogsByRole('admin');
                
                return (
                  <>
                    <Card className="p-4 text-center">
                      <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h3 className="text-2xl font-bold text-primary">{stats.totalActivities}</h3>
                      <p className="text-sm text-muted-foreground">Total Activities</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <h3 className="text-2xl font-bold text-blue-500">{memberLogs.length}</h3>
                      <p className="text-sm text-muted-foreground">Member Activities</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <Activity className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <h3 className="text-2xl font-bold text-purple-500">{adminLogs.length}</h3>
                      <p className="text-sm text-muted-foreground">Admin Activities</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <Coffee className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <h3 className="text-2xl font-bold text-green-500">{stats.activitiesByCategory.voucher || 0}</h3>
                      <p className="text-sm text-muted-foreground">Voucher Redemptions</p>
                    </Card>
                  </>
                );
              })()}
            </div>

            {/* Activity Categories */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Activity by Category
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(ActivityLogService.getActivityStats().activitiesByCategory).map(([category, count]) => (
                  <Card key={category} className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      {category === 'login' && <Activity className="w-6 h-6 text-blue-500" />}
                      {category === 'voucher' && <Coffee className="w-6 h-6 text-green-500" />}
                      {category === 'checkin' && <UserCheck className="w-6 h-6 text-purple-500" />}
                      {category === 'payment' && <DollarSign className="w-6 h-6 text-yellow-500" />}
                      {!['login', 'voucher', 'checkin', 'payment'].includes(category) && <Clock className="w-6 h-6 text-gray-500" />}
                    </div>
                    <h3 className="text-xl font-bold text-primary">{count}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{category}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Recent Activities (Last 20)
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {ActivityLogService.getActivityLogs().slice(0, 20).map((log) => (
                  <Card key={log.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          log.category === 'login' ? 'bg-blue-500' :
                          log.category === 'voucher' ? 'bg-green-500' :
                          log.category === 'checkin' ? 'bg-purple-500' :
                          log.category === 'payment' ? 'bg-yellow-500' :
                          'bg-gray-500'
                        }`} />
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-foreground">{log.activity}</p>
                            <Badge className={log.userRole === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}>
                              {log.userRole}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{log.description}</p>
                          <p className="text-xs text-muted-foreground">User: {log.userName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {new Date(log.timestamp).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <Button 
                onClick={() => {
                  ActivityLogService.clearOldLogs(7); // Keep only last 7 days
                  setShowActivityLog(false);
                }} 
                variant="outline"
              >
                Clear Old Logs
              </Button>
              <Button 
                onClick={() => setShowActivityLog(false)} 
                variant="outline"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SimpleAdminDashboard;
