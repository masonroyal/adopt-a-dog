import * as React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  label?: string;
  value: string;
  className?: string;
  placeholder?: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  label = 'text',
  value,
  className = '',
  placeholder = '',
  type,
  onChange,
}: InputProps) {
  return (
    <>
      {label && <label htmlFor="input-field">{label}</label>}
      <input
        type={type}
        value={value}
        className={`${styles.button} ${className}`}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
}

export default Input;
