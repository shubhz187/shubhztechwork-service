import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { BlogAuthor } from '@/data/blogs';

interface AuthorBioCardProps {
  author: BlogAuthor;
}

export const AuthorBioCard = ({ author }: AuthorBioCardProps) => (
  <div className="bg-card border border-border rounded-xl p-6 flex items-start gap-5">
    <Avatar className="w-14 h-14 shrink-0">
      <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold text-lg">
        {author.initials}
      </AvatarFallback>
    </Avatar>
    <div>
      <p className="font-display font-semibold text-foreground text-lg">{author.name}</p>
      <p className="text-sm text-primary font-medium mb-2">{author.role}</p>
      <p className="text-muted-foreground text-sm leading-relaxed">{author.bio}</p>
    </div>
  </div>
);
