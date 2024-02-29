import { db } from "@/lib/db";
import { role } from "@/lib/db/schema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const {
    name,
    permissionCreate,
    permissionRead,
    permissionUpdate,
    permissionDelete
  } = req.body;
  const result = await db.insert(role).values({ 
    name,
    permissionCreate,
    permissionRead,
    permissionUpdate,
    permissionDelete
  }).returning();
  return res.status(200).json(result[0]);
}
