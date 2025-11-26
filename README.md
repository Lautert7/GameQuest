# GameQuest - Plataforma Social de Jogos e Conquistas

Uma plataforma social completa e production-ready para gerenciamento de biblioteca de jogos, conquistas detalhadas, guias colaborativos com mapas interativos e recursos sociais.

## 🎮 Funcionalidades Principais

### 1. Biblioteca Pessoal de Jogos
- Organize jogos por status: jogando, concluído, backlog, favoritos, wishlist
- Acompanhe horas jogadas e avaliação pessoal
- Sincronização preparada para APIs futuras

### 2. Sistema de Jogos Completo
- Listagem com paginação
- Detalhes completos: capa, plataformas, tags, reviews
- Avaliação da comunidade
- Estatísticas detalhadas

### 3. Conquistas Detalhadas
- Nome, descrição, ícone e pontos
- Dificuldade votada pela comunidade (1-10)
- Tempo estimado de conclusão
- Marcadores: perdível, bugada, grind, fácil
- Guias textuais e visuais
- Comentários com sistema de votação
- Sistema "essa dica funcionou?"

### 4. Mapas Interativos e Guias Avançados
- Upload de mapas (imagens)
- Marcadores clicáveis associados a conquistas
- Cada marcador com: título, descrição, imagem, dica rápida
- Sistema de versões com histórico
- Visualizações e upvotes

### 5. Recursos Sociais
- Perfis personalizados com bio e avatar
- Sistema de seguir usuários
- Feed de atividades (reviews, conquistas, guias)
- Ranking semanal de melhores guias
- Notificações de atividades

### 6. Sistema de Busca
- Busca por jogo, conquista e usuário
- Filtros por gênero, plataforma e dificuldade
- Sugestões automáticas
- Resultados rápidos e relevantes

## ♿ Acessibilidade (WCAG AA)

Sistema completo de acessibilidade implementado:

- ✅ Navegação completa por teclado
- ✅ Foco visível em todos os elementos interativos
- ✅ ARIA labels estruturadas
- ✅ Modo de alto contraste
- ✅ Modos de daltonismo (Protanopia, Deuteranopia, Tritanopia)
- ✅ Ajuste de tamanho de fonte (Normal, Grande, Muito Grande)
- ✅ Redução de movimento para usuários sensíveis
- ✅ Alternativas textuais para todas as imagens
- ✅ Layout responsivo sem dependência de hover
- ✅ Elementos interativos com tamanho mínimo de 44x44px

## 🏗️ Arquitetura Técnica

### Stack Tecnológica

**Frontend:**
- React 19
- TypeScript
- Tailwind CSS 4
- tRPC 11 (type-safe API)
- Wouter (routing)
- shadcn/ui (componentes)

**Backend:**
- Node.js 22
- Express 4
- tRPC 11
- Drizzle ORM
- MySQL/TiDB

**Autenticação:**
- OAuth
- JWT com refresh tokens
- Session cookies seguros

**Storage:**
- S3 para upload de imagens e mapas
- Metadata no banco de dados

### Estrutura do Banco de Dados

18 tabelas relacionais:

1. **users** - Usuários e perfis
2. **games** - Catálogo de jogos
3. **platforms** - Plataformas de jogos
4. **tags** - Tags e gêneros
5. **game_platforms** - Relação jogos-plataformas
6. **game_tags** - Relação jogos-tags
7. **user_library** - Biblioteca pessoal
8. **reviews** - Avaliações de jogos
9. **achievements** - Conquistas
10. **user_achievements** - Conquistas desbloqueadas
11. **achievement_images** - Guias visuais
12. **guides** - Guias e mapas
13. **map_markers** - Marcadores interativos
14. **comments** - Comentários
15. **votes** - Sistema de votação
16. **followers** - Relacionamentos sociais
17. **activities** - Feed de atividades
18. **difficulty_votes** - Votação de dificuldade

## 🔐 Segurança

