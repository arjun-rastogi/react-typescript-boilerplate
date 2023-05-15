import React from "react";
import JoditEditor from "jodit-react";

type Props = {
  name: string;
  label: string;
  value: string;
  error?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (content: string) => void; // Adjusted the event type
};

function TextArea({
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

      <JoditEditor value={value} onChange={onChange} {...rest} />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default TextArea;
