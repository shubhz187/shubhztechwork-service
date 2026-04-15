import DOMPurify from "dompurify";
import { useEffect, useRef } from "react";

interface Props { html: string; className?: string; }

/** Renders sanitized HTML content. DOMPurify handles escape of all untrusted HTML.
 *  Strips legacy %%ANIMATION:...%% markers first.
 */
export const SanitizedHtml = ({ html, className }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const clean = DOMPurify.sanitize(html.replace(/%%ANIMATION:\w+%%/g, ""));
    // DOMPurify output is safe per library contract.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ref.current as any).innerHTML = clean;
  }, [html]);
  return <div className={className} ref={ref} />;
};
