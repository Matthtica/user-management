import React from "react";
import ButtonFormDialog from "@/components/custom/button-form-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { RoleDisplay } from "@/lib/typedefs/display-types";
import { useRolesMap } from "@/lib/hooks";
import { toast } from "@/components/ui/use-toast";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  refetch: () => void
}
export default function UserEntryFormDialog({ refetch }: Props) {
  const { roles } = useRolesMap();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const reset = () => {
    setName('');
    setEmail('');
    setValue('');
  }

  const submit = async () => {
    if (name === '') return;

    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        roleId: parseInt(value)
      }),
    }).then((res) => {
      reset();
      refetch();
      return res.json();
    }).then(data => {
      toast({
        description: "User created",
        title: "Success",
      });
    }).catch((err) => {
       console.log(err);
    });
  }

  return <ButtonFormDialog
    text="New User"
    title="Add New User"
    description="Add any kind of user into the system"
    onSubmit={submit}
    onReset={reset}
  >
    <div className="grid gap-2 py-4">
      <Label htmlFor="name">Name</Label>
      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John"/>
      <Label htmlFor="email">Email</Label>
      <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@gmail.com"/>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between flex items-center"
          >
            {value ? roles?.[parseInt(value)].label : "Select a role"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search role..." />
            <CommandEmpty>No role found.</CommandEmpty>
            <CommandGroup>
              {roles ? Object.values(roles).map((role: RoleDisplay) => (
                <CommandItem
                  key={role.value}
                  value={role.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === role.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {role.label}
                </CommandItem>
              )) : ''}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  </ButtonFormDialog>
}
