import { create } from "zustand";

interface ModalConfig {
  open: boolean;
  content: any;
}

export interface MainStore {
  modalConfig: ModalConfig;
  setModalConfig: (modalConfig: ModalConfig) => void;
  closeModal: (modalConfig: ModalConfig) => void;
}

export const modalDefaultValues = {
  open: false,
  content: undefined,
};

export const useMainStore = create<MainStore>()((set) => {
  return {
    modalConfig: modalDefaultValues,
    setModalConfig: (modalConfig: ModalConfig) => set({ modalConfig }),
    closeModal: (modalConfig: ModalConfig) =>
      set({ modalConfig: { ...modalConfig, open: false } }),
  };
});
