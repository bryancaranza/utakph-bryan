import { useToast } from "@/components/ui/use-toast";
import { CONSTANTS } from "@/lib/constants";
import { db } from "@/lib/firebase/app";
import { Product } from "@/lib/interface";
import { ref, set, push, onValue, query } from "firebase/database";
import { useState } from "react";

export const useFirbaseService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createProduct = async (
    data: Product,
    callback?: { onSuccess: () => void; onError: () => void }
  ) => {
    const newDocRef = push(ref(db, CONSTANTS.ENDPOINTS.PRODUCTS));
    const id = newDocRef.key;

    setIsLoading(true);

    await set(newDocRef, {
      ...data,
      id,
    })
      .then(() => {
        setIsLoading(false);

        if (callback?.onSuccess) callback.onSuccess();
        toast({
          title: "Add product success.",
          description: "You have successfully created a product.",
        });
      })
      .catch(() => {
        setIsLoading(false);

        if (callback?.onError) callback.onError();
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          description: "Please try again.",
        });
      });
  };

  const getProducts = (callback?: (response: any) => void) => {
    const dbRef = ref(db, CONSTANTS.ENDPOINTS.PRODUCTS);
    const dbQuery = query(dbRef);

    setIsLoading(true);

    onValue(dbQuery, (snapshot) => {
      const data = Object.values(snapshot.val());
      setIsLoading(false);
      if (callback) callback(data);
    });
  };

  const deleteProduct = async (
    id: string,
    callback?: { onSuccess: () => void; onError: () => void }
  ) => {
    const dbRef = ref(db, CONSTANTS.ENDPOINTS.PRODUCTS + `/${id}`);
    setIsLoading(true);

    await set(dbRef, null)
      .then(() => {
        toast({
          title: "Delete product success.",
          description: "You have successfully deleted a product.",
        });

        setIsLoading(false);

        if (callback?.onSuccess) callback.onSuccess();
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          description: "Please try again.",
        });

        setIsLoading(false);

        if (callback?.onError) callback.onError();
      });
  };

  return {
    isLoading,
    createProduct,
    getProducts,
    deleteProduct,
  };
};
