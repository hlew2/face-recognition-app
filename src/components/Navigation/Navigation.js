import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    <div style={{height: '15%', width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
      {isSignedIn ? (
        <nav style={{ display: 'flex' }}>
          <p
            onClick={() => onRouteChange('signout')}
            className='f3 link dim black underline pa3 pointer ma0'
          >
            Sign Out
          </p>
        </nav>
      ) : (
        <nav style={{ display: 'flex' }}>
          <p
            onClick={() => onRouteChange('signin')}
            className='f3 link dim black underline pa3 pointer ma0'
          >
            Sign In
          </p>
          <p
            onClick={() => onRouteChange('register')}
            className='f3 link dim black underline pa3 pointer ma0'
          >
            Register
          </p>
        </nav>
      )}
    </div>
  );
};

export default Navigation;
