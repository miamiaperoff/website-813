import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Clock, Briefcase, ChevronDown, ChevronUp, Send, Paperclip, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/Navigation.clean';
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
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-semibold mt-6 mb-2 text-foreground">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold mt-8 mb-3 text-foreground">$1</h2>')
    .replace(/^\*\*(.+?)\*\*$/gm, '<p class="font-semibold text-foreground my-2">$1</p>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-muted-foreground text-sm">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 text-muted-foreground text-sm list-decimal">$2</li>')
    .replace(/(<li.*<\/li>\n?)+/g, (match) => {
      const isOrdered = match.includes('list-decimal');
      const tag = isOrdered ? 'ol' : 'ul';
      return `<${tag} class="list-disc space-y-1 my-2">${match}</${tag}>`;
    })
    .replace(/^---$/gm, '<hr class="my-6 border-border" />')
    .replace(/^(?!<[hluop]|<hr)(.+)$/gm, '<p class="text-muted-foreground text-sm my-2">$1</p>')
    .replace(/<p class="text-muted-foreground text-sm my-2"><\/p>/g, '');
};

const Careers = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [applyingTo, setApplyingTo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from('job_listings')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (!error && data) {
      setJobs(data);
      if (data.length === 1) setExpandedJob(data[0].id);
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

      <div className="pt-32 pb-24 px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground italic mb-4">
            Careers
          </h1>
          <div className="w-16 h-px bg-foreground/20 mx-auto mb-6" />
          <p className="text-sm text-muted-foreground">
            Join our team and help build something extraordinary.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground text-sm">Loading positions...</p>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 border border-border">
            <p className="text-muted-foreground">No open positions at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {jobs.map((job) => (
              <div key={job.id} className="border border-border">
                <button
                  className="w-full text-left p-6 hover:bg-muted/30 transition-colors"
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-serif text-xl font-medium text-foreground mb-2">{job.title}</h2>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground tracking-wide">
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> {job.location}
                          </span>
                        )}
                        {job.employment_type && (
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-3.5 h-3.5" /> {job.employment_type}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> Posted {new Date(job.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    {expandedJob === job.id ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                </button>

                {expandedJob === job.id && (
                  <div className="px-6 pb-6 border-t border-border">
                    <div
                      className="prose prose-sm max-w-none pt-6"
                      dangerouslySetInnerHTML={{ __html: markdownToHtml(job.description) }}
                    />

                    <div className="mt-10 pt-6 border-t border-border">
                      <h3 className="text-xs tracking-[0.2em] uppercase font-semibold text-foreground mb-2">How to Apply</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Send your resume and a short message explaining why you're the right person for this role.
                      </p>

                      {applyingTo === job.id ? (
                        <div className="space-y-4 bg-muted/20 p-6 border border-border">
                          <div>
                            <label className="text-xs font-medium text-foreground uppercase tracking-wider">Full Name *</label>
                            <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your full name" className="mt-1" />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-foreground uppercase tracking-wider">Email *</label>
                            <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@email.com" className="mt-1" />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-foreground uppercase tracking-wider">Phone</label>
                            <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Your phone number" className="mt-1" />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-foreground uppercase tracking-wider">Why are you the right person? *</label>
                            <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about yourself..." rows={5} className="mt-1" />
                          </div>
                          <div className="flex gap-3">
                            <Button onClick={() => handleApply(job.id)} disabled={submitting} className="bg-primary text-primary-foreground hover:bg-primary/90">
                              <Send className="w-4 h-4 mr-2" />
                              {submitting ? 'Submitting...' : 'Submit Application'}
                            </Button>
                            <Button variant="outline" onClick={() => setApplyingTo(null)}>Cancel</Button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setApplyingTo(job.id)}
                          className="text-xs tracking-[0.2em] uppercase font-medium text-foreground border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
                        >
                          Apply for This Position
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Careers;
