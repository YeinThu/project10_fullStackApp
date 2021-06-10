import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

class UserSignIn extends Component {
  constructor() {
    super();
    this.state = {
      emailAddress: '',
      password: '',
      errors: []
    }
    
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      }
    })
  }

  submit = () => {
    const { context } = this.props;
    const { emailAddress, password } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    
    context.actions.signIn(emailAddress, password)
      .then(user => {
        if (user === null) {
          console.log('Unsuccessful');
        }
        else {
          this.props.history.push(from.pathname);
          console.log('Success! You are now signed in!');
          console.log(user)
        }
      });
  }

  cancel = () => {
    this.props.history.push('/');
  }

  render() {
    const {
      emailAddress,
      password,
      errors
    } = this.state;
   
    return (
      <main>
        <div className="form--centered">
          <h2>Sign In</h2>
          <Form 
            submit={this.submit}
            cancel={this.cancel}
            submitButtonText="Sign In"
            elements={() => (
              <Fragment>
                <label htmlFor="emailAddress">Email Address</label>
                <input 
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  value={emailAddress}
                  onChange={this.change}
                />

                <label htmlFor="password">Password</label>
                <input 
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                />
              </Fragment>
            )}
          />
          <p>Don't have a user account? Click here to <Link to="sign-up.html">sign up</Link>!</p>
        </div>
      </main>
    );
  }
}

export default UserSignIn;