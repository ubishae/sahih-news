// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
	pgTableCreator,
	serial,
	text,
	timestamp,
	varchar,
	index,
	integer,
	pgEnum,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
// export const createTable = pgTableCreator((name) => `sahih-news_${name}`);
export const createTable = pgTableCreator((name) => `${name}`);

export const voteType = pgEnum("vote_type", ["upvote", "downvote"]);

export const voteTypes = voteType.enumValues;

export const users = createTable(
	"users",
	{
		id: serial("id").primaryKey(),
		clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
		username: varchar("username", { length: 255 }).notNull().unique(),
		displayName: varchar("display_name", { length: 255 }).notNull(),
		profileImageUrl: text("profile_image_url").notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(table) => [
		index("clerk_id_idx").on(table.clerkId),
		index("username_idx").on(table.username),
	],
);

export const posts = createTable("posts", {
	id: serial("id").primaryKey(),
	content: text("content").notNull(),
	ownerId: integer("owner_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const bookmarks = createTable(
	"bookmarks",
	{
		id: serial("id").primaryKey(),
		ownerId: integer("owner_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		postId: integer("post_id")
			.notNull()
			.references(() => posts.id, { onDelete: "cascade" }),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(table) => [index("unique_bookmark_idx").on(table.ownerId, table.postId)],
);

export const votes = createTable(
	"votes",
	{
		id: serial("id").primaryKey(),
		userId: integer("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		postId: integer("post_id")
			.notNull()
			.references(() => posts.id, { onDelete: "cascade" }),
		type: voteType("type").notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(table) => [index("unique_votes_idx").on(table.userId, table.postId)],
);

export const comments = createTable("comments", {
	id: serial("id").primaryKey(),
	content: text("content").notNull(),
	postId: integer("post_id")
		.notNull()
		.references(() => posts.id, { onDelete: "cascade" }),
	ownerId: integer("owner_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Define relations after all tables are defined
export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts),
	bookmarks: many(bookmarks),
	votes: many(votes),
	comments: many(comments),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
	owner: one(users, {
		fields: [posts.ownerId],
		references: [users.id],
	}),
	bookmarks: many(bookmarks),
	votes: many(votes),
	comments: many(comments),
}));

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
	owner: one(users, {
		fields: [bookmarks.ownerId],
		references: [users.id],
	}),
	post: one(posts, {
		fields: [bookmarks.postId],
		references: [posts.id],
	}),
}));

export const votesRelations = relations(votes, ({ one }) => ({
	user: one(users, {
		fields: [votes.userId],
		references: [users.id],
	}),
	post: one(posts, {
		fields: [votes.postId],
		references: [posts.id],
	}),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
	post: one(posts, {
		fields: [comments.postId],
		references: [posts.id],
	}),
	owner: one(users, {
		fields: [comments.ownerId],
		references: [users.id],
	}),
}));
