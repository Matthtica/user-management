import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { username, email, roleId } = req.body;
  const user = await db
    .insert(users)
    .values({ username, email, roleId })
    .returning()
  return res.status(200).json(user[0]);
}
