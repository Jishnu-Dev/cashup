"use client";

import { Provider } from "react-redux";
import { makeStore } from "@/redux/store";
import { useRef } from "react";

export default function ReduxProvider({ children }) {
  const storeRef = useRef();
  // Create the store instance the first time this renders
  if (!storeRef.current) storeRef.current = makeStore();
  return <Provider store={storeRef.current}>{children}</Provider>;
}
