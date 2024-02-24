"use client";

import { Controller, useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Image from "next/image";
import Link from "next/link";
import { MuiOtpInput } from "mui-one-time-password-input";
import TextField from "@mui/material/TextField";
import { apiLogin } from "@/api/api";
import { isValidEmail } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Page() {
  return (
    <section className="h-full w-full bg-[url('/images/bg-layered-waves.svg')] bg-cover bg-no-repeat">
      <div className="container h-full flex flex-col justify-center items-center gap-12">
        <Logo />
        <LoginForm />
        <BlankLayoutFooter />
      </div>
    </section>
  );
}

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "0501111111",
      passcode: "111111",
    },
  });

  const onSubmit = async ({ username, passcode }) => {
    try {
      const isSigningInByEmail = isValidEmail(username);
      console.log("isSigningInByEmail", isSigningInByEmail);
      router.replace("/");
      return;

      const payload = {
        in_userid: username,
        in_pin: passcode,
      };
      console.log("Payload", payload);
      const resp = await apiLogin(payload);
      console.log("RESP::", resp);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card className="w-full md:w-8/12 lg:w-5/12">
      <CardContent className="grid grid-flow-row gap-8">
        <Title />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-flow-row gap-4"
        >
          <TextField
            {...register("username", {
              required: "Please enter your email or phone",
            })}
            id="field-username"
            variant="outlined"
            label="Email or Phone*"
            error={!!errors?.username}
            helperText={
              errors?.username?.message ??
              "Use your email or registered phone to sign in"
            }
          />
          <Controller
            name="passcode"
            control={control}
            rules={{ validate: (value) => value?.length === 6 }}
            render={({ field, fieldState }) => (
              <div className="grid grid-flow-row gap-1">
                <FormLabel sx={{ ml: "14px" }}>Passcode*</FormLabel>
                <MuiOtpInput sx={{ gap: 1 }} {...field} length={6} />
                <FormHelperText error={fieldState?.invalid} sx={{ ml: "14px" }}>
                  {fieldState?.invalid
                    ? "Invalid passcode"
                    : "Enter your passcode"}
                </FormHelperText>
              </div>
            )}
          />
          <Button
            size="large"
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <CardActions>
          <Link
            href="/forgot-passcode"
            className="w-max mx-auto text-sm text-black hover:text-primary"
          >
            Forgot passcode?
          </Link>
        </CardActions>
      </CardContent>
    </Card>
  );
};

const Title = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <span className="icon-[solar--shop-2-line-duotone] text-[4rem] text-primary" />
      <span>
        <h1 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-950">
          Welcome Back Admin
        </h1>
        <p className="text-sm text-black/60">
          Sign in to manage your <b>Cashup</b> merchant account
        </p>
      </span>
    </div>
  );
};

const Logo = () => (
  <Image
    width={200}
    height={200}
    alt="Cashup logo"
    src="/images/cashup-logo-colored.png"
  />
);

const BlankLayoutFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full fixed bottom-5 text-xs text-white/80 flex gap-4 justify-center">
      <p>{`All rights reserved. ${currentYear} Cashup.`}</p>
      <Link className="hover:text-white hover:underline" href="/privacy-policy">
        Privacy Policy
      </Link>
    </footer>
  );
};
