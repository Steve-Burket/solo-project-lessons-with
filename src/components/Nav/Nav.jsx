import { react, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);
  const teacher = useSelector((store) => store.myTeacher);


  console.log(teacher.first_name);
  console.log(user.instructor_is);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register'
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  // don't show teacher in title when logged out
  // function teacherInTitle() {
  // if (path = '/logout') {
      
  // }
  // }

  return (
    <div className='nav'>
      <Link to='/home'>
        <h2 className='nav-title'>LESSONS WITH {teacher.first_name}</h2>
      </Link>

      <div>
        <Link className='navLink' to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {user.is_instructor === true && user.id && (
          <Link className='navLink' to='/student'>
            Roster
          </Link>
        )}

        {user.id && (
          <Link className='navLink' to='/log/archive'>
            Archive
          </Link>
        )}

        <Link className='navLink' to='/about'>
          About
        </Link>

        {user.id && (
          <>
            {/* <Link className='navLink' to='/info'>
              Info Page
            </Link> */}
            <LogOutButton className='navLink' to='/user' />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
