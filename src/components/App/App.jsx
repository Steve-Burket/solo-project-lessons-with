import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import StudentProtectedRoute from '../ProtectedRoute/StudentProtectedRoute';
import TeacherProtectedRoute from '../ProtectedRoute/TeacherProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import StudentRoster from '../StudentRoster/StudentRoster';
import StudentDetails from '../StudentRoster/StudentDetails';
import PracticeLog from '../PracticeLog/PracticeLog';
import LogDetails from '../PracticeLog/LogDetails';
import LogArchive from '../PracticeLog/LogArchive';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  // load the user only once (first mount)
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'FETCH_INSTRUMENTS' });
  }, [dispatch]);

  // load our app data every time the user changes (so after login)
  useEffect(() => {
    dispatch({ type: 'FETCH_STUDENTS' });
    if (user.is_instructor === true) {
      dispatch({ type: 'FETCH_PRACTICE_LOG' });
    } else {
      dispatch({ type: 'FETCH_STUDENT_PRACTICE_LOG' });
      dispatch({ type: 'FETCH_MY_TEACHER' });
    }
  }, [user]);
  return (
    <Router>
      <div
        style={{
          backgroundImage: 'url(/images/LessonsWithLandingPagePic.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from='/' to='/home' />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path='/about'
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path='/user'
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path='/info'
          >
            <InfoPage />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path='/login'
            authRedirect='/user'
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path='/registration'
            authRedirect='/user'
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path='/home'
            authRedirect='/user'
          >
            <LandingPage />
          </ProtectedRoute>

          {/* Here is the StudentRoster component */}
          <StudentProtectedRoute exact path={'/student'}>
            <StudentRoster />
          </StudentProtectedRoute>

          <TeacherProtectedRoute exact path={'/practice_log'}>
            <PracticeLog />
          </TeacherProtectedRoute>

          {/* Here is the StudentRoster component */}
          <StudentProtectedRoute exact path={'/student/details/:studentID'}>
            <StudentDetails />
          </StudentProtectedRoute>

          {/* Here is the Log Details component */}
          <ProtectedRoute exact path={`/log/details/:logID`}>
            <LogDetails />
          </ProtectedRoute>

          {/* Here is the Log Archives component */}
          <ProtectedRoute exact path='/log/archive'>
            <LogArchive />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
