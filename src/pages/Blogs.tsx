import { useMemo } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/awake/sections/PageHero";
import { CollaborateCTA } from "@/components/awake/sections/CollaborateCTA";
import { BlogCard } from "@/components/blogs/BlogCard";
import { blogPosts } from "@/data/blogs";

const Blogs = () => {
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "ShubhzTechWork Blog",
      description: "Insights on SaaS security, cloud infrastructure, DevSecOps, and data privacy.",
      url: "https://services.shubhztechwork.com/blogs",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: blogPosts.map((post, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://services.shubhztechwork.com/blogs/${post.slug}`,
          name: post.title,
        })),
      },
    }),
    [],
  );

  usePageMeta({
    title: "Blog | ShubhzTechWork",
    description:
      "Insights on SaaS security, cloud infrastructure, DevSecOps, and data privacy from the ShubhzTechWork team.",
    canonicalPath: "/blogs",
    jsonLd,
  });

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Journal"
          title="Field notes from the infrastructure and AI frontier."
          accents={["field", "frontier"]}
          subtitle="Practical writeups from real engagements, security, cloud, observability, and what actually holds up when you ship to production."
        />

        <section className="py-16 md:py-24">
          <div className="container-lg">
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-display-4 font-display">
                <span className="serif-italic text-foreground/70">Latest</span> articles
              </h2>
              <span className="text-sm text-foreground/50">{blogPosts.length} posts</span>
            </div>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </div>
        </section>

        <CollaborateCTA />
      </main>
      <Footer />
    </>
  );
};

export default Blogs;
