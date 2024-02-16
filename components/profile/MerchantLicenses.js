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

function createData(name, number, issuingDate, status) {
  return { name, number, issuingDate, status };
}

const rows = [
  createData(
    "Trading license",
    "HYTFSR5643",
    new Date().toLocaleDateString(),
    "Active"
  ),
  createData(
    "VAT license",
    "HKTFSR5643",
    new Date().toLocaleDateString(),
    "Active"
  ),
  createData(
    "VAT license",
    "HKTFSR5643",
    new Date().toLocaleDateString(),
    "Active"
  ),
];

export default function MerchantLicenses() {
  const router = useRouter();
  return (
    <Card title="Merchant Licenses" lead="View or update your licenses">
      <span className="h-full flex flex-col justify-between gap-3">
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Trade Name</TableCell>
                <TableCell>License No.</TableCell>
                <TableCell>Issue Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.number}</TableCell>
                  <TableCell>{row.issuingDate}</TableCell>
                  <TableCell>{row.status}</TableCell>
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
            router.push("/merchant/contacts");
          }}
          startIcon={<span className="icon-[solar--eye-line-duotone]" />}
        >
          View full list
        </Button>
      </span>
    </Card>
  );
}
