"use client";

import { Controller, useForm } from "react-hook-form";
import { isLoggedIn, setUserCredentials } from "@/lib/authenticator";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "next/link";
import { MuiOtpInput } from "mui-one-time-password-input";
import ShowWhen from "@/components/ui/ShowWhen";
import TextField from "@mui/material/TextField";
import { apiLogin } from "@/api";
import isEmail from "validator/es/lib/isEmail";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
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
      remember_me: false,
    },
  });

  // If token exists, means already logged in. Pushing to dashboard.
  useEffect(() => {
    if (isLoggedIn) router.push("/");
  }, [isLoggedIn]);

  // Login handler
  const onSubmit = async ({ username, passcode, remember_me }) => {
    try {
      const loginType = isEmail(username) ? 2 : 1; // 1: Phone num 2: Email
      console.log(username, loginType, isEmail(username));
      // return;
      const payload = {
        in_userid: username,
        in_pin: passcode,
        in_login_type: loginType,
      };
      const resp = await apiLogin(payload);
      const { merchant_id, token } = resp.data;
      setUserCredentials({
        token,
        merchantId: merchant_id,
        keepAlive: remember_me,
      });
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

  const validateUsername = (value) => {
    const isNumber = Number(value); // Checking if a number or not
    if (!isNumber) return isEmail(value) || "Invalid email address";
  };

  return (
    <Card>
      <ShowWhen when={isSubmitting}>
        <LinearProgress />
      </ShowWhen>
      <CardContent className="grid grid-flow-row gap-8">
        <CardHeader
          title="Welcome back Admin!"
          subheader="Sign in to manage your Cashup merchant account"
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-flow-row gap-4"
        >
          <TextField
            {...register("username", {
              required: "Please enter your email or phone",
              validate: validateUsername,
            })}
            id="field-username"
            variant="outlined"
            label="Email or Phone"
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
                <FormLabel sx={{ ml: "14px" }}>Passcode</FormLabel>
                <MuiOtpInput
                  {...field}
                  length={6}
                  sx={{ gap: 1 }}
                  TextFieldsProps={{ type: "password" }}
                />
                <FormHelperText error={fieldState?.invalid} sx={{ ml: "14px" }}>
                  {fieldState?.invalid
                    ? "Invalid passcode"
                    : "Enter your passcode"}
                </FormHelperText>
              </div>
            )}
          />
          <div className="flex items-center">
            <Controller
              name="remember_me"
              control={control}
              render={({ field: props }) => (
                <Checkbox
                  {...props}
                  checked={props.value}
                  onChange={(e) => props.onChange(e.target.checked)}
                  inputProps={{ "aria-label": "Keep me signed in" }}
                  size="small"
                />
              )}
            />
            <FormLabel sx={{ fontSize: "14px" }}>Keep me signed in</FormLabel>
          </div>
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
            Forgot PIN?
          </Link>
        </CardActions>
      </CardContent>
    </Card>
  );
}
