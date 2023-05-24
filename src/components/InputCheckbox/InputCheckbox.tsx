import * as React from 'react';

interface InputCheckboxProps<T> {
  label: string;
  name: string;
  value: number;
  id?: string;
  data: T;
  onToggle: (data: T) => void;
}

function InputCheckbox<T>({
  label,
  name,
  value,
  id,
  data,
  onToggle,
}: InputCheckboxProps<T>) {
  const generatedId = React.useId();
  const appliedId = id || generatedId;
  return (
    <>
      <input
        type="checkbox"
        name={name}
        id={appliedId}
        value={value}
        onChange={() => onToggle(data)}
      />
      <label htmlFor={appliedId}>{label}</label>
    </>
  );
}

export default InputCheckbox;
