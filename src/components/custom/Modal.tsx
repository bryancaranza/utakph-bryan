import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export interface IModalProps {
  trigger: any;
  children: any;
  open?: boolean;
}

const Modal = ({ trigger, children, open }: IModalProps) => {
  return (
    <Dialog open={open} modal={open}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
