import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './LoginForm.css'

// BOOTSTRAP!
import { Form, Button } from 'react-bootstrap';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password
        }
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Form className='formPanel' onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className='alert' role='alert'>
          {errors.loginMessage}
        </h3>
      )}

      <Form.Group controlId='formLastName'>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          className='smaller-input'
          type='text'
          name='username'
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId='formLastName'>
        <Form.Label> Password:</Form.Label>
        <Form.Control
          className='smaller-input'
          type='text'
          type='password'
          name='password'
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>

      <div>
        <Button className='btn' type='submit' name='submit' value='Log In'>
          Log In
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;
