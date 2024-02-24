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

function createData(
  name,
  branchName,
  accountNum,
  accountName,
  iBanNum,
  swiftCode,
  regDate,
  status
) {
  return {
    name,
    branchName,
    accountNum,
    accountName,
    iBanNum,
    swiftCode,
    regDate,
    status,
  };
}

export default function Page() {
  const router = useRouter();
  const rows = [...Array(10)].fill(
    createData(
      "ADCB",
      "Dubai",
      89547895213665,
      "Commercial Acc",
      587965,
      "#KIYHG5874",
      new Date().toLocaleDateString(),
      "Active"
    )
  );

  return (
    <section>
      <Card variant="outlined">
        <CardHeader
          title="Bank Accounts"
          subheader="All the banks you have added will be listed here"
          action={
            <Button
              onClick={() => {
                router.push("/banks/add-new");
              }}
              startIcon={
                <span className="icon-[solar--add-circle-line-duotone]" />
              }
            >
              Add new account
            </Button>
          }
        />
        <CardContent>
          <TableContainer>
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Bank</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>Account</TableCell>
                  <TableCell>Account No.</TableCell>
                  <TableCell>IBan No.</TableCell>
                  <TableCell>Swift Code</TableCell>
                  <TableCell>Reg. Date</TableCell>
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
                    <TableCell>{row.branchName}</TableCell>
                    <TableCell>{row.accountName}</TableCell>
                    <TableCell>{row.accountNum}</TableCell>
                    <TableCell>{row.iBanNum}</TableCell>
                    <TableCell>{row.swiftCode}</TableCell>
                    <TableCell>{row.regDate}</TableCell>
                    <TableCell>
                      <Chip
                        variant="outlined"
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
