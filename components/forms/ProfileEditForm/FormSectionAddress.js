import { apiGetAreasByCity, apiGetCitiesByCountry } from "@/api";
import { useContext, useEffect, useState } from "react";

import CardTitleIcon from "@/components/ui/CardTitleIcon";
import { Controller } from "react-hook-form";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { ProfileEditFormContext } from "@/components/forms/ProfileEditForm";
import { Skeleton } from "@mui/material";
import TextField from "@mui/material/TextField";
import { countryId } from "@/lib/constants";
import { toast } from "react-toastify";

const inputLabelProps = { shrink: true }; // Refer: https://github.com/react-hook-form/react-hook-form/issues/2192

export default function FormSectionAddress() {
  const { merchantData, fieldNames, register, reset, errors } = useContext(
    ProfileEditFormContext
  );

  // useEffect(() => {
  //   function setDefaultValues() {
  //     reset({
  //       [fieldNames.address]: merchantData?.addrress,
  //     });
  //   }
  //   if (merchantData) setDefaultValues();
  // }, [merchantData]);

  return (
    <div className="grid grid-flow-row gap-6">
      <Divider textAlign="left">
        <div className="flex items-center gap-3">
          <CardTitleIcon icon="icon-[solar--mailbox-line-duotone]" />
          Street Address
        </div>
      </Divider>
      <div className="grid grid-cols-2 gap-6">
        {/* ****** Address ***** */}
        <TextField
          multiline
          rows={2}
          type="text"
          label="Address"
          variant="outlined"
          id={`field-${fieldNames.address}`}
          error={!!errors?.[fieldNames.address]}
          helperText={errors?.[fieldNames.address]?.message}
          defaultValue={merchantData?.address}
          InputLabelProps={inputLabelProps}
          {...register(fieldNames.address, {
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

        {/* ****** City ***** */}
        <FieldMerchantCity />
        {/* ****** Area ***** */}
        <FieldMerchantArea />

        {/* ****** PO Box ***** */}
        <TextField
          type="text"
          label="PO Box*"
          variant="outlined"
          id={`field-${fieldNames.poBox}`}
          defaultValue={merchantData?.pobox}
          error={!!errors?.[fieldNames.poBox]}
          helperText={errors?.[fieldNames.poBox]?.message}
          InputLabelProps={inputLabelProps}
          {...register(fieldNames.poBox, {
            required: "Please enter your PO Box number number",
            maxLength: {
              value: 20,
              message: "Maximum 20 characters allowed",
            },
            minLength: {
              value: 3,
              message: "Enter atleast 3 characters",
            },
          })}
        />
        {/* TODO: AREA PICKER FROM GOOGLE MAPS */}
        {/* https://mui.com/material-ui/react-autocomplete/#google-maps-place */}
      </div>
    </div>
  );
}

const FieldMerchantCity = () => {
  const { merchantData, control, fieldNames, errors } = useContext(
    ProfileEditFormContext
  );

  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const { data } = await apiGetCitiesByCountry(countryId);
        setCities(data);
      } catch (e) {
        console.dir(e);
        toast.error(e?.response?.data?.message ?? e?.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  if (isLoading || !cities?.length) return <FieldSkeleton />;
  return (
    <Controller
      name={fieldNames.city}
      control={control}
      defaultValue={merchantData?.city_id ?? ""}
      rules={{ required: "Please choose your city" }}
      render={({ field }) => (
        <TextField
          {...field}
          select
          label="City"
          helperText="Choose the type of your city"
          error={!!errors?.[fieldNames.city]}
        >
          {cities.map(({ city_id, city_name }) => (
            <MenuItem key={city_id} value={city_id}>
              {city_name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

// TODO
const FieldMerchantArea = () => {
  const { merchantData, control, fieldNames, watch, errors } = useContext(
    ProfileEditFormContext
  );

  const cityId = watch(fieldNames.city); // Watching city field

  const [isLoading, setIsLoading] = useState(false);
  const [areas, setAreas] = useState([]);
  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const { data } = await apiGetAreasByCity(cityId);
        console.log("data:", data);
        setAreas(data);
      } catch (e) {
        console.dir(e);
        toast.error(e?.response?.data?.message ?? e?.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (cityId) fetchCities();
  }, [cityId]);

  if (isLoading) return <FieldSkeleton />;
  return (
    <Controller
      name={fieldNames.area}
      control={control}
      defaultValue={merchantData?.area_id ?? ""}
      rules={{ required: "Please choose your area" }}
      render={({ field }) => (
        <TextField
          {...field}
          select
          label="Branch Type"
          helperText="Choose the type of your branch"
          error={!!errors?.[fieldNames.area]}
        >
          {areas.map(({ area_id, area_name }) => (
            <MenuItem key={area_id} value={area_id}>
              {area_name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

const FieldSkeleton = () => (
  <Skeleton variant="rounded" height={56} animation="wave" />
);
