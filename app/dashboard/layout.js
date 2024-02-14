import Alert from "@mui/material/Alert";
import AsideMenu from "@/components/layout/AsideMenu";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import Checkbox from "@mui/material/Checkbox";
import Navbar from "@/components/layout/Navbar";
import SampleTable from "@/components/SampleTable";

export default function DashboardLayout({children}) {
  return (
    <section className="max-h-screen h-screen w-full overflow-hidden flex bg-white">
      <AsideMenu />
      <section className="flex flex-col flex-grow h-full rounded-l rounded-xl relative">
        <Navbar />
        <div className="px-10 py-6 flex flex-col gap-4 overflow-scroll pt-28">
          {children}
          {/* <div className="flex gap-4">
            <Button variant="contained" disableElevation>
              Button Primary
            </Button>
            <Button variant="outlined" disableElevation>
              Button Secondary
            </Button>
            <Button color="success" variant="outlined" disableElevation>
              Button Success
            </Button>
            <Checkbox defaultChecked />
          </div>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Here is a gentle confirmation that your action was successful.
          </Alert>
          <SampleTable /> */}
        </div>
      </section>
    </section>
  );
}

