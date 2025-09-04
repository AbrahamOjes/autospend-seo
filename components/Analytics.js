import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Google Analytics implementation
export const GA_TRACKING_ID = 'UA-XXXXXXXXX-X'; // Replace with actual GA tracking ID

// Initialize Google Analytics
export const initGA = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
  });
};

// Track page views
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// Track specific events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// SEO Performance Tracking
export const trackSEOPerformance = (countrySlug, eventType) => {
  // Track country-specific events
  window.gtag('event', eventType, {
    event_category: 'SEO Performance',
    event_label: `Country: ${countrySlug}`,
  });
};

// Analytics Component to be included in _app.js
export default function Analytics() {
  const router = useRouter();

  useEffect(() => {
    // Initialize Google Analytics
    if (typeof window !== 'undefined') {
      window.gtag = function() {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', GA_TRACKING_ID);
    }

    // Track page views on route change
    const handleRouteChange = (url) => {
      pageview(url);
      
      // Track country-specific page views
      if (url.includes('/send-usdc-to/')) {
        const countrySlug = url.split('/').pop();
        trackSEOPerformance(countrySlug, 'page_view');
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return null;
}
