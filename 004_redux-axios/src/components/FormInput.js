import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { hideVisually } from 'polished';

import ImageUpload from './ImageUpload';
import StarRating from './StarRating';

const propTypes = {
  fieldName: PropTypes.string,
  fieldType: PropTypes.string,

  elementConfig: PropTypes.shape({
    type: PropTypes.string,
    placeholder: PropTypes.string
  }),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  validation: PropTypes.shape({
    required: PropTypes.bool
  }),
  valid: PropTypes.bool,
  touched: PropTypes.bool
};

const defaultProps = {
  fieldName: 'field name',
  fieldType: 'text',

  elementConfig: {
    type: 'text',
    placeholder: 'field name'
  },
  value: '',
  validation: {
    required: false
  },
  valid: false,
  touched: false
};

const FormInputWrapper = styled.div`
  margin-bottom: 1em;

  & > * {
    display: block;
    margin: 0.5em 0;
  }
`;

const FormLabel = styled.label`
  ${hideVisually()};
`;

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

const ValidationMessage = styled.p`
  color: #500;
`;

// const capitalizeFirstCharacters = str => {
//   const [firstCharacter, ...otherCharacters] = str;
//   return firstCharacter.toUpperCase() + otherCharacters.join('');
// };
// const displayFieldName = elementConfig.placeholder
//   ? capitalizeFirstCharacters(elementConfig.placeholder)
//   : null;

const FormInput = ({
  name,
  elementConfig,
  value,
  validation,
  valid,
  touched,
  changed
}) => {
  const fieldSwitch = () => {
    switch (elementConfig.type) {
      case 'imageUpload':
        return <ImageUpload changed={changed} art={value} />;
      case 'starRating':
        return <StarRating editable changed={changed} rating={value} />;
      default:
        return (
          <FormInputWrapper>
            <FormLabel>{elementConfig.placeholder}</FormLabel>
            <FormInputField
              placeholder={elementConfig.placeholder}
              name={name}
              type={elementConfig.type}
              onChange={changed}
              value={value}
            />
            {touched && !valid ? (
              <ValidationMessage>
                {elementConfig.placeholder} is required.
              </ValidationMessage>
            ) : null}
          </FormInputWrapper>
        );
    }
  };

  return <FormInputWrapper>{fieldSwitch()}</FormInputWrapper>;
};

FormInput.propTypes = propTypes;
FormInput.defaultProps = defaultProps;

export default FormInput;
