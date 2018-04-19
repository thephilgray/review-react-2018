import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { hideVisually } from 'polished';

import ImageUpload from './ImageUpload';
import StarRating from './StarRating';

const propTypes = {
  fieldName: PropTypes.string,
  fieldType: PropTypes.string,
  elementType: PropTypes.string,
  elementConfig: PropTypes.shape({
    type: PropTypes.string,
    placeholder: PropTypes.string
  }),
  value: PropTypes.string,
  validation: PropTypes.shape({
    required: PropTypes.bool
  }),
  valid: PropTypes.bool,
  touched: PropTypes.bool
};

const defaultProps = {
  fieldName: 'field name',
  fieldType: 'text',
  elementType: 'input',
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

const capitalizeFirstCharacters = str => {
  const [firstCharacter, ...otherCharacters] = str;
  return firstCharacter.toUpperCase() + otherCharacters.join('');
};

const FormInput = ({
  fieldName,
  fieldType,
  elementType,
  elementConfig,
  value,
  validation,
  valid,
  touched
}) => {
  const displayFieldName = elementConfig.placeholder
    ? capitalizeFirstCharacters(elementConfig.placeholder)
    : null;

  const fieldSwitch = () => {
    switch (elementType) {
      case 'imageUpload':
        return <ImageUpload />;
      case 'starRating':
        return <StarRating editable />;
      default:
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
    }
  };

  return <FormInputWrapper>{fieldSwitch()}</FormInputWrapper>;
};

FormInput.propTypes = propTypes;
FormInput.defaultProps = defaultProps;

export default FormInput;
