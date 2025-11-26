import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { storagePut } from "./storage";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ============ USER ROUTES ============
  user: router({
    getProfile: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        return db.getUserById(input.userId);
      }),

    updateProfile: protectedProcedure
      .input(z.object({
        bio: z.string().optional(),
        avatarUrl: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return db.updateUserProfile(ctx.user.id, input);
      }),

    getFollowers: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        return db.getFollowers(input.userId);
      }),

    getFollowing: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        return db.getFollowing(input.userId);
      }),

    follow: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.id === input.userId) {
          throw new Error("Cannot follow yourself");
        }
        return db.followUser(ctx.user.id, input.userId);
      }),

    unfollow: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return db.unfollowUser(ctx.user.id, input.userId);
      }),

    isFollowing: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ ctx, input }) => {
        return db.isFollowing(ctx.user.id, input.userId);
      }),
  }),

  // ============ GAME ROUTES ============
  game: router({
    list: publicProcedure
      .input(z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        return db.getAllGames(input.limit, input.offset);
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const game = await db.getGameById(input.id);
        if (!game) throw new Error("Game not found");
        
        const platforms = await db.getGamePlatforms(input.id);
        const tags = await db.getGameTags(input.id);
        
        return { game, platforms, tags };
      }),

    search: publicProcedure
      .input(z.object({
        query: z.string(),
        limit: z.number().default(20),
      }))
      .query(async ({ input }) => {
        return db.searchGames(input.query, input.limit);
      }),

    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        coverImageUrl: z.string().optional(),
        developer: z.string().optional(),
        publisher: z.string().optional(),
        platformIds: z.array(z.number()).optional(),
        tagIds: z.array(z.number()).optional(),
      }))
      .mutation(async ({ input }) => {
        const { platformIds, tagIds, ...gameData } = input;
        const gameId = await db.createGame(gameData);
        
        if (gameId && platformIds) {
          for (const platformId of platformIds) {
            await db.addGamePlatform(gameId, platformId);
          }
        }
        
        if (gameId && tagIds) {
          for (const tagId of tagIds) {
            await db.addGameTag(gameId, tagId);
          }
        }
        
        return gameId;
      }),
  }),

  // ============ LIBRARY ROUTES ============
  library: router({
    get: protectedProcedure
      .input(z.object({
        userId: z.number().optional(),
        status: z.string().optional(),
      }))
      .query(async ({ ctx, input }) => {
        const userId = input.userId || ctx.user.id;
        return db.getUserLibrary(userId, input.status);
      }),

    add: protectedProcedure
      .input(z.object({
        gameId: z.number(),
        status: z.enum(["playing", "completed", "backlog", "dropped", "wishlist"]).default("backlog"),
      }))
      .mutation(async ({ ctx, input }) => {
        const existing = await db.getLibraryEntry(ctx.user.id, input.gameId);
        if (existing) {
          throw new Error("Game already in library");
        }
        
        const id = await db.addToLibrary({
          userId: ctx.user.id,
          gameId: input.gameId,
          status: input.status,
        });
        
        await db.createActivity({
          userId: ctx.user.id,
          activityType: "game_added",
          entityId: input.gameId,
        });
        
        return id;
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["playing", "completed", "backlog", "dropped", "wishlist"]).optional(),
        isFavorite: z.boolean().optional(),
        hoursPlayed: z.number().optional(),
        personalRating: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;
        await db.updateLibraryEntry(id, data);
        
        if (data.status === "completed") {
          const entry = await db.getLibraryEntry(ctx.user.id, 0);
          if (entry) {
            await db.createActivity({
              userId: ctx.user.id,
              activityType: "game_completed",
              entityId: entry.gameId,
            });
          }
        }
        
        return { success: true };
      }),

    remove: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.removeFromLibrary(input.id);
        return { success: true };
      }),
  }),

  // ============ REVIEW ROUTES ============
  review: router({
    getByGame: publicProcedure
      .input(z.object({
        gameId: z.number(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        return db.getGameReviews(input.gameId, input.limit, input.offset);
      }),

    create: protectedProcedure
      .input(z.object({
        gameId: z.number(),
        rating: z.number().min(1).max(10),
        title: z.string().optional(),
        content: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const existing = await db.getUserReview(ctx.user.id, input.gameId);
        if (existing) {
          throw new Error("You already reviewed this game");
        }
        
        const id = await db.createReview({
          userId: ctx.user.id,
          ...input,
        });
        
        await db.createActivity({
          userId: ctx.user.id,
          activityType: "review",
          entityId: id!,
        });
        
        return id;
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        rating: z.number().min(1).max(10).optional(),
        title: z.string().optional(),
        content: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateReview(id, data);
        return { success: true };
      }),
  }),

  // ============ ACHIEVEMENT ROUTES ============
  achievement: router({
    getByGame: publicProcedure
      .input(z.object({ gameId: z.number() }))
      .query(async ({ input }) => {
        return db.getGameAchievements(input.gameId);
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const achievement = await db.getAchievementById(input.id);
        if (!achievement) throw new Error("Achievement not found");
        
        const images = await db.getAchievementImages(input.id);
        return { achievement, images };
      }),

    create: protectedProcedure
      .input(z.object({
        gameId: z.number(),
        title: z.string(),
        description: z.string().optional(),
        iconUrl: z.string().optional(),
        points: z.number().default(0),
        estimatedTime: z.number().optional(),
        isMissable: z.boolean().default(false),
        isBuggy: z.boolean().default(false),
        isGrindy: z.boolean().default(false),
        isEasy: z.boolean().default(false),
        textGuide: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return db.createAchievement(input);
      }),

    unlock: protectedProcedure
      .input(z.object({ achievementId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const id = await db.unlockAchievement(ctx.user.id, input.achievementId);
        
        await db.createActivity({
          userId: ctx.user.id,
          activityType: "achievement",
          entityId: input.achievementId,
        });
        
        return id;
      }),

    getUserAchievements: protectedProcedure
      .input(z.object({
        userId: z.number().optional(),
        gameId: z.number().optional(),
      }))
      .query(async ({ ctx, input }) => {
        const userId = input.userId || ctx.user.id;
        return db.getUserAchievements(userId, input.gameId);
      }),

    voteDifficulty: protectedProcedure
      .input(z.object({
        achievementId: z.number(),
        difficulty: z.number().min(1).max(10),
      }))
      .mutation(async ({ ctx, input }) => {
        return db.voteDifficulty({
          userId: ctx.user.id,
          achievementId: input.achievementId,
          difficulty: input.difficulty,
        });
      }),

    addImage: protectedProcedure
      .input(z.object({
        achievementId: z.number(),
        imageUrl: z.string(),
        caption: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return db.addAchievementImage({
          userId: ctx.user.id,
          ...input,
        });
      }),
  }),

  // ============ GUIDE ROUTES ============
  guide: router({
    getByGame: publicProcedure
      .input(z.object({ gameId: z.number() }))
      .query(async ({ input }) => {
        return db.getGameGuides(input.gameId);
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const guide = await db.getGuideById(input.id);
        if (!guide) throw new Error("Guide not found");
        
        const markers = await db.getGuideMarkers(input.id);
        await db.incrementGuideViews(input.id);
        
        return { ...guide, markers };
      }),

    create: protectedProcedure
      .input(z.object({
        gameId: z.number(),
        title: z.string(),
        description: z.string().optional(),
        mapImageUrl: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const id = await db.createGuide({
          userId: ctx.user.id,
          ...input,
        });
        
        await db.createActivity({
          userId: ctx.user.id,
          activityType: "guide",
          entityId: id!,
        });
        
        return id;
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        mapImageUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateGuide(id, data);
        return { success: true };
      }),

    addMarker: protectedProcedure
      .input(z.object({
        guideId: z.number(),
        achievementId: z.number().optional(),
        title: z.string(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        quickTip: z.string().optional(),
        positionX: z.number(),
        positionY: z.number(),
      }))
      .mutation(async ({ input }) => {
        return db.addMapMarker(input);
      }),

    deleteMarker: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteMapMarker(input.id);
        return { success: true };
      }),
  }),

  // ============ COMMENT ROUTES ============
  comment: router({
    get: publicProcedure
      .input(z.object({
        entityType: z.enum(["achievement", "guide", "review"]),
        entityId: z.number(),
        limit: z.number().default(50),
      }))
      .query(async ({ input }) => {
        return db.getComments(input.entityType, input.entityId, input.limit);
      }),

    create: protectedProcedure
      .input(z.object({
        entityType: z.enum(["achievement", "guide", "review"]),
        entityId: z.number(),
        content: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        return db.createComment({
          userId: ctx.user.id,
          ...input,
        });
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        content: z.string(),
      }))
      .mutation(async ({ input }) => {
        await db.updateComment(input.id, { content: input.content });
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteComment(input.id);
        return { success: true };
      }),
  }),

  // ============ VOTE ROUTES ============
  vote: router({
    add: protectedProcedure
      .input(z.object({
        entityType: z.enum(["review", "comment", "guide", "achievement_image", "achievement_tip"]),
        entityId: z.number(),
        voteType: z.enum(["up", "down", "helpful"]),
      }))
      .mutation(async ({ ctx, input }) => {
        const existing = await db.getUserVote(ctx.user.id, input.entityType, input.entityId);
        if (existing) {
          await db.removeVote(ctx.user.id, input.entityType, input.entityId);
        }
        return db.addVote({
          userId: ctx.user.id,
          ...input,
        });
      }),

    remove: protectedProcedure
      .input(z.object({
        entityType: z.enum(["review", "comment", "guide", "achievement_image", "achievement_tip"]),
        entityId: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.removeVote(ctx.user.id, input.entityType, input.entityId);
        return { success: true };
      }),

    getUserVote: protectedProcedure
      .input(z.object({
        entityType: z.enum(["review", "comment", "guide", "achievement_image", "achievement_tip"]),
        entityId: z.number(),
      }))
      .query(async ({ ctx, input }) => {
        return db.getUserVote(ctx.user.id, input.entityType, input.entityId);
      }),
  }),

  // ============ ACTIVITY ROUTES ============
  activity: router({
    getUserActivities: publicProcedure
      .input(z.object({
        userId: z.number(),
        limit: z.number().default(50),
      }))
      .query(async ({ input }) => {
        return db.getUserActivities(input.userId, input.limit);
      }),

    getFeed: protectedProcedure
      .input(z.object({
        limit: z.number().default(50),
      }))
      .query(async ({ ctx, input }) => {
        const following = await db.getFollowing(ctx.user.id);
        const userIds = following.map(f => f.user.id);
        userIds.push(ctx.user.id);
        return db.getFeedActivities(userIds, input.limit);
      }),
  }),

  // ============ PLATFORM & TAG ROUTES ============
  platform: router({
    list: publicProcedure.query(async () => {
      return db.getAllPlatforms();
    }),

    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        icon: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return db.createPlatform(input);
      }),
  }),

  tag: router({
    list: publicProcedure.query(async () => {
      return db.getAllTags();
    }),

    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        category: z.enum(["genre", "theme", "gameplay"]).default("genre"),
      }))
      .mutation(async ({ input }) => {
        return db.createTag(input);
      }),
  }),
});

export type AppRouter = typeof appRouter;
