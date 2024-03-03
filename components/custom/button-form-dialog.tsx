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
import { Button } from '@/components/ui/button';
import PlusOutline from '~icons/basil/plus-outline';
import { cn } from '@/lib/utils';

interface BottomFormDialogProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string,
  title: string,
  description: string,
  onReset?: () => void,
  onSubmit?: () => void,
}

const ButtonFormDialog: FC<BottomFormDialogProps> =
({ text, title, description, onReset, onSubmit, className, children, ...props }) => {

  return <Dialog>
    <DialogTrigger {...props} className={cn("bg-primary rounded text-primary-foreground flex gap-2 py-2 px-3 font-medium", className)}>
      <PlusOutline className="w-6 h-6"/>
      <span>{text}</span>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogDescription>
          {description}
        </DialogDescription>
      </DialogHeader>
      {children}
      <DialogFooter>
        <DialogClose asChild>
          <Button type='button' variant="secondary" onClick={onReset}>Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button onClick={onSubmit}>Submit</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}

export default ButtonFormDialog;
