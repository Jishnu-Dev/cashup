import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

const storeOptions = { name: "cashup-merchant-store" }; // Options for persisting the store using persist() middleware

const initialState = {
  merchantData: null,
};

const store = (set, get) => ({
  ...initialState,
  storeMerchantData: (data) => set((state) => ({ merchantData: data })),
  clearStore: () => initialState,
});

export const initMerchantStore = () => initialState;
export const createMerchantStore = () =>
  createStore(persist(store, storeOptions));
