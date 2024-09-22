import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_homepage_blocks_services_services_icon" AS ENUM('family', 'plane', 'calendar', 'notepad', 'office', 'contact');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "homepage_blocks_services_services" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" jsonb NOT NULL,
	"description_html" varchar,
	"icon" "enum_homepage_blocks_services_services_icon" NOT NULL
);

CREATE TABLE IF NOT EXISTS "homepage_blocks_services" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "homepage_blocks_testimonial" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"quote" jsonb NOT NULL,
	"quote_html" varchar,
	"author" varchar NOT NULL,
	"block_name" varchar
);

DROP TABLE "single_performance";
DROP TABLE "homepage_blocks_performances";
DROP TABLE "homepage_blocks_gallery_images";
DROP TABLE "homepage_blocks_gallery";
ALTER TABLE "homepage_blocks_homepage_biography" ADD COLUMN "subtext" jsonb NOT NULL;
ALTER TABLE "homepage_blocks_homepage_biography" ADD COLUMN "subtext_html" varchar;
CREATE INDEX IF NOT EXISTS "homepage_blocks_services_services_order_idx" ON "homepage_blocks_services_services" ("_order");
CREATE INDEX IF NOT EXISTS "homepage_blocks_services_services_parent_id_idx" ON "homepage_blocks_services_services" ("_parent_id");
CREATE INDEX IF NOT EXISTS "homepage_blocks_services_order_idx" ON "homepage_blocks_services" ("_order");
CREATE INDEX IF NOT EXISTS "homepage_blocks_services_parent_id_idx" ON "homepage_blocks_services" ("_parent_id");
CREATE INDEX IF NOT EXISTS "homepage_blocks_services_path_idx" ON "homepage_blocks_services" ("_path");
CREATE INDEX IF NOT EXISTS "homepage_blocks_testimonial_order_idx" ON "homepage_blocks_testimonial" ("_order");
CREATE INDEX IF NOT EXISTS "homepage_blocks_testimonial_parent_id_idx" ON "homepage_blocks_testimonial" ("_parent_id");
CREATE INDEX IF NOT EXISTS "homepage_blocks_testimonial_path_idx" ON "homepage_blocks_testimonial" ("_path");
ALTER TABLE "homepage_blocks_homepage_hero" DROP COLUMN IF EXISTS "hero_subtitle";
ALTER TABLE "homepage_blocks_homepage_biography" DROP COLUMN IF EXISTS "description";
ALTER TABLE "homepage_blocks_homepage_biography" DROP COLUMN IF EXISTS "description_html";
ALTER TABLE "homepage_blocks_homepage_biography" DROP COLUMN IF EXISTS "recent_engagements_title";
ALTER TABLE "homepage_blocks_homepage_biography" DROP COLUMN IF EXISTS "recent_engagements";
ALTER TABLE "homepage_blocks_homepage_biography" DROP COLUMN IF EXISTS "recentengagements_html";
ALTER TABLE "homepage_blocks_homepage_biography" DROP COLUMN IF EXISTS "future_engagements_title";
ALTER TABLE "homepage_blocks_homepage_biography" DROP COLUMN IF EXISTS "future_engagements";
ALTER TABLE "homepage_blocks_homepage_biography" DROP COLUMN IF EXISTS "futureengagements_html";
DO $$ BEGIN
 ALTER TABLE "homepage_blocks_services_services" ADD CONSTRAINT "homepage_blocks_services_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "homepage_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "homepage_blocks_services" ADD CONSTRAINT "homepage_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "homepage"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "homepage_blocks_testimonial" ADD CONSTRAINT "homepage_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "homepage"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "single_performance" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"subtitle" varchar,
	"description" varchar,
	"date" timestamp(3) with time zone NOT NULL,
	"time" varchar,
	"link" varchar,
	"hidden" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "homepage_blocks_performances" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "homepage_blocks_gallery_images" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"video" varchar
);

CREATE TABLE IF NOT EXISTS "homepage_blocks_gallery" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

DROP TABLE "homepage_blocks_services_services";
DROP TABLE "homepage_blocks_services";
DROP TABLE "homepage_blocks_testimonial";
ALTER TABLE "homepage_blocks_homepage_hero" ADD COLUMN "hero_subtitle" varchar;
ALTER TABLE "homepage_blocks_homepage_biography" ADD COLUMN "description" jsonb NOT NULL;
ALTER TABLE "homepage_blocks_homepage_biography" ADD COLUMN "description_html" varchar;
ALTER TABLE "homepage_blocks_homepage_biography" ADD COLUMN "recent_engagements_title" varchar NOT NULL;
ALTER TABLE "homepage_blocks_homepage_biography" ADD COLUMN "recent_engagements" jsonb;
ALTER TABLE "homepage_blocks_homepage_biography" ADD COLUMN "recentengagements_html" varchar;
ALTER TABLE "homepage_blocks_homepage_biography" ADD COLUMN "future_engagements_title" varchar NOT NULL;
ALTER TABLE "homepage_blocks_homepage_biography" ADD COLUMN "future_engagements" jsonb;
ALTER TABLE "homepage_blocks_homepage_biography" ADD COLUMN "futureengagements_html" varchar;
CREATE INDEX IF NOT EXISTS "single_performance_created_at_idx" ON "single_performance" ("created_at");
CREATE INDEX IF NOT EXISTS "homepage_blocks_performances_order_idx" ON "homepage_blocks_performances" ("_order");
CREATE INDEX IF NOT EXISTS "homepage_blocks_performances_parent_id_idx" ON "homepage_blocks_performances" ("_parent_id");
CREATE INDEX IF NOT EXISTS "homepage_blocks_performances_path_idx" ON "homepage_blocks_performances" ("_path");
CREATE INDEX IF NOT EXISTS "homepage_blocks_gallery_images_order_idx" ON "homepage_blocks_gallery_images" ("_order");
CREATE INDEX IF NOT EXISTS "homepage_blocks_gallery_images_parent_id_idx" ON "homepage_blocks_gallery_images" ("_parent_id");
CREATE INDEX IF NOT EXISTS "homepage_blocks_gallery_order_idx" ON "homepage_blocks_gallery" ("_order");
CREATE INDEX IF NOT EXISTS "homepage_blocks_gallery_parent_id_idx" ON "homepage_blocks_gallery" ("_parent_id");
CREATE INDEX IF NOT EXISTS "homepage_blocks_gallery_path_idx" ON "homepage_blocks_gallery" ("_path");
ALTER TABLE "homepage_blocks_homepage_biography" DROP COLUMN IF EXISTS "subtext";
ALTER TABLE "homepage_blocks_homepage_biography" DROP COLUMN IF EXISTS "subtext_html";
DO $$ BEGIN
 ALTER TABLE "homepage_blocks_performances" ADD CONSTRAINT "homepage_blocks_performances_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "homepage"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "homepage_blocks_gallery_images" ADD CONSTRAINT "homepage_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "homepage_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "homepage_blocks_gallery" ADD CONSTRAINT "homepage_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "homepage"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};
