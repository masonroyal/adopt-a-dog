import * as React from 'react';
import Select, { ActionMeta, GroupBase, Options } from 'react-select';

import styles from './InputMultiSelect.module.scss';

interface InputMultiSelectProps {
  label: string;
  value: string[];
  options: string[];
  id?: string;
  className?: string;
  setter: React.Dispatch<React.SetStateAction<string[]>>;
}

interface Option {
  value: string;
  label: string;
}

function InputMultiSelect({
  label,
  options,
  id,
  value,
  className = '',
  setter,
}: InputMultiSelectProps) {
  const generatedId = React.useId();
  const appliedId = id || generatedId;

  const appliedClassName = `${styles.wrapper} ${className}`;

  const formattedOptions: Options<Option> = options.map((option) => {
    return {
      value: option,
      label: option,
    };
  });

  const formattedValue: Options<Option> = value.map((option) => {
    return {
      value: option,
      label: option,
    };
  });

  function handleChange(selectedOptions: Options<Option>) {
    setter(selectedOptions.map((option) => option.value));
  }

  return (
    <div className={appliedClassName}>
      <label htmlFor={appliedId}>{label}</label>
      <Select
        isMulti
        inputId={appliedId}
        value={formattedValue}
        onChange={handleChange}
        options={formattedOptions}
      />
    </div>
  );
}

export default InputMultiSelect;
