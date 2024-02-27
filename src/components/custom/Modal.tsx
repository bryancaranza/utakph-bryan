import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export interface IModalProps {
  trigger?: any;
  children: any;
  open: boolean;
  closeModal?: any;
}

const Modal = ({ trigger, children, open, closeModal }: IModalProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        closeModal();
      }}
    >
      {trigger ? <DialogTrigger>{trigger}</DialogTrigger> : null}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
