import React, { useEffect } from "react";
import auth from "../services/authServices";

type Props = {};

function Logout({}: Props) {
  useEffect(() => {
    auth.logout();
    window.location.href = "/";
  });

  return null;
}

export default Logout;
