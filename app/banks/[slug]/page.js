"use client";

import { Controller, useForm } from "react-hook-form";

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

/* THIS PAGE IS USED FOR BOTH ADDING A NEW BANK ACCOUNT
/* AND EDITING AN EXISTING BANK ACCOUNT BASED ON THE SLUG PROVIDED
/* If slug is 'add-new', then its adding a new bank, else editing an existing one */

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
        title={isAddingNewBank ? "Add new bank account" : "Edit bank account"}
        subheader="Add a new bank account to use for transactions"
      />
      <CardContent>
        <form
          id="form-bank-account-details"
          className="grid grid-cols-2 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit(addBankAccountHandler)}
        >
          {/* ****** Bank Name ***** */}
          <TextField
            id="field-bank-name"
            label="Bank Name*"
            variant="outlined"
            helperText={
              errors?.bankName?.message ?? "Enter the name of the bank"
            }
            error={!!errors.bankName}
            {...register("bankName", {
              required: `Please enter the bank's name`,
            })}
          />
          {/* ****** Branch Name ***** */}
          <TextField
            id="field-bank-account-branch"
            label="Account Branch*"
            error={!!errors.branchName}
            helperText={errors?.branchName?.message}
            variant="outlined"
            {...register("branchName", {
              required: `Please enter the branch's name`,
            })}
          />
          {/* ****** Account Name ***** */}
          <TextField
            id="field-bank-account-name"
            label="Account Name*"
            variant="outlined"
            defaultValue="Commercial"
            error={!!errors.accountName}
            helperText={
              errors?.accountName?.message ?? "Enter the name of the account"
            }
            {...register("accountName", {
              required: `Please enter the account's name`,
            })}
          />
          {/* ****** Account Number ***** */}
          <TextField
            id="field-bank-account-number"
            label="Account Number*"
            variant="outlined"
            error={!!errors.accountNumber}
            helperText={
              errors?.accountNumber?.message ?? "Enter the account number"
            }
            {...register("accountNumber", {
              required: `Please enter the account number`,
            })}
          />
          {/* ****** I Ban Number ***** */}
          <TextField
            id="field-bank-iban-number"
            label="I Ban Number*"
            variant="outlined"
            error={!!errors?.iBanNumber}
            helperText={
              errors?.iBanNumber?.message ?? "Enter the name of the account"
            }
            {...register("iBanNumber", {
              required: `Please enter the I Ban number`,
            })}
          />
          {/* ****** Swift Code ***** */}
          <TextField
            id="field-bank-swift-code"
            label="Swift Code*"
            variant="outlined"
            error={!!errors.swiftCode}
            helperText={errors?.swiftCode?.message}
            {...register("swiftCode", {
              required: `Please enter the swift code`,
            })}
          />
          {/* ****** Reg. Date ***** */}
          <Controller
            control={control}
            name="registrationDate"
            rules={{ required: "Please choose a registration date" }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="field-bank-reg-date"
                  label="Registration Date"
                  inputRef={field.ref}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                  disableFuture
                  slotProps={{
                    textField: {
                      helperText: errors?.registrationDate?.message,
                      error: !!errors?.registrationDate,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />
          {/* ****** Status ***** */}
          <TextField
            select
            label="Status"
            defaultValue="active"
            id="field-bank-status"
            helperText="Enable or disable your bank account"
            {...register("accountStatus")}
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
            router.push("/banks");
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="form-bank-account-details"
          variant="contained"
        >
          Add Bank
        </Button>
      </CardActions>
    </Card>
  );
}
