import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TYPE "enum_homepage_blocks_services_services_icon" ADD VALUE 'personal';`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
// Migration code
};
