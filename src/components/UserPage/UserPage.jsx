import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import StudentRoster from '../StudentRoster/StudentRoster.jsx';
import PracticeLog from '../PracticeLog/PracticeLog';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className='container'>
      <h2>Hello, {user.first_name}!</h2>
      <hr />
      <p>Your primary instrument is: {user.instrument}</p>
      <StudentRoster />

      <PracticeLog />

      <LogOutButton className='btn' />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
