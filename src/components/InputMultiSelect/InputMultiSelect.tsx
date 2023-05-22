import * as React from 'react';
import Select, { ActionMeta, GroupBase, Options } from 'react-select';

import styles from './InputMultiSelect.module.scss';

interface InputMultiSelectProps {
  label: string;
  value: string[];
  options: string[];
  id?: string;
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
  setter,
}: InputMultiSelectProps) {
  const generatedId = React.useId();
  const appliedId = id || generatedId;


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
    <>
      <label htmlFor={appliedId}>{label}</label>
      <Select
        isMulti
        inputId={appliedId}
        value={formattedValue}
        onChange={handleChange}
        options={formattedOptions}
      />
    </>
  );
}

export default InputMultiSelect;
