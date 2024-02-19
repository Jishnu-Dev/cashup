"use client";

import { Controller, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";

/* THIS PAGE IS USED FOR BOTH ADDING A NEW LICESNE
/* AND EDITING AN EXISTING LICENSE BASED ON THE SLUG PROVIDED
/* If slug is 'add-new', then its adding a new license, else editing an existing one */

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

export default function Page({ params }) {
  const { slug } = params;
  const router = useRouter();
  const isAddingNewLicense = slug === "add-new";
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: {
      bankName: isAddingNewLicense ? null : slug,
    },
  });

  const addBankAccountHandler = async (formData) => {
    try {
      const { bankName, accountName, registrationDate } = formData;
      console.log("LOGG", bankName, accountName, registrationDate);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card variant="outlined">
      <CardHeader
        title={isAddingNewLicense ? "Add new license" : "Edit license"}
        subheader={
          isAddingNewLicense
            ? "Add a new license to your contacts list"
            : "Update this existing license"
        }
      />
      <CardContent>
        <form
          id="form-bank-account-details"
          className="grid grid-cols-2 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit(addBankAccountHandler)}
        >
          {/* ****** Trade Name ***** */}
          <TextField
            id="field-trade-name"
            label="Trade Name*"
            variant="outlined"
            helperText={
              errors?.tradeName?.message ??
              "Enter the trade name of the license"
            }
            error={!!errors.tradeName}
            {...register("tradeName", {
              required: `This field is required`,
            })}
          />
          {/* ****** License Number ***** */}
          <TextField
            id="field-license-number"
            label="License Number*"
            error={!!errors.licenseNumber}
            helperText={errors?.licenseNumber?.message}
            variant="outlined"
            {...register("licenseNumber", {
              required: `This field is required`,
            })}
          />
          {/* ****** Main  License Number ***** */}
          <TextField
            id="field-main-license-number"
            label="Main License Number*"
            error={!!errors.mainLicenseNumber}
            helperText={errors?.mainLicenseNumber?.message}
            variant="outlined"
            {...register("mainLicenseNumber", {
              required: `This field is required`,
            })}
          />
          {/* ****** Issuing Date ***** */}
          <Controller
            control={control}
            name="licenseIssuingDate"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="field-license-issue-date"
                  label="Issuing Date"
                  inputRef={field.ref}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                  disableFuture
                  slotProps={{
                    textField: {
                      helperText: errors?.licenseIssuingDate?.message,
                      error: !!errors?.licenseIssuingDate,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />
          {/* ****** Expiry Date ***** */}
          <Controller
            control={control}
            name="licenseExpiryDate"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="field-license-expiry-date"
                  label="Issuing Date"
                  inputRef={field.ref}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                  disableFuture
                  slotProps={{
                    textField: {
                      helperText: errors?.licenseExpiryDate?.message,
                      error: !!errors?.licenseExpiryDate,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />
          {/* ****** Mobile ***** */}
          <Controller
            name="contactMobileNumber"
            control={control}
            rules={{
              required: "This field is required",
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
                helperText={
                  fieldState.invalid ? "Mobile number is invalid" : ""
                }
                error={fieldState.invalid}
              />
            )}
          />
          {/* ****** License Type ***** */}
          <TextField
            select
            label="License Type"
            defaultValue="trade"
            id="field-license-type"
            helperText="Choose the type of the license"
            {...register("licenseStatus")}
          >
            {[
              { label: "Trade", value: "trade" },
              { label: "Commercial", value: "commercial" },
            ].map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          {/* ****** Country Issued ***** */}
          <TextField
            select
            label="Country Issued"
            defaultValue="uae"
            id="field-license-issuing-country"
            helperText="Choose the type of the license"
            {...register("licenseIssuingCountry")}
          >
            {[
              { label: "UAE", value: "uae" },
              { label: "Oman", value: "oman" },
            ].map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          {/* ****** City Issued ***** */}
          <TextField
            select
            label="City Issued"
            defaultValue="dubai"
            id="field-license-issuing-city"
            helperText="Choose the type of the license"
            {...register("licenseIssuingCity")}
          >
            {[{ label: "Dubai", value: "dubai" }].map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          {/* ****** Status ***** */}
          <TextField
            select
            label="License Status"
            defaultValue="active"
            id="field-license-status"
            helperText="Choose the status of the license"
            {...register("licenseStatus")}
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
        </form>
      </CardContent>
      <Divider />
      <CardActions className="flex justify-end">
        <Button
          type="reset"
          onClick={() => {
            router.push("/licenses");
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="form-bank-account-details"
          variant="contained"
        >
          Save Contact
        </Button>
      </CardActions>
    </Card>
  );
}
