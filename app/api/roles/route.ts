import { db } from "@/lib/db";
import { role } from "@/lib/db/schema";
import { RoleRestType } from "@/lib/typedefs/REST-types";
import { serialize_permission } from "@/lib/db/utils";

export async function POST(request: Request) {
  console.log("inside /api/roles POST route")
  const data: RoleRestType = await request.json();
  console.log(data);

  const result = await db.insert(role).values({
    name: data.name,
    productPermission: serialize_permission(data.productPermission),
    workspacePermission: serialize_permission(data.workspacePermission),
  }).returning();

  return Response.json(result[0]);
}

export async function GET(request: Request) {
  console.log("inside /api/roles GET route")
  // TODO: Can do pagination, with page param
  const result = await db.select().from(role);
  return Response.json(result);
}
