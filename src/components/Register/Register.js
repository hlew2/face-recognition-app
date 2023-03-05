import React from 'react';
import AlertBanner from '../AlertBanner/AlertBanner';
import './Register.css';

class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
      displayInvalidCredentialsMessageEmail: false,
      displayInvalidCredentialsMessagePassword: false,
      displayFieldRequiredMessage: false,
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitRegister = () => {
    this.setState({ displayInvalidCredentialsMessageEmail: false });
    this.setState({ displayInvalidCredentialsMessagePassword: false });
    this.setState({ displayFieldRequiredMessage: false });
    fetch('https://smart-brain-api-1ywf.onrender.com/register', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        } else if (user === 'incorrect form submission') {
          this.setState({ displayFieldRequiredMessage: true });
        } else if (user === 'incorrect email and password format') {
          this.setState({ displayInvalidCredentialsMessageEmail: true });
          this.setState({ displayInvalidCredentialsMessagePassword: true });
        } else if (user === 'incorrect email format') {
          this.setState({ displayInvalidCredentialsMessageEmail: true });
        } else if (user === 'incorrect password format') {
          this.setState({ displayInvalidCredentialsMessagePassword: true });
        }
      })
      .catch(console.log);
  };

  render() {
    return (
      <div className='register-container'>
        <article className='inner-container br3 ba b--black-10 w-90 w-80-m w-60-l mw6 shadow-5 center mt3 mb3'>
          <main className='pa3 black-80'>
            <div className='measure'>
              <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
                <legend className='f1 fw6 ph0 mh0'>Register</legend>
                {this.state.displayFieldRequiredMessage === true && (
                  <div className='mt2'>
                    <AlertBanner
                      Text={'Please complete all required fields.'}
                    />
                  </div>
                )}
                {this.state.displayInvalidCredentialsMessageEmail === true && (
                  <div className='mt2'>
                    <AlertBanner Text={'Please enter a valid email address.'} />
                  </div>
                )}
                {this.state.displayInvalidCredentialsMessagePassword ===
                  true && (
                  <div className='mt2'>
                    <AlertBanner
                      Text={'Password must contain at least 8 characters.'}
                    />
                  </div>
                )}
                <div className='mv3'>
                  <label className='db fw6 lh-copy f6' htmlFor='name'>
                    Name<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                    type='text'
                    name='name'
                    id='name'
                    onChange={this.onNameChange}
                    required
                  />
                </div>
                <div className='mv3'>
                  <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                    Email<span style={{ color: 'red' }}>*</span>
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
                    Password<span style={{ color: 'red' }}>*</span>
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
                  onClick={this.onSubmitRegister}
                  className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                  type='submit'
                  value='Register'
                />
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default Register;
