"use client";

import { Controller, useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { MuiOtpInput } from "mui-one-time-password-input";
import ShowWhen from "../ui/ShowWhen";
import { apiUpdateMerchantPin } from "@/api";
import { merchantId } from "@/lib/authenticator";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const fieldNameNewPin = "fieldNewPin";
const fieldNameConfirmPin = "fieldConfirmPin";

export default function UpdateDefaultPinForm() {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm({
    newPin: fieldNameNewPin,
    confirmPin: fieldNameConfirmPin,
  });

  const pinUpdateHandler = async (formData) => {
    try {
      const newPin = formData[fieldNameNewPin];
      const payload = {
        in_merchant_id: merchantId,
        in_pin: newPin,
      };
      const resp = await apiUpdateMerchantPin(payload);
      toast.success(resp?.data?.message);
    } catch (e) {
      toast.error(e?.response?.data?.response?.message || e?.message);
      console.dir(e);
    }
  };

  // Watching new pin field for changes,
  // if user types in it, show confirm pin field & submit button
  const newPinFieldValue = Boolean(watch(fieldNameNewPin));
  useEffect(() => {
    if (!newPinFieldValue) reset(); // If first field is empty, confirmation field also should be cleared.
  }, [newPinFieldValue]);

  return (
    <Card>
      <CardHeader
        title="Change your default PIN"
        subheader="Change your account's default PIN for more security"
      />
      <CardContent className="grid grid-flow-row gap-5">
        <form
          className="grid grid-flow-row gap-4"
          onSubmit={handleSubmit(pinUpdateHandler)}
        >
          <Controller
            name={fieldNameNewPin}
            control={control}
            rules={{ validate: (value) => value?.length === 6 }}
            render={({ field, fieldState }) => (
              <div className="grid grid-flow-row gap-1">
                <FormLabel sx={{ ml: "14px" }}>New PIN</FormLabel>
                <MuiOtpInput
                  autoFocus
                  sx={{ gap: 1 }}
                  {...field}
                  length={6}
                  TextFieldsProps={{
                    type: "password",
                  }}
                />
                <FormHelperText error={fieldState?.invalid} sx={{ ml: "14px" }}>
                  {fieldState?.invalid ? "Invalid PIN" : "Create a new PIN"}
                </FormHelperText>
              </div>
            )}
          />
          <ShowWhen when={newPinFieldValue}>
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
          <ShowWhen when={newPinFieldValue}>
            <Button disabled={isSubmitting} type="submit" variant="contained">
              Update
            </Button>
          </ShowWhen>
        </form>
        <CardActions>
          <SkipStep isSubmitting={isSubmitting} />
        </CardActions>
      </CardContent>
    </Card>
  );
}

const SkipStep = ({ isSubmitting = false }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 md:flex-row justify-between">
      <p className="text-sm text-black/80">
        You can skip this step if you don't want to change the default PIN
      </p>
      <Button
        onClick={() => {
          router.push("/");
        }}
        disabled={isSubmitting}
        variant="contained"
        endIcon={
          <span className="icon-[solar--arrow-right-line-duotone] text-white" />
        }
      >
        Skip
      </Button>
    </div>
  );
};
