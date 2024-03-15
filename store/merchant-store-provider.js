"use client";

import { createContext, useContext, useRef } from "react";
import { createMerchantStore, initMerchantStore } from "@/store/merchant-store";

import { useStore } from "zustand";

export const StoreContext = createContext(null);

export const ZustandStoreContext = ({ children }) => {
  const storeRef = useRef();
  if (!storeRef.current)
    storeRef.current = createMerchantStore(initMerchantStore());

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useMerchantStore = (selector) => {
  const merchantStoreContext = useContext(StoreContext);
  if (!merchantStoreContext)
    throw new Error(`useCounterStore must be use within ZustandStoreContext`);
  return useStore(merchantStoreContext, selector);
};
