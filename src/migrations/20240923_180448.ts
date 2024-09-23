import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "homepage_blocks_testimonial_testimonials" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"quote" jsonb NOT NULL,
	"quote_html" varchar,
	"author" varchar NOT NULL
);

CREATE INDEX IF NOT EXISTS "homepage_blocks_testimonial_testimonials_order_idx" ON "homepage_blocks_testimonial_testimonials" ("_order");
CREATE INDEX IF NOT EXISTS "homepage_blocks_testimonial_testimonials_parent_id_idx" ON "homepage_blocks_testimonial_testimonials" ("_parent_id");
ALTER TABLE "homepage_blocks_testimonial" DROP COLUMN IF EXISTS "quote";
ALTER TABLE "homepage_blocks_testimonial" DROP COLUMN IF EXISTS "quote_html";
ALTER TABLE "homepage_blocks_testimonial" DROP COLUMN IF EXISTS "author";
DO $$ BEGIN
 ALTER TABLE "homepage_blocks_testimonial_testimonials" ADD CONSTRAINT "homepage_blocks_testimonial_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "homepage_blocks_testimonial"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "homepage_blocks_testimonial_testimonials";
ALTER TABLE "homepage_blocks_testimonial" ADD COLUMN "quote" jsonb NOT NULL;
ALTER TABLE "homepage_blocks_testimonial" ADD COLUMN "quote_html" varchar;
ALTER TABLE "homepage_blocks_testimonial" ADD COLUMN "author" varchar NOT NULL;`);

};
