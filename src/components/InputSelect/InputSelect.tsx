import * as React from 'react';

interface InputSelectProps {
  value: string;
  options: string[];
  id?: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function InputSelect({
  value,
  options,
  id,
  label,
  onChange,
}: InputSelectProps) {
  const generatedId = React.useId();
  const appliedId = id || generatedId;
  return (
    <>
      <label htmlFor={appliedId}>{label}</label>
      <select value={value} id={appliedId} onChange={onChange}>
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
