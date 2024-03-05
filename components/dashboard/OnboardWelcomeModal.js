"use client";

import { forwardRef, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "next/image";
import Slide from "@mui/material/Slide";
import party from "party-js";
import { useSearchParams } from "next/navigation";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OnboardWelcomeModal() {
  const searchParams = useSearchParams();
  const welcome = searchParams.get("welcome");
  const [isOpen, setIsOpen] = useState(Boolean(welcome));
  const handleClose = () => setIsOpen(false);

  // Party Confetti
  useEffect(() => {
    if (!welcome) return;
    const dashboardRoot = document.getElementById("dashboard-root");
    if (document && dashboardRoot)
      party.confetti(dashboardRoot, {
        count: party.variation.range(0, 200),
        size: party.variation.range(0.6, 1.5),
      });
  }, []);

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-labelledby="alert-dialog-welcome-title"
      aria-describedby="alert-dialog--welcome-description"
    >
      <DialogTitle id="alert-dialog-title">
        Welcome to Cashup Merchant Dashboard
      </DialogTitle>
      <DialogContent>
        <Image
          width={300}
          height={300}
          alt="Cashup"
          className="mx-auto"
          src="/images/illust/money-transfer-flatline.svg"
        />
        <DialogContentText id="alert-dialog-description">
          Use this dashboard to handle everything related your merchant account
          like bank accounts, licenses, contacts and much more. Moreover, you
          can find various reports in the dashboard which can be utilized to
          analyse your income.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
