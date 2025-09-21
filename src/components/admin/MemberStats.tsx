import { Users, UserCheck, UserX, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Profile {
  membership_status: 'pending' | 'approved' | 'rejected';
  is_active: boolean;
  payment_status: 'paid' | 'unpaid' | 'overdue';
}

interface MemberStatsProps {
  members: {
    membership_status: string;
    is_active: boolean;
    payment_status: string;
  }[];
}

export const MemberStats = ({ members }: MemberStatsProps) => {
  const stats = {
    total: members.length,
    pending: members.filter(m => m.membership_status === 'pending').length,
    approved: members.filter(m => m.membership_status === 'approved').length,
    active: members.filter(m => m.is_active && m.membership_status === 'approved').length,
    paid: members.filter(m => m.payment_status === 'paid').length,
    unpaid: members.filter(m => m.payment_status === 'unpaid' || m.payment_status === 'overdue').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="shadow-warm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-coffee-dark">{stats.total}</div>
          <p className="text-xs text-muted-foreground">All registered members</p>
        </CardContent>
      </Card>

      <Card className="shadow-warm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
          <UserX className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <p className="text-xs text-muted-foreground">Awaiting approval</p>
        </CardContent>
      </Card>

      <Card className="shadow-warm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Members</CardTitle>
          <UserCheck className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <p className="text-xs text-muted-foreground">Approved and active</p>
        </CardContent>
      </Card>

      <Card className="shadow-warm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Payment Issues</CardTitle>
          <DollarSign className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats.unpaid}</div>
          <p className="text-xs text-muted-foreground">Unpaid or overdue</p>
        </CardContent>
      </Card>
    </div>
  );
};