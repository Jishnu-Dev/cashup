"use client";

/**
 * Use this function when you want to fix the "hydration" error in NextJS *
 **/

import { useEffect, useState } from "react";

export const useStore = (store, callback) => {
  const result = store(callback);
  const [data, setData] = useState();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};
