import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../Context';

const PrivateRoute = ({ component: Component, ...rest }) => {
  
  return (
    <Consumer>
      { 
        context => (
          <Route 
            {...rest}
            // Check and see if there is an authorized user (signed in) or not.
            render={
              // If the user is authorized, render the appropriate screen.
              props => context.authenticatedUser.authenticatedUser ? (
                <Component {...props} />
              ) : (
                // If the user is not authorized to view the appropriate screen, redirect them back to the sign-in screen.
                <Redirect to={{
                  pathname: '/signin',
                  state: { from: props.location }
                }} />
              )
            }
          />
        )
      }
    </Consumer>
  );
}

export default PrivateRoute;