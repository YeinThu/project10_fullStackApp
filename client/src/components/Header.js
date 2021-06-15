import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'

const Header = ({ context }) => {
  const authUser = context.authenticatedUser.authenticatedUser;

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo"><Link to="/courses">Courses</Link></h1>
        <nav>
          <ul className="header--signedout">
            {
              // Check and see if there is an authorized user (signed in user)
              authUser ?
                // If there is...
                <Fragment>
                  <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
                  <li><Link to="/signout">Sign Out</Link></li>
                </Fragment>
              : // If there isn't...
                <Fragment>
                  <li><Link to="/signup">Sign Up</Link></li>
                  <li><Link to="/signin">Sign In</Link></li>
                </Fragment>
            }
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;