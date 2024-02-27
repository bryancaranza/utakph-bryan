import DeleteOutlined from "@/components/icons/DeleteOutlined";
import { Button } from "@/components/ui/button";
import { useFirbaseService } from "@/hooks/useFirbaseService";
import { useMainStore } from "@/lib/zustand/mainStore";

interface Props {
  row?: any;
}
const DeleteProduct = ({ row }: Props) => {
  const { deleteProduct, isLoading } = useFirbaseService();
  const { closeModal, modalConfig } = useMainStore();

  const toggleModal = () => {
    closeModal(modalConfig);
  };

  const handleDelete = () =>
    deleteProduct(row.id, {
      onSuccess: toggleModal,
      onError: toggleModal,
    });

  return (
    <div>
      <div>
        <div className="flex gap-2 items-center">
          <DeleteOutlined className="text-[25px]" />
          <p className="text-2xl font-bold">Delete Product</p>
        </div>
        <div>
          <p className="pb-2">
            Are you sure you want to delete this product{" "}
            <span className="font-bold">{row?.name}</span>?
          </p>
        </div>
        <p className="italic text-sm text-red-700">
          Reminder: Deleting product will remove data from database.
        </p>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={toggleModal}>
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
