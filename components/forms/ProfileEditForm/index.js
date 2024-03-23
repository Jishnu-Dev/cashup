"use client";

import { Fragment, createContext, useContext, useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardTitleIcon from "@/components/ui/CardTitleIcon";
import FormSectionAddress from "@/components/forms/ProfileEditForm/FormSectionAddress";
import FormSectionBasic from "@/components/forms/ProfileEditForm/FormSectionBasic";
import LoadingBackdrop from "@/components/ui/loaders/LoadingBackdrop";
import { apiUpdateMerchantDetails } from "@/api";
import { countryId } from "@/lib/constants";
import { toast } from "react-toastify";
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

  // console.log("merchantData:", merchantData);

  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  async function onSubmit(formData) {
    try {
      setIsUpdatingProfile(true);

      console.log("formData:", formData[fieldNames?.landline]);

      const merchant = {
        in_merchant_id: merchantData?.merchant_id,
        in_merchant_name: formData[fieldNames.merchantName],
        in_industry_id: formData[fieldNames.industry],
        in_address: formData[fieldNames.address],
        in_city_id: formData[fieldNames.city],
        in_area_id: formData[fieldNames.area],
        in_pobox: formData[fieldNames.poBox],
        in_branch_type_id: formData[fieldNames.branchType],
        in_tel_no: formData[fieldNames.landline]?.substring(3), // Removed '+' before sending
        in_country_id: countryId,
        in_tel_country_code_id: countryId,
        in_coordinate: null,
        in_login_type: 1,
      };
      console.log("merchant:", merchant);
      const resp = await apiUpdateMerchantDetails(merchant);
      console.log("resp:", resp);
      toast.success(resp?.message);
    } catch (e) {
      console.dir(e?.response);
      toast.error(e?.response?.data?.message ?? e?.message);
    } finally {
      setIsUpdatingProfile(false);
    }
  }

  return (
    <Fragment>
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
                isUpdatingProfile,
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
      <LoadingBackdrop
        isOpen={isUpdatingProfile}
        message="Updating profile..."
      />
    </Fragment>
  );
}

const FormActions = () => {
  const router = useRouter();
  const { isUpdatingProfile } = useContext(ProfileEditFormContext);
  return (
    <CardActions className="flex justify-end">
      <Button
        type="reset"
        size="large"
        onClick={() => {
          router.push("/profile");
        }}
        disabled={isUpdatingProfile}
      >
        Cancel
      </Button>
      <Button
        size="large"
        type="submit"
        variant="contained"
        form="merchant-details-form"
        disabled={isUpdatingProfile}
      >
        Save changes
      </Button>
    </CardActions>
  );
};
