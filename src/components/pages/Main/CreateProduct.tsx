import CustomInput from "@/components/custom/Input";
import Modal from "@/components/custom/Modal";
import AddOutlined from "@/components/icons/AddOutlined";
import { Button } from "@/components/ui/button";
import { useFirbaseService } from "@/hooks/useFirbaseService";
import { createProductDefaultValues } from "@/lib/constants";
import { Product } from "@/lib/interface";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const CreateProduct = () => {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: createProductDefaultValues,
  });

  const { createProduct, isLoading } = useFirbaseService();

  const toggleModal = () => {
    reset();
    setOpen(!open);
  };

  const handleCreate = (data: Product) => {
    console.log({ data });
    createProduct(data, {
      onSuccess: toggleModal,
      onError: toggleModal,
    });
    reset();
  };

  console.log(watch("cost"));

  return (
    <Modal
      open={open}
      trigger={
        <Button className="flex gap-2" onClick={toggleModal}>
          <AddOutlined /> <p className="max-md:hidden">Add Product</p>
        </Button>
      }
    >
      <div>
        <div className="pb-4">
          <p className="text-2xl font-bold">Create New Product</p>
          <p className="text-gray-500"> Fill up all required fields.</p>
        </div>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(handleCreate)}
        >
          <div className="grid w-full items-center max-h-[400px] scrollbar overflow-auto">
            <Controller
              name="name"
              rules={{ required: "Name field is required" }}
              control={control}
              render={({ field }) => {
                const { ref, ...props } = field;

                return (
                  <CustomInput
                    placeholder="Product Name"
                    label="Name"
                    errorMsg={errors.name?.message}
                    isError={errors.name ? true : false}
                    {...props}
                  />
                );
              }}
            />
            <Controller
              name="category"
              rules={{ required: "Name field is required" }}
              control={control}
              render={({ field }) => {
                const { ref, ...props } = field;

                return (
                  <CustomInput
                    placeholder="Product Category"
                    label="Category"
                    errorMsg={errors.category?.message}
                    isError={errors.category ? true : false}
                    {...props}
                  />
                );
              }}
            />
            <Controller
              name="option"
              control={control}
              render={({ field }) => {
                const { ref, ...props } = field;

                return (
                  <CustomInput
                    placeholder="Small, Medium, Large"
                    label="Options"
                    subLabel="Optional"
                    {...props}
                  />
                );
              }}
            />
            <Controller
              name="price"
              rules={{ required: "Price field is required" }}
              control={control}
              render={({ field }) => {
                const { ref, ...props } = field;

                return (
                  <CustomInput
                    type="number"
                    placeholder="Enter Price"
                    label="Price"
                    errorMsg={errors.price?.message}
                    isError={errors.price ? true : false}
                    {...props}
                  />
                );
              }}
            />
            <Controller
              name="cost"
              rules={{ required: "Cost field is required" }}
              control={control}
              render={({ field }) => {
                const { ref, ...props } = field;

                return (
                  <CustomInput
                    type="number"
                    placeholder="Enter Cost"
                    label="Cost"
                    errorMsg={errors.cost?.message}
                    isError={errors.cost ? true : false}
                    {...props}
                  />
                );
              }}
            />
            <Controller
              name="stock"
              rules={{ required: "Stock field is required" }}
              control={control}
              render={({ field }) => {
                const { ref, ...props } = field;

                return (
                  <CustomInput
                    type="number"
                    placeholder="Enter Stock"
                    label="Stock"
                    errorMsg={errors.stock?.message}
                    isError={errors.stock ? true : false}
                    {...props}
                  />
                );
              }}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={toggleModal} variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateProduct;
