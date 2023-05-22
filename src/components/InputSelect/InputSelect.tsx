import * as React from 'react';

interface InputSelectProps {
  value: string;
  options: string[];
  id?: string;
  label: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
}

function InputSelect({ value, options, id, label, setter }: InputSelectProps) {
  const generatedId = React.useId();
  const appliedId = id || generatedId;

  return (
    <>
      <label htmlFor={appliedId}>{label}</label>
      <select
        value={value}
        id={appliedId}
        onChange={(e) => {
          setter(e.target.value);
        }}
      >
        {options.map((option, i) => {
          return (
            <option key={i} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default InputSelect;
