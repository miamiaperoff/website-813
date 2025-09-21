import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  Edit, 
  Trash2, 
  UserCheck, 
  UserX, 
  Mail, 
  Phone, 
  Calendar,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  RefreshCw
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

const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
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
      },
      {
        id: '5',
        name: 'David Kim',
        email: 'david@example.com',
        phone: '+63 912 345 6785',
        memberTier: 'flex',
        status: 'suspended',
        joinDate: '2024-01-08',
        lastVisit: '2024-01-15T11:30:00Z',
        totalVisits: 15,
        totalHours: 60,
        qrCode: 'MEMBER_005',
        paymentStatus: 'overdue',
        nextPaymentDate: '2024-01-08',
        monthlyFee: 5000
      }
    ];

    setMembers(mockMembers);
  }, []);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.qrCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === 'all' || member.memberTier === filterTier;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    const matchesPayment = filterPayment === 'all' || member.paymentStatus === filterPayment;
    return matchesSearch && matchesTier && matchesStatus && matchesPayment;
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

  const handleSendReminder = (member: Member) => {
    // In production, this would send an email/SMS reminder
    console.log(`Sending payment reminder to ${member.name} at ${member.email}`);
  };

  const stats = {
    total: members.length,
    active: members.filter(m => m.status === 'active').length,
    suspended: members.filter(m => m.status === 'suspended').length,
    overdue: members.filter(m => m.paymentStatus === 'overdue').length,
    totalRevenue: members.filter(m => m.status === 'active').reduce((sum, m) => sum + m.monthlyFee, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Member Management</h1>
          <p className="text-muted-foreground">Manage your coworking space members</p>
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
          <Button size="sm" onClick={() => setIsAddingMember(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Suspended</p>
                <p className="text-2xl font-bold text-red-600">{stats.suspended}</p>
              </div>
              <UserX className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-orange-600">{stats.overdue}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <CreditCard className="w-8 h-8 text-green-600" />
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
              placeholder="Search members by name, email, or member code..."
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
        <Select value={filterPayment} onValueChange={setFilterPayment}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by payment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value="current">Current</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
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
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <Badge className={getTierColor(member.memberTier)}>
                        {member.memberTier}
                      </Badge>
                      <Badge className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                      <Badge className={getPaymentStatusColor(member.paymentStatus)}>
                        {member.paymentStatus}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{member.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {formatDate(member.joinDate)}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-muted-foreground mt-2">
                      <div>
                        <span className="font-medium">QR Code:</span> {member.qrCode}
                      </div>
                      <div>
                        <span className="font-medium">Visits:</span> {member.totalVisits}
                      </div>
                      <div>
                        <span className="font-medium">Hours:</span> {member.totalHours}h
                      </div>
                      <div>
                        <span className="font-medium">Monthly Fee:</span> {formatCurrency(member.monthlyFee)}
                      </div>
                    </div>
                    {member.lastVisit && (
                      <div className="text-sm text-muted-foreground mt-1">
                        Last visit: {formatDate(member.lastVisit)} at {formatTime(member.lastVisit)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {member.paymentStatus === 'overdue' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendReminder(member)}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Send Reminder
                    </Button>
                  )}
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
            </CardContent>
          </Card>
        ))}
      </div>

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
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select value={selectedMember.status} onValueChange={(value) => setSelectedMember(prev => prev ? { ...prev, status: value as any } : null)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-payment">Payment Status</Label>
                <Select value={selectedMember.paymentStatus} onValueChange={(value) => setSelectedMember(prev => prev ? { ...prev, paymentStatus: value as any } : null)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
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

export default Members;
