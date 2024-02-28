"use client";

import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardTitleIcon from "@/components/ui/CardTitleIcon";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { apiGetMerchantBanks } from "@/api/api";
import { merchantId } from "@/lib/authenticator";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function createData(name, accountNum) {
  return { name, accountNum };
}

const rows = [
  createData("ADCB", 15960),
  createData("Emirates NBD", 2379037),
  createData("ADCB", 15960),
  createData("Emirates NBD", 2379037),
];

export default function MerchantBanks() {
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await apiGetMerchantBanks(merchantId);
        console.log("BANKS:", resp.data);
      } catch (e) {
        toast.error(e?.response?.data?.message ?? e?.message);
        console.dir(e);
      }
    }
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader
        title="Bank Accounts"
        subheader="View or update your bank accounts"
        avatar={<CardTitleIcon icon="icon-[solar--buildings-2-line-duotone]" />}
        action={
          <Button
            disableElevation
            onClick={() => {
              router.push("/banks");
            }}
            startIcon={<span className="icon-[solar--eye-line-duotone]" />}
          >
            View complete list
          </Button>
        }
      />
      <CardContent>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Bank Name</TableCell>
                <TableCell>Account No.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.accountNum}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
