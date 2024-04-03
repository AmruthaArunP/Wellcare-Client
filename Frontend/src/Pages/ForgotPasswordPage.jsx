import React from "react";
import ForgotPassword from "../components/ForgotPassword";
import Footer from "../components/home/Footer";
import NavbarDoctor from "../components/doctorComponents/NavbarDoctor";
import NavbarUser from "../components/userComponents/NavbarUser";

function ForgotPasswordPage({ value }) {
  return (
    <div>
      {value === "doctor" ? <NavbarDoctor /> : <NavbarUser />}
      {value === "doctor" ? (
        <ForgotPassword user={"doctor"} />
      ) : (
        <ForgotPassword />
      )}

      <Footer />
    </div>
  );
}

export default ForgotPasswordPage;
