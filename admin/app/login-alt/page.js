"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  return (
    <section className="w-full h-screen bg-gradient-to-t from-primary to-white flex justify-center items-center text-white">
      <div className="container flex flex-col justify-center items-center gap-16">
        <div className="flex flex-col gap-4 text-center">
          <div className="flex flex-col gap-1.5">
            {/* <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Cashup
            </h1> */}
            <Image
              src="/images/app-logo.png"
              alt="Cashup"
              width={250}
              height={250}
            />
            <p className="text-sm">Empowering cashback and passive income!</p>
          </div>
        </div>
        <LoginForm />
      </div>
    </section>
  );
}

const LoginForm = () => {
  const router = useRouter();
  return (
    <form className="w-1/2 m-auto bg-white px-5 py-8 rounded-3xl backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-white font-medium text-2xl">Sign In</h2>
        <p className="text-sm text-white/80">
          Sign in to earn unlimited cashbacks
        </p>
      </div>
      {/* Email */}
      <fieldset className="grid grid-flow-row gap-1">
        <input
          // required
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-full rounded-full"
        />
      </fieldset>
      {/* Password */}
      <fieldset className="grid grid-flow-row gap-1">
        <input
          // required
          type="password"
          placeholder="Enter your password"
          className="input input-bordered w-full rounded-full"
        />
      </fieldset>
      <Link
        href="/jishnu/forgot-password"
        className="text-sm text-white underline text-right"
      >
        Forgot your password?
      </Link>
      <button
        onClick={() => {
          router.push("/dashboard");
        }}
        type="submit"
        className="btn bg-blue-500 text-white border-none hover:bg-blue-600 rounded-full"
      >
        Login
      </button>

      <p className="text-white">
        Don't have an accoutn?{" "}
        <Link
          href="/register"
          className="text-white hover:text-blue-600 underline"
        >
          Register now
        </Link>
      </p>
    </form>
  );
};
