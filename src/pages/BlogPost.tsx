import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
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

  useDocumentTitle(
    post ? post.metaTitle : 'Blog | ShubhzTechWork',
    post ? post.metaDescription : undefined
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Inject BlogPosting JSON-LD
  useEffect(() => {
    if (!post) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.metaDescription,
      author: { '@type': 'Person', name: post.author.name },
      datePublished: post.date,
      publisher: { '@type': 'Organization', name: 'ShubhzTechWork', logo: { '@type': 'ImageObject', url: 'https://services.shubhztechwork.com/logo.png' } },
      url: `https://services.shubhztechwork.com/blogs/${post.slug}`,
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [post]);

  // Inject BreadcrumbList JSON-LD
  useEffect(() => {
    if (!post) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://services.shubhztechwork.com/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://services.shubhztechwork.com/blogs' },
        { '@type': 'ListItem', position: 3, name: post.title },
      ],
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [post]);

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  const relatedPosts = getRelatedPosts(post.slug);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="pt-20">
        <article className="container mx-auto px-4 py-12">
          {/* Breadcrumb navigation */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link to="/blogs">Blog</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{post.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
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
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
