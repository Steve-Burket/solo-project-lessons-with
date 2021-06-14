import { react, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);
  const teacher = useSelector((store) => store.teachers);

  const dispatch = useDispatch();

  // useEffect to render teacher list
  useEffect(() => {
    dispatch({ type: 'FETCH_TEACHERS' });
  }, []);

  console.log(teacher);
  console.log(user.instructor_is);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register'
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className='nav'>
      <Link to='/home'>
        <h2 className='nav-title'>LESSONS WITH {user.instructor_is}</h2>
        {/* <-- Needs to be teacher's first name instead of ID*/}
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

        {user.id && (
          <>
            <Link className='navLink' to='/info'>
              Info Page
            </Link>
            <LogOutButton className='navLink' />
          </>
        )}

        <Link className='navLink' to='/about'>
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
