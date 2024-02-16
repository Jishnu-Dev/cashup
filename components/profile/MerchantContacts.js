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

function createData(name, designation, country, city, mobile, email, status) {
  return { name, designation, country, city, mobile, email, status };
}

const rows = [
  createData(
    "Jishnu Raj",
    "Software Developer",
    "India",
    "Trivandrum",
    "7025585885",
    "jishnu@gh.com",
    "Active"
  ),
  createData(
    "Halian Roye",
    "Business Analyst",
    "UAE",
    "Dubai",
    "0584909873",
    "halian@gh.com",
    "Active"
  ),
];

export default function MerchantContacts() {
  const router = useRouter();
  return (
    <Card title="Contacts" lead="View or update your contacts">
      <span className="h-full flex flex-col justify-between gap-3">
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.designation}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>{row.mobile}</TableCell>
                  <TableCell>{row.email}</TableCell>
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
