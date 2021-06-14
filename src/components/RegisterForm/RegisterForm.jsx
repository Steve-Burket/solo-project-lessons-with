import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const errors = useSelector((store) => store.errors);
  const teachers = useSelector((store) => store.teachers);
  // const instruments = useSelector((store) => store.instruments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_TEACHERS' });
  }, []);

  // hard coded instruments for now
  // will bring in DB later
  const instruments = [
    'Guitar',
    'Mandolin',
    'Bass',
    'Ukulele',
    'Vocals',
    'Piano',
    'Drums'
  ];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [instrument, setInstrument] = useState('Select');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isInstructor, setIsInstructor] = useState(true);
  const [instructorIs, setInstructorIs] = useState(0);
  const [viewInstructorList, setInstructorList] = useState(false);

  console.log(teachers);

  // VIEW INSTRUCTOR FIELD
  const displayInstructorField = (e) => {
    console.log('in displayInstructorField');
    setInstructorList(!viewInstructorList);
  };

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        instrument: instrument,
        username: username,
        password: password,
        is_instructor: isInstructor,
        instructor_is: instructorIs
      }
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
          First:
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
          Last:
          <input
            placeholder='Last name'
            type='text'
            name='lastname'
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor='email'>
          Email:
          <input
            placeholder='email'
            type='text'
            name='email'
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor='phone_number'>
          Phone:
          <input
            placeholder='ex. 555-555-5555'
            type='text'
            name='phone_number'
            value={phoneNumber}
            required
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </label>
      </div>
      <div>
        <div>
          <label htmlFor='instrument'>
            Instrument:
            <select
              name='instruments'
              id='instruments'
              name='instrument'
              value={instrument}
              required
              onChange={(event) => setInstrument(event.target.value)}
            >
              <option disabled hidden>
                Select
              </option>
              {instruments.map((inst, i) => {
                return (
                  <option key={i} value={inst}>
                    {inst}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <label htmlFor='username'>
          Username:
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
          Password:
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
        {viewInstructorList && (
          <label htmlFor='instructor_is'>
            Instructor:
            <select
              type='instructor_is'
              name='instructor_is'
              value={instructorIs}
              required
              onChange={(event) => setInstructorIs(event.target.value)}
            >
              <option>
                {' '}
                {/*Select placeholder attributes not working here for some reason hidden selected disabled**/}
                Select
              </option>
              {teachers.map((teach) => {
                console.log(teach.first_name, teach.last_name);
                return (
                  <option key={teach.id} value={teach.id}>
                    {teach.first_name} {teach.last_name}
                  </option>
                );
              })}
            </select>
          </label>
        )}
      </div>

      <div>
        <label htmlFor='is_instructor'>
          <input
            onClick={displayInstructorField}
            type='radio'
            id='student'
            name='is_instructor'
            value='false'
            required
            onChange={(event) => setIsInstructor(event.target.value)}
          />
          Student
        </label>
      </div>
      <div>
        <label htmlFor='is_instructor'>
          <input
            type='radio'
            id='teacher'
            name='is_instructor'
            value={isInstructor}
            required
            onChange={(event) => setIsInstructor(event.target.value)}
          />
          Teacher
        </label>
      </div>
      <div>
        <input className='btn' type='submit' name='submit' value='Register' />
      </div>
    </form>
  );
}

export default RegisterForm;
