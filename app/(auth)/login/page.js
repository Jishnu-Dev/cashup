"use client";

import { Controller, useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Image from "next/image";
import Link from "next/link";
import { MuiOtpInput } from "mui-one-time-password-input";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

export default function Page() {
  return (
    <section className="h-full w-full bg-[url('/images/login-bg.svg')] bg-cover bg-no-repeat">
      <div className="container h-full flex flex-col justify-center items-center gap-12">
        <Logo />
        <LoginForm />
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
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      console.log("FormData::", formData);
      router.replace("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card className="w-full md:w-8/12 lg:w-5/12">
      <CardContent className="grid grid-flow-row gap-8">
        <Title />
        <Divider textAlign="center">Sign In</Divider>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-flow-row gap-4"
        >
          <TextField
            {...register("username", {
              required: "Please enter your email or phone",
              validate: (value) => {
                console.log("VALUE::", value);
              },
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
          <Button type="submit" variant="contained" size="large">
            Sign In
          </Button>
        </form>
        <div className="grid grid-flow-row gap-4">
          <Divider>Help</Divider>
          <CardActions>
            <Link
              href="/forgot-passcode"
              className="w-max mx-auto text-sm text-black hover:text-primary"
            >
              Forgot Passcode?
            </Link>
          </CardActions>
        </div>
      </CardContent>
    </Card>
  );
};

const Title = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-950">
        Welcome Admin!
      </h1>
      <Typography variant="subtitle1" className="text-black/80">
        Sign in to manage your Cashup account
      </Typography>
    </div>
  );
};

const Logo = () => (
  <Image
    width={210}
    height={210}
    alt="Cashup logo"
    src="/images/cashup-logo-colored.png"
  />
);
