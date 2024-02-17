import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
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
    const { merchantName, merchantBranchType } = formData;
    console.log("NAME,", merchantBranchType);
  };

  const branchTypes = [
    {
      label: "Shop",
      value: "shop",
    },
    {
      label: "Marketplace",
      value: "marketplace",
    },
    {
      label: "Online",
      value: "online",
    },
  ];

  return (
    <Dialog
      open={isOpen}
      scroll="paper"
      fullScreen={fullScreen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Update your merchant details
      </DialogTitle>
      <DialogContent dividers>
        <form
          id="merchantDetailsForm"
          onSubmit={handleSubmit(profileUpdateHandler)}
          className="grid grid-flow-row gap-6"
        >
          {/* ****** Section: Basic info ***** */}
          <div className="grid grid-flow-row gap-6">
            <Divider textAlign="left">Basic Info</Divider>
            <div className="grid grid-cols-2 gap-x-3 gap-y-6">
              {/* ****** Merchant Code ***** */}
              <TextField
                disabled
                id="field-merchant-code"
                label="Merchant Code"
                variant="outlined"
                defaultValue="S567JKULO"
                helperText="Merchant code cannot be changed"
              />
              {/* ****** Merchant Name ***** */}
              <TextField
                type="text"
                variant="outlined"
                id="field-merchant-name"
                label="Merchant Name*"
                error={Boolean(errors?.merchantName?.message)}
                helperText={
                  errors?.merchantName?.message || "Enter your merchant name"
                }
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
              {/* ****** Email ***** */}
              <TextField
                type="text"
                variant="outlined"
                id="field-merchant-email"
                label="Email Address*"
                error={Boolean(errors?.merchantEmail?.message)}
                helperText={
                  errors?.merchantEmail?.message || "Enter your email address"
                }
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
              {/* ****** Telephone number ***** */}
              <TextField
                type="tel"
                variant="outlined"
                id="field-merchant-landline"
                label="Telephone Number*"
                error={Boolean(errors?.merchantTelephone?.message)}
                helperText={
                  errors?.merchantTelephone?.message ||
                  "Enter your landline number"
                }
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
              {/* ****** Branch Type ***** */}
              <TextField
                select
                label="Branch Type"
                defaultValue="shop"
                id="field-merchant-branch-type"
                helperText="Choose the type of your branch"
                error={Boolean(errors?.merchantBranchType?.message)}
                {...register("merchantBranchType")}
              >
                {branchTypes.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>

          {/* ****** Section: Address Section ***** */}
          <div className="grid grid-flow-row gap-6">
            <Divider textAlign="left">Street Address</Divider>
            {/* ****** Address ***** */}
            <TextField
              multiline
              type="text"
              maxRows={4}
              label="Address*"
              variant="outlined"
              id="field-merchant-address"
              error={Boolean(errors?.merchantAddress?.message)}
              helperText={
                errors?.merchantAddress?.message || "Enter your address"
              }
              {...register("merchantAddress", {
                required: "Please enter your address",
                max: {
                  value: 1100,
                  message: "Maximum 1100 characters allowed",
                },
                min: {
                  value: 3,
                  message: "Enter atleast 3 characters",
                },
              })}
            />
            <div className="grid grid-cols-2 gap-x-3 gap-y-6">
              {/* ****** Area ***** */}
              <TextField
                select
                label="Area"
                defaultValue="shop"
                id="field-merchant-area"
                helperText="Choose the area of your branch"
                error={Boolean(errors?.merchantArea?.message)}
                {...register("merchantArea")}
              >
                {branchTypes.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
              {/* ****** City ***** */}
              <TextField
                select
                label="City"
                defaultValue="shop"
                id="field-merchant-city"
                helperText="Choose the city of your branch"
                error={Boolean(errors?.merchantCity?.message)}
                {...register("merchantCity")}
              >
                {branchTypes.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
              {/* ****** PO Box ***** */}
              <TextField
                type="text"
                variant="outlined"
                id="field-merchant-po-box"
                label="PO Box*"
                error={Boolean(errors?.merchantPoBox?.message)}
                helperText={
                  errors?.merchantPoBox?.message || "Enter your PO Box number"
                }
                {...register("merchantPoBox", {
                  required: "Please enter your PO Box number number",
                  max: {
                    value: 20,
                    message: "Maximum 20 characters allowed",
                  },
                  min: {
                    value: 3,
                    message: "Enter atleast 3 characters",
                  },
                })}
              />
            </div>
          </div>
        </form>
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
        <Button type="submit" autoFocus form="merchantDetailsForm">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
