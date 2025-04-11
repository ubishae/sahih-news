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
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `sahih-news_${name}`);

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
	(table) => ({
		clerkIdIdx: index("clerk_id_idx").on(table.clerkId),
		usernameIdx: index("username_idx").on(table.username),
	}),
);

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts),
}));

export const posts = createTable("posts", {
	id: serial("id").primaryKey(),
	content: text("content").notNull(),
	ownerId: integer("owner_id")
		.notNull()
		.references(() => users.id),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
	owner: one(users, {
		fields: [posts.ownerId],
		references: [users.id],
	}),
	bookmarks: many(bookmarks),
}));

export const bookmarks = createTable(
	"bookmarks",
	{
		id: serial("id").primaryKey(),
		ownerId: integer("owner_id")
			.notNull()
			.references(() => users.id),
		postId: integer("post_id")
			.notNull()
			.references(() => posts.id),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(table) => ({
		uniqueIdx: index("unique_idx").on(table.ownerId, table.postId),
		ownerIdIdx: index("owner_id_idx").on(table.ownerId),
		postIdIdx: index("post_id_idx").on(table.postId),
	}),
);

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
