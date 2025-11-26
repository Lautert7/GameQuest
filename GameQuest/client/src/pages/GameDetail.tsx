import { useRoute } from "wouter";
import { Navigation } from "@/components/Navigation";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/_core/hooks/useAuth";
import { Star, Trophy, Plus, Check } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function GameDetail() {
  const [, params] = useRoute("/game/:id");
  const gameId = params?.id ? parseInt(params.id) : 0;
  const { isAuthenticated } = useAuth();

  const { data, isLoading } = trpc.game.getById.useQuery({ id: gameId });
  const { data: achievements } = trpc.achievement.getByGame.useQuery({ gameId });
  const { data: reviews } = trpc.review.getByGame.useQuery({ gameId, limit: 10, offset: 0 });
  const { data: guides } = trpc.guide.getByGame.useQuery({ gameId });
  const { data: libraryEntry } = trpc.library.get.useQuery(
    { userId: undefined, status: undefined },
    { enabled: isAuthenticated }
  );

  const addToLibraryMutation = trpc.library.add.useMutation({
    onSuccess: () => {
      toast.success("Jogo adicionado à biblioteca!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const isInLibrary = libraryEntry?.some((entry) => entry.library.gameId === gameId);

  const handleAddToLibrary = () => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para adicionar jogos à biblioteca");
      return;
    }
    addToLibraryMutation.mutate({ gameId, status: "backlog" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-1 py-8">
          <div className="container">
            <Skeleton className="h-96 w-full rounded-lg mb-8" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </main>
      </div>
    );
  }

  if (!data || !data.game) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-1 py-8">
          <div className="container text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Jogo não encontrado</h1>
            <Button asChild>
              <Link href="/games">
                <a>Voltar para Jogos</a>
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const { game, platforms, tags } = data;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          {game.coverImageUrl ? (
            <>
              <img
                src={game.coverImageUrl}
                alt={game.title}
                className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20" />
          )}
          
          <div className="container relative h-full flex items-end pb-8">
            <div className="flex flex-col md:flex-row gap-8 items-end">
              {game.coverImageUrl && (
                <img
                  src={game.coverImageUrl}
                  alt={game.title}
                  className="w-48 h-64 object-cover rounded-lg shadow-2xl"
                />
              )}
              
              <div className="flex-1 space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold">{game.title}</h1>
                
                <div className="flex flex-wrap items-center gap-4">
                  {game.averageRating !== null && game.averageRating > 0 && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{(game.averageRating / 10).toFixed(1)}</span>
                    </div>
                  )}
                  
                  {game.totalAchievements !== null && game.totalAchievements > 0 && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm">
                      <Trophy className="h-4 w-4 text-primary" />
                      <span className="font-medium">{game.totalAchievements} conquistas</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {isInLibrary ? (
                    <Button disabled>
                      <Check className="h-4 w-4 mr-2" />
                      Na Biblioteca
                    </Button>
                  ) : (
                    <Button onClick={handleAddToLibrary} disabled={addToLibraryMutation.isPending}>
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar à Biblioteca
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                  <TabsTrigger value="achievements">
                    Conquistas {achievements && `(${achievements.length})`}
                  </TabsTrigger>
                  <TabsTrigger value="guides">
                    Guias {guides && `(${guides.length})`}
                  </TabsTrigger>
                  <TabsTrigger value="reviews">
                    Reviews {reviews && `(${reviews.length})`}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6">
                  {game.description && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Sobre</h2>
                      <p className="text-muted-foreground leading-relaxed">{game.description}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="achievements" className="mt-6">
                  {achievements && achievements.length > 0 ? (
                    <div className="space-y-4">
                      {achievements.map((achievement) => (
                        <Link key={achievement.id} href={`/achievement/${achievement.id}`}>
                          <a className="block p-4 rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-lg">
                            <div className="flex gap-4">
                              {achievement.iconUrl && (
                                <img
                                  src={achievement.iconUrl}
                                  alt={achievement.title}
                                  className="w-16 h-16 rounded-lg object-cover"
                                />
                              )}
                              <div className="flex-1">
                                <h3 className="font-semibold mb-1">{achievement.title}</h3>
                                {achievement.description && (
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {achievement.description}
                                  </p>
                                )}
                                <div className="flex items-center gap-2 mt-2">
                                  {achievement.points !== null && achievement.points > 0 && (
                                    <Badge variant="secondary">{achievement.points}G</Badge>
                                  )}
                                  {achievement.difficultyRating !== null && achievement.difficultyRating > 0 && (
                                    <Badge
                                      className={
                                        achievement.difficultyRating <= 3
                                          ? "difficulty-easy"
                                          : achievement.difficultyRating <= 6
                                          ? "difficulty-medium"
                                          : "difficulty-hard"
                                      }
                                    >
                                      Dificuldade: {achievement.difficultyRating}/10
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </a>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      Nenhuma conquista cadastrada ainda
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="guides" className="mt-6">
                  {guides && guides.length > 0 ? (
                    <div className="space-y-4">
                      {guides.map((guide) => (
                        <Link key={guide.guide.id} href={`/guide/${guide.guide.id}`}>
                          <a className="block p-4 rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-lg">
                            <h3 className="font-semibold mb-2">{guide.guide.title}</h3>
                            {guide.guide.description && (
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                {guide.guide.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Por {guide.user.name}</span>
                              <span>👍 {guide.guide.upvotes}</span>
                              <span>👁️ {guide.guide.views}</span>
                            </div>
                          </a>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      Nenhum guia disponível ainda
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  {reviews && reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div
                          key={review.review.id}
                          className="p-4 rounded-lg border border-border"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{review.user.name}</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm">{review.review.rating}/10</span>
                              </div>
                            </div>
                          </div>
                          {review.review.title && (
                            <h4 className="font-medium mb-2">{review.review.title}</h4>
                          )}
                          <p className="text-sm text-muted-foreground">{review.review.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      Nenhuma review ainda
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Info Card */}
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="font-semibold mb-4">Informações</h3>
                <div className="space-y-3 text-sm">
                  {game.developer && (
                    <div>
                      <span className="text-muted-foreground">Desenvolvedor:</span>
                      <p className="font-medium">{game.developer}</p>
                    </div>
                  )}
                  {game.publisher && (
                    <div>
                      <span className="text-muted-foreground">Publicadora:</span>
                      <p className="font-medium">{game.publisher}</p>
                    </div>
                  )}
                  {platforms.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Plataformas:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {platforms.map((platform) => (
                          <Badge key={platform.id} variant="secondary">
                            {platform.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {tags.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Tags:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {tags.map((tag) => (
                          <Badge key={tag.id} variant="outline">
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
