import CustomInput from "@/components/custom/Input";
import { Button } from "@/components/ui/button";
import { useFirbaseService } from "@/hooks/useFirbaseService";
import { createProductDefaultValues } from "@/lib/constants";
import { IProduct } from "@/lib/interface";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/lib/schema";
import { validateStringToNumber } from "@/lib/helpers/stringHelpers";
import { useMainStore } from "@/lib/zustand/mainStore";
import { PlusIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import CustomTooltip from "@/components/custom/Tooltip";
import CloseOutlined from "@/components/icons/CloseOutlined";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const CreateProduct = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [option, setOption] = useState<string>("");
  const [categoryList, setCategoryList] = useState<any[]>([]);

  // initialize react hook form
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm({
    defaultValues: createProductDefaultValues,
    resolver: zodResolver(ProductSchema),
  });

  // hooks
  const { createProduct, getCategories, isLoading } = useFirbaseService();

  // zustand state store
  const { closeModal, modalConfig } = useMainStore();

  const toggleModal = () => {
    closeModal(modalConfig); // run close modal function
    reset(); // reset form values
  };

  // onEnter | onClick submit
  const handleCreate = (data: IProduct) => {
    // call create product hook
    createProduct(
      {
        ...data,
        option: options,
      },
      {
        onSuccess: toggleModal,
        onError: toggleModal,
      }
    );
  };

  // onChange type number
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

  // onChange type string
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

  useEffect(() => {
    getCategories((response) => setCategoryList(response));
  }, []);

  return (
    <div>
      <div className="pb-4">
        <p className="text-2xl font-bold">Create New Product</p>
        <p className=""> Fill up all required fields.</p>
      </div>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(handleCreate)}
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
              const { onChange, value } = field;

              return (
                <div className="flex flex-col gap-2 px-1 mb-2">
                  <div className="flex justify-between">
                    <Label>Category *</Label>
                    {errors.category ? (
                      <Label className="text-red-700 italic text-[12px]">
                        Required*
                      </Label>
                    ) : null}
                  </div>
                  <Select onValueChange={onChange} defaultValue={value}>
                    <SelectTrigger
                      className={`${
                        errors.category ? "!border-red-700 border-2" : ""
                      } `}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryList.map((categ) => {
                        return (
                          <SelectItem key={categ.id} value={categ.category}>
                            {categ.category}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
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
                    errorMsg={errors.price}
                    isError={errors.price ? true : false}
                    onChange={(e) => handleNumberOnchange(e, "price")}
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
          <div className="flex flex-col gap-2 px-1 mb-2">
            <Label>
              Option <span className="text-sm text-slate-500">(optional)</span>
            </Label>
            <div className="flex gap-2">
              <Input
                value={option}
                placeholder="Example: Small, Medium, Large"
                onChange={(e) => setOption(e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                disabled={!option.length}
                onClick={() => {
                  if (!option.length) return;
                  setOptions([...options, option]);
                  setOption("");
                }}
              >
                <PlusIcon />
              </Button>
            </div>
            <div className="capitalize flex flex-wrap gap-1 w-fit">
              {options.map((data: string, index: number) => {
                return (
                  <CustomTooltip key={data + index} content={data}>
                    <div
                      onClick={(e) => e.preventDefault()}
                      className="border flex items-center gap-1 rounded-md text-sm font-semibold pl-2 truncate max-w-[200px] cursor-default"
                    >
                      <p className="truncate break-all">{data}</p>
                      <Button
                        type="button"
                        variant="ghost"
                        className="p-0 h-[25px] rounded-l-none"
                        onClick={(e) => {
                          e.preventDefault();
                          const removeOption = options.filter(
                            (_, listIndex) => listIndex !== index
                          );

                          setOptions(removeOption);
                        }}
                      >
                        <CloseOutlined className="w-4" />
                      </Button>
                    </div>
                  </CustomTooltip>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" onClick={toggleModal} variant="ghost">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
