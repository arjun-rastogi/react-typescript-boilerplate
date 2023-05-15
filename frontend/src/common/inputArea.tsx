import React from "react";

type Props = {
  name: string;
  label: string;
  value: string;
  type: string;
  error?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Corrected the event type
};

function InputArea({
  name,
  label,
  value,
  error,
  className,
  placeholder,
  required,
  onChange,
  ...rest
}: Props) {
  return (
    <div className="form-group">
      <label
        id={name}
        htmlFor={name}
        dangerouslySetInnerHTML={{ __html: label }}
      />

      <textarea
        id={name}
        name={name}
        value={value}
        className={`form-control ${className}`}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        {...rest}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default InputArea;
