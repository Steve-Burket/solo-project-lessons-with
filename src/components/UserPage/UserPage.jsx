import { useEffect, useState, react } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import StudentRoster from '../StudentRoster/StudentRoster.jsx';
import PracticeLog from '../PracticeLog/PracticeLog';
import './UserPage.css';

// BOOTSTRAP!
import Card from 'react-bootstrap//Card';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const myTeacher = useSelector((store) => store.myTeacher);
console.log(myTeacher.phone);
  console.log('here is the students instrument:', user.instrument);

  function studentGreeting() {
    if (user.is_instructor === !true) {
      return (
        <>
          <p>Your instructor is {myTeacher.first_name}</p>
          <p>Phone: {myTeacher.phone_number}</p>
          <p>Email: {myTeacher.email}</p>
        </>
      );
    }
  }

  return (
    <div className='container'>
      <Card id='greeting'>
        <h2>Hello, {user.first_name}!</h2>
        <hr />
        {studentGreeting()}
      </Card>
      {user.is_instructor === true && <StudentRoster />}
      {user.is_instructor === false && <PracticeLog />}

      <LogOutButton className='btn' />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
