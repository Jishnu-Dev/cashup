"use client";

import { Controller, useForm } from "react-hook-form";
import { Fragment, createContext, useContext, useState } from "react";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardTitleIcon from "@/components/ui/CardTitleIcon";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";

const FormContext = createContext();

const branchTypes = [
  {
    label: "Shop",
    value: 1,
  },
  {
    label: "Marketplace",
    value: 2,
  },
  {
    label: "Online",
    value: 3,
  },
];

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const profileUpdateHandler = async (formData) => {
    const { merchantLandline, merchantBranchType } = formData;
    console.log("NAME,", merchantMobileNumber);
  };

  return (
    <Card variant="outlined">
      <CardHeader
        title="Update your merchant details"
        subheader="Marked * fields are required fields"
        action={
          <Chip
            label="Account Status: Active"
            color="success"
            variant="outlined"
          />
        }
        avatar={
          <CardTitleIcon icon="icon-[solar--user-check-rounded-line-duotone]" />
        }
      />
      <CardContent>
        <FormContext.Provider
          value={{
            register,
            handleSubmit,
            errors,
            reset,
            control,
          }}
        >
          <form
            id="merchant-details-form"
            onSubmit={handleSubmit(profileUpdateHandler)}
            className="grid grid-flow-row gap-6 relative"
          >
            <FieldsBasicInfo />
            <FieldsAddressDetails />
          </form>
        </FormContext.Provider>
      </CardContent>
      <Divider />
      <CardActions className="flex justify-end">
        <FormActions />
      </CardActions>
    </Card>
  );
}

const FieldsBasicInfo = () => {
  const { register, errors } = useContext(FormContext);
  return (
    <div className="grid grid-flow-row gap-6">
      <Divider textAlign="left">
        <div className="flex items-center gap-3">
          <CardTitleIcon icon="icon-[solar--document-add-line-duotone]" />
          Basic Info
        </div>
      </Divider>
      <div className="grid grid-cols-2 gap-6">
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
          error={!!errors?.merchantName}
          helperText={
            errors?.merchantName?.message ?? "Enter your merchant name"
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
          error={!!errors?.merchantEmail}
          helperText={
            errors?.merchantEmail?.message ?? "Enter your email address"
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
        {/* ****** Branch Type ***** */}
        <TextField
          select
          label="Branch Type"
          defaultValue={1}
          id="field-merchant-branch-type"
          helperText="Choose the type of your branch"
          error={!!errors?.merchantBranchType}
          {...register("merchantBranchType")}
        >
          {branchTypes.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
        {/* ****** Status ***** */}
        <TextField
          select
          label="Status"
          defaultValue="active"
          id="field-merchant-status"
          helperText="Enable or disable your merchant account"
          error={!!errors?.merchantStatus}
          {...register("merchantStatus")}
        >
          {[
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ].map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </div>
  );
};

const FieldsAddressDetails = () => {
  const { register, control, errors } = useContext(FormContext);

  return (
    <div className="grid grid-flow-row gap-6">
      <Divider textAlign="left">
        <div className="flex items-center gap-3">
          <CardTitleIcon icon="icon-[solar--mailbox-line-duotone]" />
          Street Address
        </div>
      </Divider>
      <div className="grid grid-cols-2 gap-6">
        {/* ****** City ***** */}
        <TextField
          select
          label="City"
          defaultValue={1}
          id="field-merchant-city"
          helperText="Choose the city where the business is registered"
          error={!!errors?.merchantCity}
          {...register("merchantCity")}
        >
          {branchTypes.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
        {/* ****** Address ***** */}
        <TextField
          // multiline
          type="text"
          maxRows={4}
          label="Address*"
          variant="outlined"
          id="field-merchant-address"
          error={!!errors.merchantAddress}
          helperText={errors?.merchantAddress?.message ?? "Enter your address"}
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
        {/* ****** Area ***** */}
        <TextField
          select
          label="Area"
          defaultValue={3}
          id="field-merchant-area"
          helperText="Choose the area of your branch"
          error={!!errors?.merchantArea}
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
          defaultValue={2}
          id="field-merchant-city"
          helperText="Choose the city of your branch"
          error={!!errors.merchantCity}
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
          error={!!errors?.merchantPoBox}
          helperText={
            errors?.merchantPoBox?.message ?? "Enter your PO Box number"
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
        {/* ****** Country: Not needed for now, presently only UAE ***** */}
        {/* <TextField
          select
          label="Country"
          defaultValue="marketplace"
          id="field-merchant-country"
          helperText="Choose the country where the business is registered"
          error={!!errors?.merchantCountry?.message}
          {...register("merchantCountry")}
        >
          {branchTypes.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField> */}
        {/* ****** Area ***** */}
        <TextField
          select
          label="Area"
          defaultValue={3}
          id="field-merchant-area"
          helperText="Choose the area where the business is running"
          error={!!errors?.merchantarea}
          {...register("merchantArea")}
        >
          {branchTypes.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
        {/* ****** Mobile ***** */}
        <Controller
          name="merchantMobileNumber"
          control={control}
          rules={{
            required: "Please enter mobile number",
            validate: (value) =>
              matchIsValidTel(value, { onlyCountries: ["AE"] }),
          }}
          render={({
            field: { ref: fieldRef, value, ...fieldProps },
            fieldState,
          }) => (
            <MuiTelInput
              {...fieldProps}
              value={value ?? ""}
              inputRef={fieldRef}
              disableDropdown
              onlyCountries={["AE"]}
              defaultCountry="AE"
              helperText={fieldState.invalid ? "Mobile number is invalid" : ""}
              error={fieldState.invalid}
            />
          )}
        />
        {/* ****** Landline ***** */}
        <Controller
          name="merchantLandline"
          control={control}
          rules={{
            required: "Please enter landline number",
            validate: (value) =>
              matchIsValidTel(value, { onlyCountries: ["AE"] }),
          }}
          render={({
            field: { ref: fieldRef, value, ...fieldProps },
            fieldState,
          }) => (
            <MuiTelInput
              {...fieldProps}
              value={value ?? ""}
              inputRef={fieldRef}
              disableDropdown
              onlyCountries={["AE"]}
              defaultCountry="AE"
              helperText={fieldState.invalid ? "Landline is invalid" : ""}
              error={fieldState.invalid}
            />
          )}
        />
        {/* AREA PICKER TEST : TODO */}
        {/* https://mui.com/material-ui/react-autocomplete/#google-maps-place */}
      </div>
    </div>
  );
};

const FormActions = () => {
  const router = useRouter();
  return (
    <Fragment>
      <Button
        type="reset"
        size="large"
        onClick={() => {
          router.push("/profile");
        }}
      >
        Cancel
      </Button>
      <Button
        size="large"
        type="submit"
        variant="contained"
        form="merchant-details-form"
      >
        Save changes
      </Button>
    </Fragment>
  );
};
