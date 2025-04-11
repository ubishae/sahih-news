// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
	pgTableCreator,
	serial,
	text,
	timestamp,
	varchar,
	index,
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
