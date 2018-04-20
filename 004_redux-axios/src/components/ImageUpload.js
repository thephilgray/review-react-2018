import React from 'react';
import styled from 'styled-components';
import { hideVisually } from 'polished';

import Icon from './Icon';
import ProgressBar from './ProgressBar';

import cloudUploadIcon from '../icons/cloud-upload.svg';
import axios from 'axios';

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
  onFileSelected = async e => {
    console.log(e.target.files[0]);
    await this.setState({ upload: e.target.files[0] });

    console.log(this.state.upload, this.state);
    this.onUpload();
  };

  onUpload = () => {
    console.log('uploading...');
    const uploadFileFunction = process.env.REACT_APP_UPLOAD_FILE_FUNCTION; // needs to be set in .env
    const fd = new FormData();
    fd.append('file', this.state.upload, this.state.upload.name);

    axios
      .post(uploadFileFunction, fd, {
        onUploadProgress: uploadEvent => {
          console.log(uploadEvent);
          this.setState({
            progress: Math.round(uploadEvent.loaded / uploadEvent.total * 100)
          });
        }
      })
      .then(async res => {
        await this.setState({
          art: res.data.url[0]
        });
        if (this.state.art) {
          this.props.changed(null, this.state.art); // the first argument is the event, which is not needed here
          this.onCompleteUpload();
        }
      });
  };

  onCompleteUpload = async () => {
    console.log('complete');
    await this.setState(() => {
      return {
        progress: 100
      };
    });
    this.loadArt();
  };

  loadArt = () => {
    console.log('art loaded');
    // this.setState(() => {
    //   return { art: 'https://placebear.com/g/300/300' };
    // });
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
              aria-relevant="additions"
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
