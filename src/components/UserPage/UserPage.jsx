import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import StudentRoster from '../StudentRoster/StudentRoster.jsx';
import PracticeLog from '../PracticeLog/PracticeLog';
import LogDetails from '../PracticeLog/LogDetails';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className='container'>
      <h2>Hello, {user.first_name}!</h2>
      <hr />
      <p>Your primary instrument is: {user.instrument}</p>
      <Router>
        <StudentRoster />
        <PracticeLog />
        <Route path='/details/:logID'>
          <LogDetails />
        </Route>
        <LogOutButton className='btn' />
      </Router>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
