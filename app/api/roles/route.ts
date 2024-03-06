import { db } from "@/lib/db";
import { roles, users  } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { RoleRestType, ResponseToastMessage } from "@/lib/typedefs/rest-types";
import { serialize_permission } from "@/lib/db/utils";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  console.log("inside /api/roles POST route")
  const data: RoleRestType = await req.json();
  console.log(data);

  const result = await db.insert(roles).values({
    name: data.name,
    productPermission: serialize_permission(data.productPermission),
    workspacePermission: serialize_permission(data.workspacePermission),
  }).returning();

  if (result.length === 0) {
    return NextResponse.json<ResponseToastMessage>({
      title: "Invalid",
      description: "Cannot add role"
    });
  } else {
    return NextResponse.json<ResponseToastMessage>({
      title: "Success",
      description: "New role created"
    });
  }
}

export async function GET() {
  console.log("inside /api/roles GET route")
  // TODO: Can do pagination, with page param
  const result = await db.select().from(roles);
  return NextResponse.json(result);
}

export async function DELETE(req: NextRequest) {
  console.log("inside /api/roles DELETE route")
  const id: number = await req.json();

  const related_users = await db.select().from(users).where(eq(users.roleId, id));

  if (related_users.length > 0) {
    return NextResponse.json<ResponseToastMessage>({
      title: "Cannot delete role",
      description: "This role is associated with some users"
    });
  } else {
    const result = await db.delete(roles).where(eq(roles.id, id)).returning();
    if (result.length === 0) {
      return NextResponse.json<ResponseToastMessage>({
        title: "Invalid",
        description: "No such role exists"
      });
    } else {
      return NextResponse.json<ResponseToastMessage>({
        title: "Success",
        description: "A role has been deleted",
      });
    }
  }
}
