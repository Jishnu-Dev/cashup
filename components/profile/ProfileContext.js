"use client";

import { createContext, useEffect, useState } from "react";

import FullPageLoader from "@/components/ui/loaders/FullPageLoader";
import { apiGetMerchantProfile } from "@/api";
import { getMerchantId } from "@/lib/authenticator";

export const MerchantProfileContext = createContext();

export default function ProfileContext({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [merchantData, setMerchantData] = useState();

  useEffect(() => {
    async function fetchMerchantProfile() {
      try {
        const merchantId = getMerchantId();
        const resp = await apiGetMerchantProfile(merchantId);
        setMerchantData(resp?.data);
      } catch (e) {
        console.dir(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMerchantProfile();
  }, []);

  return (
    <MerchantProfileContext.Provider value={{ merchantData }}>
      {isLoading ? <FullPageLoader onlySpinner /> : children}
    </MerchantProfileContext.Provider>
  );
}
