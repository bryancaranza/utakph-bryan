import Modal from "@/components/custom/Modal";
import DeleteOutlined from "@/components/icons/DeleteOutlined";
import { Button } from "@/components/ui/button";
import { useFirbaseService } from "@/hooks/useFirbaseService";
import { useState } from "react";

interface Props {
  row?: any;
}
const DeleteProduct = ({ row }: Props) => {
  const [open, setOpen] = useState(false);
  const { deleteProduct, isLoading } = useFirbaseService();

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleDelete = () =>
    deleteProduct(row.id, {
      onSuccess: toggleModal,
      onError: toggleModal,
    });

  return (
    <Modal
      open={open}
      trigger={
        <Button variant="destructive" onClick={toggleModal}>
          <DeleteOutlined />
        </Button>
      }
    >
      <div>
        <div className="flex gap-2 items-center">
          <DeleteOutlined className="text-[25px]" />
          <p className="text-2xl font-bold">Delete Product </p>
        </div>
        <p className="pb-2">
          Are you sure you want to delete this product{" "}
          <span className="font-bold">{row?.name}</span>?
        </p>
        <p className="italic text-sm text-red-700">
          Reminder: Deleting product will remove data from database.
        </p>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="outline" variant="outline" onClick={toggleModal}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isLoading}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteProduct;
