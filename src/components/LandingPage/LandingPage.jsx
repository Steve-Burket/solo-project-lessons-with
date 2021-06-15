import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

// Button from bootstrap
import Button from 'react-bootstrap/Button';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome to Lessons With!');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div
      className='container'
      // style={{ backgroundImage: 'url(/images/LessonsWithLandingPagePic.png)' }}
    >
      <h2>{heading}</h2>

      <div className='grid'>
        <div className='grid-col grid-col_8'>
          <p>Connect WITH your teacher</p>

          <p></p>

          <p></p>
        </div>
        <div className='grid-col grid-col_4'>
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            {/* <button className='btn btn_sizeSm' onClick={onLogin}>
              Login
            </button> */}

            <Button variant='flat' size='xl' onClick={onLogin}>
              Login
            </Button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
