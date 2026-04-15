import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation.clean';
import Footer from '@/components/Footer';

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'valid' | 'already' | 'invalid' | 'success' | 'error'>('loading');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!token) { setStatus('invalid'); return; }
    const validate = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        const res = await fetch(`${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${token}`, {
          headers: { apikey: anonKey },
        });
        const data = await res.json();
        if (!res.ok) { setStatus('invalid'); return; }
        if (data.valid === false && data.reason === 'already_unsubscribed') { setStatus('already'); return; }
        setStatus('valid');
      } catch { setStatus('error'); }
    };
    validate();
  }, [token]);

  const handleUnsubscribe = async () => {
    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('handle-email-unsubscribe', { body: { token } });
      if (error) { setStatus('error'); return; }
      if (data?.success) { setStatus('success'); }
      else if (data?.reason === 'already_unsubscribed') { setStatus('already'); }
      else { setStatus('error'); }
    } catch { setStatus('error'); }
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-52 pb-24 px-6 max-w-lg mx-auto text-center">
        {status === 'loading' && <p className="text-muted-foreground">Validating...</p>}
        {status === 'invalid' && (
          <>
            <h1 className="font-serif text-2xl text-foreground mb-4">Invalid Link</h1>
            <p className="text-muted-foreground text-sm">This unsubscribe link is invalid or has expired.</p>
          </>
        )}
        {status === 'valid' && (
          <>
            <h1 className="font-serif text-2xl text-foreground mb-4">Unsubscribe</h1>
            <p className="text-muted-foreground text-sm mb-8">Click below to unsubscribe from future emails.</p>
            <Button onClick={handleUnsubscribe} disabled={processing} variant="outline">
              {processing ? 'Processing...' : 'Confirm Unsubscribe'}
            </Button>
          </>
        )}
        {status === 'already' && (
          <>
            <h1 className="font-serif text-2xl text-foreground mb-4">Already Unsubscribed</h1>
            <p className="text-muted-foreground text-sm">You have already been unsubscribed.</p>
          </>
        )}
        {status === 'success' && (
          <>
            <h1 className="font-serif text-2xl text-foreground mb-4">Unsubscribed</h1>
            <p className="text-muted-foreground text-sm">You have been successfully unsubscribed.</p>
          </>
        )}
        {status === 'error' && (
          <>
            <h1 className="font-serif text-2xl text-foreground mb-4">Something went wrong</h1>
            <p className="text-muted-foreground text-sm">Please try again later.</p>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Unsubscribe;
