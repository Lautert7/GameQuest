import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, index, uniqueIndex } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  bio: text("bio"),
  avatarUrl: text("avatarUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
}, (table) => ({
  openIdIdx: uniqueIndex("openId_idx").on(table.openId),
}));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Games table - stores information about games
 */
export const games = mysqlTable("games", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  coverImageUrl: text("coverImageUrl"),
  releaseDate: timestamp("releaseDate"),
  developer: varchar("developer", { length: 255 }),
  publisher: varchar("publisher", { length: 255 }),
  averageRating: int("averageRating").default(0),
  totalRatings: int("totalRatings").default(0),
  totalReviews: int("totalReviews").default(0),
  totalAchievements: int("totalAchievements").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  titleIdx: index("title_idx").on(table.title),
}));

export type Game = typeof games.$inferSelect;
export type InsertGame = typeof games.$inferInsert;

/**
 * Platforms table - stores gaming platforms
 */
export const platforms = mysqlTable("platforms", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  icon: varchar("icon", { length: 50 }),
});

export type Platform = typeof platforms.$inferSelect;
export type InsertPlatform = typeof platforms.$inferInsert;

/**
 * Game platforms junction table
 */
export const gamePlatforms = mysqlTable("game_platforms", {
  id: int("id").autoincrement().primaryKey(),
  gameId: int("gameId").notNull(),
  platformId: int("platformId").notNull(),
}, (table) => ({
  gameIdIdx: index("game_id_idx").on(table.gameId),
  platformIdIdx: index("platform_id_idx").on(table.platformId),
}));

/**
 * Tags table - stores game tags/genres
 */
export const tags = mysqlTable("tags", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  category: mysqlEnum("category", ["genre", "theme", "gameplay"]).default("genre"),
});

export type Tag = typeof tags.$inferSelect;
export type InsertTag = typeof tags.$inferInsert;

/**
 * Game tags junction table
 */
export const gameTags = mysqlTable("game_tags", {
  id: int("id").autoincrement().primaryKey(),
  gameId: int("gameId").notNull(),
  tagId: int("tagId").notNull(),
}, (table) => ({
  gameIdIdx: index("game_id_idx").on(table.gameId),
  tagIdIdx: index("tag_id_idx").on(table.tagId),
}));

/**
 * User library - tracks user's game collection
 */
export const userLibrary = mysqlTable("user_library", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  gameId: int("gameId").notNull(),
  status: mysqlEnum("status", ["playing", "completed", "backlog", "dropped", "wishlist"]).default("backlog").notNull(),
  isFavorite: boolean("isFavorite").default(false),
  hoursPlayed: int("hoursPlayed").default(0),
  personalRating: int("personalRating"),
  addedAt: timestamp("addedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdIdx: index("user_id_idx").on(table.userId),
  gameIdIdx: index("game_id_idx").on(table.gameId),
  userGameIdx: uniqueIndex("user_game_idx").on(table.userId, table.gameId),
}));

export type UserLibrary = typeof userLibrary.$inferSelect;
export type InsertUserLibrary = typeof userLibrary.$inferInsert;

/**
 * Reviews table - user reviews for games
 */
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  gameId: int("gameId").notNull(),
  rating: int("rating").notNull(),
  title: varchar("title", { length: 255 }),
  content: text("content").notNull(),
  upvotes: int("upvotes").default(0),
  downvotes: int("downvotes").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdIdx: index("user_id_idx").on(table.userId),
  gameIdIdx: index("game_id_idx").on(table.gameId),
  userGameIdx: uniqueIndex("user_game_review_idx").on(table.userId, table.gameId),
}));

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Achievements table - game achievements
 */
export const achievements = mysqlTable("achievements", {
  id: int("id").autoincrement().primaryKey(),
  gameId: int("gameId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  iconUrl: text("iconUrl"),
  points: int("points").default(0),
  difficultyRating: int("difficultyRating").default(0),
  totalDifficultyVotes: int("totalDifficultyVotes").default(0),
  estimatedTime: int("estimatedTime"),
  isMissable: boolean("isMissable").default(false),
  isBuggy: boolean("isBuggy").default(false),
  isGrindy: boolean("isGrindy").default(false),
  isEasy: boolean("isEasy").default(false),
  textGuide: text("textGuide"),
  totalUnlocks: int("totalUnlocks").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  gameIdIdx: index("game_id_idx").on(table.gameId),
  titleIdx: index("title_idx").on(table.title),
}));

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = typeof achievements.$inferInsert;

/**
 * User achievements - tracks which achievements users have unlocked
 */
export const userAchievements = mysqlTable("user_achievements", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  achievementId: int("achievementId").notNull(),
  unlockedAt: timestamp("unlockedAt").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("user_id_idx").on(table.userId),
  achievementIdIdx: index("achievement_id_idx").on(table.achievementId),
  userAchievementIdx: uniqueIndex("user_achievement_idx").on(table.userId, table.achievementId),
}));

