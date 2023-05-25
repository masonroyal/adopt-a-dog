import * as React from 'react';

import styles from './InputRadioButton.module.scss';

interface InputRadioButtonProps {
  options: string[];
  legend: string;
  name: string;
  value: string;
  className?: string;
  id?: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
}

function InputRadioButton({
  options,
  legend,
  name,
  value,
  setter,
  className = '',
  id,
  ...delegated
}: InputRadioButtonProps) {
  return (
    <div className={styles.wrapper}>
      <legend>{legend}</legend>
      <div className={styles.buttonHolder}>
        {options.map((option, i) => {
          return (
            <RadioButton
              key={i}
              option={option}
              name={name}
              value={value}
              setter={setter}
            />
          );
        })}
      </div>
    </div>
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
    <div className={styles.buttonLabelHolder}>
      <input
        className={styles.radioButton}
        type="radio"
        name={name}
        id={appliedId}
        value={option}
        checked={value === option}
        onChange={(e) => {
          setter(e.target.value);
        }}
      />
      <label htmlFor={appliedId}>{option} </label>
    </div>
  );
}

export default InputRadioButton;
