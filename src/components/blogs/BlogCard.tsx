import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/data/blogs';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export const BlogCard = ({ post, index }: BlogCardProps) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
  >
    <Link to={`/blogs/${post.slug}`} className="block group">
      <div className="bg-card border border-border rounded-xl overflow-hidden card-hover shadow-card">
        <div className={`h-3 bg-gradient-to-r ${post.gradient}`} />

        <div className="p-6">
          {/* Category + reading time */}
          <div className="flex items-center justify-between mb-4">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border border-primary/20 font-semibold"
            >
              {post.tag}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Author + date + CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center shrink-0">
                <span className="text-primary-foreground text-xs font-bold">
                  {post.author.initials}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{post.author.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
              Read <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  </motion.article>
);
