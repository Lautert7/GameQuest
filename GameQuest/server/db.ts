import { eq, desc, and, or, like, sql, asc, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  games, 
  InsertGame,
  platforms,
  InsertPlatform,
  tags,
  InsertTag,
  gamePlatforms,
  gameTags,
  userLibrary,
  InsertUserLibrary,
  reviews,
  InsertReview,
  achievements,
  InsertAchievement,
  userAchievements,
  InsertUserAchievement,
  achievementImages,
  InsertAchievementImage,
  guides,
  InsertGuide,
  mapMarkers,
  InsertMapMarker,
  comments,
  InsertComment,
  votes,
  InsertVote,
  followers,
  InsertFollower,
  activities,
  InsertActivity,
  difficultyVotes,
  InsertDifficultyVote,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============ USER HELPERS ============

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod", "bio", "avatarUrl"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserProfile(userId: number, data: { bio?: string; avatarUrl?: string }) {
  const db = await getDb();
  if (!db) return null;
  await db.update(users).set(data).where(eq(users.id, userId));
  return getUserById(userId);
}

// ============ GAME HELPERS ============

export async function createGame(game: InsertGame) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(games).values(game);
  return Number(result[0].insertId);
}

export async function getGameById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(games).where(eq(games.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllGames(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(games).orderBy(desc(games.createdAt)).limit(limit).offset(offset);
}

export async function searchGames(query: string, limit = 20) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(games).where(like(games.title, `%${query}%`)).limit(limit);
}

export async function updateGameStats(gameId: number, stats: { averageRating?: number; totalRatings?: number; totalReviews?: number; totalAchievements?: number }) {
  const db = await getDb();
  if (!db) return;
  await db.update(games).set(stats).where(eq(games.id, gameId));
}

// ============ PLATFORM HELPERS ============

export async function createPlatform(platform: InsertPlatform) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(platforms).values(platform);
  return Number(result[0].insertId);
}

export async function getAllPlatforms() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(platforms);
}

export async function addGamePlatform(gameId: number, platformId: number) {
  const db = await getDb();
  if (!db) return;
  await db.insert(gamePlatforms).values({ gameId, platformId });
}

export async function getGamePlatforms(gameId: number) {
  const db = await getDb();
  if (!db) return [];
  const result = await db
    .select({ platform: platforms })
    .from(gamePlatforms)
    .innerJoin(platforms, eq(gamePlatforms.platformId, platforms.id))
    .where(eq(gamePlatforms.gameId, gameId));
  return result.map(r => r.platform);
}

// ============ TAG HELPERS ============

export async function createTag(tag: InsertTag) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(tags).values(tag);
  return Number(result[0].insertId);
}

export async function getAllTags() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tags);
}

export async function addGameTag(gameId: number, tagId: number) {
  const db = await getDb();
  if (!db) return;
  await db.insert(gameTags).values({ gameId, tagId });
}

export async function getGameTags(gameId: number) {
  const db = await getDb();
  if (!db) return [];
  const result = await db
    .select({ tag: tags })
    .from(gameTags)
    .innerJoin(tags, eq(gameTags.tagId, tags.id))
    .where(eq(gameTags.gameId, gameId));
  return result.map(r => r.tag);
}

// ============ USER LIBRARY HELPERS ============

export async function addToLibrary(data: InsertUserLibrary) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(userLibrary).values(data);
  return Number(result[0].insertId);
}

export async function getUserLibrary(userId: number, status?: string) {
  const db = await getDb();
  if (!db) return [];
  
  if (status) {
    return db
      .select({
        library: userLibrary,
        game: games,
      })
      .from(userLibrary)
      .innerJoin(games, eq(userLibrary.gameId, games.id))
      .where(and(eq(userLibrary.userId, userId), eq(userLibrary.status, status as any)))
      .orderBy(desc(userLibrary.updatedAt));
  }

  return db
    .select({
      library: userLibrary,
      game: games,
    })
    .from(userLibrary)
    .innerJoin(games, eq(userLibrary.gameId, games.id))
    .where(eq(userLibrary.userId, userId))
    .orderBy(desc(userLibrary.updatedAt));
}

export async function updateLibraryEntry(id: number, data: Partial<InsertUserLibrary>) {
  const db = await getDb();
  if (!db) return;
  await db.update(userLibrary).set(data).where(eq(userLibrary.id, id));
}