export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = typeof userAchievements.$inferInsert;

/**
 * Achievement images - visual guides for achievements
 */
export const achievementImages = mysqlTable("achievement_images", {
  id: int("id").autoincrement().primaryKey(),
  achievementId: int("achievementId").notNull(),
  userId: int("userId").notNull(),
  imageUrl: text("imageUrl").notNull(),
  caption: text("caption"),
  upvotes: int("upvotes").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  achievementIdIdx: index("achievement_id_idx").on(table.achievementId),
  userIdIdx: index("user_id_idx").on(table.userId),
}));

export type AchievementImage = typeof achievementImages.$inferSelect;
export type InsertAchievementImage = typeof achievementImages.$inferInsert;

/**
 * Guides table - user-created guides for games
 */
export const guides = mysqlTable("guides", {
  id: int("id").autoincrement().primaryKey(),
  gameId: int("gameId").notNull(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  mapImageUrl: text("mapImageUrl"),
  version: int("version").default(1),
  isLatest: boolean("isLatest").default(true),
  upvotes: int("upvotes").default(0),
  views: int("views").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  gameIdIdx: index("game_id_idx").on(table.gameId),
  userIdIdx: index("user_id_idx").on(table.userId),
  isLatestIdx: index("is_latest_idx").on(table.isLatest),
}));

export type Guide = typeof guides.$inferSelect;
export type InsertGuide = typeof guides.$inferInsert;

/**
 * Map markers - interactive markers on guide maps
 */
export const mapMarkers = mysqlTable("map_markers", {
  id: int("id").autoincrement().primaryKey(),
  guideId: int("guideId").notNull(),
  achievementId: int("achievementId"),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: text("imageUrl"),
  quickTip: text("quickTip"),
  positionX: int("positionX").notNull(),
  positionY: int("positionY").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  guideIdIdx: index("guide_id_idx").on(table.guideId),
  achievementIdIdx: index("achievement_id_idx").on(table.achievementId),
}));

export type MapMarker = typeof mapMarkers.$inferSelect;
export type InsertMapMarker = typeof mapMarkers.$inferInsert;

/**
 * Comments table - comments on achievements, guides, etc.
 */
export const comments = mysqlTable("comments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  entityType: mysqlEnum("entityType", ["achievement", "guide", "review"]).notNull(),
  entityId: int("entityId").notNull(),
  content: text("content").notNull(),
  upvotes: int("upvotes").default(0),
  downvotes: int("downvotes").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdIdx: index("user_id_idx").on(table.userId),
  entityIdx: index("entity_idx").on(table.entityType, table.entityId),
}));

export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;

/**
 * Votes table - tracks user votes on various entities
 */
export const votes = mysqlTable("votes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  entityType: mysqlEnum("entityType", ["review", "comment", "guide", "achievement_image", "achievement_tip"]).notNull(),
  entityId: int("entityId").notNull(),
  voteType: mysqlEnum("voteType", ["up", "down", "helpful"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userEntityIdx: uniqueIndex("user_entity_idx").on(table.userId, table.entityType, table.entityId),
}));

export type Vote = typeof votes.$inferSelect;
export type InsertVote = typeof votes.$inferInsert;

/**
 * Followers table - tracks user following relationships
 */
export const followers = mysqlTable("followers", {
  id: int("id").autoincrement().primaryKey(),
  followerId: int("followerId").notNull(),
  followingId: int("followingId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  followerIdx: index("follower_idx").on(table.followerId),
  followingIdx: index("following_idx").on(table.followingId),
  followerFollowingIdx: uniqueIndex("follower_following_idx").on(table.followerId, table.followingId),
}));

export type Follower = typeof followers.$inferSelect;
export type InsertFollower = typeof followers.$inferInsert;

/**
 * Activity feed - tracks user activities
 */
export const activities = mysqlTable("activities", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  activityType: mysqlEnum("activityType", ["review", "achievement", "guide", "game_added", "game_completed"]).notNull(),
  entityId: int("entityId"),
  metadata: text("metadata"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("user_id_idx").on(table.userId),
  createdAtIdx: index("created_at_idx").on(table.createdAt),
}));

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = typeof activities.$inferInsert;

/**
 * Difficulty votes - tracks user votes on achievement difficulty
 */
export const difficultyVotes = mysqlTable("difficulty_votes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  achievementId: int("achievementId").notNull(),
  difficulty: int("difficulty").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userAchievementIdx: uniqueIndex("user_achievement_difficulty_idx").on(table.userId, table.achievementId),
}));

export type DifficultyVote = typeof difficultyVotes.$inferSelect;
export type InsertDifficultyVote = typeof difficultyVotes.$inferInsert;
