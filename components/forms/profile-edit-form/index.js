"use client";

import { createContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardTitleIcon from "@/components/ui/CardTitleIcon";
import FormSectionAddress from "@/components/forms/profile-edit-form/FormSectionAddress";
import FormSectionBasic from "@/components/forms/profile-edit-form/FormSectionBasic";
import { useForm } from "react-hook-form";
import { useMerchantStore } from "@/store/merchant-store-provider";
import { useRouter } from "@/navigation";
import { useStore } from "@/store/use-store";

export const ProfileEditFormContext = createContext();

const fieldNames = {
  merchantCode: "merchantCode",
  merchantName: "merchantName",
  branchType: "merchantBranchType",
  industry: "merchantIndustry",
  email: "merchantEmail",
  merchantMobile: "merchantMobile",
  landline: "merchantLandline",
  city: "merchantCity",
  address: "merchantAddress",
  area: "merchantArea",
  poBox: "merchantPOBox",
  businessType: "merchantBusinessType",
  mobile: "merchantMobileNumber",
};

export default function ProfileEditForm() {
  const {
    reset,
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const merchantData = useStore(
    useMerchantStore,
    (state) => state.merchantData
  );

  async function onSubmit(formData) {
    const { merchantLandline, merchantBranchType } = formData;
    // console.log("NAME,", merchantMobileNumber);
    console.log("formData:", formData);
  }

  return (
    <Card variant="outlined">
      <CardHeader
        title="Update your merchant details"
        subheader="Marked * fields are required fields"
        avatar={
          <CardTitleIcon icon="icon-[solar--user-check-rounded-line-duotone]" />
        }
      />
      <CardContent>
        <div>
          <ProfileEditFormContext.Provider
            value={{
              reset,
              errors,
              register,
              control,
              fieldNames,
              merchantData,
              handleSubmit,
              setValue,
              watch,
            }}
          >
            <form
              id="merchant-details-form"
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-flow-row gap-6 relative"
            >
              <FormSectionBasic />
              <FormSectionAddress />
              <FormActions />
            </form>
          </ProfileEditFormContext.Provider>
        </div>
      </CardContent>
    </Card>
  );
}

const FormActions = () => {
  const router = useRouter();
  return (
    <CardActions className="flex justify-end">
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
    </CardActions>
  );
};
