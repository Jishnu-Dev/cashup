"use client";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/navigation";

function createData(name, designation, country, city, mobile, email, status) {
  return {
    name,
    designation,
    country,
    city,
    mobile,
    email,
    status,
  };
}

export default function Page() {
  const router = useRouter();
  const rows = [...Array(5)].fill(
    createData(
      "Jishnu Raj",
      "Software Developer",
      "UAE",
      "Dubai",
      "+971 584098765",
      "jishnu@gn.com",
      "Active"
    )
  );

  return (
    <section>
      <Card variant="outlined">
        <CardHeader
          title="Contacts"
          subheader="All the contacts you have added will be listed here"
          action={
            <Button
              onClick={() => {
                router.push("/contacts/add-new");
              }}
              startIcon={
                <span className="icon-[solar--add-circle-line-duotone]" />
              }
            >
              Add new contact
            </Button>
          }
        />
        <CardContent>
          <TableContainer>
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.designation}</TableCell>
                    <TableCell>{row.country}</TableCell>
                    <TableCell>{row.city}</TableCell>
                    <TableCell>{row.mobile}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <Chip
                        // variant="outlined"
                        label={i % 2 === 0 ? "Active" : "Inactive"}
                        color={i % 2 === 0 ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        aria-describedby="edit bank account"
                        onClick={() => router.push(`/banks/${row.name}`)}
                      >
                        <span className="icon-[solar--pen-2-line-duotone] text-2xl" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton color="error">
                        <span className="icon-[solar--trash-bin-2-broken] text-2xl" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </section>
  );
}
