import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { 
  User, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Check, 
  X, 
  DollarSign,
  ToggleLeft,
  ToggleRight,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
  is_active: boolean;
  payment_status: string;
  last_payment_date?: string;
  applied_at: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

interface MembersListProps {
  members: Profile[];
  onUpdateStatus: (memberId: string, status: 'approved' | 'rejected') => void;
  onToggleActive: (memberId: string, isActive: boolean) => void;
  onMarkPayment: (memberId: string, status: 'paid' | 'unpaid' | 'overdue') => void;
}

export const MembersList = ({ 
  members, 
  onUpdateStatus, 
  onToggleActive, 
  onMarkPayment 
}: MembersListProps) => {
  const [expandedMembers, setExpandedMembers] = useState<Set<string>>(new Set());

  const toggleExpanded = (memberId: string) => {
    const newExpanded = new Set(expandedMembers);
    if (newExpanded.has(memberId)) {
      newExpanded.delete(memberId);
    } else {
      newExpanded.add(memberId);
    }
    setExpandedMembers(newExpanded);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-600">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-600">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="outline" className="text-green-600 border-green-600">Paid</Badge>;
      case 'unpaid':
        return <Badge variant="outline" className="text-gray-600 border-gray-600">Unpaid</Badge>;
      case 'overdue':
        return <Badge variant="outline" className="text-red-600 border-red-600">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (members.length === 0) {
    return (
      <div className="text-center py-8">
        <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No members found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {members.map((member) => {
        const isExpanded = expandedMembers.has(member.id);
        
        return (
          <Card key={member.id} className="shadow-sm">
            <Collapsible>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-coffee-dark">
                          {member.first_name} {member.last_name}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          (@{member.nickname})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(member.membership_status)}
                        {getPaymentBadge(member.payment_status)}
                        <Badge variant="outline" className={member.is_active ? 'text-green-600 border-green-600' : 'text-gray-600 border-gray-600'}>
                          {member.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpanded(member.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </CollapsibleTrigger>
                      
                      {/* Status Actions */}
                      {member.membership_status === 'pending' && (
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onUpdateStatus(member.id, 'approved')}
                            className="text-green-600 border-green-600 hover:bg-green-50"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onUpdateStatus(member.id, 'rejected')}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      
                      {/* Active Toggle */}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onToggleActive(member.id, member.is_active)}
                      >
                        {member.is_active ? (
                          <ToggleRight className="h-5 w-5 text-green-600" />
                        ) : (
                          <ToggleLeft className="h-5 w-5 text-gray-400" />
                        )}
                      </Button>
                      
                      {/* Payment Actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline">
                            <DollarSign className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => onMarkPayment(member.id, 'paid')}>
                            Mark as Paid
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onMarkPayment(member.id, 'unpaid')}>
                            Mark as Unpaid
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onMarkPayment(member.id, 'overdue')}>
                            Mark as Overdue
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{member.phone_number}</span>
                      </div>
                      
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="flex-1">{member.address}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span>{member.occupation}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Applied {formatDistanceToNow(new Date(member.applied_at), { addSuffix: true })}</span>
                      </div>
                      
                      {member.approved_at && (
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-600" />
                          <span>Approved {formatDistanceToNow(new Date(member.approved_at), { addSuffix: true })}</span>
                        </div>
                      )}
                      
                      {member.last_payment_date && (
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span>Last payment {formatDistanceToNow(new Date(member.last_payment_date), { addSuffix: true })}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">Social Media</h4>
                      <div className="space-y-2 text-sm">
                        {member.instagram && (
                          <div>
                            <span className="font-medium">Instagram:</span> {member.instagram}
                          </div>
                        )}
                        {member.facebook && (
                          <div>
                            <span className="font-medium">Facebook:</span> {member.facebook}
                          </div>
                        )}
                        {member.twitter && (
                          <div>
                            <span className="font-medium">Twitter:</span> {member.twitter}
                          </div>
                        )}
                        {member.linkedin && (
                          <div>
                            <span className="font-medium">LinkedIn:</span> {member.linkedin}
                          </div>
                        )}
                        {!member.instagram && !member.facebook && !member.twitter && !member.linkedin && (
                          <span className="text-muted-foreground">No social media provided</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
};