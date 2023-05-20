import React, { useState } from "react";
import Joi from "joi-browser";
import { SigninFormData } from "./types";
import Form from "../../common/form";
import auth from "../../services/authServices";

type Props = {};
interface Errors {
  [key: string]: string | undefined;
}

function SigninForm({}: Props) {
  const initialData: SigninFormData = { email: "", password: "" };
  const [data, setData] = useState<SigninFormData>(initialData);
  const [errors, setErrors] = useState<Errors>({});

  const doSubmit = async (): Promise<void> => {
    // Call the server
    console.log("Submitted", data);
    try {
      await auth.login(data.email, data.password);
      window.location.href = "/admin";
    } catch (ex: any) {
      const newErrors = { ...errors };
      if (ex.response && ex.response.status === 400) {
        newErrors.email = ex.response.data;
        setErrors(errors);
      }
    }
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
      <form onSubmit={handleSubmit} className="forms-sample">
        {renderInput("email", "Email")}
        {renderInput("password", "Password", "password")}
        {renderButton("Save")}
        <p>&nbsp;</p>
      </form>
    </>
  );
}

export default SigninForm;
