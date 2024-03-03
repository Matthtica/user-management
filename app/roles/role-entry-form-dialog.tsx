import React, { FC } from "react";
import { useToast } from "@/components/ui/use-toast";
import ButtonFormDialog from "@/components/custom/button-form-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface RoleEntryFormDialogProps extends React.HTMLAttributes<HTMLButtonElement> {
  refetch: () => void
}

const RoleEntryFormDialog: FC<RoleEntryFormDialogProps> = ({ refetch, className, ...props }) => {
  const [name, setName] = React.useState('');
  const [product_perm, setProductPerm] = React.useState([false, false, false, false]);
  const [workspace_perm, setWorkspacePerm] = React.useState([false, false, false, false]);
  const { toast } = useToast();

  const productToggler = (index: number) => {
    console.log("product toggler")
    let newPerm = [...product_perm];
    newPerm[index] = !newPerm[index];
    setProductPerm(newPerm);
  }
  const workspaceToggler = (index: number) => {
    console.log("workspace toggler")
    let newPerm = [...workspace_perm];
    newPerm[index] = !newPerm[index];
    setWorkspacePerm(newPerm);
  }
  const reset = () => {
    setName('');
    setProductPerm([false, false, false, false]);
    setWorkspacePerm([false, false, false, false]);
  }
  const submit = async () => {
    if (name === '') return;
    const res = await fetch("/api/roles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        productPermission: product_perm,
        workspacePermission: workspace_perm
      }),
    }).then((res) => {
        toast({
          title: "Role Created",
          description: `Json: ${res.json()}`,
        })
        reset();
        refetch();
        return res.json();
    }).catch((err) => {
        toast({
          title: "Error",
          description: `Json: ${err}`,
        })
    });
  }

  return <ButtonFormDialog
    text="New Role"
    title="Add New Role"
    description="Add new role with explicit permissions"
    onReset={reset}
    onSubmit={submit}
  >
    <div className="grid gap-4 py-4">
      <Label htmlFor="name">Name</Label>
      <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Admin' />
      <div className="flex flex-col gap-5 border p-3 px-5 rounded-md">
        <Label htmlFor="product-perm">Product Permissions</Label>
        <RenderCheckBoxs id="product-perm" perm={product_perm} toggler={productToggler} />
      </div>
      <div className="flex flex-col gap-5 border p-3 px-5 rounded-md">
        <Label htmlFor="workspace-perm">Workspace Permissions</Label>
        <RenderCheckBoxs id="workspace-perm" perm={workspace_perm} toggler={workspaceToggler} />
      </div>
    </div>
  </ButtonFormDialog>
}

const CRUD = ['Create', 'Read', 'Update', 'Delete'];
interface CheckboxsRenderProps extends React.HTMLAttributes<HTMLDivElement> {
  perm: boolean[];
  toggler: (index: number) => void;
}

const RenderCheckBoxs: FC<CheckboxsRenderProps> = ({ id, perm, toggler, className, ...props }) => {
  return <div {...props} className="flex gap-4">
    {CRUD.map((op, index) => {
      return <div className="flex items-center gap-1">
        <Checkbox
          key={op}
          id={op + id}
          checked={perm[index]}
          onCheckedChange={() => toggler(index)}
        />
        <Label htmlFor={op + id}>{op}</Label>
      </div>
    })}
  </div>
}

export default RoleEntryFormDialog;
