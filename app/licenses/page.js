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
  tradeName,
  licenseNo,
  mainLicenseNo,
  issueNo,
  issuingDate,
  expiryDate,
  licenseType,
  countryIssued,
  cityIssued,
  status
) {
  return {
    tradeName,
    licenseNo,
    mainLicenseNo,
    issueNo,
    issuingDate,
    expiryDate,
    licenseType,
    countryIssued,
    cityIssued,
    status,
  };
}

export default function Page() {
  const router = useRouter();
  const rows = [...Array(5)].fill(
    createData(
      "ISO License",
      65478276,
      98765,
      23,
      new Date().toLocaleDateString(),
      new Date().toLocaleDateString(),
      "Commercial",
      "UAE",
      "Dubai",
      "Active"
    )
  );

  return (
    <section>
      <Card variant="outlined">
        <CardHeader
          title="Licenses"
          subheader="All the licenses you have added will be listed here"
          action={
            <Button
              onClick={() => {
                router.push("/licenses/add-new");
              }}
              startIcon={
                <span className="icon-[solar--add-circle-line-duotone]" />
              }
            >
              Add new license
            </Button>
          }
        />
        <CardContent>
          <TableContainer>
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Trade Name</TableCell>
                  <TableCell>License No.</TableCell>
                  <TableCell>Main License No.</TableCell>
                  <TableCell>Issue No.</TableCell>
                  <TableCell>Issuing Date</TableCell>
                  <TableCell>Expiry Date</TableCell>
                  <TableCell>License Type</TableCell>
                  <TableCell>Country Issued</TableCell>
                  <TableCell>City Issued</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>View License</TableCell>
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
                    <TableCell>{row.tradeName}</TableCell>
                    <TableCell>{row.licenseNo}</TableCell>
                    <TableCell>{row.mainLicenseNo}</TableCell>
                    <TableCell>{row.issueNo}</TableCell>
                    <TableCell>{row.issuingDate}</TableCell>
                    <TableCell>{row.expiryDate}</TableCell>
                    <TableCell>{row.licenseType}</TableCell>
                    <TableCell>{row.countryIssued}</TableCell>
                    <TableCell>{row.cityIssued}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        endIcon={<span className="icon-[solar--eye-broken]" />}
                      >
                        View
                      </Button>
                    </TableCell>
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
