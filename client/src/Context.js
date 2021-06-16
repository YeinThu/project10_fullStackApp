import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
    this.state = {
      authenticatedUser: Cookies.getJSON('authenticatedUser') || null, // User cookie set to context
      originalPassword: null
    }
  }

  // Sign in user
  signIn = async (emailAddress, password) => {
    this.setState({
      originalPassword: password
    });
    
    const user = await this.data.getUser(emailAddress, password);
    
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user
        }
      });

      // When user signs in, it's properties are stored in a cookie for memory (expires in 24 hours)
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    
    return user;
  }

  // Sign out user
  signOut = () => {
    this.setState({
      authenticatedUser: null
    });

    // When user signs out, the user cookie is removed
    Cookies.remove('authenticatedUser');
  }

  render() {
    // Values / properties to be accessed through context.
    const value = {
      authenticatedUser: this.state,
      data: this.data,
      courses: this.courses,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      }
    }

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
};

export const Consumer = Context.Consumer;

// Wraps the passed in Component as a consumer so it can gain access to context.
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
};




