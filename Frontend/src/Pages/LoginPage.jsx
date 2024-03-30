import React from "react";
import Login from "../components/Login";
import Footer from "../components/home/Footer";
import NavTopBar from "../components/home/NavTopBar";

function LoginPage({ value }) {
  return (
    <div>
      <NavTopBar/>
      {value === "doctor" ? <Login value={"doctor"} /> : <Login />}
      

      <Footer />
    </div>
  );
}

export default LoginPage;
