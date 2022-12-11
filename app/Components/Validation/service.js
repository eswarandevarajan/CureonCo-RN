import validatejs from 'validate.js';

import {validationDictionary} from './dictionary';

export const validationService = {
  onInputChange,
  getInputValidationState,
  validateInput,
  getFormValidation,
};

function onInputChange({
  id,
  value,
  stepOneInputs,
  setStepOneInputs,
  stepTwoInputs,
  setStepTwoInputs,
}) {
  if (stepTwoInputs) {
    for (const [key, input] of Object.entries(stepTwoInputs)) {
      stepTwoInputs[key] = {
        type: input.type,
        value: input.value,
        errorLabel: null,
      };
    }

    setStepTwoInputs({
      ...stepTwoInputs,
      [id]: getInputValidationState({
        input: stepTwoInputs[id],
        value,
      }),
    });
  } else {
    for (const [key, input] of Object.entries(stepOneInputs)) {
      stepOneInputs[key] = {
        type: input.type,
        value: input.value,
        errorLabel: null,
      };
    }
    setStepOneInputs({
      ...stepOneInputs,
      [id]: getInputValidationState({
        input: stepOneInputs[id],
        value,
      }),
    });
  }
}

function getInputValidationState({input, value}) {
  return {
    ...input,
    value,
    errorLabel: input.optional
      ? null
      : validateInput({type: input.type, value}),
  };
}

function validateInput({type, value}) {
  if (
    value === 'Select a Country' ||
    value === 'Select a State' ||
    value === 'Select a CancerType' ||
    value === 'Select a Markers/Mutations' ||
    value === 'Select a Stage' ||
    value === 'Select a Specialization'
  ) {
    value = null;
  }
  const result = validatejs(
    {
      [type]: value,
    },
    {
      [type]: validationDictionary[type],
    },
  );
  if (result) {
    return result[type][0];
  }

  return null;
}

function getFormValidation(stepTwoInputs, setStepTwoInputs) {
  const updatedInputs = {};

  if (stepTwoInputs) {
    for (const [key, input] of Object.entries(stepTwoInputs)) {
      updatedInputs[key] = getInputValidationState({
        input,
        value: input.value,
      });
    }
    setStepTwoInputs(updatedInputs);
  } else {
    const {stepOneInputs} = this.state;
    for (const [key, input] of Object.entries(stepOneInputs)) {
      updatedInputs[key] = getInputValidationState({
        input,
        value: input.value,
      });
    }

    this.setState({
      stepOneInputs: updatedInputs,
    });
  }
}
