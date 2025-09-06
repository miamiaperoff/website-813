import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, Briefcase, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';
import Navigation from '@/components/Navigation';

type Profile = Tables<'profiles'>;

const Profile = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      // If no UUID provided or it's the literal ":uuid", use current user's ID
      let targetUserId = uuid;
      if (!targetUserId || targetUserId === ':uuid') {
        if (!user?.id) {
          setError('Please log in to view profiles');
          setLoading(false);
          return;
        }
        targetUserId = user.id;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', targetUserId)
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', error);
          setError('Failed to load profile');
          return;
        }

        if (!data) {
          setError('Profile not found');
          return;
        }

        setProfile(data);
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [uuid, user?.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMembershipStatusBadge = (status: string | null) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-primary text-primary-foreground"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />Unknown</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string | null) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-accent text-accent-foreground"><CheckCircle className="h-3 w-3 mr-1" />Paid</Badge>;
      case 'unpaid':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Unpaid</Badge>;
      default:
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-warm">
              <CardHeader>
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Skeleton className="h-32" />
                  <Skeleton className="h-32" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-coffee-dark hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-warm">
              <CardContent className="p-8 text-center">
                <User className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-serif text-coffee-dark mb-2">Profile Not Found</h2>
                <p className="text-muted-foreground mb-4">{error || 'The requested profile could not be found.'}</p>
                <Button onClick={() => navigate('/')} className="bg-primary hover:bg-coffee-dark">
                  Return Home
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-coffee-dark hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-warm">
            <CardHeader className="text-center pb-4">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-hero rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-primary-foreground" />
              </div>
              <CardTitle className="text-3xl font-serif text-coffee-dark">
                {profile.first_name} {profile.last_name}
              </CardTitle>
              <CardDescription className="text-lg">
                "{profile.nickname}"
              </CardDescription>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {getMembershipStatusBadge(profile.membership_status)}
                {getPaymentStatusBadge(profile.payment_status)}
                {profile.is_admin && (
                  <Badge className="bg-coffee-dark text-primary-foreground">
                    Admin
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-coffee-dark">
                      <Mail className="h-5 w-5" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.phone_number}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-sm">{profile.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.occupation}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Membership Details */}
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-coffee-dark">
                      <Calendar className="h-5 w-5" />
                      Membership Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Applied:</span>
                      <span className="ml-2">{formatDate(profile.applied_at)}</span>
                    </div>
                    {profile.approved_at && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Approved:</span>
                        <span className="ml-2">{formatDate(profile.approved_at)}</span>
                      </div>
                    )}
                    {profile.last_payment_date && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Last Payment:</span>
                        <span className="ml-2">{formatDate(profile.last_payment_date)}</span>
                      </div>
                    )}
                    <div className="text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="ml-2">{profile.is_active ? 'Active' : 'Inactive'}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Media */}
              {(profile.facebook || profile.instagram || profile.twitter || profile.linkedin) && (
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-coffee-dark">Social Media</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {profile.facebook && (
                        <a 
                          href={profile.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:text-coffee-dark transition-colors"
                        >
                          Facebook
                        </a>
                      )}
                      {profile.instagram && (
                        <a 
                          href={profile.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:text-coffee-dark transition-colors"
                        >
                          Instagram
                        </a>
                      )}
                      {profile.twitter && (
                        <a 
                          href={profile.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:text-coffee-dark transition-colors"
                        >
                          Twitter
                        </a>
                      )}
                      {profile.linkedin && (
                        <a 
                          href={profile.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:text-coffee-dark transition-colors"
                        >
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;