import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import Select from "./select";
import Input from "./input";
import TextArea from "./textArea";
import InputArea from "./inputArea";
import MultipleSelect from "./multipleSelect";

interface Schema {
  [key: string]: string;
}

interface Option {
  id: number;
  name: string;
}

interface Props<T> {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  errors: Errors;
  setErrors: React.Dispatch<React.SetStateAction<Errors>>;
  schema: Schema;
  base64Image?: string;
  setBase64Image?: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
}

interface Errors {
  [key: string]: string | undefined;
}

interface FormData {
  [key: string]: any;
}

const Form = <T extends FormData>({
  data,
  setData,
  errors,
  setErrors,
  schema,
  base64Image,
  setBase64Image,
  onSubmit,
}: Props<T>) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const renderFile = (
    name: string,
    label: string,
    type = "text"
  ): JSX.Element => {
    return (
      <Input
        type={type}
        name={name}
        value=""
        label={label}
        onChange={handleImageChange}
        error={errors[name]}
      />
    );
  };

  const renderInput = (
    name: string,
    label: string,
    type = "text"
  ): JSX.Element => {
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const renderInputArea = (
    name: string,
    label: string,
    type = "text"
  ): JSX.Element => {
    return (
      <InputArea
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const renderMultipleSelect = (
    name: string,
    label: string,
    options: Array<any>
  ): JSX.Element => {
    return (
      <MultipleSelect
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        name={name}
        value={data[name]}
        label={label}
        options={options}
        error={errors[name]}
        onChange={handleMultipleSelectChange}
      />
    );
  };

  const handleMultipleSelectChange = (
    name: string,
    selectedOptions: Option[]
  ) => {
    if (selectedOptions) {
      handleMultipleEditorChange(selectedOptions, name);
    }
  };

  const renderSelect = (
    name: string,
    label: string,
    options: Array<any>
  ): JSX.Element => {
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const renderTextarea = (
    name: string,
    label: string,
    type = "text"
  ): JSX.Element => {
    return (
      <TextArea
        name={name}
        value={data[name]}
        label={label}
        error={errors[name]}
        onChange={(value) => handleMultipleEditorChange(value, name)} // Corrected the parameter passing
      />
    );
  };

  const renderButton = (label: string) => {
    return <button className="btn ">{label}</button>;
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const errors: Errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    setErrors(errors);
    return errors;
  };

  const validateProperty = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    const obj = { [name]: value };
    const schemas: Schema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemas);
    return error ? error.details[0].message : null;
  };

  const handleInputChange = (
    input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ): void => {
    const newErrors = { ...errors };

    const errorMessage = validateProperty(input);
    if (errorMessage) {
      newErrors[input.name] = errorMessage;
    } else {
      delete newErrors[input.name];
    }

    setData((prevState) => ({
      ...prevState,
      [input.name]: input.value,
    }));

    setErrors(newErrors);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    const { currentTarget: input } = e;
    handleInputChange(
      input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    );
  };

  const handleMultipleEditorChange = (value: any, name: string): void => {
    const syntheticEvent = {
      currentTarget: {
        value,
        name,
      } as HTMLSelectElement | HTMLInputElement,
    };
    handleInputChange(syntheticEvent.currentTarget);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (setBase64Image) {
      const error = { ...errors };
      const errorMessage = validateProperty(e.target as HTMLInputElement);
      console.log("errorMessage", errorMessage);
      if (errorMessage)
        error[(e.target as HTMLInputElement).name] = errorMessage;
      else delete error[(e.target as HTMLInputElement).name];

      const file = (e.target as HTMLInputElement).files?.[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        setBase64Image(base64String);
        setData((prevAccount) => ({
          ...prevAccount,
          [(e.target as HTMLInputElement).name]: base64String, // Set the img value to the Base64 string
        }));
      };

      if (file) {
        reader.readAsDataURL(file);
      }

      setErrors(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    onSubmit();
  };

  return {
    renderButton,
    renderInput,
    renderInputArea,
    renderMultipleSelect,
    renderSelect,
    renderTextarea,
    renderFile,
    handleSubmit,
  };
};

export default Form;
