import React from 'react';
import AlertBanner from '../AlertBanner/AlertBanner';
import './Signin.css';

class Signin extends React.Component {
  constructor(props) {
    super();
    this.state = {
      signInEmail: '',
      signInPassword: '',
      displayInvalidCredentialsMessage: false,
      displayCompleteFieldsMessage: false,
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    this.setState({ displayInvalidCredentialsMessage: false });
    this.setState({ displayCompleteFieldsMessage: false });
    fetch('http://localhost:3001/signin', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        } else if (user === 'incorrect form submission') {
          this.setState({ displayCompleteFieldsMessage: true });
        } else if (user === 'wrong credentials') {
          this.setState({ displayInvalidCredentialsMessage: true });
        }
      })
      .catch(console.log);
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <div className='signin-container'>
        <article className='br3 ba b--black-10 w-90 w-80-m w-60-l mw6 shadow-5 center mt3 mb3'>
          <main className='pa4 pt4 pb3 black-80'>
            <div className='measure'>
              <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
                <legend className='f1 fw6 ph0 mh0'>Sign In</legend>
                {this.state.displayInvalidCredentialsMessage === true && (
                  <AlertBanner
                    Text={'Invalid credentials. Please try again.'}
                  />
                )}
                {this.state.displayCompleteFieldsMessage === true && (
                  <AlertBanner
                    Text={'Please complete all fields.'}
                  />
                )}
                <div className='mt3'>
                  <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                    Email
                  </label>
                  <input
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                    type='email'
                    name='email-address'
                    id='email-address'
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className='mv3'>
                  <label className='db fw6 lh-copy f6' htmlFor='password'>
                    Password
                  </label>
                  <input
                    className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                    type='password'
                    name='password'
                    id='password'
                    onChange={this.onPasswordChange}
                  />
                </div>
              </fieldset>
              <div className=''>
                <input
                  onClick={this.onSubmitSignIn}
                  className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                  type='submit'
                  value='Sign in'
                />
              </div>
              <div className='lh-copy mt3'>
                <p
                  onClick={() => onRouteChange('register')}
                  className='f6 link dim black db pointer'
                >
                  Register
                </p>
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default Signin;
