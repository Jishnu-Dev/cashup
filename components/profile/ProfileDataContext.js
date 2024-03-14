"use client";

import { createContext, useEffect } from "react";

export const MerchantProfileContext = createContext();

export default function ProfileDataContext({ children }) {
  useEffect(() => {
    async function fetchMerchantProfile() {
      try {
      } catch (e) {
      } finally {
      }
    }
  }, []);
  return (
    <MerchantProfileContext.Provider>
      {children}
    </MerchantProfileContext.Provider>
  );
}
