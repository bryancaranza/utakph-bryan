import CloseOutlined from "@/components/icons/CloseOutlined";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFirbaseService } from "@/hooks/useFirbaseService";
import { PlusIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const Categories = () => {
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState<any[]>([]);

  const { addCategory, getCategories, removeCategory } = useFirbaseService();

  const handleAddCategory = () => {
    addCategory(category, {
      onSuccess: () => {
        setCategory("");
      },
    });
  };

  const handleRemoveCategory = (id: string) => {
    removeCategory(id, {
      onSuccess: () => {
        const removeFromList = categoryList.filter((categ) => categ.id !== id);
        setCategoryList(removeFromList);
      },
    });
  };

  useEffect(() => {
    getCategories((response) => setCategoryList(response));
  }, []);

  return (
    <div>
      <div className="pb-4">
        <p className="text-2xl font-bold">Category List</p>
        <p className="">You can add or remove category.</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Input
            placeholder="Examples: Maindish, Sidedish, Drinks Etc."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Button variant="outline" onClick={handleAddCategory}>
            <PlusIcon />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {categoryList.map((categ) => {
            return (
              <div
                key={categ.id}
                className="border border-slate-200 shadow-sm px-2 py-1 rounded-md w-fit flex gap-2"
              >
                <p>{categ.category}</p>
                <Button
                  variant="ghost"
                  className="p-0 h-[25px]"
                  onClick={() => handleRemoveCategory(categ.id)}
                >
                  <CloseOutlined />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
