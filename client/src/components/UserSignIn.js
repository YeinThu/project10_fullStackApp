import { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

class UserSignIn extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        emailAddress: '',
        password: '',
        errors: []
      }
    }
  }

  render() {
    const {
      emailAddress,
      password,
      errors
    } = this.state.user;
    
    return (
      <main>
        <div className="form--centered">
          <h2>Sign In</h2>
          <Form 
            cancel={this.cancel}
            submitButtonText="Sign In"
            elements={() => (
              <Fragment>
                <label htmlFor="emailAddress">Email Address</label>
                <input 
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  value={emailAddress || ""}
                  onChange={this.change}
                />

                <label htmlFor="password">Password</label>
                <input 
                  id="password"
                  name="password"
                  type="password"
                  value={password || ""}
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

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        user: {
          [name]: value
        }
      }
    })
  }

  cancel = () => {
    this.props.history.push('/');
  }
}

export default UserSignIn;