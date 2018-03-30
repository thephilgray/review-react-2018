import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const propTypes = {
  fieldName: PropTypes.string,
  fieldType: PropTypes.string
};

const defaultProps = {
  fieldName: 'field name',
  fieldType: 'text'
};

const FormInputWrapper = styled.div`
  margin-bottom: 1em;

  & > * {
    display: block;
    margin: 0.5em 0;
  }
`;

const FormLabel = styled.label``;

const FormInputField = styled.input`
  border-radius: 2px;
  padding: 1em 0.75em 0.6875em;
  width: 100%;
  background-color: #fff;
  border: 1px solid #dfe0e6;
  color: #1c1c1f;
  font-size: 0.9375em;
  line-height: normal;
  margin: 0;
  box-sizing: border-box;
`;

const capitalizeFirstCharacters = str => {
  const [firstCharacter, ...otherCharacters] = str;
  return firstCharacter.toUpperCase() + otherCharacters.join('');
};

const FormInput = ({ fieldName, fieldType }) => {
  const displayFieldName = capitalizeFirstCharacters(fieldName);
  return (
    <FormInputWrapper>
      <FormLabel>{displayFieldName}</FormLabel>
      <FormInputField
        placeholder={displayFieldName}
        name={fieldName}
        type={fieldType}
      />
    </FormInputWrapper>
  );
};

FormInput.propTypes = propTypes;
FormInput.defaultProps = defaultProps;

export default FormInput;
