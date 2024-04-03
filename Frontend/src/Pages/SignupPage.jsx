import React from "react";
import NavTopBar from "../components/home/NavTopBar";
import Signup from "../components/Signup";
import Footer from "../components/home/Footer";
import NavbarDoctor from "../components/doctorComponents/NavbarDoctor";
import NavbarUser from "../components/userComponents/NavbarUser";

function SignupPage({ value }) {
  return (
    <div>
      {value === "doctor" ? <NavbarDoctor /> : <NavbarUser />}
      {value === "doctor" ? <Signup value={"doctor"} /> : <Signup />}

      <Footer />
    </div>
  );
}

export default SignupPage;
