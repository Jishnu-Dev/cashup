import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { LinearProgress } from "@mui/material";
import Link from "next/link";
import ResetPinForm from "@/components/forms/ResetPinForm";

export const metadata = {
  title: "Reset Passcode",
  description:
    "Restore access to your merchant account by reseting the passcode",
};

export default function Page() {
  return (
    <section className="h-full flex justify-center items-center bg-[url('/images/bg-circle-scatter.svg')] bg-cover bg-no-repeat">
      <div className="container">
        <Card className="w-full md:w-8/12 lg:w-5/12">
          {/* <LinearProgress /> */}
          <CardHeader
            title="Reset Pin"
            subheader="Restore access to your merchant account by reseting the pin"
          />
          <CardContent className="grid grid-flow-row gap-4">
            <ResetPinForm />
            <CardActions>
              <Link
                href="/login"
                className="w-max mx-auto text-sm text-black hover:text-primary"
              >
                Remember passcode? Login
              </Link>
            </CardActions>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
