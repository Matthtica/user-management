import { useDelete, useDisplayUsers } from "@/lib/hooks";
import DeletedRounded from '~icons/material-symbols/delete-rounded';
import React from "react";
import { Button } from "@/components/ui/button";

interface DeleteButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  itemId: number
}

export default function DeleteUserButton({ itemId }: DeleteButtonProps) {
  const { refetch } = useDisplayUsers();
  const onDelete = useDelete('/api/users', itemId, refetch);

  return <Button variant="outline" size="icon" onClick={onDelete}>
    <DeletedRounded />
  </Button>
}
