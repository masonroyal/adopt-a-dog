import * as React from 'react';

import styles from './InputSelect.module.scss';

interface InputSelectProps {
  value: string;
  className?: string;
  options: string[];
  id?: string;
  label: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
}

function InputSelect({
  value,
  options,
  id,
  label,
  className,
  setter,
}: InputSelectProps) {
  const generatedId = React.useId();
  const appliedId = id || generatedId;

  const appliedClassName = `${styles.wrapper} ${className}`;

  return (
    <div className={appliedClassName}>
      <label htmlFor={appliedId} className={styles.label}>
        {label}
      </label>
      <select
        style={{ width: '100%', height: '100%' }}
        className={styles.select}
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
    </div>
  );
}

export default InputSelect;
