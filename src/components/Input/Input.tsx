import * as React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  label?: string;
  value: string;
  id?: string;
  className?: string;
  placeholder?: string;
  type?: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  pattern?: string;
  required?: boolean;
  title?: string;
}

function Input({
  label,
  value,
  id,
  className = '',
  placeholder = '',
  type = 'text',
  setter,
  required = false,
  pattern,
  title,
}: InputProps) {
  const generatedId = React.useId();

  const appliedId = id || generatedId;

  return (
    <>
      <label htmlFor={appliedId}>{label}</label>
      <input
        required={required}
        type={type}
        value={value}
        title={title}
        pattern={pattern}
        id={appliedId}
        className={`${styles.button} ${className}`}
        placeholder={placeholder}
        onChange={(e) => {
          setter(e.target.value);
        }}
      />
    </>
  );
}

export default Input;
