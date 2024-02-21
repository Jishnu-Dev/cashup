"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardTitleIcon from "@/components/ui/CardTitleIcon";
import { Chip } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import cn from "classnames";
import { useRouter } from "next/navigation";

export default function ProfileVerifications() {
  const router = useRouter();
  const stepsToVerify = [
    {
      label: "Verify your mobile number",
      isVerified: false,
      path: "/verify/mobile",
    },
    {
      label: "Verify your email address",
      isVerified: true,
      path: "/verify/email",
    },
    {
      label: "Verify your bank details",
      isVerified: false,
      path: "/verify/bank",
    },
  ];

  return (
    <Card>
      <CardHeader
        title="Complete your profile"
        subheader="Complete the following steps to finish setting up your profile"
        avatar={
          <CardTitleIcon icon="icon-[solar--verified-check-bold-duotone]" />
        }
      />
      <CardContent className="grid grid-flow-row gap-4">
        <ProfileCompletionProgressBar />
        {stepsToVerify.map(({ label, isVerified, path }) => (
          <button
            onClick={() => {
              router.push(path);
            }}
            key={path}
            className="w-full rounded-xl border flex justify-between hover:bg-primary/5 items-center p-3"
          >
            <div className="flex items-center gap-3">
              <span
                className={cn({
                  "text-2xl": true,
                  "icon-[solar--check-circle-bold] text-primary": isVerified,
                  "icon-[solar--check-circle-line-duotone]": !isVerified,
                })}
              />
              <p>{label}</p>
              <Chip
                variant="outlined"
                label={isVerified ? "Complete" : "Incomplete"}
                color={isVerified ? "success" : "error"}
              />
            </div>
            <span
              className={cn({
                "text-2xl": true,
                "icon-[solar--arrow-right-line-duotone]": !isVerified,
                "icon-[solar--check-read-broken] text-primary": isVerified,
              })}
            />
          </button>
        ))}
      </CardContent>
    </Card>
  );
}

const ProfileCompletionProgressBar = () => {
  return (
    <div className="flex items-center gap-2">
      <h6 className="font-medium">50% Completed</h6>
      <div className="flex-grow">
        <LinearProgress variant="determinate" value={50} color="warning" />
      </div>
    </div>
  );
};
