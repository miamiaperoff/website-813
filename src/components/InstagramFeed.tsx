import { useEffect } from 'react';
import { FaInstagram } from 'react-icons/fa';

const ELFSIGHT_WIDGET_ID = 'elfsight-app-placeholder'; // Replace with your Elfsight widget ID

const InstagramFeed = () => {
  useEffect(() => {
    // Load Elfsight script once
    if (!document.querySelector('script[src*="elfsight.com"]')) {
      const script = document.createElement('script');
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="bg-background">
      {/* Header */}
      <div className="text-center py-16 px-6">
        <a
          href="https://www.instagram.com/813.cafe/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 group"
        >
          <FaInstagram className="w-6 h-6 text-foreground group-hover:text-muted-foreground transition-colors" />
          <span className="text-xs tracking-[0.3em] uppercase font-medium text-foreground group-hover:text-muted-foreground transition-colors">
            Follow @813.cafe
          </span>
        </a>
      </div>

      {/* Elfsight Instagram Widget */}
      <div className="w-full px-0">
        <div className={ELFSIGHT_WIDGET_ID} />
      </div>
    </section>
  );
};

export default InstagramFeed;
