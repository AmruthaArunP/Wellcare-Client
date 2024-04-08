import React from "react";
import Login from "../components/Login";
import Footer from "../components/home/Footer";
import NavbarDoctor from "../components/doctorComponents/NavbarDoctor";
import NavbarUser from "../components/userComponents/NavbarUser";

function LoginPage({ value }) {
  return (
    <div>
      {value === "doctor" ? <NavbarDoctor /> : <NavbarUser />}
      {value === "doctor" ? <Login value = {"doctor"} /> : <Login />}

      <Footer />
    </div>
  );
}

export default LoginPage;