export async function removeFromLibrary(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(userLibrary).where(eq(userLibrary.id, id));
}

export async function getLibraryEntry(userId: number, gameId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(userLibrary).where(and(eq(userLibrary.userId, userId), eq(userLibrary.gameId, gameId))).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============ REVIEW HELPERS ============

export async function createReview(review: InsertReview) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(reviews).values(review);
  return Number(result[0].insertId);
}

export async function getGameReviews(gameId: number, limit = 20, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({
      review: reviews,
      user: users,
    })
    .from(reviews)
    .innerJoin(users, eq(reviews.userId, users.id))
    .where(eq(reviews.gameId, gameId))
    .orderBy(desc(reviews.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function getUserReview(userId: number, gameId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(reviews).where(and(eq(reviews.userId, userId), eq(reviews.gameId, gameId))).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateReview(id: number, data: Partial<InsertReview>) {
  const db = await getDb();
  if (!db) return;
  await db.update(reviews).set(data).where(eq(reviews.id, id));
}

// ============ ACHIEVEMENT HELPERS ============

export async function createAchievement(achievement: InsertAchievement) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(achievements).values(achievement);
  return Number(result[0].insertId);
}

export async function getGameAchievements(gameId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(achievements).where(eq(achievements.gameId, gameId)).orderBy(asc(achievements.points));
}

export async function getAchievementById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(achievements).where(eq(achievements.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateAchievement(id: number, data: Partial<InsertAchievement>) {
  const db = await getDb();
  if (!db) return;
  await db.update(achievements).set(data).where(eq(achievements.id, id));
}

export async function unlockAchievement(userId: number, achievementId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(userAchievements).values({ userId, achievementId });
  await db.update(achievements).set({ totalUnlocks: sql`${achievements.totalUnlocks} + 1` }).where(eq(achievements.id, achievementId));
  return Number(result[0].insertId);
}

export async function getUserAchievements(userId: number, gameId?: number) {
  const db = await getDb();
  if (!db) return [];
  
  if (gameId) {
    return db
      .select({
        userAchievement: userAchievements,
        achievement: achievements,
      })
      .from(userAchievements)
      .innerJoin(achievements, eq(userAchievements.achievementId, achievements.id))
      .where(and(eq(userAchievements.userId, userId), eq(achievements.gameId, gameId)));
  }

  return db
    .select({
      userAchievement: userAchievements,
      achievement: achievements,
    })
    .from(userAchievements)
    .innerJoin(achievements, eq(userAchievements.achievementId, achievements.id))
    .where(eq(userAchievements.userId, userId));
}

// ============ ACHIEVEMENT IMAGE HELPERS ============

export async function addAchievementImage(image: InsertAchievementImage) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(achievementImages).values(image);
  return Number(result[0].insertId);
}

export async function getAchievementImages(achievementId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({
      image: achievementImages,
      user: users,
    })
    .from(achievementImages)
    .innerJoin(users, eq(achievementImages.userId, users.id))
    .where(eq(achievementImages.achievementId, achievementId))
    .orderBy(desc(achievementImages.upvotes));
}

// ============ GUIDE HELPERS ============

export async function createGuide(guide: InsertGuide) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(guides).values(guide);
  return Number(result[0].insertId);
}

export async function getGameGuides(gameId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({
      guide: guides,
      user: users,
    })
    .from(guides)
    .innerJoin(users, eq(guides.userId, users.id))
    .where(and(eq(guides.gameId, gameId), eq(guides.isLatest, true)))
    .orderBy(desc(guides.upvotes));
}

export async function getGuideById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select({
      guide: guides,
      user: users,
    })
    .from(guides)
    .innerJoin(users, eq(guides.userId, users.id))
    .where(eq(guides.id, id))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateGuide(id: number, data: Partial<InsertGuide>) {
  const db = await getDb();
  if (!db) return;
  await db.update(guides).set(data).where(eq(guides.id, id));
}

export async function incrementGuideViews(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(guides).set({ views: sql`${guides.views} + 1` }).where(eq(guides.id, id));
}

// ============ MAP MARKER HELPERS ============

export async function addMapMarker(marker: InsertMapMarker) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(mapMarkers).values(marker);
  return Number(result[0].insertId);
}

export async function getGuideMarkers(guideId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mapMarkers).where(eq(mapMarkers.guideId, guideId));
}

export async function deleteMapMarker(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(mapMarkers).where(eq(mapMarkers.id, id));
}

// ============ COMMENT HELPERS ============

export async function createComment(comment: InsertComment) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(comments).values(comment);
  return Number(result[0].insertId);
}

