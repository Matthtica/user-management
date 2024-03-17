import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserDisplay } from "@/lib/typedefs/display-types";
import DeleteUserButton from "./delete-button";

export const columns: ColumnDef<UserDisplay>[] = [
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
    accessorKey: 'email',
    header: ({ column }) => {
      return <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    },
  },
  {
    accessorKey: 'role',
    header: "Role",
  },
  {
    accessorKey: 'action',
    header: "Action",
    cell: ({ row }) => {
      return <DeleteUserButton itemId={row.original.id}></DeleteUserButton>
    }
  }
];
