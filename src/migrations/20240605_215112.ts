import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar NOT NULL,
	"base64" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "homepage_blocks_homepage_hero" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"hero_title" varchar NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "homepage_blocks_homepage_biography" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" jsonb NOT NULL,
	"description_html" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "homepage_blocks_cta_image" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "homepage_blocks_pricing_section_pricing" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "homepage_blocks_pricing_section_pricing_two" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"price" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "homepage_blocks_pricing_section_pricing_three" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"price" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "homepage_blocks_pricing_section" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"introduction" jsonb NOT NULL,
	"introduction_html" varchar,
	"pricing_col_one_title" varchar NOT NULL,
	"pricing_col_two_title" varchar NOT NULL,
	"pricing_col_three_title" varchar NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "homepage_blocks_performance_videos" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"year" varchar,
	"title" varchar NOT NULL,
	"video" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "homepage_blocks_performance" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "homepage_blocks_contact_form" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"subtitle" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "homepage" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "homepage_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" ("filename");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
CREATE INDEX IF NOT EXISTS "homepage_blocks_homepage_hero_order_idx" ON "homepage_blocks_homepage_hero" ("_order");
CREATE INDEX IF NOT EXISTS "homepage_blocks_homepage_hero_parent_id_idx" ON "homepage_blocks_homepage_hero" ("_parent_id");
CREATE INDEX IF NOT EXISTS "homepage_blocks_homepage_hero_path_idx" ON "homepage_blocks_homepage_hero" ("_path");
CREATE INDEX IF NOT EXISTS "homepage_blocks_homepage_biography_order_idx" ON "homepage_blocks_homepage_biography" ("_order");
CREATE INDEX IF NOT EXISTS "homepage_blocks_homepage_biography_parent_id_idx" ON "homepage_blocks_homepage_biography" ("_parent_id");
CREATE INDEX IF NOT EXISTS "homepage_blocks_homepage_biography_path_idx" ON "homepage_blocks_homepage_biography" ("_path");
CREATE INDEX IF NOT EXISTS "homepage_blocks_cta_image_order_idx" ON "homepage_blocks_cta_image" ("_order");
CREATE INDEX IF NOT EXISTS "homepage_blocks_cta_image_parent_id_idx" ON "homepage_blocks_cta_image" ("_parent_id");
CREATE INDEX IF NOT EXISTS "homepage_blocks_cta_image_path_idx" ON "homepage_blocks_cta_image" ("_path");
CREATE INDEX IF NOT EXISTS "homepage_blocks_pricing_section_pricing_order_idx" ON "homepage_blocks_pricing_section_pricing" ("_order");
CREATE INDEX IF NOT EXISTS "homepage_blocks_pricing_section_pricing_parent_id_idx" ON "homepage_blocks_pricing_section_pricing" ("_parent_id");
CREATE INDEX IF NOT EXISTS "homepage_blocks_pricing_section_pricing_two_order_idx" ON "homepage_blocks_pricing_section_pricing_two" ("_order");
CREATE INDEX IF NOT EXISTS "homepage_blocks_pricing_section_pricing_two_parent_id_idx" ON "homepage_blocks_pricing_section_pricing_two" ("_parent_id");
CREATE INDEX IF NOT EXISTS "homepage_blocks_pricing_section_pricing_three_order_idx" ON "homepage_blocks_pricing_section_pricing_three" ("_order");
CREATE INDEX IF NOT EXISTS "homepage_blocks_pricing_section_pricing_three_parent_id_idx" ON "homepage_blocks_pricing_section_pricing_three" ("_parent_id");
CREATE INDEX IF NOT EXISTS "homepage_blocks_pricing_section_order_idx" ON "homepage_blocks_pricing_section" ("_order");
CREATE INDEX IF NOT EXISTS "homepage_blocks_pricing_section_parent_id_idx" ON "homepage_blocks_pricing_section" ("_parent_id");
CREATE INDEX IF NOT EXISTS "homepage_blocks_pricing_section_path_idx" ON "homepage_blocks_pricing_section" ("_path");
CREATE INDEX IF NOT EXISTS "homepage_blocks_performance_videos_order_idx" ON "homepage_blocks_performance_videos" ("_order");
CREATE INDEX IF NOT EXISTS "homepage_blocks_performance_videos_parent_id_idx" ON "homepage_blocks_performance_videos" ("_parent_id");
CREATE INDEX IF NOT EXISTS "homepage_blocks_performance_order_idx" ON "homepage_blocks_performance" ("_order");
CREATE INDEX IF NOT EXISTS "homepage_blocks_performance_parent_id_idx" ON "homepage_blocks_performance" ("_parent_id");
CREATE INDEX IF NOT EXISTS "homepage_blocks_performance_path_idx" ON "homepage_blocks_performance" ("_path");
CREATE INDEX IF NOT EXISTS "homepage_blocks_contact_form_order_idx" ON "homepage_blocks_contact_form" ("_order");
CREATE INDEX IF NOT EXISTS "homepage_blocks_contact_form_parent_id_idx" ON "homepage_blocks_contact_form" ("_parent_id");
CREATE INDEX IF NOT EXISTS "homepage_blocks_contact_form_path_idx" ON "homepage_blocks_contact_form" ("_path");
CREATE INDEX IF NOT EXISTS "homepage_rels_order_idx" ON "homepage_rels" ("order");
CREATE INDEX IF NOT EXISTS "homepage_rels_parent_idx" ON "homepage_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "homepage_rels_path_idx" ON "homepage_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "homepage_blocks_homepage_hero" ADD CONSTRAINT "homepage_blocks_homepage_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "homepage"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "homepage_blocks_homepage_biography" ADD CONSTRAINT "homepage_blocks_homepage_biography_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "homepage"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "homepage_blocks_cta_image" ADD CONSTRAINT "homepage_blocks_cta_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "homepage"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "homepage_blocks_pricing_section_pricing" ADD CONSTRAINT "homepage_blocks_pricing_section_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "homepage_blocks_pricing_section"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "homepage_blocks_pricing_section_pricing_two" ADD CONSTRAINT "homepage_blocks_pricing_section_pricing_two_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "homepage_blocks_pricing_section"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "homepage_blocks_pricing_section_pricing_three" ADD CONSTRAINT "homepage_blocks_pricing_section_pricing_three_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "homepage_blocks_pricing_section"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "homepage_blocks_pricing_section" ADD CONSTRAINT "homepage_blocks_pricing_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "homepage"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "homepage_blocks_performance_videos" ADD CONSTRAINT "homepage_blocks_performance_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "homepage_blocks_performance"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "homepage_blocks_performance" ADD CONSTRAINT "homepage_blocks_performance_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "homepage"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "homepage_blocks_contact_form" ADD CONSTRAINT "homepage_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "homepage"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "homepage"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "users";
DROP TABLE "media";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";
DROP TABLE "homepage_blocks_homepage_hero";
DROP TABLE "homepage_blocks_homepage_biography";
DROP TABLE "homepage_blocks_cta_image";
DROP TABLE "homepage_blocks_pricing_section_pricing";
DROP TABLE "homepage_blocks_pricing_section_pricing_two";
DROP TABLE "homepage_blocks_pricing_section_pricing_three";
DROP TABLE "homepage_blocks_pricing_section";
DROP TABLE "homepage_blocks_performance_videos";
DROP TABLE "homepage_blocks_performance";
DROP TABLE "homepage_blocks_contact_form";
DROP TABLE "homepage";
DROP TABLE "homepage_rels";`);

};
