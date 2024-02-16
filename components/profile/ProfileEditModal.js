import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Fragment } from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ProfileEditModal({ isOpen, setIsOpen }) {
  const theme = useTheme();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const profileUpdateHandler = async (formData) => {
    setIsOpen(false);
    const { merchantName } = formData;
    console.log("NAME,", merchantName);
  };

  return (
    <Fragment>
      <Dialog
        open={isOpen}
        fullScreen={fullScreen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Update your profile
        </DialogTitle>
        <form onSubmit={handleSubmit(profileUpdateHandler)}>
          <DialogContent className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
              {/* Merchant Code */}
              <TextField
                disabled
                id="field-merchant-code"
                label="Merchant Code"
                variant="outlined"
                defaultValue="S567JKULO"
                helperText="Merchant code cannot be changed"
              />
              {/* Merchant Name */}
              <TextField
                type="text"
                variant="outlined"
                id="field-merchant-name"
                label="Merchant Name*"
                error={errors?.merchantName?.message}
                helperText={errors?.merchantName?.message}
                {...register("merchantName", {
                  required: "Please enter your merchant name",
                  max: {
                    value: 100,
                    message: "Maximum 100 characters allowed",
                  },
                  min: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                })}
              />
              {/* Email */}
              <TextField
                type="text"
                variant="outlined"
                id="field-merchant-email"
                label="Email Address*"
                error={errors?.merchantEmail?.message}
                helperText={errors?.merchantEmail?.message}
                {...register("merchantEmail", {
                  required: "Please enter your email address",
                  max: {
                    value: 50,
                    message: "Maximum 50 characters allowed",
                  },
                  min: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                })}
              />
              {/* Telephone no. */}
              <TextField
                type="tel"
                variant="outlined"
                id="field-merchant-landline"
                label="Telephone Number*"
                error={errors?.merchantTelephone?.message}
                helperText={errors?.merchantTelephone?.message}
                {...register("merchantTelephone", {
                  required: "Please enter your telephone number",
                  max: {
                    value: 50,
                    message: "Maximum 50 characters allowed",
                  },
                  min: {
                    value: 3,
                    message: "Enter atleast 3 characters",
                  },
                })}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              type="reset"
              autoFocus
              onClick={() => {
                reset();
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" autoFocus>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
}
