import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';

const Logo = () => {
  return (
    <div className='mt3 ml4 mb4' style={{ height: '150px', width: '150px'}}>
      <Tilt>
        <div className='br3 pa3 shadow-2' style={{ height: '150px', width: '150px', background: 'linear-gradient(89deg, #fff25e 0%, #0487de 100%)'}}>
         <img alt='logo' src={brain} style={{ height: '100px', width: '100px', paddingTop: '5px'}}/>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
