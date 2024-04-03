import React from "react";
import NavTopBar from "../components/home/NavTopBar";
import OtpVerification from "../components/OtpVerification";
import Footer from "../components/home/Footer";
import NavbarDoctor from "../components/doctorComponents/NavbarDoctor";
import NavbarUser from "../components/userComponents/NavbarUser";

function Otp({ value }) {
  return (
    <>
      {value === "doctor" ? <NavbarDoctor /> : <NavbarUser />}
      {value === "doctor" ? (
        <OtpVerification value={"doctor"} />
      ) : (
        <OtpVerification />
      )}
      <Footer />
    </>
  );
}

export default Otp;
