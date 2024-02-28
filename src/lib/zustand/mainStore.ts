import { create } from "zustand";
import { IMainStore, IModalConfig } from "../interface";
import { modalDefaultValues } from "../constants";

export const useMainStore = create<IMainStore>()((set) => {
  return {
    modalConfig: modalDefaultValues,
    setModalConfig: (modalConfig: IModalConfig) => set({ modalConfig }),
    closeModal: (modalConfig: IModalConfig) =>
      set({ modalConfig: { ...modalConfig, open: false } }),
  };
});
