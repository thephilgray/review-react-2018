import React from 'react';
import styled from 'styled-components';

import FormInput from '../components/FormInput';

const NewForm = styled.form`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const NewFormSubmitButton = styled.button`
  width: 100%;
  padding: 1em 0.25em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:not([disabled]) {
    cursor: pointer;
  }
`;

const Form = props => {
  return (
    <NewForm onSubmit={props.onSubmitForm}>
      {props.formElementsArray.map(formElement => {
        return (
          <FormInput
            key={formElement.id}
            name={formElement.id}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            validation={formElement.config.validation}
            valid={formElement.config.valid}
            touched={formElement.config.touched}
            changed={(event, payload) =>
              props.inputChangedHandler(event, formElement.id, payload)
            }
          />
        );
      })}

      <NewFormSubmitButton type="submit">Save</NewFormSubmitButton>
    </NewForm>
  );
};

export default Form;
