import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy } from "lucide-react";

interface GameCardProps {
  id: number;
  title: string;
  coverImageUrl?: string | null;
  averageRating?: number | null;
  totalAchievements?: number | null;
  tags?: Array<{ id: number; name: string }>;
}

export function GameCard({
  id,
  title,
  coverImageUrl,
  averageRating,
  totalAchievements,
  tags,
}: GameCardProps) {
  return (
    <Link href={`/game/${id}`}>
      <a className="block">
        <Card className="game-card group overflow-hidden">
          <div className="relative aspect-[3/4] overflow-hidden bg-muted">
            {coverImageUrl ? (
              <img
                src={coverImageUrl}
                alt={title}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                <Trophy className="h-16 w-16" />
              </div>
            )}
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Rating badge */}
            {averageRating !== null && averageRating !== undefined && averageRating > 0 && (
              <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-white">
                  {(averageRating / 10).toFixed(1)}
                </span>
              </div>
            )}
          </div>
          
          <CardContent className="p-4">
            <h3 className="font-semibold text-base line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              {totalAchievements !== null && totalAchievements !== undefined && (
                <div className="flex items-center gap-1">
                  <Trophy className="h-3.5 w-3.5" />
                  <span>{totalAchievements} conquistas</span>
                </div>
              )}
            </div>
            
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {tags.slice(0, 2).map((tag) => (
                  <Badge key={tag.id} variant="secondary" className="text-xs">
                    {tag.name}
                  </Badge>
                ))}
                {tags.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{tags.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
