import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserDisplay } from "@/lib/typedefs/display-types";
import DeletedRounded from '~icons/material-symbols/delete-rounded';
import { useDelete, useDisplayUsers } from "@/lib/hooks";

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
      const { refetch } = useDisplayUsers();
      const onDelete = useDelete('/api/users', row.original.id, () => refetch());

      return <Button variant="outline" size="icon" onClick={onDelete}>
        <DeletedRounded />
      </Button>
    }
  }
];
