import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  return (
    <div>
      <p className='f3 ma0 ml3 mr3 lh-title'>
        {'This Magic Brain will detect faces in your pictures. Give it a try. Enter the URL of the picture in the box below.'}
      </p>
      <div className=' mb3 ml3 mr3 mt4'>
        <div className='form center br4 shadow-5'>
          <input
            className='f5 pa2 w-60 center'
            type='text'
            onChange={onInputChange}
          />
          <button
          className='btn w-40 f5 link pa2 dib white ml2' style={{backgroundColor: '#0487de'}}
            onClick={onPictureSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
