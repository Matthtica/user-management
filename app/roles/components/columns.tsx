import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { type Role } from "@/lib/db/schema";
import { deserializeToDisplayString } from "@/lib/db/utils";
import { Button } from "@/components/ui/button";
import DeletedRounded from '~icons/material-symbols/delete-rounded';
import { useDelete, useRoles } from "@/lib/hooks";
import DeleteRoleButton from "./delete-button";

export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    },
  },
  {
    accessorKey: 'products_permission',
    header: "Product Permission",
    cell: ({ row }) => {
      const permission = row.original.productPermission;
      return deserializeToDisplayString(permission);
    }
  },
  {
    accessorKey: 'workspace_permission',
    header: "Workspace Permission",
    cell: ({ row }) => {
      const permission = row.original.workspacePermission;
      return deserializeToDisplayString(permission);
    }
  },
  {
    accessorKey: 'action',
    header: "Action",
    cell: ({ row }) => {
      return <DeleteRoleButton itemId={row.original.id}></DeleteRoleButton>
    }
  }
]
