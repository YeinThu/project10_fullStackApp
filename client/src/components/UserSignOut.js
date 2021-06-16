import React from 'react';
import { Redirect } from 'react-router-dom';

const UserSignOut = (props) => {
  const { context } = props;

  // Call signOut method
  context.actions.signOut();

  return (
    // Redirect to the home page after the user signs out.
    <Redirect to="/" />
  );
}

export default UserSignOut;