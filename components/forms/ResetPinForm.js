"use client";

import { Controller, useForm } from "react-hook-form";
import {
  apiGetPinResetOTP,
  apiUpdateMerchantPin,
  apiVerifyPinResetOTP,
} from "@/api/api";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { LinearProgress } from "@mui/material";
import Link from "next/link";
import { MuiOtpInput } from "mui-one-time-password-input";
import ShowWhen from "@/components/ui/ShowWhen";
import TextField from "@mui/material/TextField";
import { merchantId } from "@/lib/authenticator";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPinForm() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ email: "", otp: "", newPin: "", confirmPin: "" });

  const [step, setStep] = useState(1);
  const onSubmit = async ({ email, otp, newPin, confirmPin }) => {
    try {
      switch (step) {
        // Sending OTP
        case 1: {
          const resp = await apiGetPinResetOTP({ in_merchant_email: email });
          toast.success(resp?.data?.message);
          setStep(2);
          break;
        }
        // Verifying OTP
        case 2: {
          const resp = await apiVerifyPinResetOTP({ in_OTP: Number(otp) });
          console.log("RESP", resp);
          toast.success(resp?.data?.message);
          setStep(3);
          break;
        }
        // Updating new PIN
        case 3: {
          const isPinsMatching = newPin === confirmPin;
          if (!isPinsMatching)
            setError("confirmPin", { message: "PINs does not match" });
          const payload = {
            in_merchant_id: merchantId,
            in_pin: Number(newPin),
          };
          const resp = await apiUpdateMerchantPin(payload);
          toast.success(resp?.data?.message);
          setTimeout(() => {
            router.push("/login");
          }, 1000);
          break;
        }
        default: {
          setStep(1);
          break;
        }
      }
    } catch (e) {
      toast.error(e?.response?.data?.message ?? e?.message);
      console.dir(e);
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-flow-row gap-4"
        >
          <ShowWhen when={step < 3}>
            <TextField
              {...register("email", {
                required: "Please enter your email or phone",
              })}
              autoFocus
              id="field-username"
              variant="outlined"
              label="Enter your email address"
              error={!!errors?.username}
              helperText={
                errors?.username?.message ?? "You will receive an OTP via email"
              }
            />
            <ShowWhen when={step === 2}>
              <Controller
                name="otp"
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
                        ? "Invalid passcode"
                        : "Enter the OTP you received via email"}
                    </FormHelperText>
                  </div>
                )}
              />
            </ShowWhen>
          </ShowWhen>
          <ShowWhen when={step === 3}>
            <Controller
              name="newPin"
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
                    {fieldState?.invalid
                      ? "Invalid passcode"
                      : "Create a new passcode"}
                  </FormHelperText>
                </div>
              )}
            />
            <Controller
              name="confirmPin"
              control={control}
              rules={{ validate: (value) => value?.length === 6 }}
              render={({ field, fieldState }) => (
                <div className="grid grid-flow-row gap-1">
                  <FormLabel sx={{ ml: "14px" }}>Confirm PIN</FormLabel>
                  <MuiOtpInput sx={{ gap: 1 }} {...field} length={6} />
                  <FormHelperText
                    error={fieldState?.invalid}
                    sx={{ ml: "14px" }}
                  >
                    {fieldState?.invalid
                      ? "Invalid passcode"
                      : "Create a new passcode"}
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
        <CardActions>
          <Link
            href="/login"
            className="w-max mx-auto text-sm text-black hover:text-primary"
          >
            Remember PIN? Login
          </Link>
        </CardActions>
      </CardContent>
    </Card>
  );
}
