import { db } from "@/lib/db";
import { role } from "@/lib/db/schema";
import { NextApiRequest, NextApiResponse } from "next";
import { RoleRestType } from "@/lib/typedefs/REST-types";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { name, productPermission, workspacePermission }: RoleRestType = req.body;

  const result = await db.insert(role)
    .values({ name, productPermission, workspacePermission})
    .returning();

  return res.status(200).json(result[0]);
}
