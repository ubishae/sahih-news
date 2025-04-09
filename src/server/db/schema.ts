// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
	index,
	pgTableCreator,
	text,
	timestamp,
	integer,
	boolean,
	pgEnum,
	json,
	varchar,
	primaryKey,
	uniqueIndex,
	foreignKey,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `sahih-news_${name}`);

// Enums
export const userRoleEnum = pgEnum("user_role", [
	"user",
	"journalist",
	"moderator",
	"fact_checker",
]);
export const credibilityTagEnum = pgEnum("credibility_tag", [
	"true",
	"false",
	"unverified",
	"misleading",
]);
export const reportStatusEnum = pgEnum("report_status", [
	"pending",
	"reviewed",
	"dismissed",
]);
export const reportTypeEnum = pgEnum("report_type", [
	"misinformation",
	"offensive",
	"spam",
	"other",
]);
export const notificationTypeEnum = pgEnum("notification_type", [
	"follow",
	"mention",
	"reaction",
	"comment",
	"credibility_update",
	"trending",
	"verification",
]);

// Forward declarations to avoid circular references
export const users = createTable(
	"user",
	(d) => ({
		id: d.varchar({ length: 256 }).primaryKey(), // Clerk user ID
		username: d.varchar({ length: 100 }).notNull().unique(),
		displayName: d.varchar({ length: 100 }).notNull(),
		bio: d.text(),
		credibilityScore: d.integer().default(50).notNull(),
		role: userRoleEnum("role").default("user").notNull(),
		isVerified: d.boolean().default(false).notNull(),
		profileImageUrl: d.text(),
		createdAt: d
			.timestamp({ withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
	}),
	(t) => [index("username_idx").on(t.username), index("role_idx").on(t.role)],
);

export const follows = createTable(
	"follow",
	(d) => ({
		followerId: d
			.varchar({ length: 256 })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		followingId: d
			.varchar({ length: 256 })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		createdAt: d
			.timestamp({ withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	}),
	(t) => [
		primaryKey({ columns: [t.followerId, t.followingId] }),
		index("follower_idx").on(t.followerId),
		index("following_idx").on(t.followingId),
	],
);

export const categories = createTable(
	"category",
	(d) => ({
		id: d.serial().primaryKey(),
		name: d.varchar({ length: 100 }).notNull().unique(),
		description: d.text(),
		createdAt: d
			.timestamp({ withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	}),
	(t) => [index("category_name_idx").on(t.name)],
);

export const posts = createTable(
	"post",
	(d) => ({
		id: d.serial().primaryKey(),
		userId: d
			.varchar({ length: 256 })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		content: d.text().notNull(),
		mediaUrls: d.json().$type<string[]>(),
		sourceUrls: d.json().$type<string[]>(),
		location: d.text(),
		credibilityScore: d.integer().default(0),
		consensusTag: credibilityTagEnum("consensus_tag").default("unverified"),
		isVerified: d.boolean().default(false),
		viewCount: d.integer().default(0),
		createdAt: d
			.timestamp({ withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
	}),
	(t) => [
		index("post_user_idx").on(t.userId),
		index("post_created_idx").on(t.createdAt),
		index("post_credibility_idx").on(t.credibilityScore),
	],
);

export const postCategories = createTable(
	"post_category",
	(d) => ({
		postId: d
			.integer()
			.notNull()
			.references(() => posts.id, { onDelete: "cascade" }),
		categoryId: d
			.integer()
			.notNull()
			.references(() => categories.id, { onDelete: "cascade" }),
	}),
	(t) => [
		primaryKey({ columns: [t.postId, t.categoryId] }),
		index("post_category_post_idx").on(t.postId),
		index("post_category_category_idx").on(t.categoryId),
	],
);

export const tags = createTable(
	"tag",
	(d) => ({
		id: d.serial().primaryKey(),
		name: d.varchar({ length: 100 }).notNull().unique(),
		createdAt: d
			.timestamp({ withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	}),
	(t) => [index("tag_name_idx").on(t.name)],
);

export const postTags = createTable(
	"post_tag",
	(d) => ({
		postId: d
			.integer()
			.notNull()
			.references(() => posts.id, { onDelete: "cascade" }),
		tagId: d
			.integer()
			.notNull()
			.references(() => tags.id, { onDelete: "cascade" }),
	}),
	(t) => [
		primaryKey({ columns: [t.postId, t.tagId] }),
		index("post_tag_post_idx").on(t.postId),
		index("post_tag_tag_idx").on(t.tagId),
	],
);

export const comments = createTable(
	"comment",
	(d) => ({
		id: d.serial().primaryKey(),
		postId: d
			.integer()
			.notNull()
			.references(() => posts.id, { onDelete: "cascade" }),
		userId: d
			.varchar({ length: 256 })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		content: d.text().notNull(),
		parentId: d.integer(),
		createdAt: d
			.timestamp({ withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
	}),
	(t) => [
		index("comment_post_idx").on(t.postId),
		index("comment_user_idx").on(t.userId),
		index("comment_parent_idx").on(t.parentId),
		foreignKey({
			columns: [t.parentId],
			foreignColumns: [t.id],
			name: "comment_parent_id",
		}),
	],
);

export const reactions = createTable(
	"reaction",
	(d) => ({
		id: d.serial().primaryKey(),
		postId: d
			.integer()
			.notNull()
			.references(() => posts.id, { onDelete: "cascade" }),
		userId: d
			.varchar({ length: 256 })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: d.varchar({ length: 50 }).notNull(), // thumbs_up, thumbs_down, etc.
		createdAt: d
			.timestamp({ withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	}),
	(t) => [
		uniqueIndex("unique_post_user_reaction").on(t.postId, t.userId, t.type),
		index("reaction_post_idx").on(t.postId),
		index("reaction_user_idx").on(t.userId),
	],
);

export const commentReactions = createTable(
	"comment_reaction",
	(d) => ({
		id: d.serial().primaryKey(),
		commentId: d
			.integer()
			.notNull()
			.references(() => comments.id, { onDelete: "cascade" }),
		userId: d
			.varchar({ length: 256 })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: d.varchar({ length: 50 }).notNull(), // thumbs_up, thumbs_down, etc.
		createdAt: d
			.timestamp({ withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	}),
	(t) => [
		uniqueIndex("unique_comment_user_reaction").on(
			t.commentId,
			t.userId,
			t.type,
		),
		index("comment_reaction_comment_idx").on(t.commentId),
		index("comment_reaction_user_idx").on(t.userId),
	],
);

export const reviews = createTable(
	"review",
	(d) => ({
		id: d.serial().primaryKey(),
		postId: d
			.integer()
			.notNull()
			.references(() => posts.id, { onDelete: "cascade" }),
		userId: d
			.varchar({ length: 256 })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		credibilityTag: credibilityTagEnum("credibility_tag").notNull(),
		comment: d.text(),
		sourceUrls: d.json().$type<string[]>(),
		weight: d.integer().default(1).notNull(), // Higher for verified fact-checkers
		createdAt: d
			.timestamp({ withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
	}),
	(t) => [
		uniqueIndex("unique_post_user_review").on(t.postId, t.userId),
		index("review_post_idx").on(t.postId),
		index("review_user_idx").on(t.userId),
		index("review_tag_idx").on(t.credibilityTag),
	],
);

export const reports = createTable(
	"report",
	(d) => ({
		id: d.serial().primaryKey(),
		postId: d.serial().references(() => posts.id, { onDelete: "cascade" }),
		commentId: d
			.integer()
			.references(() => comments.id, { onDelete: "cascade" }),
		reporterId: d
			.varchar({ length: 256 })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: reportTypeEnum("type").notNull(),
		description: d.text(),
		status: reportStatusEnum("status").default("pending").notNull(),
		reviewerId: d.varchar({ length: 256 }).references(() => users.id),
		reviewNote: d.text(),
		createdAt: d
			.timestamp({ withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
	}),
	(t) => [
		index("report_post_idx").on(t.postId),
		index("report_comment_idx").on(t.commentId),
		index("report_reporter_idx").on(t.reporterId),
		index("report_reviewer_idx").on(t.reviewerId),
		index("report_status_idx").on(t.status),
	],
);

export const badges = createTable(
	"badge",
	(d) => ({
		id: d.serial().primaryKey(),
		name: d.varchar({ length: 100 }).notNull().unique(),
		description: d.text().notNull(),
		imageUrl: d.text(),
		criteria: d.json(), // JSON object with criteria for earning the badge
		createdAt: d
			.timestamp({ withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	}),
	(t) => [index("badge_name_idx").on(t.name)],
);

export const userBadges = createTable(
	"user_badge",
	(d) => ({
		userId: d
			.varchar({ length: 256 })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		badgeId: d
			.integer()
			.notNull()
			.references(() => badges.id, { onDelete: "cascade" }),
		awardedAt: d
			.timestamp({ withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	}),
	(t) => [
		primaryKey({ columns: [t.userId, t.badgeId] }),
		index("user_badge_user_idx").on(t.userId),
		index("user_badge_badge_idx").on(t.badgeId),
	],
);

export const bookmarks = createTable(
	"bookmark",
	(d) => ({
		id: d.serial().primaryKey(),
		userId: d
			.varchar({ length: 256 })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		postId: d
			.integer()
			.notNull()
			.references(() => posts.id, { onDelete: "cascade" }),
		createdAt: d
			.timestamp({ withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	}),
	(t) => [
		uniqueIndex("unique_user_post_bookmark").on(t.userId, t.postId),
		index("bookmark_user_idx").on(t.userId),
		index("bookmark_post_idx").on(t.postId),
	],
);

export const notifications = createTable(
	"notification",
	(d) => ({
		id: d.serial().primaryKey(),
		userId: d
			.varchar({ length: 256 })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: notificationTypeEnum("type").notNull(),
		content: d.text().notNull(),
		actorId: d.varchar({ length: 256 }).references(() => users.id),
		postId: d.serial().references(() => posts.id),
		commentId: d.serial().references(() => comments.id),
		isRead: d.boolean().default(false).notNull(),
		createdAt: d
			.timestamp({ withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	}),
	(t) => [
		index("notification_user_idx").on(t.userId),
		index("notification_actor_idx").on(t.actorId),
		index("notification_post_idx").on(t.postId),
		index("notification_created_idx").on(t.createdAt),
		index("notification_read_idx").on(t.isRead),
	],
);

export const analytics = createTable(
	"analytic",
	(d) => ({
		id: d.serial().primaryKey(),
		date: d
			.timestamp({ withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		dailyActiveUsers: d.integer().default(0),
		newUsers: d.integer().default(0),
		totalPosts: d.integer().default(0),
		totalReviews: d.integer().default(0),
		falseNewsPercentage: d.integer().default(0),
		trendingTags: d.json().$type<{ tagId: number; count: number }[]>(),
		createdAt: d
			.timestamp({ withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	}),
	(t) => [index("analytics_date_idx").on(t.date)],
);

// Define relations after all tables are defined to avoid circular references
export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts),
	comments: many(comments),
	reactions: many(reactions),
	followers: many(follows, { relationName: "followers" }),
	following: many(follows, { relationName: "following" }),
	reviews: many(reviews),
	reports: many(reports),
	notifications: many(notifications),
	badges: many(userBadges),
}));

export const followsRelations = relations(follows, ({ one }) => ({
	follower: one(users, {
		fields: [follows.followerId],
		references: [users.id],
		relationName: "followers",
	}),
	following: one(users, {
		fields: [follows.followingId],
		references: [users.id],
		relationName: "following",
	}),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
	posts: many(postCategories),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
	user: one(users, {
		fields: [posts.userId],
		references: [users.id],
	}),
	comments: many(comments),
	reactions: many(reactions),
	reviews: many(reviews),
	reports: many(reports),
	categories: many(postCategories),
	tags: many(postTags),
}));

export const postCategoriesRelations = relations(postCategories, ({ one }) => ({
	post: one(posts, {
		fields: [postCategories.postId],
		references: [posts.id],
	}),
	category: one(categories, {
		fields: [postCategories.categoryId],
		references: [categories.id],
	}),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
	posts: many(postTags),
}));

export const postTagsRelations = relations(postTags, ({ one }) => ({
	post: one(posts, {
		fields: [postTags.postId],
		references: [posts.id],
	}),
	tag: one(tags, {
		fields: [postTags.tagId],
		references: [tags.id],
	}),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
	post: one(posts, {
		fields: [comments.postId],
		references: [posts.id],
	}),
	user: one(users, {
		fields: [comments.userId],
		references: [users.id],
	}),
	parent: one(comments, {
		fields: [comments.parentId],
		references: [comments.id],
	}),
	replies: many(comments),
	reactions: many(commentReactions),
}));

export const reactionsRelations = relations(reactions, ({ one }) => ({
	post: one(posts, {
		fields: [reactions.postId],
		references: [posts.id],
	}),
	user: one(users, {
		fields: [reactions.userId],
		references: [users.id],
	}),
}));

export const commentReactionsRelations = relations(
	commentReactions,
	({ one }) => ({
		comment: one(comments, {
			fields: [commentReactions.commentId],
			references: [comments.id],
		}),
		user: one(users, {
			fields: [commentReactions.userId],
			references: [users.id],
		}),
	}),
);

export const reviewsRelations = relations(reviews, ({ one }) => ({
	post: one(posts, {
		fields: [reviews.postId],
		references: [posts.id],
	}),
	user: one(users, {
		fields: [reviews.userId],
		references: [users.id],
	}),
}));

export const reportsRelations = relations(reports, ({ one }) => ({
	post: one(posts, {
		fields: [reports.postId],
		references: [posts.id],
	}),
	comment: one(comments, {
		fields: [reports.commentId],
		references: [comments.id],
	}),
	reporter: one(users, {
		fields: [reports.reporterId],
		references: [users.id],
	}),
	reviewer: one(users, {
		fields: [reports.reviewerId],
		references: [users.id],
	}),
}));

export const badgesRelations = relations(badges, ({ many }) => ({
	users: many(userBadges),
}));

export const userBadgesRelations = relations(userBadges, ({ one }) => ({
	user: one(users, {
		fields: [userBadges.userId],
		references: [users.id],
	}),
	badge: one(badges, {
		fields: [userBadges.badgeId],
		references: [badges.id],
	}),
}));

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
	user: one(users, {
		fields: [bookmarks.userId],
		references: [users.id],
	}),
	post: one(posts, {
		fields: [bookmarks.postId],
		references: [posts.id],
	}),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
	user: one(users, {
		fields: [notifications.userId],
		references: [users.id],
	}),
	actor: one(users, {
		fields: [notifications.actorId],
		references: [users.id],
	}),
	post: one(posts, {
		fields: [notifications.postId],
		references: [posts.id],
	}),
	comment: one(comments, {
		fields: [notifications.commentId],
		references: [comments.id],
	}),
}));