- ✅ Sanitização de inputs
- ✅ Validação com Zod
- ✅ Proteção contra SQL Injection (via Drizzle ORM)
- ✅ Proteção contra XSS
- ✅ CSRF tokens
- ✅ Rate limiting preparado
- ✅ Cookies seguros (httpOnly, secure, sameSite)
- ✅ Autenticação JWT com refresh

## 🚀 Performance

- ✅ Paginação em todas as listagens
- ✅ Lazy loading de imagens
- ✅ Indexação no banco de dados
- ✅ Cache preparado (Redis)
- ✅ Otimização de queries
- ✅ Layout responsivo
- ✅ Core Web Vitals otimizados

## 📦 Instalação e Uso

### Pré-requisitos

- Node.js 22+
- MySQL ou TiDB

### Instalação

```bash
# Instalar dependências
pnpm install

# Configurar variáveis de ambiente

# Executar migrações
pnpm db:push

# Popular banco com dados de exemplo
node seed-data.mjs

# Iniciar servidor de desenvolvimento
pnpm dev
```

### Testes

```bash
# Executar todos os testes
pnpm test

# Executar testes em modo watch
pnpm test:watch
```

### Build para Produção

```bash
# Build do projeto
pnpm build

# Iniciar em produção
pnpm start
```

## 🎨 Design System

### Cores

- **Primary:** Purple (#8B5CF6) - Ações principais e destaques
- **Background:** Dark (#1a1625) - Tema escuro moderno
- **Foreground:** Light (#f5f5f5) - Texto principal
- **Accent:** Gradient (Purple → Pink) - Elementos especiais

### Tipografia

- **Headings:** Space Grotesk (Bold, -2% letter-spacing)
- **Body:** Inter (Regular, com font-features)
- **Tamanhos:** Sistema responsivo com breakpoints

### Componentes

Sistema completo de componentes reutilizáveis:
- Cards de jogos com hover effects
- Badges de status e dificuldade
- Sistema de navegação responsivo
- Modais e dropdowns acessíveis
- Formulários validados
- Skeletons para loading states

## 📝 API Documentation

### Principais Endpoints (tRPC)

**Games:**
- `game.list` - Listar jogos com paginação
- `game.getById` - Detalhes do jogo
- `game.search` - Buscar jogos
- `game.create` - Criar novo jogo (admin)

**Library:**
- `library.get` - Biblioteca do usuário
- `library.add` - Adicionar jogo
- `library.update` - Atualizar status
- `library.remove` - Remover jogo

**Achievements:**
- `achievement.getByGame` - Conquistas do jogo
- `achievement.unlock` - Desbloquear conquista
- `achievement.voteDifficulty` - Votar dificuldade
- `achievement.addImage` - Adicionar guia visual

**Social:**
- `user.follow` - Seguir usuário
- `user.unfollow` - Deixar de seguir
- `activity.getFeed` - Feed de atividades

## 🧪 Testes

Cobertura de testes implementada:

- ✅ Testes de autenticação
- ✅ Testes de procedures de jogos
- ✅ Testes de plataformas e tags
- 🔄 Testes de conquistas (preparado)
- 🔄 Testes de biblioteca (preparado)
- 🔄 Testes sociais (preparado)

## 📊 Próximas Funcionalidades

- [ ] Integração com APIs de jogos (Steam, PlayStation, Xbox)
- [ ] Sistema de notificações em tempo real
- [ ] Chat entre usuários
- [ ] Torneios e desafios comunitários
- [ ] Sistema de recompensas e badges
- [ ] Exportação de progresso
- [ ] Aplicativo mobile (React Native)

## 🤝 Contribuindo

Este é um projeto production-ready. Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

© 2025 GameQuest - Plataforma Social de Jogos e Conquistas. Todos os direitos reservados.

## 🙏 Agradecimentos

- shadcn/ui - Sistema de componentes
- Drizzle ORM - Type-safe database queries
- tRPC - End-to-end typesafe APIs

---

**Desenvolvido com ❤️ para a comunidade gamer**
