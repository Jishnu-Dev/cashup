"use client";

import { Controller, useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
import Cookies from "universal-cookie";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "next/link";
import { MuiOtpInput } from "mui-one-time-password-input";
import ShowWhen from "@/components/ui/ShowWhen";
import TextField from "@mui/material/TextField";
import { apiLogin } from "@/api/api";
import { isLoggedIn } from "@/lib/authenticator";
import { isValidEmail } from "@/lib/utils";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// import { Icon } from "@shopify/polaris";

// import { PlusIcon } from "@shopify/polaris-icons";

export default function LoginForm() {
  const cookie = new Cookies();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "ryan@abc.com",
      passcode: "123456",
    },
  });

  const onSubmit = async ({ username, passcode }) => {
    try {
      const isSigningInByEmail = isValidEmail(username);
      const loginType = isSigningInByEmail ? 0 : 1;
      const payload = {
        in_userid: username,
        in_pin: passcode,
        in_login_type: loginType,
      };

      const resp = await apiLogin(payload);
      const { merchant_id, token } = resp.data;

      // Setting cookies
      cookie.set("cashup_auth_token", token, { path: "/" });
      cookie.set("cashup_merchant_id", merchant_id, { path: "/" });

      toast.success("Login successful. Redirecting to dashboard...");
      setTimeout(() => {
        router.replace("/");
      }, [1500]);
    } catch (e) {
      const errorMessage =
        e?.response?.data?.message ?? "Something went wrong, please try again";
      toast.error(errorMessage);
      console.dir(e);
    }
  };

  // If token exists, means already logged in. Pushing to dashboard.
  useEffect(() => {
    if (isLoggedIn) router.push("/");
  }, [isLoggedIn]);

  return (
    <Card>
      <ShowWhen when={isSubmitting}>
        <LinearProgress />
      </ShowWhen>
      <CardContent className="grid grid-flow-row gap-8">
        <CardHeader
          title="Welcome back admin!"
          subheader="Sign in to manage your Cashup merchant account"
        />
        {/* <Icon source={PlusIcon} /> */}
        {/* <Title /> */}
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
            Sign In
          </Button>
        </form>
        <CardActions>
          <Link
            href="/reset-pin"
            className="w-max mx-auto text-sm text-black hover:text-primary"
          >
            Forgot passcode?
          </Link>
        </CardActions>
      </CardContent>
    </Card>
  );
}

const Title = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      {/* <span className="icon-[solar--shop-2-line-duotone] text-[4rem] text-primary" /> */}
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
