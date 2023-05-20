import React, { useState } from "react";
import Joi from "joi-browser";
import { SignupFormData } from "./types";
import Form from "../../common/form";
import auth from "../../services/authServices";
import * as userService from "../../services/userService";

type Props = {};

interface Errors {
  [key: string]: string | undefined;
}

function SignupForm({}: Props) {
  const initialData: SignupFormData = { name: "", email: "", password: "" };
  const [data, setData] = useState<SignupFormData>(initialData);
  const [errors, setErrors] = useState<Errors>({});

  const doSubmit = async (): Promise<void> => {
    // Call the server
    console.log("Submitted", data);
    try {
      const response = await userService.register(data);
      auth.loginWithJwt(response.data.token);
      window.location.href = "/dashboard";
    } catch (ex: any) {
      if (ex.response && ex.response.status === 400) {
        const newErrors = { ...errors };
        newErrors.username = ex.response.data;
        setErrors(newErrors);
      }
    }
  };

  const schema = {
    name: Joi.optional().allow(""),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  const { renderInput, renderButton, handleSubmit } = Form<SignupFormData>({
    data,
    setData,
    errors,
    setErrors,
    schema,
    onSubmit: doSubmit,
  });
  return (
    <>
      <form onSubmit={handleSubmit} className="forms-sample">
        {renderInput("name", "User Name")}
        {renderInput("email", "Email")}
        {renderInput("password", "Password", "password")}
        {renderButton("Save")}
        <p>&nbsp;</p>
      </form>
    </>
  );
}

export default SignupForm;
