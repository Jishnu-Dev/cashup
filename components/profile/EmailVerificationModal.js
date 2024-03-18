import { Controller, useForm } from "react-hook-form";

import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import LinearProgress from "@mui/material/LinearProgress";
import { MuiOtpInput } from "mui-one-time-password-input";
import ShowWhen from "@/components/ui/ShowWhen";
import { useState } from "react";

export default function EmailVerificationModal({ isOpen, handleClose }) {
  const { control, handleSubmit } = useForm();
  const onSubmit = () => {};

  // Form related
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onSubmit),
      }}
    >
      <ShowWhen when={isSubmitting}>
        <LinearProgress />
      </ShowWhen>
      <DialogTitle>Verify Your Email</DialogTitle>
      <DialogContent className="flex flex-col gap-4">
        {/* Email */}
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
                validateChar={(value) => !isNaN(value)} // Accepts only number
                TextFieldsProps={{
                  type: "password",
                  placeholder: "•",
                  error: fieldState?.invalid,
                }}
              />
              <FormHelperText error={fieldState?.invalid} sx={{ ml: "14px" }}>
                {fieldState?.invalid
                  ? "Invalid OTP"
                  : "Enter the OTP you received via email"}
              </FormHelperText>
            </div>
          )}
        />
        <div className="grid grid-flow-row gap-2">
          <Button variant="contained">Submit</Button>
          <Button type="reset" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
