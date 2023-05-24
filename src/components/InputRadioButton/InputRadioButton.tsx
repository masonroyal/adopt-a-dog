import * as React from 'react';

import styles from './InputRadioButton.module.scss';

interface InputRadioButtonProps {
  options: string[];
  legend: string;
  name: string;
  value: string;
  id?: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
}

function InputRadioButton({
  options,
  legend,
  name,
  value,
  setter,
  id,
  ...delegated
}: InputRadioButtonProps) {
  return (
    <>
      <legend>{legend}</legend>
      {options.map((option, i) => {
        return (
          <React.Fragment key={i}>
            <RadioButton
              option={option}
              name={name}
              value={value}
              setter={setter}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}

interface RadioButtonProps {
  option: string;
  id?: string;
  name: string;
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
}

function RadioButton({ option, id, name, value, setter }: RadioButtonProps) {
  const generatedId = React.useId();
  const appliedId = id || generatedId;

  return (
    <>
      <input
        type="radio"
        name={name}
        id={appliedId}
        value={option}
        checked={value === option}
        onChange={(e) => {
          setter(e.target.value);
        }}
      />
      <label htmlFor={appliedId}>{option}: </label>
    </>
  );
}

export default InputRadioButton;
