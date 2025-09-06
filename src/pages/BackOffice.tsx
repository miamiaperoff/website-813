import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Users, UserCheck, UserX, DollarSign, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MembersList } from '@/components/admin/MembersList';
import { MemberStats } from '@/components/admin/MemberStats';

interface Profile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  phone_number: string;
  address: string;
  occupation: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  membership_status: string;
  is_admin?: boolean;
  is_active: boolean;
  payment_status: string;
  last_payment_date?: string;
  applied_at: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

const BackOffice = () => {
  console.log('BackOffice component rendering');
  const [members, setMembers] = useState<Profile[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log('Auth effect - authLoading:', authLoading, 'user:', user);
    if (!authLoading && !user) {
      console.log('No user, redirecting to auth');
      navigate('/auth');
      return;
    }

    if (user) {
      console.log('User found, checking admin status');
      checkAdminStatus();
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchMembers();
    }
  }, [isAdmin]);

  useEffect(() => {
    filterMembers();
  }, [members, searchTerm, statusFilter, paymentFilter]);

  const checkAdminStatus = async () => {
    console.log('Checking admin status for user:', user?.id);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('user_id', user?.id)
        .single();

      console.log('Admin check result:', { data, error });

      if (error || !data?.is_admin) {
        console.log('Access denied - not admin');
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges to access this page.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error('Error checking admin status:', error);
      navigate('/');
    }
  };

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('applied_at', { ascending: false });

      if (error) throw error;

      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
      toast({
        title: "Error",
        description: "Failed to load member data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterMembers = () => {
    let filtered = members;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(member =>
        member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.occupation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(member => member.membership_status === statusFilter);
    }

    // Payment filter
    if (paymentFilter !== 'all') {
      filtered = filtered.filter(member => member.payment_status === paymentFilter);
    }

    setFilteredMembers(filtered);
  };

  const updateMemberStatus = async (memberId: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          membership_status: status,
          approved_at: status === 'approved' ? new Date().toISOString() : null,
        })
        .eq('id', memberId);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Member application ${status} successfully.`,
      });

      fetchMembers();
    } catch (error) {
      console.error('Error updating member status:', error);
      toast({
        title: "Error",
        description: "Failed to update member status.",
        variant: "destructive",
      });
    }
  };

  const toggleMemberActive = async (memberId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_active: !isActive })
        .eq('id', memberId);

      if (error) throw error;

      toast({
        title: "Member Status Updated",
        description: `Member ${!isActive ? 'activated' : 'deactivated'} successfully.`,
      });

      fetchMembers();
    } catch (error) {
      console.error('Error toggling member status:', error);
      toast({
        title: "Error",
        description: "Failed to update member status.",
        variant: "destructive",
      });
    }
  };

  const markPayment = async (memberId: string, status: 'paid' | 'unpaid' | 'overdue') => {
    try {
      const updateData: any = {
        payment_status: status,
      };

      if (status === 'paid') {
        updateData.last_payment_date = new Date().toISOString();
      }

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', memberId);

      if (error) throw error;

      toast({
        title: "Payment Status Updated",
        description: `Payment marked as ${status}.`,
      });

      fetchMembers();
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast({
        title: "Error",
        description: "Failed to update payment status.",
        variant: "destructive",
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-coffee-dark">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-coffee-dark hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-serif text-coffee-dark">Back Office</h1>
          </div>
        </div>

        <MemberStats members={members} />

        <Card className="shadow-warm mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-coffee-dark">
              Member Management
            </CardTitle>
            <CardDescription>
              Manage membership applications, payments, and member status
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Filters */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:col-span-2"
              />
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Members ({filteredMembers.length})</TabsTrigger>
                <TabsTrigger value="pending">
                  Pending ({members.filter(m => m.membership_status === 'pending').length})
                </TabsTrigger>
                <TabsTrigger value="approved">
                  Approved ({members.filter(m => m.membership_status === 'approved').length})
                </TabsTrigger>
                <TabsTrigger value="payments">
                  Payments ({members.filter(m => m.payment_status === 'unpaid' || m.payment_status === 'overdue').length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <MembersList 
                  members={filteredMembers}
                  onUpdateStatus={updateMemberStatus}
                  onToggleActive={toggleMemberActive}
                  onMarkPayment={markPayment}
                />
              </TabsContent>
              
              <TabsContent value="pending" className="mt-6">
                <MembersList 
                  members={filteredMembers.filter(m => m.membership_status === 'pending')}
                  onUpdateStatus={updateMemberStatus}
                  onToggleActive={toggleMemberActive}
                  onMarkPayment={markPayment}
                />
              </TabsContent>
              
              <TabsContent value="approved" className="mt-6">
                <MembersList 
                  members={filteredMembers.filter(m => m.membership_status === 'approved')}
                  onUpdateStatus={updateMemberStatus}
                  onToggleActive={toggleMemberActive}
                  onMarkPayment={markPayment}
                />
              </TabsContent>
              
              <TabsContent value="payments" className="mt-6">
                <MembersList 
                  members={filteredMembers.filter(m => m.payment_status === 'unpaid' || m.payment_status === 'overdue')}
                  onUpdateStatus={updateMemberStatus}
                  onToggleActive={toggleMemberActive}
                  onMarkPayment={markPayment}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BackOffice;