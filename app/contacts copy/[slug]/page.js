"use client";

import { Controller, useForm } from "react-hook-form";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Divider from "@mui/material/Divider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";

/* THIS PAGE IS USED FOR BOTH ADDING A NEW CONTACT
/* AND EDITING AN EXISTING CONTACT BASED ON THE SLUG PROVIDED
/* If slug is 'add-new', then its adding a new contact, else editing an existing one */

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
  const isAddingNewBank = slug === "add-new";
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: {
      bankName: isAddingNewBank ? null : slug,
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
        title={isAddingNewBank ? "Add new contact" : "Edit bank account"}
        subheader="Add a new contact to your contacts list"
      />
      <CardContent>
        <form
          id="form-bank-account-details"
          className="grid grid-cols-2 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit(addBankAccountHandler)}
        >
          {/* ****** Contact Name ***** */}
          <TextField
            id="field-contact-name"
            label="Contact Name*"
            variant="outlined"
            helperText={
              errors?.contactName?.message ?? "Enter the name of the contact"
            }
            error={!!errors.contactName}
            {...register("contactName", {
              required: `Please enter the contact's name`,
            })}
          />
          {/* ****** Designation ***** */}
          <TextField
            id="field-contact-designation"
            label="Designation*"
            error={!!errors.designation}
            helperText={errors?.designation?.message}
            variant="outlined"
            {...register("designation", {
              required: `Please enter the designation name`,
            })}
          />
          {/* ****** Country */}
          <TextField
            select
            label="Country"
            defaultValue="marketplace"
            id="field-contact-country"
            helperText="Choose the country of the contact"
            error={!!errors?.contactCountry?.message}
            {...register("contactCountry")}
          >
            {branchTypes.map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          {/* ****** City */}
          <TextField
            select
            label="City"
            defaultValue="marketplace"
            id="field-contact-city"
            helperText="Choose the city of the contact"
            error={!!errors?.contactCity?.message}
            {...register("contactCity")}
          >
            {branchTypes.map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          {/* ****** Email ***** */}
          <TextField
            id="field-contact-email"
            label="Contact Email*"
            variant="outlined"
            helperText={
              errors?.contactEmail?.message ??
              "Enter the the email of the contact"
            }
            error={!!errors.contactEmail}
            {...register("contactEmail", {
              required: `Please enter the contact's email`,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {/* ****** Mobile ***** */}
          <Controller
            name="contactMobileNumber"
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
                helperText={
                  fieldState.invalid ? "Mobile number is invalid" : ""
                }
                error={fieldState.invalid}
              />
            )}
          />
          {/* ****** Status ***** */}
          <TextField
            select
            label="Status"
            defaultValue="active"
            id="field-contact-status"
            helperText="Enable or disable your contact"
            {...register("contactStatus")}
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
            router.push("/contacts");
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
