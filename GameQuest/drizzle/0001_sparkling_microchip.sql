CREATE TABLE `achievement_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`achievementId` int NOT NULL,
	`userId` int NOT NULL,
	`imageUrl` text NOT NULL,
	`caption` text,
	`upvotes` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `achievement_images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `achievements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`gameId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`iconUrl` text,
	`points` int DEFAULT 0,
	`difficultyRating` int DEFAULT 0,
	`totalDifficultyVotes` int DEFAULT 0,
	`estimatedTime` int,
	`isMissable` boolean DEFAULT false,
	`isBuggy` boolean DEFAULT false,
	`isGrindy` boolean DEFAULT false,
	`isEasy` boolean DEFAULT false,
	`textGuide` text,
	`totalUnlocks` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `achievements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `activities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`activityType` enum('review','achievement','guide','game_added','game_completed') NOT NULL,
	`entityId` int,
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `activities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`entityType` enum('achievement','guide','review') NOT NULL,
	`entityId` int NOT NULL,
	`content` text NOT NULL,
	`upvotes` int DEFAULT 0,
	`downvotes` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `difficulty_votes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`achievementId` int NOT NULL,
	`difficulty` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `difficulty_votes_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_achievement_difficulty_idx` UNIQUE(`userId`,`achievementId`)
);
--> statement-breakpoint
CREATE TABLE `followers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`followerId` int NOT NULL,
	`followingId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `followers_id` PRIMARY KEY(`id`),
	CONSTRAINT `follower_following_idx` UNIQUE(`followerId`,`followingId`)
);
--> statement-breakpoint
CREATE TABLE `game_platforms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`gameId` int NOT NULL,
	`platformId` int NOT NULL,
	CONSTRAINT `game_platforms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `game_tags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`gameId` int NOT NULL,
	`tagId` int NOT NULL,
	CONSTRAINT `game_tags_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `games` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`coverImageUrl` text,
	`releaseDate` timestamp,
	`developer` varchar(255),
	`publisher` varchar(255),
	`averageRating` int DEFAULT 0,
	`totalRatings` int DEFAULT 0,
	`totalReviews` int DEFAULT 0,
	`totalAchievements` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `games_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `guides` (
	`id` int AUTO_INCREMENT NOT NULL,
	`gameId` int NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`mapImageUrl` text,
	`version` int DEFAULT 1,
	`isLatest` boolean DEFAULT true,
	`upvotes` int DEFAULT 0,
	`views` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `guides_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `map_markers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`guideId` int NOT NULL,
	`achievementId` int,
	`title` varchar(255) NOT NULL,
	`description` text,
	`imageUrl` text,
	`quickTip` text,
	`positionX` int NOT NULL,
	`positionY` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `map_markers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `platforms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`icon` varchar(50),
	CONSTRAINT `platforms_id` PRIMARY KEY(`id`),
	CONSTRAINT `platforms_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`gameId` int NOT NULL,
	`rating` int NOT NULL,
	`title` varchar(255),
	`content` text NOT NULL,
	`upvotes` int DEFAULT 0,
	`downvotes` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_game_review_idx` UNIQUE(`userId`,`gameId`)
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`category` enum('genre','theme','gameplay') DEFAULT 'genre',
	CONSTRAINT `tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `tags_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `user_achievements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`achievementId` int NOT NULL,
	`unlockedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_achievements_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_achievement_idx` UNIQUE(`userId`,`achievementId`)
);
--> statement-breakpoint
CREATE TABLE `user_library` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`gameId` int NOT NULL,
	`status` enum('playing','completed','backlog','dropped','wishlist') NOT NULL DEFAULT 'backlog',
	`isFavorite` boolean DEFAULT false,
	`hoursPlayed` int DEFAULT 0,
	`personalRating` int,
	`addedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_library_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_game_idx` UNIQUE(`userId`,`gameId`)
);
--> statement-breakpoint
CREATE TABLE `votes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`entityType` enum('review','comment','guide','achievement_image','achievement_tip') NOT NULL,
	`entityId` int NOT NULL,
	`voteType` enum('up','down','helpful') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `votes_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_entity_idx` UNIQUE(`userId`,`entityType`,`entityId`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `bio` text;--> statement-breakpoint
ALTER TABLE `users` ADD `avatarUrl` text;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `openId_idx` UNIQUE(`openId`);--> statement-breakpoint
CREATE INDEX `achievement_id_idx` ON `achievement_images` (`achievementId`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `achievement_images` (`userId`);--> statement-breakpoint
CREATE INDEX `game_id_idx` ON `achievements` (`gameId`);--> statement-breakpoint
CREATE INDEX `title_idx` ON `achievements` (`title`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `activities` (`userId`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `activities` (`createdAt`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `comments` (`userId`);--> statement-breakpoint
CREATE INDEX `entity_idx` ON `comments` (`entityType`,`entityId`);--> statement-breakpoint
CREATE INDEX `follower_idx` ON `followers` (`followerId`);--> statement-breakpoint
CREATE INDEX `following_idx` ON `followers` (`followingId`);--> statement-breakpoint
CREATE INDEX `game_id_idx` ON `game_platforms` (`gameId`);--> statement-breakpoint
CREATE INDEX `platform_id_idx` ON `game_platforms` (`platformId`);--> statement-breakpoint
CREATE INDEX `game_id_idx` ON `game_tags` (`gameId`);--> statement-breakpoint
CREATE INDEX `tag_id_idx` ON `game_tags` (`tagId`);--> statement-breakpoint
CREATE INDEX `title_idx` ON `games` (`title`);--> statement-breakpoint
CREATE INDEX `game_id_idx` ON `guides` (`gameId`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `guides` (`userId`);--> statement-breakpoint
CREATE INDEX `is_latest_idx` ON `guides` (`isLatest`);--> statement-breakpoint
CREATE INDEX `guide_id_idx` ON `map_markers` (`guideId`);--> statement-breakpoint
CREATE INDEX `achievement_id_idx` ON `map_markers` (`achievementId`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `reviews` (`userId`);--> statement-breakpoint
CREATE INDEX `game_id_idx` ON `reviews` (`gameId`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `user_achievements` (`userId`);--> statement-breakpoint
CREATE INDEX `achievement_id_idx` ON `user_achievements` (`achievementId`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `user_library` (`userId`);--> statement-breakpoint
CREATE INDEX `game_id_idx` ON `user_library` (`gameId`);