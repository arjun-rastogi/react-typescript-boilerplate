import React, { useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";

interface Option {
  id: number;
  name: string;
}

type Props = {
  name: string;
  label: string;
  options: { id: string; name: string }[];
  error?: string;
  value: string;
  selectedOptions: Option[]; // Update the type to string[]
  setSelectedOptions: React.Dispatch<React.SetStateAction<Option[]>>;
  onChange: (name: string, selectedOptions: Option[]) => void; // Update the onChange prop type
};

function MultipleSelect({
  name,
  label,
  value,
  options,
  error,
  selectedOptions,
  setSelectedOptions,
  onChange,
  ...rest
}: Props) {
  const handleSelect = (
    selectedList: Option[],
    selectedItem: Option | undefined
  ) => {
    setSelectedOptions(selectedList);
  };

  useEffect(() => {
    if (selectedOptions) {
      const handleChange = () => {
        onChange(name, selectedOptions);
      };
      handleChange();
    }
  }, [name, selectedOptions]);

  return (
    <>
      <div className="form-group">
        <label
          id={name}
          htmlFor={name}
          dangerouslySetInnerHTML={{ __html: label }}
        />

        <Multiselect
          options={options}
          selectedValues={selectedOptions}
          onSelect={handleSelect}
          onRemove={handleSelect}
          displayValue="name"
        />

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </>
  );
}

export default MultipleSelect;
