import { useDocumentTitle } from '@/hooks/use-document-title';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BlogsHeroPlayer } from '@/components/blogs/BlogsHeroPlayer';
import { BlogCard } from '@/components/blogs/BlogCard';
import { blogPosts } from '@/data/blogs';

const Blogs = () => {
  useDocumentTitle('Blog | ShubhzTechWork', 'Insights on SaaS security, cloud infrastructure, DevSecOps, and data privacy from the ShubhzTechWork team.');
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="pt-20">
        {/* Remotion Hero */}
        <section className="container mx-auto px-4 py-10">
          <BlogsHeroPlayer />
        </section>

        {/* Blog Cards Grid */}
        <section className="container mx-auto px-4 pb-12 md:pb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl font-semibold text-foreground mb-8"
          >
            Latest Articles
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {blogPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;
