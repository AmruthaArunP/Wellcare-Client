import React from "react";
import NavTopBar from "../components/home/NavTopBar";
import ForgotPassword from "../components/ForgotPassword";
import Footer from "../components/home/Footer";

function ForgotPasswordPage({ value }) {
  return (
    <div>
      <NavTopBar />
      {value === "doctor" ? (
        <ForgotPassword user = {"doctor"} />
      ) : (
        <ForgotPassword />
      )}

      <Footer />
    </div>
  );
}

export default ForgotPasswordPage;
