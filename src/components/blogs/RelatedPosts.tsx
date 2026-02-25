import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/data/blogs';

interface RelatedPostsProps {
  posts: BlogPost[];
}

export const RelatedPosts = ({ posts }: RelatedPostsProps) => (
  <div>
    <h2 className="font-display text-2xl font-semibold text-foreground mb-8">
      More Articles
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post, i) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.08 }}
        >
          <Link to={`/blogs/${post.slug}`} className="block group">
            <div className="bg-card border border-border rounded-xl overflow-hidden card-hover shadow-card">
              <div className={`h-2 bg-gradient-to-r ${post.gradient}`} />
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border border-primary/20 text-xs font-semibold"
                  >
                    {post.tag}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
);
