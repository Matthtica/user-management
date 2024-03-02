ALTER TABLE "role" ADD COLUMN "productPermission" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "role" ADD COLUMN "workspacePermission" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "role" DROP COLUMN IF EXISTS "permissionCreate";--> statement-breakpoint
ALTER TABLE "role" DROP COLUMN IF EXISTS "permissionRead";--> statement-breakpoint
ALTER TABLE "role" DROP COLUMN IF EXISTS "permissionUpdate";--> statement-breakpoint
ALTER TABLE "role" DROP COLUMN IF EXISTS "permissionDelete";