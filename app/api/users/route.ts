import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { UserRestType, ResponseToastMessage } from "@/lib/typedefs/rest-types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("inside /api/users POST route")
  const {name, email, roleId }: UserRestType = await req.json();

  const existing_user = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existing_user.length !== 0) {
    return NextResponse.json<ResponseToastMessage>({
      title: "Invalid",
      description: "User with this email already exists"
    });
  }

  const user = await db
    .insert(users)
    .values({ name, email, roleId })
    .returning()

  if (user.length === 0) {
    return NextResponse.json<ResponseToastMessage>({
      title: "Invalid",
      description: "Cannot add user"
    });
  } else {
    return NextResponse.json<ResponseToastMessage>({
      title: "Success",
      description: "New user has been added"
    });
  }
}

export async function GET() {
  console.log("inside /api/users GET route")
  const result = await db.select().from(users);
  return Response.json(result);
}

export async function DELETE(req: NextRequest) {
  console.log("inside /api/users DELETE route")
  const id = await req.json();
  const result = await db.delete(users).where(eq(users.id, id)).returning();

  if (result.length === 0) {
    return NextResponse.json<ResponseToastMessage>({
      title: "Invalid",
      description: "No such user exists"
    });
  } else {
    return NextResponse.json<ResponseToastMessage>({
      title: "Success",
      description: "A user has been deleted",
    });
  }
}
