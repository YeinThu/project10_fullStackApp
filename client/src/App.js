// Initial imports
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';

// Import context function
import withContext from './Context';
import PrivateRoute from './components/PrivateRoute';

// Provide components with context
const HeaderWithContext = withContext(Header);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

const App = () => {

  return (
    <Router>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" render={() => <Redirect to="/courses" />} />
        <Route exact path="/courses" component={CoursesWithContext} />
        <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
        <Route exact path="/signup" component={UserSignUp} />
        <Route exact path="/signin" component={UserSignInWithContext} />
        <Route exact path="/signout" component={UserSignOutWithContext} />
      </Switch>
    </Router>
  );
};

export default App;