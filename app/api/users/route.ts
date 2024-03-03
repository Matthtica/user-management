import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { UserRestType } from "@/lib/typedefs/REST-types";

export async function POST(request: Request) {
  console.log("inside /api/users POST route")
  const {name, email, roleId }: UserRestType = await request.json();
  const user = await db
    .insert(users)
    .values({ name, email, roleId })
    .returning()
  return Response.json(user[0]);
}

export async function GET(_: Request) {
  console.log("inside /api/users GET route")
  const result = await db.select().from(users);
  return Response.json(result);
}
