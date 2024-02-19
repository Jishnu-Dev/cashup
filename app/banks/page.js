"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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
              Add new bank
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
                        label={i % 2 === 0 ? "Active" : "Inactive"}
                        color={i % 2 === 0 ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        aria-describedby="edit bank account"
                        onClick={() => router.push(`/banks/${row.name}`)}
                      >
                        <span className="icon-[solar--pen-2-line-duotone] text-2xl" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button color="error">
                        <span className="icon-[solar--trash-bin-2-broken] text-2xl" />
                      </Button>
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
