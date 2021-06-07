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
import CreateCourse from './components/CreateCourse';

// Import context function
import withContext from './Context';

// Provide components with context
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);

const App = () => {

  return (
    <Router>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" render={() => <Redirect to="/courses" />} />
        <Route exact path="/courses" component={CoursesWithContext} />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
        <Route exact path="/signup" component={UserSignUp} />
        <Route exact path="/signin" component={UserSignIn} />
        {/* <Route exact path="/courses/create" component={CreateCourse} /> */}
      </Switch>
    </Router>
  );
};

export default App;