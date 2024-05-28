// MultiSelect.tsx
import React from 'react';
import Select, { MultiValue } from 'react-select';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedOptions: Option[];
  onChange: (selected: Option[]) => void;
  label: string;
  max: number;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selectedOptions, onChange, label, max }) => {
  const handleChange = (newValue: MultiValue<Option>) => {
    const selected = newValue as Option[];
    if (selected.length <= max) {
      onChange(selected);
    }
  };

  return (
    <div>
      <label>{label}</label>
      <Select
        isMulti
        value={selectedOptions}
        onChange={handleChange}
        options={options}
        classNamePrefix="select"
        placeholder={`Select up to ${max} users...`}
        closeMenuOnSelect={false}
      />
    </div>
  );
};

export default MultiSelect;
