"use client";

import "aos/dist/aos.css";

import AOS from "aos";
import { useEffect } from "react";

export default function Aos() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out-sine",
      once: false,
    });
  }, []);
  return null;
}
