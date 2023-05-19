import React, { useState } from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import { SigninFormData } from "./types";
import Form from "../../common/form";

type Props = {};

interface Errors {
  [key: string]: string | undefined;
}

function Signin({}: Props) {
  const initialData: SigninFormData = { email: "", password: "" };
  const [data, setData] = useState<SigninFormData>(initialData);
  const [errors, setErrors] = useState<Errors>({});

  const doSubmit = () => {
    // Call the server
    console.log("Submitted", data);
  };
  const schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  const { renderInput, renderButton, handleSubmit } = Form<SigninFormData>({
    data,
    setData,
    errors,
    setErrors,
    schema,
    onSubmit: doSubmit,
  });

  return (
    <>
      <div className="container vh-100">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h5>Sign in for Existing User</h5>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="forms-sample">
          {renderInput("email", "Email")}
          {renderInput("password", "Password", "password")}
          {renderButton("Save")}
          <p>&nbsp;</p>
        </form>
      </div>
    </>
  );
}

export default Signin;
