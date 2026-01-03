import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { dataService } from '@/lib/dataService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  Users, 
  LogOut,
  CheckCircle,
  XCircle,
  Coffee,
  Calendar,
  CreditCard,
  Search,
  Edit,
  Save,
  X,
  Trash2,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Member, Plan, SubscriptionPeriod, DrinkRedemption } from '@/lib/types';

const CoworkingAdmin: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [members, setMembers] = useState<Member[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [memberPeriods, setMemberPeriods] = useState<SubscriptionPeriod[]>([]);
  const [memberRedemptions, setMemberRedemptions] = useState<DrinkRedemption[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [editingPlan, setEditingPlan] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSettingPassword, setIsSettingPassword] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    planId: 'flex',
    status: 'active' as 'active' | 'inactive' | 'suspended',
    notes: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState<SubscriptionPeriod | null>(null);
  const [isPeriodDialogOpen, setIsPeriodDialogOpen] = useState(false);
  const [newPeriod, setNewPeriod] = useState({
    periodStart: '',
    periodEnd: '',
    isPaid: false,
    note: ''
  });

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
      const [membersData, plansData] = await Promise.all([
        dataService.getMembers(),
        dataService.getPlans()
      ]);

      setMembers(membersData);
      setPlans(plansData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load members',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadMemberDetails = async (member: Member) => {
    try {
      const [periods, redemptions] = await Promise.all([
        dataService.getSubscriptionPeriodsByMember(member.id),
        dataService.getMemberDrinkRedemptions(member.id, undefined, undefined)
      ]);

      // Get last 30 days redemptions
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentRedemptions = redemptions.filter(r => 
        new Date(r.redeemedAt) >= thirtyDaysAgo
      );

      setMemberPeriods(periods);
      setMemberRedemptions(recentRedemptions);
      setNotesValue(member.notes || '');
      setEditingNotes(false);
      setSelectedPlanId(member.planId);
      setEditingPlan(false);
    } catch (error) {
      console.error('Error loading member details:', error);
      toast({
        title: 'Error',
        description: 'Failed to load member details',
        variant: 'destructive'
      });
    }
  };

  const handleMemberClick = (member: Member) => {
    setSelectedMember(member);
    setIsDialogOpen(true);
    loadMemberDetails(member);
  };

  const handleSaveNotes = async () => {
    if (!selectedMember) return;

    setIsSaving(true);
    try {
      const updated = await dataService.updateMemberNotes(selectedMember.id, notesValue);
      if (updated) {
        setSelectedMember(updated);
        setMembers(prev => prev.map(m => m.id === updated.id ? updated : m));
        setEditingNotes(false);
        toast({
          title: 'Success',
          description: 'Notes updated successfully',
        });
      }
    } catch (error) {
      console.error('Error saving notes:', error);
      toast({
        title: 'Error',
        description: 'Failed to save notes',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePlan = async () => {
    if (!selectedMember) return;

    setIsSaving(true);
    try {
      const updated = await dataService.updateMember(selectedMember.id, { planId: selectedPlanId });
      if (updated) {
        setSelectedMember(updated);
        setMembers(prev => prev.map(m => m.id === updated.id ? updated : m));
        setEditingPlan(false);
        toast({
          title: 'Success',
          description: 'Plan updated successfully',
        });
      }
    } catch (error) {
      console.error('Error saving plan:', error);
      toast({
        title: 'Error',
        description: 'Failed to save plan',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSetPassword = async () => {
    if (!selectedMember) return;

    if (!newPassword || newPassword.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        variant: 'destructive'
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive'
      });
      return;
    }

    setIsSettingPassword(true);
    try {
      // Use Supabase signUp to create/update user account
      // This will create the auth user if it doesn't exist, or can be used to set initial password
      const { supabase } = await import('@/lib/supabase');
      
      // Try to sign up (creates user if doesn't exist)
      // Note: For existing users, you'll need a server-side endpoint with service role key
      const { error: signUpError } = await supabase.auth.signUp({
        email: selectedMember.email,
        password: newPassword,
        options: {
          data: {
            member_id: selectedMember.id,
            name: selectedMember.name
          },
          emailRedirectTo: undefined // Don't send confirmation email
        }
      });

      if (signUpError) {
        // If user already exists, we can't update password client-side
        // For production, this should use a server-side endpoint
        if (signUpError.message.includes('already registered')) {
          toast({
            title: 'Setup Required',
            description: 'Password cannot be changed client-side for existing users. Please create a Supabase Edge Function using the service role key to securely update passwords.',
            variant: 'destructive'
          });
        } else {
          throw signUpError;
        }
      } else {
        setIsPasswordDialogOpen(false);
        setNewPassword('');
        setConfirmPassword('');
        toast({
          title: 'Success',
          description: 'Password set successfully. The member can now log in with this password.',
        });
      }
    } catch (error: any) {
      console.error('Error setting password:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to set password. For production, implement a server-side endpoint using Supabase Admin API.',
        variant: 'destructive'
      });
    } finally {
      setIsSettingPassword(false);
    }
  };

  const handleTogglePayment = async (periodId: string, isPaid: boolean) => {
    try {
      const updated = await dataService.updatePeriodPayment(
        periodId,
        isPaid,
        user?.email || 'admin',
        isPaid ? 'Payment received' : 'Payment pending'
      );

      if (updated) {
        setMemberPeriods(prev => prev.map(p => p.id === periodId ? updated : p));
        toast({
          title: 'Success',
          description: `Payment marked as ${isPaid ? 'paid' : 'unpaid'}`,
        });
      }
    } catch (error) {
      console.error('Error updating payment:', error);
      toast({
        title: 'Error',
        description: 'Failed to update payment status',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteMember = async () => {
    if (!memberToDelete) return;

    setIsDeleting(true);
    try {
      const success = await dataService.deleteMember(memberToDelete.id);
      if (success) {
        setMembers(prev => prev.filter(m => m.id !== memberToDelete.id));
        setMemberToDelete(null);
        if (selectedMember?.id === memberToDelete.id) {
          setIsDialogOpen(false);
          setSelectedMember(null);
        }
        toast({
          title: 'Success',
          description: 'Member deleted successfully',
        });
      } else {
        throw new Error('Failed to delete member');
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete member',
        variant: 'destructive'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateMember = async () => {
    if (!newMember.name || !newMember.email) {
      toast({
        title: 'Error',
        description: 'Name and email are required',
        variant: 'destructive'
      });
      return;
    }

    setIsCreating(true);
    try {
      const created = await dataService.createMember({
        name: newMember.name,
        email: newMember.email,
        planId: newMember.planId,
        status: newMember.status,
        notes: newMember.notes || undefined
      });

      setMembers(prev => [created, ...prev]);
      setIsAddDialogOpen(false);
      setNewMember({
        name: '',
        email: '',
        planId: 'flex',
        status: 'active',
        notes: ''
      });
      toast({
        title: 'Success',
        description: 'Member created successfully',
      });
    } catch (error: any) {
      console.error('Error creating member:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create member. Email may already exist.',
        variant: 'destructive'
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleEditPeriod = (period: SubscriptionPeriod) => {
    setEditingPeriod(period);
    setNewPeriod({
      periodStart: period.periodStart.split('T')[0], // Extract date part
      periodEnd: period.periodEnd.split('T')[0],
      isPaid: period.isPaid,
      note: period.note || ''
    });
    setIsPeriodDialogOpen(true);
  };

  const handleCreatePeriod = () => {
    if (!selectedMember) return;
    
    setEditingPeriod(null);
    const today = new Date().toISOString().split('T')[0];
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const nextMonthStr = nextMonth.toISOString().split('T')[0];
    
    setNewPeriod({
      periodStart: today,
      periodEnd: nextMonthStr,
      isPaid: false,
      note: ''
    });
    setIsPeriodDialogOpen(true);
  };

  const handleSavePeriod = async () => {
    if (!selectedMember) return;
    
    if (!newPeriod.periodStart || !newPeriod.periodEnd) {
      toast({
        title: 'Error',
        description: 'Start and end dates are required',
        variant: 'destructive'
      });
      return;
    }

    const periodStart = new Date(newPeriod.periodStart);
    const periodEnd = new Date(newPeriod.periodEnd);
    periodStart.setHours(0, 0, 0, 0);
    periodEnd.setHours(23, 59, 59, 999);

    if (periodStart >= periodEnd) {
      toast({
        title: 'Error',
        description: 'End date must be after start date',
        variant: 'destructive'
      });
      return;
    }

    try {
      if (editingPeriod) {
        // Update existing period
        const updated = await dataService.updateSubscriptionPeriod(editingPeriod.id, {
          periodStart: periodStart.toISOString(),
          periodEnd: periodEnd.toISOString(),
          isPaid: newPeriod.isPaid,
          markedBy: user?.email || 'admin',
          note: newPeriod.note || undefined
        });
        
        if (updated) {
          setMemberPeriods(prev => prev.map(p => p.id === editingPeriod.id ? updated : p));
          toast({
            title: 'Success',
            description: 'Period updated successfully',
          });
        }
      } else {
        // Create new period
        const created = await dataService.createSubscriptionPeriod({
          memberId: selectedMember.id,
          periodStart: periodStart.toISOString(),
          periodEnd: periodEnd.toISOString(),
          isPaid: newPeriod.isPaid,
          markedBy: user?.email || 'admin',
          markedAt: new Date().toISOString(),
          note: newPeriod.note || undefined
        });
        
        setMemberPeriods(prev => [created, ...prev]);
        toast({
          title: 'Success',
          description: 'Subscription period created successfully',
        });
      }
      
      setIsPeriodDialogOpen(false);
      setEditingPeriod(null);
    } catch (error: any) {
      console.error('Error saving period:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save period',
        variant: 'destructive'
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPlanName = (planId: string) => {
    return plans.find(p => p.id === planId)?.name || planId;
  };

  const getNextPaymentDate = (periods: SubscriptionPeriod[]) => {
    const currentPeriod = periods.find(p => {
      const now = new Date();
      return new Date(p.periodStart) <= now && new Date(p.periodEnd) >= now;
    });
    return currentPeriod?.periodEnd || null;
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-serif font-bold text-primary">
                Club 813 Admin
              </h1>
              <p className="text-sm text-muted-foreground">Member Management</p>
            </div>
            <Button onClick={handleLogout} variant="ghost" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search members by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Member List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Members ({filteredMembers.length})</span>
              </CardTitle>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredMembers.map(member => {
                const memberPeriods = members.filter(m => m.id === member.id);
                // This is a placeholder - we'd need to fetch periods for each member
                // For now, just show the member info
                return (
                  <div
                    key={member.id}
                    onClick={() => handleMemberClick(member)}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                            {member.status}
                          </Badge>
                          <Badge variant="outline">
                            {getPlanName(member.planId)}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMemberClick(member);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMemberToDelete(member);
                          }}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredMembers.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No members found
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Member Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedMember?.name}</DialogTitle>
            <DialogDescription>{selectedMember?.email}</DialogDescription>
          </DialogHeader>

          {selectedMember && (
            <div className="space-y-6 mt-4">
              {/* Basic Info */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Basic Information</h3>
                  {editingPlan ? (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingPlan(false);
                          setSelectedPlanId(selectedMember.planId);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSavePlan}
                        disabled={isSaving}
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingPlan(true)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Plan
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant={selectedMember.status === 'active' ? 'default' : 'secondary'}>
                      {selectedMember.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Plan</span>
                    {editingPlan ? (
                      <Select
                        value={selectedPlanId}
                        onValueChange={setSelectedPlanId}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {plans.map(plan => (
                            <SelectItem key={plan.id} value={plan.id}>
                              {plan.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant="outline">{getPlanName(selectedMember.planId)}</Badge>
                    )}
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-muted-foreground">Password</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setNewPassword('');
                        setConfirmPassword('');
                        setIsPasswordDialogOpen(true);
                      }}
                    >
                      Set Password
                    </Button>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Notes</h3>
                  <div className="flex gap-2">
                    {!editingNotes ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingNotes(true)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingNotes(false);
                            setNotesValue(selectedMember.notes || '');
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleSaveNotes}
                          disabled={isSaving}
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setMemberToDelete(selectedMember)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
                {editingNotes ? (
                  <Textarea
                    value={notesValue}
                    onChange={(e) => setNotesValue(e.target.value)}
                    rows={4}
                    placeholder="Add notes about this member..."
                  />
                ) : (
                  <div className="p-3 bg-muted/50 rounded-lg min-h-[80px]">
                    <p className="text-sm whitespace-pre-wrap">
                      {selectedMember.notes || 'No notes'}
                    </p>
                  </div>
                )}
              </div>

              {/* Subscription Periods */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Subscription Periods</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCreatePeriod}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Period
                  </Button>
                </div>
                <div className="space-y-3">
                  {memberPeriods.length > 0 ? (
                    memberPeriods.map(period => (
                      <div key={period.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {formatDate(period.periodStart)} - {formatDate(period.periodEnd)}
                            </p>
                            {period.note && (
                              <p className="text-xs text-muted-foreground mt-1">{period.note}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditPeriod(period)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant={period.isPaid ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => handleTogglePayment(period.id, !period.isPaid)}
                            >
                              {period.isPaid ? (
                                <CheckCircle className="w-4 h-4 mr-1" />
                              ) : (
                                <XCircle className="w-4 h-4 mr-1" />
                              )}
                              {period.isPaid ? 'Paid' : 'Unpaid'}
                            </Button>
                          </div>
                        </div>
                        {period.markedAt && (
                          <p className="text-xs text-muted-foreground">
                            Updated: {formatDate(period.markedAt)} by {period.markedBy}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No subscription periods found</p>
                  )}
                </div>
              </div>

              {/* Next Payment */}
              {memberPeriods.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Next Payment</h3>
                  <p className="text-sm">
                    {formatDate(getNextPaymentDate(memberPeriods))}
                  </p>
                </div>
              )}

              {/* Voucher Redemptions */}
              <div>
                <h3 className="font-semibold mb-3">Daily Voucher Redemptions (Last 30 Days)</h3>
                <div className="space-y-2">
                  {memberRedemptions.length > 0 ? (
                    memberRedemptions.map(redemption => (
                      <div key={redemption.id} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                        <div>
                          <p className="text-sm font-medium">{formatDate(redemption.redeemedAt)}</p>
                          <p className="text-xs text-muted-foreground">
                            Voucher: {redemption.voucherId}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">₱{redemption.amount}</p>
                          <p className="text-xs text-muted-foreground">{redemption.cashier}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No redemptions in the last 30 days</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!memberToDelete} onOpenChange={(open) => !open && setMemberToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{memberToDelete?.name}</strong>? 
              This action cannot be undone and will also delete all associated subscription periods, 
              redemptions, and other related data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMember}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Member Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
            <DialogDescription>
              Create a new member account. The member will need to set up their password separately.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={newMember.name}
                onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Member name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={newMember.email}
                onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                placeholder="member@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="plan">Plan</Label>
              <Select
                value={newMember.planId}
                onValueChange={(value) => setNewMember(prev => ({ ...prev, planId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  {plans.map(plan => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={newMember.status}
                onValueChange={(value: 'active' | 'inactive' | 'suspended') => 
                  setNewMember(prev => ({ ...prev, status: value }))
                }
              >
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

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newMember.notes}
                onChange={(e) => setNewMember(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Optional notes about this member"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false);
                  setNewMember({
                    name: '',
                    email: '',
                    planId: 'flex',
                    status: 'active',
                    notes: ''
                  });
                }}
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateMember}
                disabled={isCreating || !newMember.name || !newMember.email}
              >
                {isCreating ? 'Creating...' : 'Create Member'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit/Create Subscription Period Dialog */}
      <Dialog open={isPeriodDialogOpen} onOpenChange={(open) => {
        setIsPeriodDialogOpen(open);
        if (!open) {
          setEditingPeriod(null);
        }
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingPeriod ? 'Edit Subscription Period' : 'Create Subscription Period'}
            </DialogTitle>
            <DialogDescription>
              {editingPeriod 
                ? 'Update the subscription period dates and payment status. The end date represents when the member is paid up until.'
                : 'Create a new subscription period for this member. The end date represents when the member is paid up until.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="periodStart">Start Date *</Label>
              <Input
                id="periodStart"
                type="date"
                value={newPeriod.periodStart}
                onChange={(e) => setNewPeriod(prev => ({ ...prev, periodStart: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="periodEnd">End Date (Paid Until) *</Label>
              <Input
                id="periodEnd"
                type="date"
                value={newPeriod.periodEnd}
                onChange={(e) => setNewPeriod(prev => ({ ...prev, periodEnd: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPaid"
                  checked={newPeriod.isPaid}
                  onChange={(e) => setNewPeriod(prev => ({ ...prev, isPaid: e.target.checked }))}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <Label htmlFor="isPaid" className="cursor-pointer">
                  Payment Received
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="periodNote">Note</Label>
              <Textarea
                id="periodNote"
                value={newPeriod.note}
                onChange={(e) => setNewPeriod(prev => ({ ...prev, note: e.target.value }))}
                placeholder="Optional note about this period"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsPeriodDialogOpen(false);
                  setEditingPeriod(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSavePeriod}
                disabled={!newPeriod.periodStart || !newPeriod.periodEnd}
              >
                {editingPeriod ? 'Update Period' : 'Create Period'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Set Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Set Password for {selectedMember?.name}</DialogTitle>
            <DialogDescription>
              Set a new password for this member. They will be able to use this password to log in.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password *</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 6 characters)"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsPasswordDialogOpen(false);
                  setNewPassword('');
                  setConfirmPassword('');
                }}
                disabled={isSettingPassword}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSetPassword}
                disabled={isSettingPassword || !newPassword || !confirmPassword}
              >
                {isSettingPassword ? 'Setting...' : 'Set Password'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoworkingAdmin;

