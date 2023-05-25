import * as React from 'react';
import styles from './InputCheckbox.module.scss';

interface InputCheckboxProps<T> {
  label: string;
  name: string;
  value: number;
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
  onToggle,
}: InputCheckboxProps<T>) {
  const generatedId = React.useId();
  const appliedId = id || generatedId;

  const appliedClassName = `${styles.wrapper} ${className}`;
  return (
    <div className={styles.wrapper}>
      <input
        type="checkbox"
        name={name}
        id={appliedId}
        value={value}
        onChange={() => onToggle(data)}
      />
      <label htmlFor={appliedId}>{label}</label>
    </div>
  );
}

export default InputCheckbox;
