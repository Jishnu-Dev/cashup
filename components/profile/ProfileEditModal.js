import { Fragment, useEffect, useState } from "react";

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
    <Fragment>
      <Dialog
        open={isOpen}
        fullScreen={fullScreen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Update your merchant details
        </DialogTitle>
        <form onSubmit={handleSubmit(profileUpdateHandler)}>
          <DialogContent className="grid grid-flow-row gap-6">
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
              {/* ****** Adress ***** */}
              <TextField
                multiline
                type="text"
                maxRows={4}
                label="Address*"
                variant="outlined"
                id="field-merchant-address"
                error={Boolean(errors?.merchantAddress?.message)}
                helperText={
                  errors?.merchantAddress?.message ||
                  "Enter your landline number"
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
