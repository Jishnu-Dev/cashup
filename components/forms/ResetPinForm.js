"use client";

import { Controller, useForm } from "react-hook-form";
import {
  apiGetPinResetOTP,
  apiUpdateMerchantPin,
  apiVerifyPinResetOTP,
} from "@/api";
import {
  cookieDefaultSettings,
  cookieNameMerchantId,
} from "@/lib/authenticator";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Cookies from "universal-cookie";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { LinearProgress } from "@mui/material";
import Link from "next/link";
import { MuiOtpInput } from "mui-one-time-password-input";
import ShowWhen from "@/components/ui/ShowWhen";
import TextField from "@mui/material/TextField";
import isEmail from "validator/es/lib/isEmail";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// Filed names as global variable so that one change can affect everywhere it is being used
const fieldNameEmail = "fieldEmail";
const fieldNameOTP = "fieldOTP";
const fieldNameNewPin = "fieldNewPin";
const fieldNameConfirmPin = "fieldNameConfirmPin";

export default function ResetPinForm() {
  const cookie = new Cookies();
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    [fieldNameEmail]: "",
    [fieldNameOTP]: "",
    [fieldNameNewPin]: "",
    [fieldNameConfirmPin]: "",
  });

  const [step, setStep] = useState(1); // Steps, 1: Email form, 2: OTP form, 3: New pin form
  const onSubmit = async (formData) => {
    const email = formData[fieldNameEmail];
    const otp = formData[fieldNameOTP];
    const newPin = formData[fieldNameNewPin];

    // Steps, 1: Email form, 2: OTP form, 3: New pin form
    switch (step) {
      // Sending OTP
      case 1: {
        try {
          const resp = await apiGetPinResetOTP({
            in_merchant_email: email,
          });
          toast.success(resp?.data?.message);
          setStep(2);
          cookie.set(
            cookieNameMerchantId,
            resp?.data?.merchant_id,
            cookieDefaultSettings
          );
        } catch (e) {
          const error = e?.response?.data?.message ?? e?.message;
          setError(fieldNameEmail, { message: error });
          console.dir(e);
        } finally {
          break;
        }
      }
      // Verifying OTP
      case 2: {
        try {
          const resp = await apiVerifyPinResetOTP({
            in_merchant_email: email,
            in_OTP: otp,
          });
          toast.success(resp?.data?.message);
          setStep(3);
        } catch (e) {
          const error = e?.response?.data?.message ?? e?.message;
          toast.error(error);
          console.dir(e);
        } finally {
          break;
        }
      }
      // Updating new PIN
      case 3: {
        try {
          const merchantId = cookie.get(cookieNameMerchantId);
          const payload = {
            in_merchant_id: merchantId,
            in_pin: newPin,
          };
          const resp = await apiUpdateMerchantPin(payload);
          toast.success(resp?.data?.message);
          setStep(4);
        } catch (e) {
          const error = e?.response?.data?.message ?? e?.message;
          toast.error(error);
          console.dir(e);
        } finally {
          break;
        }
      }
      default: {
        setStep(1);
        break;
      }
    }
  };

  return (
    <Card>
      <ShowWhen when={isSubmitting}>
        <LinearProgress />
      </ShowWhen>
      <CardHeader
        title="Reset PIN"
        subheader="Restore access to your merchant account by reseting the pin"
      />
      <CardContent className="grid grid-flow-row gap-4">
        <ShowWhen when={step <= 3}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-flow-row gap-4"
          >
            <ShowWhen when={step < 3}>
              {/* Email Field */}
              <TextField
                {...register(fieldNameEmail, {
                  required: "Please enter your email or phone",
                  validate: (value) =>
                    isEmail(value) || "Invalid email address",
                })}
                autoFocus
                id="field-email"
                variant="outlined"
                label="Enter your email address"
                error={!!errors?.[fieldNameEmail]}
                helperText={
                  errors?.[fieldNameEmail]?.message ??
                  "You will receive an OTP via email which is valid for 30 minutes"
                }
              />
              {/* OTP Field */}
              <ShowWhen when={step === 2}>
                <Controller
                  name={fieldNameOTP}
                  control={control}
                  rules={{ validate: (value) => value?.length === 6 }}
                  render={({ field, fieldState }) => (
                    <div className="grid grid-flow-row gap-1">
                      <FormLabel sx={{ ml: "14px" }}>OTP</FormLabel>
                      <MuiOtpInput
                        sx={{ gap: 1 }}
                        {...field}
                        length={6}
                        autoFocus
                      />
                      <FormHelperText
                        error={fieldState?.invalid}
                        sx={{ ml: "14px" }}
                      >
                        {fieldState?.invalid
                          ? "Invalid OTP"
                          : "Enter the OTP you received via email"}
                      </FormHelperText>
                    </div>
                  )}
                />
              </ShowWhen>
            </ShowWhen>

            {/* New PIN Field */}
            <ShowWhen when={step === 3}>
              <Controller
                name={fieldNameNewPin}
                control={control}
                rules={{ validate: (value) => value?.length === 6 }}
                render={({ field, fieldState }) => (
                  <div className="grid grid-flow-row gap-1">
                    <FormLabel sx={{ ml: "14px" }}>New PIN</FormLabel>
                    <MuiOtpInput sx={{ gap: 1 }} {...field} length={6} />
                    <FormHelperText
                      error={fieldState?.invalid}
                      sx={{ ml: "14px" }}
                    >
                      {fieldState?.invalid ? "Invalid PIN" : "Create a new PIN"}
                    </FormHelperText>
                  </div>
                )}
              />
              <Controller
                name={fieldNameConfirmPin}
                control={control}
                rules={{
                  validate: (value, formValues) => {
                    // Check if pins are matching
                    const isPinsMatching =
                      formValues[fieldNameNewPin] === value;
                    return isPinsMatching;
                  },
                }}
                render={({ field, fieldState }) => (
                  <div className="grid grid-flow-row gap-1">
                    <FormLabel sx={{ ml: "14px" }}>Confirm PIN</FormLabel>
                    <MuiOtpInput
                      sx={{ gap: 1 }}
                      {...field}
                      length={6}
                      TextFieldsProps={{
                        type: "password",
                      }}
                    />
                    <FormHelperText
                      error={fieldState?.invalid}
                      sx={{ ml: "14px" }}
                    >
                      {fieldState?.invalid
                        ? "Pins does not match"
                        : "Confirm new pin"}
                    </FormHelperText>
                  </div>
                )}
              />
            </ShowWhen>
            <Button
              size="large"
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading" : "Submit"}
            </Button>
          </form>
        </ShowWhen>
        <ShowWhen when={step <= 3}>
          <CardActions>
            <Link
              href="/login"
              className="w-max mx-auto text-sm text-black hover:text-primary"
            >
              Remember PIN? Login
            </Link>
          </CardActions>
        </ShowWhen>
        <ShowWhen when={step === 4}>
          <PinResetSuccessMessage />
        </ShowWhen>
      </CardContent>
    </Card>
  );
}

const PinResetSuccessMessage = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(4);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(interval); // Stop the interval when timeLeft reaches 0
          router.push("/login");
          return prevTime;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-3 items-center text-center">
      <span class="icon-[solar--check-circle-bold-duotone] text-primary text-7xl" />
      <p>{`Pin reset completed successfully. You can login using your new pin. Redirecting you to login in... ${timeLeft}`}</p>
      <Button
        onClick={() => {
          router.push("/login");
        }}
      >
        Login now
      </Button>
    </div>
  );
};
