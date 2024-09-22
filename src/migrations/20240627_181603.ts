import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "single_performance" ADD COLUMN "description" varchar;
ALTER TABLE "single_performance" ADD COLUMN "time" varchar;`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "single_performance" DROP COLUMN IF EXISTS "description";
ALTER TABLE "single_performance" DROP COLUMN IF EXISTS "time";`);

};
