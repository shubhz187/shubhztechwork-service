import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AuthorBioCard } from '@/components/blogs/AuthorBioCard';
import { RelatedPosts } from '@/components/blogs/RelatedPosts';
import { BlogAnimation } from '@/components/blogs/BlogAnimation';
import { getBlogBySlug, getRelatedPosts } from '@/data/blogs';

const renderContent = (htmlContent: string) => {
  const parts = htmlContent.split(/%%ANIMATION:(\w+)%%/);
  return parts.map((part, i) => {
    if (i % 2 === 0) {
      return part ? <div key={i} dangerouslySetInnerHTML={{ __html: part }} /> : null;
    }
    return <BlogAnimation key={i} type={part} />;
  });
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogBySlug(slug || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  const relatedPosts = getRelatedPosts(post.slug);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <article className="container mx-auto px-4 py-12">
          {/* Back navigation */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>
          </motion.div>

          {/* Article header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-3xl mx-auto mb-10"
          >
            {/* Category + reading time */}
            <div className="flex items-center gap-3 mb-6">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border border-primary/20 font-semibold"
              >
                {post.tag}
              </Badge>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
              {post.title}
            </h1>

            {/* Author info */}
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold">
                  {post.author.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {post.author.role} &middot; {post.date}
                </p>
              </div>
            </div>
          </motion.header>

          {/* Gradient divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className={`h-1 rounded-full bg-gradient-to-r ${post.gradient}`} />
          </motion.div>

          {/* Article content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-3xl mx-auto blog-content"
          >
            {renderContent(post.content)}
          </motion.div>

          {/* Author bio */}
          <div className="max-w-3xl mx-auto mt-16">
            <Separator className="mb-10" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Written by
              </p>
              <AuthorBioCard author={post.author} />
            </motion.div>
          </div>

          {/* Related posts */}
          <div className="max-w-5xl mx-auto mt-16">
            <Separator className="mb-10" />
            <RelatedPosts posts={relatedPosts} />
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
