import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Clock, Briefcase, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface JobListing {
  id: string;
  title: string;
  location: string | null;
  employment_type: string | null;
  description: string;
  created_at: string;
}

const markdownToHtml = (md: string): string => {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-2 text-foreground">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-8 mb-3 text-foreground">$1</h2>')
    .replace(/^\*\*(.+?)\*\*$/gm, '<p class="font-semibold text-foreground my-2">$1</p>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-muted-foreground">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 text-muted-foreground list-decimal">$2</li>')
    .replace(/(<li.*<\/li>\n?)+/g, (match) => {
      const isOrdered = match.includes('list-decimal');
      const tag = isOrdered ? 'ol' : 'ul';
      return `<${tag} class="list-disc space-y-1 my-2">${match}</${tag}>`;
    })
    .replace(/^---$/gm, '<hr class="my-6 border-border" />')
    .replace(/^(?!<[hluop]|<hr)(.+)$/gm, '<p class="text-muted-foreground my-2">$1</p>')
    .replace(/<p class="text-muted-foreground my-2"><\/p>/g, '');
};

const Careers = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [applyingTo, setApplyingTo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from('job_listings')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setJobs(data);
      if (data.length === 1) {
        setExpandedJob(data[0].id);
      }
    }
    setLoading(false);
  };

  const handleApply = async (jobId: string) => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from('job_applications').insert({
      job_listing_id: jobId,
      applicant_name: formData.name.trim(),
      applicant_email: formData.email.trim(),
      applicant_phone: formData.phone.trim() || null,
      cover_message: formData.message.trim(),
      status: 'new',
    });

    if (error) {
      toast({ title: 'Failed to submit application. Please try again.', variant: 'destructive' });
    } else {
      toast({ title: 'Application submitted successfully!' });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setApplyingTo(null);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Careers at 813</h1>
          <p className="text-lg text-muted-foreground">
            Join our team and help build something extraordinary.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading positions...</p>
        ) : jobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground text-lg">No open positions at the moment. Check back soon!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <CardHeader 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-3">{job.title}</CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> {job.location}
                          </span>
                        )}
                        {job.employment_type && (
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" /> {job.employment_type}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> Posted {new Date(job.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    {expandedJob === job.id ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </div>
                </CardHeader>

                {expandedJob === job.id && (
                  <CardContent className="border-t">
                    <div 
                      className="prose prose-sm max-w-none pt-4"
                      dangerouslySetInnerHTML={{ __html: markdownToHtml(job.description) }}
                    />

                    {/* Apply Section */}
                    <div className="mt-8 pt-6 border-t">
                      <h3 className="text-xl font-bold text-foreground mb-2">How to Apply</h3>
                      <p className="text-muted-foreground mb-4">
                        Send your resume and a short message explaining why you're the right person for this role. Keep it direct. Show how you solve problems.
                      </p>

                      {applyingTo === job.id ? (
                        <div className="space-y-4 bg-muted/30 p-6 rounded-lg">
                          <div>
                            <label className="text-sm font-medium text-foreground">Full Name *</label>
                            <Input
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Your full name"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground">Email *</label>
                            <Input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="you@email.com"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground">Phone</label>
                            <Input
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="Your phone number"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground">Why are you the right person? *</label>
                            <Textarea
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder="Tell us about yourself, your relevant experience, and why you want this role..."
                              rows={5}
                              className="mt-1"
                            />
                          </div>
                          <div className="flex gap-3">
                            <Button onClick={() => handleApply(job.id)} disabled={submitting}>
                              <Send className="w-4 h-4 mr-2" />
                              {submitting ? 'Submitting...' : 'Submit Application'}
                            </Button>
                            <Button variant="outline" onClick={() => setApplyingTo(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button onClick={() => setApplyingTo(job.id)} size="lg">
                          Apply for This Position
                        </Button>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Careers;
