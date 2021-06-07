import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className='formPanel' onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className='alert' role='alert'>
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor='firstname'>
          <input
            placeholder='First name'
            type='text'
            name='firstname'
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor='lastname'>
          <input
            placeholder='Last name'
            type='text'
            name='lastname'
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      {/* </div>
      <div>
        <label htmlFor='username'>
          <input
            placeholder='email'
            type='text'
            name='username'
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      {/* </div>
      <div>
        <label htmlFor='username'>
          <input
            placeholder='Phone #'
            type='text'
            name='username'
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div> */} 
        {/* <div>
          <label htmlFor='username'>
            <input
            placeholder='Instrument'
              type='text'
              name='username'
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div> */}
        <label htmlFor='username'>
          <input
          placeholder='Username'
            type='text'
            name='username'
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor='password'>
          <input
          placeholder='Password'
            type='password'
            name='password'
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className='btn' type='submit' name='submit' value='Register' />
      </div>
    </form>
  );
}

export default RegisterForm;
