import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { GameCard } from "@/components/GameCard";
import { trpc } from "@/lib/trpc";
import { APP_TITLE, getLoginUrl } from "@/const";
import { 
  Gamepad2, 
  Trophy, 
  Map, 
  Users, 
  ArrowRight,
  Sparkles,
  Target,
  BookOpen,
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { data: games, isLoading } = trpc.game.list.useQuery({ limit: 8, offset: 0 });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/10" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
          
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Plataforma Social de Jogos
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                Conquiste, Compartilhe,{" "}
                <span className="gradient-text">Domine</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A plataforma definitiva para gerenciar sua biblioteca de jogos, desbloquear conquistas e compartilhar guias colaborativos com a comunidade.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {isAuthenticated ? (
                  <Button size="lg" asChild className="text-lg px-8">
                    <Link href="/games">
                      <a className="flex items-center gap-2">
                        Explorar Jogos
                        <ArrowRight className="h-5 w-5" />
                      </a>
                    </Link>
                  </Button>
                ) : (
                  <Button size="lg" asChild className="text-lg px-8">
                    <a href={getLoginUrl()}>
                      Começar Agora
                    </a>
                  </Button>
                )}
                <Button size="lg" variant="outline" asChild className="text-lg px-8">
                  <Link href="/games">
                    <a>Ver Jogos</a>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats Section */}
        <section id="stats" className="py-12 border-y border-border/40 bg-card/40">
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-bold tracking-tight">2.500+</p>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-[0.18em]">
                Jogos catalogados
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-bold tracking-tight">40k+</p>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-[0.18em]">
                Conquistas documentadas
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-bold tracking-tight">120k+</p>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-[0.18em]">
                Horas registradas
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-bold tracking-tight">98%</p>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-[0.18em]">
                dos jogadores recomendam
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-card/50">
          <div className="container space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">
                Tudo que você precisa em um só lugar
              </h2>
              <p className="text-muted-foreground text-lg">
                Centralize sua vida gamer: biblioteca, conquistas, guias avançados e comunidade em uma plataforma única.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Gamepad2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Biblioteca Pessoal</h3>
                <p className="text-muted-foreground">
                  Organize seus jogos por status, acompanhe horas jogadas, notas pessoais e backlog de forma visual.
                </p>
              </div>

              <div className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Conquistas Detalhadas</h3>
                <p className="text-muted-foreground">
                  Veja dificuldade média da comunidade, dicas textuais e visuais e marque o que já desbloqueou.
                </p>
              </div>

              <div className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Map className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Mapas Interativos</h3>
                <p className="text-muted-foreground">
                  Explore mapas com marcadores clicáveis, prints da comunidade e rotas otimizadas para 100%.
                </p>
              </div>

              <div className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Comunidade Ativa</h3>
                <p className="text-muted-foreground">
                  Siga outros jogadores, descubra novos jogos pelo feed e participe de rankings semanais de guias.
                </p>
              </div>
            </div>

            {/* How it works */}
            <div className="grid lg:grid-cols-3 gap-10 items-start">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Target className="h-4 w-4" />
                  Como funciona na prática
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  Do primeiro login ao 100% em poucos cliques
                </h3>
                <p className="text-muted-foreground">
                  {APP_TITLE} foi pensado para reduzir a fricção: em minutos você importa sua biblioteca, encontra conquistas prioritárias e começa a seguir guias otimizados pela comunidade.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-border bg-background/60 flex gap-3">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    1
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">Monte sua biblioteca</h4>
                    <p className="text-sm text-muted-foreground">
                      Adicione os jogos que você já jogou ou quer jogar, defina status e favoritos. Use filtros por plataforma, gênero e prioridade.
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-border bg-background/60 flex gap-3">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    2
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">Planeje suas conquistas</h4>
                    <p className="text-sm text-muted-foreground">
                      Veja quais conquistas são perdíveis, bugadas ou exigem grind pesado antes de começar, evitando retrabalho em campanhas longas.
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-border bg-background/60 flex gap-3">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    3
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">Siga guias visuais</h4>
                    <p className="text-sm text-muted-foreground">
                      Use mapas interativos, imagens marcadas e dicas rápidas para completar colecionáveis, segredos e finais alternativos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-border bg-background/60 flex gap-3">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    4
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">Registre seu progresso</h4>
                    <p className="text-sm text-muted-foreground">
                      Marque o que já conquistou, acompanhe horas jogadas e veja estatísticas pessoais por gênero, franquia ou plataforma.
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-border bg-background/60 flex gap-3">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    5
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">Compartilhe com a comunidade</h4>
                    <p className="text-sm text-muted-foreground">
                      Publique reviews, crie guias, compartilhe mapas e ajude outros jogadores. Receba feedback e suba nos rankings.
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-border bg-background/60 flex gap-3">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    6
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">Descubra o próximo jogo</h4>
                    <p className="text-sm text-muted-foreground">
                      Use recomendações da comunidade e filtros avançados para decidir qual será sua próxima platina ou 100%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Whom Section */}
        <section id="community" className="py-20">
          <div className="container space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold">Feito para todo tipo de jogador</h2>
              <p className="text-muted-foreground text-lg">
                Seja você caçador de conquistas, jogador casual de fim de semana ou criador de conteúdo, {APP_TITLE} se adapta ao seu jeito de jogar.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Trophy className="h-4 w-4" />
                  Completionistas
                </div>
                <h3 className="text-xl font-semibold">Platinadores & 100%</h3>
                <p className="text-sm text-muted-foreground">
                  Planeje platinas com segurança: identifique conquistas perdíveis, difíceis ou bugadas antes de começar, e siga rotas já testadas.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <BookOpen className="h-4 w-4" />
                  Criadores de guias
                </div>
                <h3 className="text-xl font-semibold">Autores & Streamers</h3>
                <p className="text-sm text-muted-foreground">
                  Organize guias complexos em passos visuais, com mapas, marcadores e dicas rápidas, e acompanhe visualizações e feedback da comunidade.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Users className="h-4 w-4" />
                  Jogadores casuais
                </div>
                <h3 className="text-xl font-semibold">Quem joga no próprio ritmo</h3>
                <p className="text-sm text-muted-foreground">
                 Guarde seus jogos favoritos, acompanhe o que está jogando e encontre recomendações sem precisar entrar em fóruns gigantes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Games Preview Section */}
        {!isLoading && games && games.length > 0 && (
          <section id="games" className="py-20">
            <div className="container">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">Jogos em Destaque</h2>
                  <p className="text-muted-foreground">Explore nossa crescente coleção de jogos</p>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/games">
                    <a className="flex items-center gap-2">
                      Ver Todos
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {games.slice(0, 8).map((game) => (
                  <GameCard
                    key={game.id}
                    id={game.id}
                    title={game.title}
                    coverImageUrl={game.coverImageUrl}
                    averageRating={game.averageRating}
                    totalAchievements={game.totalAchievements}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Knowledge & Guides Section */}
        <section id="guides" className="py-20 bg-card/60 border-t border-border/40">
          <div className="container grid lg:grid-cols-[1.4fr,1fr] gap-12 items-start">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <BookOpen className="h-4 w-4" />
                Guias colaborativos e mapas vivos
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Transforme conhecimento em conquistas desbloqueadas
              </h2>
              <p className="text-muted-foreground text-lg">
                Crie, edite e evolua guias junto com a comunidade. Cada conquista pode ter dicas textuais, imagens marcadas e feedback de quem realmente testou as estratégias.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Associe marcadores de mapa a conquistas específicas.</li>
                <li>• Use votos de dificuldade para calibrar seu planejamento.</li>
                <li>• Veja quais dicas foram marcadas como “funcionou” pela comunidade.</li>
                <li>• Acompanhe o histórico de versões dos seus próprios guias.</li>
              </ul>
            </div>

            <div className="space-y-4 rounded-2xl border border-border bg-background/60 p-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Um hub de conhecimento vivo
              </h3>
              <p className="text-sm text-muted-foreground">
                Em vez de dezenas de abas abertas com fóruns diferentes, concentre tudo o que você precisa em um só lugar: mapa, texto, imagens e comentários organizados por conquista.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                <div className="space-y-1">
                  <p className="text-base font-semibold">Guia completo</p>
                  <p>Resumo visual de toda a campanha com marcadores estratégicos.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-base font-semibold">Tips rápidas</p>
                  <p>Textos curtos focados no que realmente importa para não perder tempo.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!isAuthenticated && (
          <section className="py-20 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-3xl md:text-5xl font-bold">
                  Pronto para começar sua jornada?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Junte-se a milhares de jogadores que já estão usando {APP_TITLE} para gerenciar suas conquistas
                </p>
                <Button size="lg" asChild className="text-lg px-8">
                  <a href={getLoginUrl()} className="flex items-center gap-2">
                    Criar Conta Grátis
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section id="faq" className="py-16 border-t border-border/40">
          <div className="container grid lg:grid-cols-[1.2fr,1fr] gap-10">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">Dúvidas frequentes</h2>
              <p className="text-muted-foreground">
                Comece em poucos minutos. Se quiser, você pode usar apenas a biblioteca pessoal e ir explorando os recursos avançados aos poucos.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold">Preciso conectar alguma conta externa?</h3>
                  <p className="text-sm text-muted-foreground">
                    Não é obrigatório. Você pode gerenciar sua biblioteca manualmente e, no futuro, conectar integrações para sincronizar horas jogadas e conquistas.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Funciona só para um tipo de plataforma?</h3>
                  <p className="text-sm text-muted-foreground">
                    Não. {APP_TITLE} foi pensado para consoles, PC e portáteis. Use tags e filtros para separar suas plataformas favoritas.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Posso usar apenas para acompanhar backlog?</h3>
                  <p className="text-sm text-muted-foreground">
                    Sim. Muitos jogadores usam apenas a biblioteca e o status dos jogos. As partes de conquistas e guias ficam disponíveis quando você quiser se aprofundar.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card/60 p-6 space-y-4">
              <h3 className="text-lg font-semibold">Pronto para organizar sua vida gamer?</h3>
              <p className="text-sm text-muted-foreground">
                Crie sua conta gratuita, adicione alguns jogos e veja como é mais simples enxergar o que realmente vale a pena jogar agora.
              </p>
              <Button size="lg" asChild className="w-full justify-center">
                <a href={getLoginUrl()} className="flex items-center justify-center gap-2">
                  Começar agora
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 bg-card/50">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 {APP_TITLE}. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/about">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sobre
                </a>
              </Link>
              <Link href="/privacy">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacidade
                </a>
              </Link>
              <Link href="/terms">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Termos
                </a>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
