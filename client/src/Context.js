import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
    this.state = {
      authenticatedUser: null
    }
  }

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user
        }
      })
    }
    
    return user;
  }

  signOut = () => {
    this.setState({
      authenticatedUser: null
    });
  }

  render() {
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

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
};




