"use client";

import Link from "next/link";
import { tagline } from "@/lib/constants";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: `Login | ${tagline}`,
//   description: tagline,
// };

export default function Home() {
  return (
    <section className="min-h-screen h-screen w-full bg-white flex">
      {/* Left Column */}
      <div className="w-full h-full md:w-6/12 flex justify-center items-center">
        <div className="w-full md:w-9/12 grid grid-flow-row gap-12">
          <Title />
          <LoginForm />
        </div>
      </div>

      {/* Left Column */}
      <div className="hidden md:w-6/12 h-full bg-white md:flex justify-center items-center bg-[url('/images/login-bg.jpg')] bg-cover bg-no-repeat" />
    </section>
  );
}

const LoginForm = () => {
  const router = useRouter();
  return (
    <div className="grid grid-flow-row gap-8">
      <form className="w-full grid grid-flow-row gap-4">
        {/* Email */}
        <fieldset className="grid grid-flow-row gap-1">
          <label>
            Email<sup className="text-red-500"> * </sup>
          </label>
          <input
            // required
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
          />
        </fieldset>
        {/* Password */}
        <fieldset className="grid grid-flow-row gap-1">
          <label>
            Password<sup className="text-red-500"> * </sup>
          </label>
          <input
            // required
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full"
          />
        </fieldset>
        <Link
          href="/jishnu/forgot-password"
          className="text-sm text-blue-600 text-right underline"
        >
          Forgot your password?
        </Link>
        <button
          onClick={() => {
            router.push("/dashboard");
          }}
          type="submit"
          className="btn bg-primary text-white hover:bg-primary/90"
        >
          Login
        </button>
      </form>

      <p>
        Don't have an accoutn?{" "}
        <Link href="/register" className="text-blue-600 underline">
          Register now
        </Link>
      </p>
    </div>
  );
};

const Title = () => (
  <div className="grid grid-flow-row gap-6">
    <h2 className="text-6xl font-bold text-transparent bg-gradient-to-r from-primary to-white bg-clip-text">
      CASHUP
    </h2>
    <div className="grid grid-flow-row">
      <h1 className="text-black font-medium text-3xl">Welcome back!</h1>
      <p className="text-black/50">
        Enter to get unlimited cashback and rewards
      </p>
    </div>
  </div>
);
