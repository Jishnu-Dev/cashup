import Grow from "@mui/material/Grow";
import Image from "next/image";

const CashupLogo = () => (
  <Grow in>
    <Image
      priority
      width={200}
      height={200}
      // style={{ width: "auto", height: "auto" }}
      alt="Cashup logo"
      src="/images/cashup-logo-colored.png"
    />
  </Grow>
);

export default CashupLogo;
