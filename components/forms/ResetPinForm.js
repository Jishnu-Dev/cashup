"use client";

import { Controller, useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { MuiOtpInput } from "mui-one-time-password-input";
import ShowWhen from "@/components/ui/ShowWhen";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPinForm() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [step, setStep] = useState(1);
  const onSubmit = async (formData) => {
    try {
      console.log("Formdata", formData);
      switch (step) {
        case 1: {
          toast.success("Email sent successfully");
          setStep(2);
          break;
        }
        case 2: {
          toast.success("OTP verified successfully");
          setStep(3);
          break;
        }
        case 3: {
          toast.success(
            "Passcode reset successfully, now you can login with your new passcode"
          );
          setTimeout(() => {
            router.push("/login");
          }, 1000);
          break;
        }
      }
    } catch (e) {
      console.dir(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-flow-row gap-4"
    >
      <ShowWhen when={step < 3}>
        <TextField
          {...register("email", {
            required: "Please enter your email or phone",
          })}
          id="field-username"
          variant="outlined"
          label="Enter your email address*"
          error={!!errors?.username}
          helperText={
            errors?.username?.message ?? "You will receive an OTP via email"
          }
        />
        <ShowWhen when={step === 2}>
          <Controller
            name="otp"
            control={control}
            rules={{ validate: (value) => value?.length === 4 }}
            render={({ field, fieldState }) => (
              <div className="grid grid-flow-row gap-1">
                <FormLabel sx={{ ml: "14px" }}>OTP*</FormLabel>
                <MuiOtpInput sx={{ gap: 1 }} {...field} length={4} />
                <FormHelperText error={fieldState?.invalid} sx={{ ml: "14px" }}>
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
          name="newPasscode"
          control={control}
          rules={{ validate: (value) => value?.length === 6 }}
          render={({ field, fieldState }) => (
            <div className="grid grid-flow-row gap-1">
              <FormLabel sx={{ ml: "14px" }}>New Passcode*</FormLabel>
              <MuiOtpInput sx={{ gap: 1 }} {...field} length={6} />
              <FormHelperText error={fieldState?.invalid} sx={{ ml: "14px" }}>
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
  );
}
