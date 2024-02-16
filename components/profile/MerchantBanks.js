"use client";

import { Button } from "@mui/material";
import Card from "@/components/ui/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
  return (
    <Card title="Bank Accounts" lead="View or update your bank accounts">
      <span className="flex flex-col h-full justify-between gap-3">
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
        <Button
          disableElevation
          className="w-max"
          variant="outlined"
          onClick={() => {
            router.push("/merchant/banks");
          }}
          startIcon={<span className="icon-[solar--eye-line-duotone]" />}
        >
          View full list
        </Button>
      </span>
    </Card>
  );
}
