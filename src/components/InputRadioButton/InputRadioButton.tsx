import * as React from 'react';

import styles from './InputRadioButton.module.scss';

function InputRadioButton({
  options,
  legend,
  name,
  label,
  value,
  setter,
  id,
  ...delegated
}) {
  const generatedId = React.useId();
  const appliedId = id || generatedId;

  const [option1, option2] = options;

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

      <label htmlFor={appliedId}>{label}</label>
    </>
  );
}

function RadioButton({ option, id, name, value, setter }) {
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