export async function getComments(entityType: string, entityId: number, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({
      comment: comments,
      user: users,
    })
    .from(comments)
    .innerJoin(users, eq(comments.userId, users.id))
    .where(and(eq(comments.entityType, entityType as any), eq(comments.entityId, entityId)))
    .orderBy(desc(comments.upvotes))
    .limit(limit);
}

export async function updateComment(id: number, data: Partial<InsertComment>) {
  const db = await getDb();
  if (!db) return;
  await db.update(comments).set(data).where(eq(comments.id, id));
}

export async function deleteComment(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(comments).where(eq(comments.id, id));
}

// ============ VOTE HELPERS ============

export async function addVote(vote: InsertVote) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(votes).values(vote);
  return Number(result[0].insertId);
}

export async function getUserVote(userId: number, entityType: string, entityId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(votes).where(and(eq(votes.userId, userId), eq(votes.entityType, entityType as any), eq(votes.entityId, entityId))).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function removeVote(userId: number, entityType: string, entityId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(votes).where(and(eq(votes.userId, userId), eq(votes.entityType, entityType as any), eq(votes.entityId, entityId)));
}

// ============ FOLLOWER HELPERS ============

export async function followUser(followerId: number, followingId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(followers).values({ followerId, followingId });
  return Number(result[0].insertId);
}

export async function unfollowUser(followerId: number, followingId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(followers).where(and(eq(followers.followerId, followerId), eq(followers.followingId, followingId)));
}

export async function getFollowers(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({ user: users })
    .from(followers)
    .innerJoin(users, eq(followers.followerId, users.id))
    .where(eq(followers.followingId, userId));
}

export async function getFollowing(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({ user: users })
    .from(followers)
    .innerJoin(users, eq(followers.followingId, users.id))
    .where(eq(followers.followerId, userId));
}

export async function isFollowing(followerId: number, followingId: number) {
  const db = await getDb();
  if (!db) return false;
  const result = await db.select().from(followers).where(and(eq(followers.followerId, followerId), eq(followers.followingId, followingId))).limit(1);
  return result.length > 0;
}

// ============ ACTIVITY HELPERS ============

export async function createActivity(activity: InsertActivity) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(activities).values(activity);
  return Number(result[0].insertId);
}

export async function getUserActivities(userId: number, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({
      activity: activities,
      user: users,
    })
    .from(activities)
    .innerJoin(users, eq(activities.userId, users.id))
    .where(eq(activities.userId, userId))
    .orderBy(desc(activities.createdAt))
    .limit(limit);
}

export async function getFeedActivities(userIds: number[], limit = 50) {
  const db = await getDb();
  if (!db) return [];
  if (userIds.length === 0) return [];
  return db
    .select({
      activity: activities,
      user: users,
    })
    .from(activities)
    .innerJoin(users, eq(activities.userId, users.id))
    .where(inArray(activities.userId, userIds))
    .orderBy(desc(activities.createdAt))
    .limit(limit);
}

// ============ DIFFICULTY VOTE HELPERS ============

export async function voteDifficulty(vote: InsertDifficultyVote) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(difficultyVotes).values(vote);
  
  const allVotes = await db.select().from(difficultyVotes).where(eq(difficultyVotes.achievementId, vote.achievementId));
  const avgDifficulty = Math.round(allVotes.reduce((sum, v) => sum + v.difficulty, 0) / allVotes.length);
  
  await db.update(achievements).set({
    difficultyRating: avgDifficulty,
    totalDifficultyVotes: allVotes.length,
  }).where(eq(achievements.id, vote.achievementId));
  
  return Number(result[0].insertId);
}

export async function getUserDifficultyVote(userId: number, achievementId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(difficultyVotes).where(and(eq(difficultyVotes.userId, userId), eq(difficultyVotes.achievementId, achievementId))).limit(1);
  return result.length > 0 ? result[0] : undefined;
}
