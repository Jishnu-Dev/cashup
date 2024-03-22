"use client";

/* Fetching & setting merchant data into store for reuse */

import { apiGetMerchantProfile } from "@/api";
import { getMerchantId } from "@/lib/authenticator";
import { useEffect } from "react";
import { useMerchantStore } from "@/store/merchant-store-provider";

export default function AppGlobalContext({ children }) {
  const { storeMerchantData } = useMerchantStore((state) => state);
  useEffect(() => {
    async function fetchMerchantProfile() {
      try {
        const merchantId = getMerchantId();
        const resp = await apiGetMerchantProfile(merchantId);
        storeMerchantData(resp?.data);
      } catch (e) {
        console.dir(e);
      }
    }
    // TODO: FIX MERHCANT PROFILE FETCHING AND STORING TO STORE
    // fetchMerchantProfile();
  }, []);
  return children;
}
