import { useDelete, useRoles } from "@/lib/hooks";
import { Trash2 } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

interface DeleteButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  itemId: number
}

export default function DeleteRoleButton({ itemId }: DeleteButtonProps) {
  const { refetch } = useRoles();
  const onDelete = useDelete('/api/roles', itemId, refetch);

  return <Button variant="outline" size="icon" onClick={onDelete}>
    <Trash2 size="1.5em" />
  </Button>
}
