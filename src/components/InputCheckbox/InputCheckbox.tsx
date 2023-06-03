import * as React from 'react';
import styles from './InputCheckbox.module.scss';

interface InputCheckboxProps<T> {
  label: string;
  name: string;
  value: number;
  checked: boolean;
  className?: string;
  id?: string;
  data: T;
  onToggle: (data: T) => void;
}

function InputCheckbox<T>({
  label,
  name,
  value,
  className = '',
  id,
  data,
  checked,
  onToggle,
}: InputCheckboxProps<T>) {
  const generatedId = React.useId();
  const appliedId = id || generatedId;

  const appliedClassName = `${styles.wrapper} ${className}`;
  return (
    <div className={appliedClassName}>
      <label htmlFor={appliedId}>{label}</label>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        id={appliedId}
        value={value}
        onChange={() => onToggle(data)}
      />
    </div>
  );
}

export default InputCheckbox;
