import { useDelete, useDisplayUsers } from "@/lib/hooks";
import { Trash2 } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

interface DeleteButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  itemId: number
}

export default function DeleteUserButton({ itemId }: DeleteButtonProps) {
  const { refetch } = useDisplayUsers();
  const onDelete = useDelete('/api/users', itemId, refetch);

  return <Button variant="outline" size="icon" onClick={onDelete}>
    <Trash2 size="1.5em" />
  </Button>
}
