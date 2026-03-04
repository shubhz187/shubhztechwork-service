import { useEffect } from 'react';

const SITE_URL = 'https://services.shubhztechwork.com';

const DEFAULTS = {
  title: 'ShubhzTechWork - Simplifying Tech, Amplifying Growth',
  description:
    'We provide cutting-edge technology solutions including full-stack development, cloud infrastructure, and database management to drive your business forward.',
  ogTitle: 'ShubhzTechWork - Simplifying Tech, Amplifying Growth',
  ogDescription:
    'We provide cutting-edge technology solutions including full-stack development, cloud infrastructure, security, and DevOps to drive your business forward.',
  ogType: 'website',
  ogUrl: `${SITE_URL}/`,
  twitterTitle: 'ShubhzTechWork - Simplifying Tech, Amplifying Growth',
  twitterDescription:
    'End-to-end technology solutions — from architecture to production. We build, secure, and scale the infrastructure your business runs on.',
};

export interface PageMeta {
  title: string;
  description?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  robots?: string;
  jsonLd?: object | object[];
}

function setMetaTag(selector: string, attr: string, value: string) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export function usePageMeta(meta: PageMeta) {
  useEffect(() => {
    // Title
    document.title = meta.title;

    // Description
    if (meta.description) {
      setMetaTag('meta[name="description"]', 'content', meta.description);
    }

    // Canonical
    const canonicalUrl = meta.canonicalPath
      ? `${SITE_URL}${meta.canonicalPath}`
      : DEFAULTS.ogUrl;
    setMetaTag('link[rel="canonical"]', 'href', canonicalUrl);

    // Open Graph
    setMetaTag('meta[property="og:title"]', 'content', meta.title);
    setMetaTag(
      'meta[property="og:description"]',
      'content',
      meta.description || DEFAULTS.ogDescription
    );
    setMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
    setMetaTag(
      'meta[property="og:type"]',
      'content',
      meta.ogType || 'website'
    );

    // Twitter Card
    setMetaTag('meta[name="twitter:title"]', 'content', meta.title);
    setMetaTag(
      'meta[name="twitter:description"]',
      'content',
      meta.description || DEFAULTS.twitterDescription
    );

    // Robots (create/remove dynamically)
    let robotsTag: HTMLMetaElement | null = null;
    if (meta.robots) {
      robotsTag = document.createElement('meta');
      robotsTag.name = 'robots';
      robotsTag.content = meta.robots;
      document.head.appendChild(robotsTag);
    }

    // JSON-LD (inject scripts with data attribute for cleanup)
    const scripts: HTMLScriptElement[] = [];
    if (meta.jsonLd) {
      const items = Array.isArray(meta.jsonLd) ? meta.jsonLd : [meta.jsonLd];
      items.forEach((data) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-page-meta', 'true');
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
        scripts.push(script);
      });
    }

    // Cleanup — restore defaults
    return () => {
      document.title = DEFAULTS.title;
      setMetaTag('meta[name="description"]', 'content', DEFAULTS.description);
      setMetaTag('link[rel="canonical"]', 'href', DEFAULTS.ogUrl);
      setMetaTag('meta[property="og:title"]', 'content', DEFAULTS.ogTitle);
      setMetaTag(
        'meta[property="og:description"]',
        'content',
        DEFAULTS.ogDescription
      );
      setMetaTag('meta[property="og:url"]', 'content', DEFAULTS.ogUrl);
      setMetaTag('meta[property="og:type"]', 'content', DEFAULTS.ogType);
      setMetaTag(
        'meta[name="twitter:title"]',
        'content',
        DEFAULTS.twitterTitle
      );
      setMetaTag(
        'meta[name="twitter:description"]',
        'content',
        DEFAULTS.twitterDescription
      );

      if (robotsTag) {
        robotsTag.remove();
      }

      scripts.forEach((s) => s.remove());
    };
  }, [
    meta.title,
    meta.description,
    meta.canonicalPath,
    meta.ogType,
    meta.robots,
    meta.jsonLd,
  ]);
}
