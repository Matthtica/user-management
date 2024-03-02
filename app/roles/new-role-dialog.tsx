import React, { FC } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogContent,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PlusOutline from '~icons/basil/plus-outline';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface NewRoleDialogProps extends React.HTMLAttributes<HTMLButtonElement> {}

const NewRoleDialog: FC<NewRoleDialogProps> = ({ className, ...props }) => {
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
    const res = await fetch("/api/create_role", {
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
        return res.json();
    }).catch((err) => {
        toast({
          title: "Error",
          description: `Json: ${err}`,
        })
    });
  }

  return <Dialog>
    <DialogTrigger {...props} className={cn("bg-primary rounded text-primary-foreground flex gap-2 py-2 px-3 font-medium", className)}>
      <PlusOutline className="w-6 h-6"/>
      <span>Add Role</span>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Add New Role
        </DialogTitle>
        <DialogDescription>
          Add new role with explicit permissions
        </DialogDescription>
      </DialogHeader>
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
      <DialogFooter>
        <DialogClose asChild>
          <Button type='button' variant="secondary" onClick={reset}>Cancel</Button>
        </DialogClose>
        <Button onClick={submit}>Submit</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
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

export default NewRoleDialog;
