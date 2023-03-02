import React from 'react';

const AlertBanner = ({ Text }) => {
  return (
    <div
      className='flex items-center justify-center o-90'
      style={{ backgroundColor: '#d92f23', borderRadius: '10px' }}
    >
      <svg
        className='w1 ml2'
        data-icon='info'
        viewBox='0 0 32 32'
        style={{ fill: 'black' }}
      >
        <title>info icon</title>
        <path d='M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6'></path>
      </svg>
      <span className='f7 lh-solid ml3 mr2'>
        <p>{Text}</p>
      </span>
    </div>
  );
};

export default AlertBanner;
