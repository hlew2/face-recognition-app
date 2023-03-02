import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ pictureSubmitState, imageUrl, box }) => {
  const boundingBoxList = box.map((item, index) => {
    return (
      <div
        key={index}
        className='bounding-box'
        style={{
          top: item.topRow,
          right: item.rightCol,
          bottom: item.bottomRow,
          left: item.leftCol,
        }}
      ></div>
    );
  });
  return (
    <div className='container'>
      <div className='img-container'>
        <div className='inner-container'>
          <img id='inputimage' alt='' src={imageUrl} className='shadow-5'></img>
          <div onClick={pictureSubmitState} className='close-btn'>
            &#x2715;
          </div>
          {boundingBoxList}
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;
