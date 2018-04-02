import React from 'react';
import styled from 'styled-components';
import { hideVisually } from 'polished';

import Icon from './Icon';
import ProgressBar from './ProgressBar';

import cloudUploadIcon from '../icons/cloud-upload.svg';

const ImageUploadWrapper = styled.div``;

const ImageUploadScreenReaderLabel = styled.label.attrs({
  htmlFor: 'fileInput'
})`
  ${hideVisually()};
`;

const ImageUploadInput = styled.input.attrs({
  type: 'file'
})`
  ${hideVisually()};
  &:focus + div {
    outline: -webkit-focus-ring-color auto 5px;
  }
`;

const ImageUploadContainer = styled.div`
  position: relative;
  margin: 1em auto;
  height: 300px;
  width: 300px;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageUploadDragArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 250px;
  background: rgba(221, 221, 221, 0.303);
  border: 3px dashed rgb(221, 221, 221);
  cursor: pointer;
  z-index: 11;

  &:hover {
    background: rgba(221, 221, 221, 0.503);
  }
`;

const ImageUploadStatusMessage = styled.div`
  display: block;
  display: flex;
  flex-wrap: wrap;
  text-align: center;

  & > * {
    width: 100%;
  }
`;

const ImageUploadDragContent = styled.div`
  width: 200px;
`;

const ImageUploadImage = styled.img`
  max-width: 100%;
  height: auto;
  position: absolute;
  z-index: 10;
`;

class ImageUpload extends React.Component {
  fileInput = null;
  state = {
    art: '',
    upload: null,
    progress: 0,
    show: true
  };
  onFileSelected = e => {
    this.upload = e.target.files[0];
    this.setState({ upload: e.target.files[0] });
    this.onUpload();
  };

  loadArt = () => {
    console.log('art loaded');
    this.setState(() => {
      return { art: 'https://placebear.com/g/300/300' };
    });
  };

  onCompleteUpload = () => {
    console.log('complete');
    this.setState(() => {
      return {
        progress: 100
      };
    });
    setTimeout(this.loadArt, 1000);
  };

  onUpload = () => {
    console.log('uploading...');
    setTimeout(this.onCompleteUpload, 1000);
  };
  render() {
    return (
      <ImageUploadWrapper>
        <ImageUploadScreenReaderLabel>
          Upload an album cover
        </ImageUploadScreenReaderLabel>
        {/** Passing ref to styled component will give a ref to the StyledComponent wrapper, not to DOM node. So it's not possible to call DOM methods, like focus on that wrapper. To get a ref to wrapped DOM node, pass innerRef prop. **/}
        <ImageUploadInput
          innerRef={input => {
            this.fileInput = input;
          }}
          onChange={this.onFileSelected}
        />
        <ImageUploadContainer>
          {!this.state.art ? (
            <ImageUploadDragArea
              aria-relevant
              onClick={() => this.fileInput.click()}
            >
              {this.state.upload ? (
                <ProgressBar progress={this.state.progress} />
              ) : (
                <ImageUploadStatusMessage>
                  <Icon
                    glyph={cloudUploadIcon}
                    fillColor="black"
                    size="large"
                  />

                  <h3 style={{ margin: 0, padding: 0 }}>Try me!</h3>
                </ImageUploadStatusMessage>
              )}
            </ImageUploadDragArea>
          ) : null}
          {this.state.art ? (
            <ImageUploadImage src={this.state.art} />
          ) : (
            <ImageUploadImage src="http://via.placeholder.com/300x300" />
          )}
        </ImageUploadContainer>
      </ImageUploadWrapper>
    );
  }
}

export default ImageUpload;
