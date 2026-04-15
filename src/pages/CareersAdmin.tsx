import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/authContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Mail, Phone, Calendar, User, FileText } from 'lucide-react';

interface Application {
  id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string | null;
  cover_message: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  job_listing: { title: string } | null;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  reviewing: 'bg-yellow-100 text-yellow-800',
  interview: 'bg-purple-100 text-purple-800',
  hired: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const CareersAdmin = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [notes, setNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { toast } = useToast();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      navigate('/auth');
    }
  }, [auth.isLoading, auth.isAuthenticated, navigate]);

  useEffect(() => {
    if (auth.isAuthenticated) fetchApplications();
  }, [auth.isAuthenticated]);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from('job_applications')
      .select('*, job_listing:job_listings(title)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setApplications(data as unknown as Application[]);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('job_applications')
      .update({ status })
      .eq('id', id);

    if (!error) {
      toast({ title: `Status updated to ${status}` });
      fetchApplications();
      if (selectedApp?.id === id) setSelectedApp({ ...selectedApp, status });
    }
  };

  const saveNotes = async (id: string) => {
    const { error } = await supabase
      .from('job_applications')
      .update({ notes })
      .eq('id', id);

    if (!error) {
      toast({ title: 'Notes saved' });
      fetchApplications();
    }
  };

  const filtered = filterStatus === 'all' 
    ? applications 
    : applications.filter(a => a.status === filterStatus);

  if (auth.isLoading) return <div className="flex items-center justify-center min-h-screen"><p>Loading...</p></div>;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Applications Manager</h1>
            <p className="text-muted-foreground">{applications.length} total applications</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'new', 'reviewing', 'interview', 'hired', 'rejected'].map((s) => (
            <Button
              key={s}
              variant={filterStatus === s ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
              {s !== 'all' && (
                <span className="ml-1 text-xs">
                  ({applications.filter(a => a.status === s).length})
                </span>
              )}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications List */}
          <div className="lg:col-span-1 space-y-3 max-h-[75vh] overflow-y-auto">
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : filtered.length === 0 ? (
              <p className="text-muted-foreground">No applications found.</p>
            ) : (
              filtered.map((app) => (
                <Card
                  key={app.id}
                  className={`cursor-pointer hover:bg-muted/50 transition-colors ${selectedApp?.id === app.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => { setSelectedApp(app); setNotes(app.notes || ''); }}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-semibold text-foreground text-sm">{app.applicant_name}</p>
                      <Badge className={statusColors[app.status] || ''}>{app.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{app.job_listing?.title || 'Unknown position'}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(app.created_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Application Detail */}
          <div className="lg:col-span-2">
            {selectedApp ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{selectedApp.applicant_name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{selectedApp.job_listing?.title}</p>
                    </div>
                    <Select value={selectedApp.status} onValueChange={(v) => updateStatus(selectedApp.id, v)}>
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="reviewing">Reviewing</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="hired">Hired</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a href={`mailto:${selectedApp.applicant_email}`} className="text-primary hover:underline">
                        {selectedApp.applicant_email}
                      </a>
                    </div>
                    {selectedApp.applicant_phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedApp.applicant_phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Applied {new Date(selectedApp.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {selectedApp.cover_message && (
                    <div>
                      <h4 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4" /> Cover Message
                      </h4>
                      <div className="bg-muted/30 p-4 rounded-lg text-sm text-foreground whitespace-pre-wrap">
                        {selectedApp.cover_message}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                      <User className="w-4 h-4" /> Internal Notes
                    </h4>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add internal notes about this applicant..."
                      rows={4}
                    />
                    <Button className="mt-2" size="sm" onClick={() => saveNotes(selectedApp.id)}>
                      Save Notes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-16 text-center">
                  <p className="text-muted-foreground">Select an application to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersAdmin;
