import React from "react";
import { Routes, Route } from "react-router-dom";
import Logout from "../common/logout";
import { Admin, Error } from "../pages";

type Props = {};

function UserRoute({}: Props) {
  return (
    <>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default UserRoute;
