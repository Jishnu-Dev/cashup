"use client";

import { Controller, useForm } from "react-hook-form";
import { Link, useRouter } from "@/navigation";
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
import { MuiOtpInput } from "mui-one-time-password-input";
import ShowWhen from "@/components/ui/ShowWhen";
import TextField from "@mui/material/TextField";
import isEmail from "validator/es/lib/isEmail";
import { toast } from "react-toastify";

const cookie = new Cookies();
// Field names as global variable so that one change can affect everywhere it is being used
const fieldNameEmail = "fieldEmail";
const fieldNameOTP = "fieldOTP";
const fieldNameNewPin = "fieldNewPin";
const fieldNameConfirmPin = "fieldNameConfirmPin";

export default function OnboardingPinUpdateForm() {
  const {
    watch,
    control,
    setError,
    setFocus,
    register,
    getValues,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    [fieldNameEmail]: "",
    [fieldNameOTP]: "",
    [fieldNameNewPin]: "",
    [fieldNameConfirmPin]: "",
  });

  const [step, setStep] = useState(2); // Steps, 1: Email form, 2: OTP form, 3: New pin form, 4: Success
  const [feedbackMessage, setFeedbackMessage] = useState();
  async function onSubmit(formData) {
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
          const message = resp?.data?.message;
          toast.success(message);
          setFeedbackMessage(message);
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
      // Updating new Pin
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
  }

  // Resend OTP handler
  async function otpResendHandler() {
    try {
      const email = getValues(fieldNameEmail);
      if (!email) throw new Error("Please enter your email address");
      clearErrors();
      const resp = await apiGetPinResetOTP({
        in_merchant_email: email,
      });
      const message = resp?.data?.message;
      toast.success(message);
      setFeedbackMessage(message);
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
    }
  }

  // Auto switching input focus to Confirm Pin field
  // After entering New Pin completely
  const isNewPinFieldValid = watch(fieldNameNewPin)?.length === 6;
  useEffect(() => {
    if (!isNewPinFieldValid) return;
    else setFocus(fieldNameConfirmPin);
  }, [isNewPinFieldValid]);

  // Card titles
  const titles = {
    4: {
      title: "PIN reset completed successfully!",
      subtitle: "Redirecting...",
    },
    default: {
      title: "Reset the PIN to restore access to your account",
      subtitle: "",
    },
  };

  // Submit button labels for each step
  const submitLabels = {
    1: "Send OTP",
    2: "Submit",
    3: "Save new PIN",
    default: "Submit",
  };

  return (
    <Card className="w-full">
      <ShowWhen when={isSubmitting}>
        <LinearProgress />
      </ShowWhen>
      <CardHeader
        title={titles[step]?.title || titles?.default?.title}
        subheader={titles[step]?.subtitle || titles?.default?.subtitle}
      />
      <CardContent className="grid grid-flow-row gap-4">
        <ShowWhen when={step <= 3}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-flow-row gap-4"
          >
            <ShowWhen when={step < 3}>
              <div className="grid grid-flow-row gap-4">
                {/* Email Field */}
                <TextField
                  {...register(fieldNameEmail, {
                    required: "Please enter your email address",
                    validate: (value) =>
                      isEmail(value) || "Invalid email address",
                  })}
                  autoFocus
                  id="field-email"
                  variant="outlined"
                  label="Email Address"
                  error={!!errors?.[fieldNameEmail]}
                  className="w-full"
                  helperText={
                    errors?.[fieldNameEmail]?.message || feedbackMessage
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
                          validateChar={(value) => !isNaN(value)} // Accepts only number
                          TextFieldsProps={{
                            type: "password",
                            placeholder: "•",
                            error: fieldState?.invalid,
                          }}
                        />
                        <FormHelperText
                          error={fieldState?.invalid}
                          sx={{ ml: "14px" }}
                        >
                          {fieldState?.invalid ?? "Invalid OTP"}
                        </FormHelperText>
                      </div>
                    )}
                  />
                  {/** RESEND OTP **/}
                  <ResendOTPButton
                    otpResendHandler={otpResendHandler}
                    getValues={getValues}
                  />
                </ShowWhen>
              </div>
            </ShowWhen>

            {/* New PIN FieldS */}
            <ShowWhen when={step === 3}>
              <div className="grid grid-flow-row gap-3">
                {/* New PIN */}
                <Controller
                  name={fieldNameNewPin}
                  control={control}
                  rules={{ validate: (value) => value?.length === 6 }}
                  render={({ field, fieldState }) => (
                    <div className="grid grid-flow-row gap-1">
                      <FormLabel sx={{ ml: "14px" }}>Enter New PIN</FormLabel>
                      <MuiOtpInput
                        sx={{ gap: 1 }}
                        {...field}
                        length={6}
                        validateChar={(value) => !isNaN(value)} // Accepts only number
                        TextFieldsProps={{
                          type: "password",
                          placeholder: "•",
                          error: fieldState?.invalid,
                        }}
                      />
                      <FormHelperText
                        error={fieldState?.invalid}
                        sx={{ ml: "14px" }}
                      >
                        {fieldState?.invalid ? "Invalid PIN" : null}
                      </FormHelperText>
                    </div>
                  )}
                />
                {/* Confirm PIN */}
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
                        validateChar={(value) => !isNaN(value)} // Accepts only number
                        TextFieldsProps={{
                          type: "password",
                          placeholder: "•",
                          error: fieldState?.invalid,
                        }}
                      />
                      <FormHelperText
                        error={fieldState?.invalid}
                        sx={{ ml: "14px" }}
                      >
                        {fieldState?.invalid ? "PIN does not match" : null}
                      </FormHelperText>
                    </div>
                  )}
                />
              </div>
            </ShowWhen>
            <Button
              size="large"
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {submitLabels[step] || submitLabels.default}
            </Button>
          </form>
        </ShowWhen>
        <ShowWhen when={step <= 3}>
          <CardActions>
            <Link href={`/login`} className="w-max mx-auto text-sm link">
              Login Now
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

// TODO: DISABLE OTP RESEND BUTTON FOR 1 MINUTE AFTER RESEND
const ResendOTPButton = ({ otpResendHandler }) => {
  return (
    <p className="text-sm mt-2">
      {`Didn't receive the email? `}
      <button type="button" className="link" onClick={otpResendHandler}>
        Resend OTP now
      </button>
    </p>
  );
};

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
      <p
        dangerouslySetInnerHTML={{
          __html: `PIN reset completed successfully! <br />Redirecting you to login in... ${timeLeft}`,
        }}
      />
      <Link href="/login" className="link">
        Login now
      </Link>
    </div>
  );
};
