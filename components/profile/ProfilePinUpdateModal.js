"use client";

import { Controller, useForm } from "react-hook-form";
import {
  apiGetPinResetOTP,
  apiUpdateMerchantPin,
  apiVerifyPinResetOTP,
} from "@/api";

import Button from "@mui/material/Button";
import Cookies from "universal-cookie";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import LinearProgress from "@mui/material/LinearProgress";
import { MuiOtpInput } from "mui-one-time-password-input";
import ShowWhen from "@/components/ui/ShowWhen";
import TextField from "@mui/material/TextField";
import { cookieNameMerchantId } from "@/lib/authenticator";
import isEmail from "validator/es/lib/isEmail";
import { toast } from "react-toastify";
import { useState } from "react";

const fieldNameEmail = "email";
const fieldNameOTP = "otp";
const fieldNameNewPin = "newPin";
const fieldNameConfirmPin = "confirmPin";

export default function ProfilePinUpdateModal() {
  const cookie = new Cookies();
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    [fieldNameEmail]: "",
    [fieldNameOTP]: "",
    [fieldNameNewPin]: "",
    [fieldNameConfirmPin]: "",
  });

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Steps, 1: Email, 2: OTP, 3: New PIN
  const [step, setStep] = useState(1);
  // Form Submission
  const onSubmit = async (formData) => {
    const email = formData[fieldNameEmail];
    const otp = formData[fieldNameOTP];
    const newPin = formData[fieldNameNewPin];

    switch (step) {
      // Sending OTP
      case 1: {
        try {
          const resp = await apiGetPinResetOTP({
            in_merchant_email: email,
          });
          toast.success(resp?.data?.message);
          setStep(2);
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
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onSubmit),
      }}
    >
      <ShowWhen when={isSubmitting}>
        <LinearProgress />
      </ShowWhen>
      <DialogTitle>Update your PIN</DialogTitle>
      <DialogContent className="flex flex-col gap-4">
        <DialogContentText>
          Enter your email address and we will send you and email with the One
          Time Password to reset your PIN.
        </DialogContentText>
        {/* Email */}
        <TextField
          {...register(fieldNameEmail, {
            required: "Please enter your email",
            validate: (value) => isEmail(value),
          })}
          autoFocus
          id="field-email"
          variant="outlined"
          label="Email or Phone"
          error={!!errors?.email}
          disabled={isSubmitting || step !== 1}
          helperText={
            errors?.email?.message ??
            "Use your email or registered phone to sign in"
          }
        />
        <ShowWhen when={step === 2}>
          {/* OTP Field */}
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
                  TextFieldsProps={{ error: fieldState?.invalid }}
                />
                <FormHelperText error={fieldState?.invalid} sx={{ ml: "14px" }}>
                  {fieldState?.invalid
                    ? "Invalid OTP"
                    : "Enter the OTP you received via email"}
                </FormHelperText>
              </div>
            )}
          />
        </ShowWhen>
        {/* NEW PIN */}
        <ShowWhen when={step === 3}>
          <div className="grid grid-flow-row gap-3">
            <Controller
              name={fieldNameNewPin}
              control={control}
              rules={{ validate: (value) => value?.length === 6 }}
              render={({ field, fieldState }) => (
                <div className="grid grid-flow-row gap-1">
                  <FormLabel sx={{ ml: "14px" }}>New PIN</FormLabel>
                  <MuiOtpInput
                    sx={{ gap: 1 }}
                    {...field}
                    length={6}
                    TextFieldsProps={{
                      type: "password",
                      error: fieldState?.invalid,
                    }}
                  />
                  <FormHelperText
                    error={fieldState?.invalid}
                    sx={{ ml: "14px" }}
                  >
                    {fieldState?.invalid ? "Invalid PIN" : "Create a new PIN"}
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
                  const isPinsMatching = formValues[fieldNameNewPin] === value;
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
                      error: fieldState?.invalid,
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
          </div>
        </ShowWhen>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
