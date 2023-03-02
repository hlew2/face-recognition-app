import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div className='ma0 mb3 ml3 mr3'>
      <div className='white f3 ma0 lh-title'>
        {`${name}, your current entry count is`}
      </div>
      <div className='white ma0 lh-title' style={{fontSize: '3.5rem'}}>
        {`${entries}`}
      </div>
    </div>
  );
};

export default Rank;
