import DeleteOutlined from "@/components/icons/DeleteOutlined";
import { Button } from "@/components/ui/button";
import { useFirbaseService } from "@/hooks/useFirbaseService";
import { IProductRow } from "@/lib/interface";
import { useMainStore } from "@/lib/zustand/mainStore";

const DeleteProduct = ({ row }: IProductRow) => {
  const { deleteProduct, isLoading } = useFirbaseService(); // hooks
  const { closeModal, modalConfig } = useMainStore(); // zustand state store

  const toggleModal = () => {
    closeModal(modalConfig); // run close modal function
  };

  // onClick delete
  const handleDelete = () => {
    if (!row.id) return;
    deleteProduct(row.id, {
      onSuccess: toggleModal,
      onError: toggleModal,
    });
  };

  return (
    <div>
      <div>
        <div className="flex gap-2 items-center">
          <DeleteOutlined className="text-[25px]" />
          <p className="text-2xl font-bold">Delete Product</p>
        </div>
        <div>
          <p className="pb-2 break-all">
            Are you sure you want to delete this product{" "}
            <span className="font-bold">{row?.name}</span>?
          </p>
        </div>
        <p className="italic text-sm text-red-700">
          Reminder: Deleting product will remove data from database.
        </p>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={toggleModal}>
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
    </div>
  );
};

export default DeleteProduct;
