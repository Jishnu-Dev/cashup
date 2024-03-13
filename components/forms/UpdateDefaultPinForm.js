"use client";

import { Controller, useForm } from "react-hook-form";
import { apiUpdateDefaultPinChangedStatus, apiUpdateMerchantPin } from "@/api";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import LinearProgress from "@mui/material/LinearProgress";
import { MuiOtpInput } from "mui-one-time-password-input";
import ShowWhen from "@/components/ui/ShowWhen";
import { getMerchantId } from "@/lib/authenticator";
import { toast } from "react-toastify";
import { useRouter } from "@/navigation";

const fieldNameNewPin = "fieldNewPin";
const fieldNameConfirmPin = "fieldConfirmPin";

const pathToDashboardWithWelcomePopup = "/?welcome=true";

export default function UpdateDefaultPinForm() {
  const router = useRouter();
  const merchantId = getMerchantId();
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

  // Pin update form handler
  const pinUpdateHandler = async (formData) => {
    try {
      const newPin = formData[fieldNameNewPin];
      const payload = {
        in_merchant_id: merchantId,
        in_pin: newPin,
      };
      const resp = await apiUpdateMerchantPin(payload);
      toast.success(resp?.data?.message);
      await updateUserDefaultPinChoice();
    } catch (e) {
      toast.error(e?.response?.data?.response?.message || e?.message);
      console.dir(e);
    }
  };

  // Updating user's choice to change or not to change default pin to db
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const updateUserDefaultPinChoice = async () => {
    try {
      setIsUpdatingStatus(true);
      await apiUpdateDefaultPinChangedStatus(merchantId);
      setTimeout(() => {
        router.push(pathToDashboardWithWelcomePopup);
      }, 1000);
    } catch (e) {
      console.dir(e);
    } finally {
      setIsUpdatingStatus(false);
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
      <ShowWhen when={isSubmitting || isUpdatingStatus}>
        <LinearProgress />
      </ShowWhen>
      <CardHeader
        title="Account Default PIN"
        subheader="You are currently using a system-generated PIN. We recommend changing it to a personalized PIN for added security and convenience."
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
                <FormLabel sx={{ ml: "14px" }}>Enter New PIN</FormLabel>
                <MuiOtpInput
                  sx={{ gap: 1 }}
                  {...field}
                  length={6}
                  validateChar={(value) => !isNaN(value)} // Accepts only number
                  TextFieldsProps={{
                    type: "password",
                    placeholder: "•",
                  }}
                />
                <FormHelperText error={fieldState?.invalid} sx={{ ml: "14px" }}>
                  {fieldState?.invalid ?? "Invalid PIN"}
                </FormHelperText>
              </div>
            )}
          />
          <ShowWhen when={newPinFieldValue}>
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
          </ShowWhen>
          <ShowWhen when={newPinFieldValue}>
            <Button
              disabled={isSubmitting || isUpdatingStatus}
              type="submit"
              variant="contained"
            >
              Save PIN
            </Button>
          </ShowWhen>
        </form>
        <CardActions>
          <SkipStep
            isSubmitting={isSubmitting}
            isUpdatingStatus={isUpdatingStatus}
            updatePinChoice={updateUserDefaultPinChoice}
          />
        </CardActions>
      </CardContent>
    </Card>
  );
}

const SkipStep = ({
  isSubmitting = false,
  isUpdatingStatus,
  updatePinChoice,
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row justify-between items-center">
      <p className="text-sm text-black/80">
        You can skip this step for now and change your PIN anytime by accessing
        the profile settings.
      </p>
      <Button
        onClick={updatePinChoice}
        disabled={isSubmitting || isUpdatingStatus}
        endIcon={
          <span className="icon-[solar--arrow-right-line-duotone] text-primary" />
        }
      >
        Skip
      </Button>
    </div>
  );
};
