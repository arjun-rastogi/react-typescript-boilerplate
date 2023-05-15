import React from "react";

type Props = {
  name: string;
  label: string;
  options: { id: string; name: string }[];
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Add onChange prop to Props type
};

function Select({
  name,
  label,
  value,
  options,
  error,
  onChange,
  ...rest
}: Props) {
  return (
    <>
      <div className="form-group">
        <label
          id={name}
          htmlFor={name}
          dangerouslySetInnerHTML={{ __html: label }}
        />
        <select
          name={name}
          id={name}
          {...rest}
          className="form-control"
          onChange={onChange}
        >
          <option value=""> -- Select the option -- </option>
          {options.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </>
  );
}

export default Select;
