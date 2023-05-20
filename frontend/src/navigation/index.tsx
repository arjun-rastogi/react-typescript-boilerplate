import React, { useState, useEffect } from "react";
import { Navbar, Footer } from "../components";
import AuthRoute from "./authRoute";
import UserRoute from "./userRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import auth from "../services/authServices";
import { UserType } from "../types/userType";

function RootNavigation(): JSX.Element {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar user={user} />
      {user ? <UserRoute /> : <AuthRoute />}
      <Footer />
    </>
  );
}

export default RootNavigation;
