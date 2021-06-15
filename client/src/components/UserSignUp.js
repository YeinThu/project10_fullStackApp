import { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

class UserSignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      errors: []
    };
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

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state;

    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };

    if (password === confirmPassword) {
      context.data.createUser(user)
        .then(dataErrors => {
          if (dataErrors.length) {
            this.setState({
              errors: dataErrors
            });
          }
          else {
            context.actions.signIn(emailAddress, password);
            this.props.history.push('/');
          }
        })
        .catch(err => {
          console.log(`An error has occurred: ${err}`);
          this.props.history.push('/error');
        })
    }
    else {
      this.setState({
        errors: ['"Password" and "Confirm Password" values must match.']
      });
    }
  }

  cancel = () => {
    this.props.history.push('/');
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors
    } = this.state;

    return (
      <main>
        <div className="form--centered">
          <h2>Sign Up</h2>
          <Form
            errors={errors}
            submit={this.submit}
            cancel={this.cancel}
            submitButtonText="Sign Up"
            elements={() => (
              <Fragment>
                <label htmlFor="firstName">First Name</label>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text" 
                  value={firstName} 
                  onChange={this.change} 
                />

                <label htmlFor="lastName">Last Name</label>
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text" 
                  value={lastName} 
                  onChange={this.change} 
                />

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

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  type="password" 
                  value={confirmPassword} 
                  onChange={this.change} 
                />
              </Fragment>
           )}
          />
          <p>Already have a user account? Click here to <Link to="sign-in.html">sign in</Link>!</p>
        </div>
      </main>
    )
  }
};

export default UserSignUp;
