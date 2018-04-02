import React from 'react';

import styled from 'styled-components';

import FormInput from '../components/FormInput';
import ImageUpload from '../components/ImageUpload';
import StarRating from '../components/StarRating';

const NewForm = styled.form`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const NewFormSubmitButton = styled.button`
  width: 100%;
  padding: 1em 0.25em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

class AddForm extends React.Component {
  render() {
    return (
      <NewForm onSubmit={e => e.preventDefault()}>
        <ImageUpload />
        <FormInput />
        <StarRating editable />
        <NewFormSubmitButton>Save</NewFormSubmitButton>
      </NewForm>
    );
  }
}

export default AddForm;
