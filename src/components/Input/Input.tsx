import * as React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  label?: string;
  value: string;
  id?: string;
  className?: string;
  placeholder?: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  label,
  value,
  id,
  className = '',
  placeholder = '',
  type,
  onChange,
}: InputProps) {
  const generatedId = React.useId();

  const appliedId = id || generatedId;

  return (
    <>
      {label && <label htmlFor={appliedId}>{label}</label>}
      <input
        type={type}
        value={value}
        id={appliedId}
        className={`${styles.button} ${className}`}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
}

export default Input;
