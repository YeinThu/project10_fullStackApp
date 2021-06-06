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

// Import context function
import withContext from './Context';

// Provide components with context
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);

const App = () => {

  return (
    <Router>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" render={() => <Redirect to="/courses" />} />
        <Route path="/courses" component={CoursesWithContext} />
        <Route path="/courses/:id" component={CourseDetail} />
      </Switch>
    </Router>
  );
};

export default App;