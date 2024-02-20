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
import { useRouter } from "next/navigation";

function createData(name, mobile, email, status) {
  return { name, mobile, email, status };
}

const rows = [
  createData("Jishnu Raj", "7025585885", "jishnu@gh.com", "Active"),
  createData("Halian Roye", "0584909873", "halian@gh.com", "Active"),
  createData("Halian Roye", "0584909873", "halian@gh.com", "Active"),
  createData("Halian Roye", "0584909873", "halian@gh.com", "Active"),
];

export default function MerchantContacts() {
  const router = useRouter();
  return (
    <Card>
      <CardHeader
        title="Contacts"
        subheader="View or update your contacts"
        action={
          <Button
            disableElevation
            onClick={() => {
              router.push("/contacts");
            }}
            startIcon={<span className="icon-[solar--eye-line-duotone]" />}
          >
            View complete list
          </Button>
        }
        avatar={<CardTitleIcon icon="icon-[solar--user-id-line-duotone]" />}
      />
      <CardContent>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
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
                  <TableCell>{row.mobile}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
