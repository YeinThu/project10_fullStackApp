import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom'
import { render } from 'react-dom';

class Header extends PureComponent {
  
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser.authenticatedUser;

    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo"><Link to="/courses">Courses</Link></h1>
          <nav>
            <ul className="header--signedout">
              {authUser ? 
                  <Fragment>
                    <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
                    <li><Link to="/signout">Sign Out</Link></li>
                  </Fragment>
                :
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
  }
};

export default Header;