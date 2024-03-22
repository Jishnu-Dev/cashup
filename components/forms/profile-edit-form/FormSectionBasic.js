import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { apiGetBranchTypes, apiGetIndustryTypes } from "@/api";
import { useContext, useEffect, useState } from "react";

import CardTitleIcon from "@/components/ui/CardTitleIcon";
import { Controller } from "react-hook-form";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { ProfileEditFormContext } from "@/components/forms/profile-edit-form";
import { Skeleton } from "@mui/material";
import TextField from "@mui/material/TextField";

const inputLabelProps = { shrink: true }; // Refer: https://github.com/react-hook-form/react-hook-form/issues/2192

export default function FormSectionBasic() {
  const { fieldNames, merchantData, register, control, errors, reset } =
    useContext(ProfileEditFormContext);

  // useEffect(() => {
  //   function setFormDefaultValues(data) {
  //     reset({
  //       [fieldNames.merchantCode]: data?.merchant_code,
  //       [fieldNames.merchantName]: data?.merchant_name,
  //       [fieldNames.email]: data?.email_address,
  //     });
  //   }
  //   if (merchantData) setFormDefaultValues(merchantData);
  // }, [merchantData]);

  useEffect(() => {
    reset({
      [fieldNames.mobile]: merchantData?.mobile_no,
    });
  }, [merchantData]);

  console.log("merchantData:", merchantData);

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
          {...register(fieldNames.merchantCode)}
          disabled
          variant="outlined"
          label="Merchant Code"
          defaultValue={merchantData?.merchant_code}
          InputLabelProps={inputLabelProps}
          id={`field-${fieldNames.merchantCode}`}
          helperText="Merchant code cannot be changed"
        />

        {/* ****** Merchant Name ***** */}
        <TextField
          type="text"
          variant="outlined"
          label="Merchant Name*"
          defaultValue={merchantData?.merchant_name}
          id={`field-${fieldNames.merchantName}`}
          error={!!errors?.[fieldNames.merchantName]}
          InputLabelProps={inputLabelProps}
          helperText={
            errors?.[fieldNames.merchantName]?.message ??
            "Enter your merchant name"
          }
          {...register(fieldNames.merchantName, {
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

        {/* ****** Branch Type ***** */}
        <FieldBranchType />
        {/* ****** Industry ***** */}
        <FieldIndustry />

        {/* ****** Email ***** */}
        <TextField
          type="text"
          variant="outlined"
          label="Email Address*"
          id={`field-${fieldNames.email}`}
          InputLabelProps={inputLabelProps}
          defaultValue={merchantData?.email_address}
          error={!!errors?.[fieldNames.email]}
          helperText={
            errors?.[fieldNames.email]?.message ?? "Enter your email address"
          }
          {...register(fieldNames.email, {
            required: "Please enter your email address",
            maxLength: {
              value: 50,
              message: "Maximum 50 characters allowed",
            },
            minLength: {
              value: 3,
              message: "Minimum 3 characters",
            },
          })}
        />

        {/* ****** Mobile ***** */}
        {/* <Controller
          name="phoneNumber"
          control={control}
          defaultValue="+971"
          render={({ field: { onChange, value } }) => (
            <MuiTelInput
              value={value}
              onChange={onChange}
              label="Mobile Number"
              defaultCountry="AE"
              onlyCountries={["AE"]}
            />
          )}
        /> */}
        <Controller
          control={control}
          name={fieldNames.mobile}
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
              disableDropdown
              value={value}
              inputRef={fieldRef}
              label="Mobile Number"
              onlyCountries={["AE"]}
              defaultCountry="AE"
              helperText={fieldState.invalid ? "Mobile number is invalid" : ""}
              error={fieldState.invalid}
            />
          )}
        />

        {/* ****** Landline ***** */}
        <Controller
          control={control}
          name={fieldNames.landline}
          defaultValue={merchantData?.tel_no}
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
              disableDropdown
              // value={value}
              inputRef={fieldRef}
              label="Landline Number"
              onlyCountries={["AE"]}
              defaultCountry="AE"
              helperText={fieldState.invalid ? "Landline is invalid" : ""}
              error={fieldState.invalid}
            />
          )}
        />
      </div>
    </div>
  );
}

const FieldBranchType = () => {
  const { merchantData, control, fieldNames, errors } = useContext(
    ProfileEditFormContext
  );

  const [isLoading, setIsLoading] = useState(false);
  const [branchTypes, setBranchTypes] = useState([]);
  useEffect(() => {
    async function fetchBranchTypes() {
      try {
        setIsLoading(true);
        const { data } = await apiGetBranchTypes();
        setBranchTypes(data);
      } catch (e) {
        console.dir(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBranchTypes();
  }, []);

  if (isLoading || !branchTypes.length)
    return <Skeleton variant="rounded" height={56} animation="wave" />;
  return (
    <Controller
      name={fieldNames.branchType}
      control={control}
      defaultValue={merchantData?.branch_type_id ?? ""}
      rules={{ required: "Please choose your branch type" }}
      render={({ field }) => (
        <TextField
          {...field}
          select
          variant="outlined"
          label="Branch Type"
          helperText="Choose the type of your branch"
          error={!!errors?.[fieldNames.branchType]}
        >
          {branchTypes.map(({ branch_type_id, branch_type }) => (
            <MenuItem key={branch_type_id} value={branch_type_id}>
              {branch_type}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

const FieldIndustry = () => {
  const { merchantData, control, fieldNames, errors } = useContext(
    ProfileEditFormContext
  );

  const [isLoading, setIsLoading] = useState(false);
  const [industries, setIndustries] = useState([]);
  useEffect(() => {
    async function fetchIndustries() {
      try {
        setIsLoading(true);
        const { data } = await apiGetIndustryTypes();
        setIndustries(data);
      } catch (e) {
        console.dir(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchIndustries();
  }, []);

  if (isLoading || !industries.length)
    return <Skeleton variant="rounded" height={56} animation="wave" />;
  return (
    <Controller
      name={fieldNames.industry}
      control={control}
      defaultValue={merchantData?.industry_id ?? ""}
      rules={{ required: "Please choose your branch type" }}
      render={({ field }) => (
        <TextField
          {...field}
          select
          variant="outlined"
          label="Industry Type"
          helperText="Choose the industry your business belongs to"
          error={!!errors?.[fieldNames.industry]}
        >
          {industries.map(({ industry_id, industry_name }) => (
            <MenuItem key={industry_id} value={industry_id}>
              {industry_name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};
