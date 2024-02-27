import CustomInput from "@/components/custom/Input";
import { Button } from "@/components/ui/button";
import { useFirbaseService } from "@/hooks/useFirbaseService";
import { IProduct } from "@/lib/interface";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/lib/schema";
import { validateStringToNumber } from "@/lib/helpers/stringHelpers";
import { useMainStore } from "@/lib/zustand/mainStore";

interface Props {
  row: any;
}

const UpdateProduct = ({ row }: Props) => {
  // initialize react hook form
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm({
    defaultValues: {
      name: row.name,
      category: row.category,
      option: row.option,
      price: validateStringToNumber(row?.price.toString()),
      cost: validateStringToNumber(row?.cost.toString()),
      stock: validateStringToNumber(row?.stock.toString()),
    },
    resolver: zodResolver(ProductSchema),
  });

  // hooks
  const { updateProduct, isLoading } = useFirbaseService();

  // zustand state store
  const { closeModal, modalConfig } = useMainStore();

  const toggleModal = () => {
    closeModal(modalConfig);
    reset();
  };

  const handleUpdate = (data: IProduct) => {
    const payload = {
      id: row.id,
      data: {
        ...data,
        id: row.id,
      },
    };
    updateProduct(payload, {
      onSuccess: toggleModal,
      onError: toggleModal,
    });
    reset();
  };

  const handleNumberOnchange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: any
  ) => {
    const value = validateStringToNumber(e.target.value);

    if (value > 999999999)
      return setError(name, { message: "Max input is 999999999" });

    setValue(name, value, {
      shouldValidate: true,
    });
  };

  const handleStringOnchange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: any
  ) => {
    if (e.target.value.length >= 40) {
      setError(name, { message: "Max length is 40" });
      return;
    }
    setValue(name, e.target.value, {
      shouldValidate: true,
    });
  };

  return (
    <div>
      <div className="pb-4">
        <p className="text-2xl font-bold">Update Existing Product</p>
        {/* <p className="text-gray-500">Fill up all required fields.</p> */}
      </div>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(handleUpdate)}
      >
        <div className="grid w-full items-center max-h-[400px] scrollbar overflow-auto">
          <Controller
            name="name"
            control={control}
            render={({ field }) => {
              const { ref, onChange, ...props } = field;

              return (
                <CustomInput
                  placeholder="Burger, Coke, Donut Etc."
                  label="Product Name*"
                  onChange={(e) => handleStringOnchange(e, "name")}
                  errorMsg={errors.name}
                  isError={errors.name ? true : false}
                  {...props}
                />
              );
            }}
          />
          <Controller
            name="category"
            control={control}
            render={({ field }) => {
              const { ref, onChange, ...props } = field;

              return (
                <CustomInput
                  placeholder="Product Category"
                  label="Category*"
                  onChange={(e) => handleStringOnchange(e, "category")}
                  errorMsg={errors.category}
                  isError={errors.category ? true : false}
                  {...props}
                />
              );
            }}
          />
          <div className="flex gap-2">
            <Controller
              name="price"
              control={control}
              render={({ field }) => {
                const { ref, onChange, ...props } = field;

                return (
                  <CustomInput
                    type="number"
                    placeholder="Enter Price"
                    label="Price*"
                    onChange={(e) => handleNumberOnchange(e, "price")}
                    errorMsg={errors.price}
                    isError={errors.price ? true : false}
                    {...props}
                  />
                );
              }}
            />
            <Controller
              name="cost"
              control={control}
              render={({ field }) => {
                const { ref, onChange, ...props } = field;

                return (
                  <CustomInput
                    type="number"
                    placeholder="Enter Cost"
                    label="Cost*"
                    errorMsg={errors.cost}
                    isError={errors.cost ? true : false}
                    onChange={(e) => handleNumberOnchange(e, "cost")}
                    {...props}
                  />
                );
              }}
            />
            <Controller
              name="stock"
              control={control}
              render={({ field }) => {
                const { ref, onChange, ...props } = field;

                return (
                  <CustomInput
                    type="number"
                    placeholder="Enter Stock"
                    label="Stock*"
                    errorMsg={errors.stock}
                    isError={errors.stock ? true : false}
                    onChange={(e) => handleNumberOnchange(e, "stock")}
                    {...props}
                  />
                );
              }}
            />
          </div>
          <Controller
            name="option"
            control={control}
            render={({ field }) => {
              const { ref, ...props } = field;

              return (
                <CustomInput
                  placeholder="Example: Small, Medium, Large"
                  label="Options"
                  subLabel={`Note: Options must be separated by "," comma.`}
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
  );
};

export default UpdateProduct;
