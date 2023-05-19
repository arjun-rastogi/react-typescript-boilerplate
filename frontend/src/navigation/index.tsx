import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "font-awesome/css/font-awesome.css";
import { Home, Error, Signin, Signup } from "./../pages/";
import { Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./../components/";

function RootNavigation() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
      <Footer />
    </>
  );
}

export default RootNavigation;
