import { ColumnDef } from "@tanstack/react-table";
import { type Role } from "@/lib/db/schema";

export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: 'name',
    header: "Name",
  },
  {
    accessorKey: 'products_permission',
    header: "Product Permission",
  },
  {
    accessorKey: 'workspace_permission',
    header: "Workspace Permission",
  }
]
