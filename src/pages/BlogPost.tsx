import { useEffect, useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";
import { motion } from "framer-motion";
import { Clock, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthorBioCard } from "@/components/blogs/AuthorBioCard";
import { RelatedPosts } from "@/components/blogs/RelatedPosts";
import { getBlogBySlug, getRelatedPosts } from "@/data/blogs";
import { MaskRevealText } from "@/components/awake/MaskRevealText";
import { SanitizedHtml } from "@/lib/sanitize-html";
import { CollaborateCTA } from "@/components/awake/sections/CollaborateCTA";

const tintByTag: Record<string, string> = {
  Security: "#F4889A",       // pink
  Privacy: "#A484E9",        // purple
  Cloud: "#70B5FF",          // blue
  DevOps: "#FFAF68",         // orange
  AI: "#79D45E",             // green
  Infrastructure: "#F6E683", // yellow
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogBySlug(slug || "");

  const jsonLd = useMemo(() => {
    if (!post) return undefined;
    return [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        author: { "@type": "Person", name: post.author.name },
        datePublished: post.date,
        publisher: {
          "@type": "Organization",
          name: "ShubhzTechWork",
          logo: { "@type": "ImageObject", url: "https://services.shubhztechwork.com/logo.png" },
        },
        url: `https://services.shubhztechwork.com/blogs/${post.slug}`,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://services.shubhztechwork.com/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://services.shubhztechwork.com/blogs" },
          { "@type": "ListItem", position: 3, name: post.title },
        ],
      },
    ];
  }, [post]);

  usePageMeta({
    title: post ? post.metaTitle : "Blog | ShubhzTechWork",
    description: post ? post.metaDescription : undefined,
    canonicalPath: post ? `/blogs/${post.slug}` : "/blogs",
    ogType: "article",
    jsonLd,
  });

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!post) return <Navigate to="/blogs" replace />;
  const related = getRelatedPosts(post.slug);
  const tint = tintByTag[post.tag] ?? "#A484E9";

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Editorial hero, tinted band, huge serif-ital accent, centered */}
        <section
          className="relative pt-32 pb-20 md:pt-40 md:pb-24"
          style={{ background: `linear-gradient(180deg, ${tint}26 0%, transparent 100%)` }}
        >
          <div className="container-md">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to blog
            </Link>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className="pill" style={{ color: tint, borderColor: `${tint}55` }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: tint }} />
                {post.tag}
              </span>
              <span className="text-foreground/40">·</span>
              <span className="inline-flex items-center gap-1.5 text-sm text-foreground/60">
                <Clock className="h-3.5 w-3.5" /> {post.readTime}
              </span>
              <span className="text-foreground/40">·</span>
              <span className="text-sm text-foreground/60">{post.date}</span>
            </div>

            <h1 className="mt-8 text-[clamp(32px,5.5vw,72px)] font-display leading-[1.08] tracking-[-0.02em] max-w-4xl">
              <MaskRevealText immediate stagger={55}>{post.title}</MaskRevealText>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-8 max-w-2xl text-lg text-foreground/70 leading-relaxed"
            >
              {post.excerpt}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-12 flex items-center gap-4"
            >
              <span
                className="inline-flex h-14 w-14 items-center justify-center rounded-full font-semibold text-foreground"
                style={{ background: `${tint}40` }}
              >
                {post.author.initials}
              </span>
              <div>
                <p className="text-[15px] font-medium">{post.author.name}</p>
                <p className="text-sm text-foreground/60">{post.author.role}</p>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="hairline" />

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="container-sm py-20 md:py-28"
        >
          <SanitizedHtml html={post.content} className="prose-awake" />

          <div className="mt-20">
            <p className="eyebrow mb-5">Written by</p>
            <AuthorBioCard author={post.author} />
          </div>
        </motion.article>

        {related.length > 0 && (
          <section className="border-t border-foreground/10 py-20 md:py-28 bg-secondary">
            <div className="container-lg">
              <RelatedPosts posts={related} />
            </div>
          </section>
        )}

        <CollaborateCTA />
      </main>
      <Footer />
    </>
  );
};

export default BlogPostPage;
