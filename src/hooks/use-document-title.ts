import { useEffect } from 'react';

const DEFAULT_TITLE = 'ShubhzTechWork - Simplifying Tech, Amplifying Growth';

export function useDocumentTitle(title: string, metaDescription?: string) {
  useEffect(() => {
    document.title = title;
    if (metaDescription) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', metaDescription);
    }
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title, metaDescription]);
}
