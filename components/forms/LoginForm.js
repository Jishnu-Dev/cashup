"use client";

import { Controller, useForm } from "react-hook-form";
import { Link, useRouter } from "@/navigation";
import {
  cookieDefaultSettings,
  cookieNameLastLogin,
  cookieNameMerchantId,
  cookieNameToken,
  getIsLoggedIn,
  loginExpiryDays,
} from "@/lib/authenticator";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import Cookies from "universal-cookie";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import LinearProgress from "@mui/material/LinearProgress";
import { MuiOtpInput } from "mui-one-time-password-input";
import ShowWhen from "@/components/ui/ShowWhen";
import TextField from "@mui/material/TextField";
import { apiLogin } from "@/api";
import isEmail from "validator/es/lib/isEmail";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function LoginForm() {
  const t = useTranslations("login");
  const cookie = new Cookies();
  const router = useRouter();
  const {
    control,
    setFocus,
    resetField,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      pin: "",
      username: "",
      remember_me: false,
    },
  });

  // If token exists, means already logged in. Pushing to dashboard.
  useEffect(() => {
    if (getIsLoggedIn()) router.push("/");
  }, []);

  // Login handler
  const onSubmit = async ({ username, pin, remember_me }) => {
    try {
      const loginType = isEmail(username) ? 2 : 1; // 1: Phone num 2: Email
      const payload = {
        in_userid: username,
        in_pin: pin,
        in_login_type: loginType,
      };
      const resp = await apiLogin(payload);
      const { merchant_id, token, pin_default_checked } = resp?.data;

      // Deciding cookie expiry
      let cookieSettings = cookieDefaultSettings;
      let expiryDate = new Date();
      if (remember_me) {
        expiryDate.setDate(expiryDate.getDate() + loginExpiryDays); // 7 days for keepAlive, Session otherwise
        cookieSettings = {
          ...cookieSettings,
          expires: expiryDate,
        };
      }

      // Setting auth cookies
      const currentDate = new Date().toISOString();
      cookie.set(cookieNameMerchantId, merchant_id, cookieSettings);
      cookie.set(cookieNameToken, token, cookieSettings);
      cookie.set(cookieNameLastLogin, currentDate, cookieSettings);

      toast.success(resp?.message);
      if (pin_default_checked) router.push("/");
      else router.push("/onboard");
    } catch (e) {
      const errorMessage =
        e?.response?.data?.message ?? "Something went wrong, please try again";
      toast.error(errorMessage);
      console.dir(e);
      setFocus("username");
      resetField("pin"); // RESET PIN AND SET FOCUS ON EMAIL ON ERROR
    }
  };

  const validateUsername = (value) => {
    const isNumber = Number(value);
    if (!isNumber) return isEmail(value) || "Invalid username";
  };

  return (
    <Card>
      <ShowWhen when={isSubmitting}>
        <LinearProgress />
      </ShowWhen>
      <CardContent className="grid grid-flow-row gap-8">
        <CardHeader title={t("title")} subheader={t("subtitle")} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-flow-row gap-4"
        >
          <TextField
            {...register("username", {
              required: "Please enter your email or phone",
              validate: validateUsername,
            })}
            autoFocus
            focused
            id="field-username"
            variant="outlined"
            label="Email Address or Mobile No."
            error={!!errors?.username}
            helperText={errors?.username?.message}
          />
          <Controller
            name="pin"
            control={control}
            rules={{ validate: (value) => value?.length === 6 }}
            render={({ field, fieldState }) => (
              <div className="grid grid-flow-row gap-1">
                <MuiOtpInput
                  {...field}
                  length={6}
                  sx={{ gap: 1 }}
                  validateChar={(value) => !isNaN(value)} // Accepts only number
                  TextFieldsProps={{
                    type: "password",
                    placeholder: "•",
                    error: fieldState?.invalid,
                  }}
                />
                <FormHelperText error={fieldState?.invalid} sx={{ ml: "14px" }}>
                  {fieldState?.invalid
                    ? "Invalid PIN"
                    : "Enter your 6-digit PIN"}
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
            <FormLabel sx={{ fontSize: "14px" }}>Keep me logged-in</FormLabel>
          </div>
          <Button
            size="large"
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            Log In
          </Button>
        </form>
        <CardActions>
          <Link href="/reset-pin" className="w-max mx-auto text-sm link">
            Forgot PIN?
          </Link>
        </CardActions>
      </CardContent>
    </Card>
  );
}
