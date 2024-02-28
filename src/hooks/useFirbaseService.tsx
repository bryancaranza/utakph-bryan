import { useToast } from "@/components/ui/use-toast";
import { CONSTANTS } from "@/lib/constants";
import { db } from "@/lib/firebase/app";
import { IProduct } from "@/lib/interface";
import { ref, set, push, onValue, query } from "firebase/database";
import { useState } from "react";
import moment from "moment";

export const useFirbaseService = () => {
  const [isLoading, setIsLoading] = useState(false); // loading state
  const { toast } = useToast(); // toast component for alert

  const date = moment().format();

  // create product funtion
  const createProduct = async (
    data: IProduct,
    callback?: { onSuccess: () => void; onError: () => void }
  ) => {
    const newDocRef = push(ref(db, CONSTANTS.ENDPOINTS.PRODUCTS)); // creating unique id
    const id = newDocRef.key; // unique id

    setIsLoading(true); // initialize loading

    // start storing to database
    await set(newDocRef, {
      ...data,
      id,
      date_created: date,
    })
      .then(() => {
        setIsLoading(false); // done loading

        // run success callback
        if (callback?.onSuccess) callback.onSuccess();
        toast({
          title: "Add product success.",
          description: "You have successfully created a product.",
        });
      })
      .catch(() => {
        setIsLoading(false); // done loading

        // run error callback
        if (callback?.onError) callback.onError();
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          description: "Please try again.",
        });
      });
  };

  // get products function
  const getProducts = (callback?: (response: IProduct[]) => void) => {
    const dbRef = ref(db, CONSTANTS.ENDPOINTS.PRODUCTS); // setting database reference
    const dbQuery = query(dbRef);

    setIsLoading(true); // initialize loading

    onValue(dbQuery, (snapshot) => {
      if (!snapshot?.val()) return;
      const data: IProduct[] = Object.values(snapshot.val()); // query result data

      setIsLoading(false); // done loading

      // run success callback
      if (callback) callback(data || []);
    });
  };

  // delete product function
  const deleteProduct = async (
    id: string,
    callback?: { onSuccess: () => void; onError: () => void }
  ) => {
    const dbRef = ref(db, CONSTANTS.ENDPOINTS.PRODUCTS + `/${id}`); // setting database reference includes unique id

    setIsLoading(true); // initialize loading

    await set(dbRef, null) // payload null to delete
      .then(() => {
        toast({
          title: "Delete product success.",
          description: "You have successfully deleted a product.",
        });

        setIsLoading(false); // done loading

        // run success callback
        if (callback?.onSuccess) callback.onSuccess();
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          description: "Please try again.",
        });

        setIsLoading(false); // done loading

        // run error callback
        if (callback?.onError) callback.onError();
      });
  };

  // update product function
  const updateProduct = async (
    payload: {
      id: string;
      data: IProduct;
    },
    callback?: { onSuccess: () => void; onError: () => void }
  ) => {
    const dbRef = ref(db, CONSTANTS.ENDPOINTS.PRODUCTS + `/${payload.id}`); // setting database reference includes unique id

    setIsLoading(true); // initialize loading

    await set(dbRef, payload.data)
      .then(() => {
        toast({
          title: "Update product success.",
          description: "You have successfully updated a product.",
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

  const searchProduct = async (
    searchVal: string,
    callback?: (response: any) => void
  ) => {
    const dbRef = ref(db, CONSTANTS.ENDPOINTS.PRODUCTS);
    const dbQuery = query(dbRef);

    setIsLoading(true);

    onValue(dbQuery, (snapshot) => {
      const data: IProduct[] = Object.values(snapshot.val());
      const sorted = data.filter(
        (item: any) =>
          item.name.toLowerCase().includes(searchVal.toLowerCase()) ||
          item.category.toLowerCase().includes(searchVal.toLowerCase()) ||
          item.option.toLowerCase().includes(searchVal.toLowerCase())
      );

      setIsLoading(false);
      if (callback) callback(sorted);
    });
  };

  // add viewer funtion
  const addViews = async () => {
    const newDocRef = push(ref(db, CONSTANTS.ENDPOINTS.VIEWED)); // creating unique id
    const id = newDocRef.key; // unique id

    setIsLoading(true); // initialize loading
    console.log({ date });

    // start storing to database
    await set(newDocRef, {
      id,
      date_viewed: date,
    }).then(() => {
      localStorage.setItem("viewed", "true");
      localStorage.setItem("view_date", moment(date).format("YYYY-MM-DD"));
    });
  };

  // get views function
  const getViews = (callback?: (response: any[]) => void) => {
    const dbRef = ref(db, CONSTANTS.ENDPOINTS.VIEWED); // setting database reference
    const dbQuery = query(dbRef);

    setIsLoading(true); // initialize loading

    onValue(dbQuery, (snapshot) => {
      if (!snapshot?.val()) return;
      const data: any[] = Object.values(snapshot.val()); // query result data

      setIsLoading(false); // done loading

      // run success callback
      if (callback) callback(data || []);
    });
  };

  return {
    isLoading,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    searchProduct,
    addViews,
    getViews,
  };
};
