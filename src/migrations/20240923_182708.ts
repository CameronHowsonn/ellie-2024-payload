import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "homepage_blocks_testimonial_testimonials" ALTER COLUMN "author" DROP NOT NULL;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "homepage_blocks_testimonial_testimonials" ALTER COLUMN "author" SET NOT NULL;`);

};
