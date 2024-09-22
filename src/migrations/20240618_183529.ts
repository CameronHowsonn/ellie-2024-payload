import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "single_performance" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"subtitle" varchar,
	"date" timestamp(3) with time zone NOT NULL,
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
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "homepage_blocks_gallery" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

DROP TABLE "homepage_blocks_cta_image";
DROP TABLE "homepage_blocks_pricing_section_pricing";
DROP TABLE "homepage_blocks_pricing_section_pricing_two";
DROP TABLE "homepage_blocks_pricing_section_pricing_three";
DROP TABLE "homepage_blocks_pricing_section";
DROP TABLE "homepage_blocks_performance_videos";
DROP TABLE "homepage_blocks_performance";
ALTER TABLE "homepage_blocks_homepage_hero" ADD COLUMN "hero_subtitle" varchar;
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

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

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

DROP TABLE "single_performance";
DROP TABLE "homepage_blocks_performances";
DROP TABLE "homepage_blocks_gallery_images";
DROP TABLE "homepage_blocks_gallery";
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
ALTER TABLE "homepage_blocks_homepage_hero" DROP COLUMN IF EXISTS "hero_subtitle";
ALTER TABLE "homepage_blocks_homepage_biography" DROP COLUMN IF EXISTS "recent_engagements_title";
ALTER TABLE "homepage_blocks_homepage_biography" DROP COLUMN IF EXISTS "recent_engagements";
ALTER TABLE "homepage_blocks_homepage_biography" DROP COLUMN IF EXISTS "recentengagements_html";
ALTER TABLE "homepage_blocks_homepage_biography" DROP COLUMN IF EXISTS "future_engagements_title";
ALTER TABLE "homepage_blocks_homepage_biography" DROP COLUMN IF EXISTS "future_engagements";
ALTER TABLE "homepage_blocks_homepage_biography" DROP COLUMN IF EXISTS "futureengagements_html";
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
`);

};
