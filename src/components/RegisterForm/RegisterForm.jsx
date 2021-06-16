import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// BOOTSTRAP!
import Form from 'react-bootstrap/Form';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

function RegisterForm() {
  const errors = useSelector((store) => store.errors);
  const teachers = useSelector((store) => store.teachers);
  // const instruments = useSelector((store) => store.instruments);
  const dispatch = useDispatch();

  console.log('here are the instruments', instruments);

  console.log('here is a list of instruments', instruments);

  useEffect(() => {
    dispatch({ type: 'FETCH_TEACHERS' });
    dispatch({ type: 'FETCH_INSTRUMENTS' });
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
  const [instrument, setInstrument] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isInstructor, setIsInstructor] = useState(true);
  const [isNotInstructor, setIsNotInstructor] = useState(true);
  const [instructorIs, setInstructorIs] = useState(0);
  const [viewInstructorList, setInstructorList] = useState(false);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('foo');

  const radios = [
    { name: 'Student', value: 'student' },
    { name: 'Teacher', value: 'teacher' }
  ];

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
    <Form className='formPanel' onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className='alert' role='alert'>
          {errors.registrationMessage}
        </h3>
      )}

      <Form.Group controlId='formFirstName'>
        <Form.Label>First:</Form.Label>
        <Form.Control
          placeholder='First name'
          type='text'
          name='firstname'
          value={firstName}
          required
          onChange={(event) => setFirstName(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId='formLastName'>
        <Form.Label>Last:</Form.Label>
        <Form.Control
          placeholder='Last name'
          type='text'
          name='lastname'
          value={lastName}
          required
          onChange={(event) => setLastName(event.target.value)}
        />
      </Form.Group>

      {/* <div>
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
      </div> */}

      <Form.Group controlId='formFirstName'>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          placeholder='email'
          type='text'
          name='email'
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />
      </Form.Group>
      {/* <div>
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
      </div> */}

      <Form.Group controlId='formFirstName'>
        <Form.Label>Phone:</Form.Label>
        <Form.Control
          placeholder='ex. 555-555-5555'
          type='text'
          name='phone_number'
          value={phoneNumber}
          required
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
      </Form.Group>
      {/* <div>
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
      </div> */}

      <Form.Group controlId='instruments'>
        <Form.Label>Instrument:</Form.Label>
        <Form.Control
          name='instruments'
          name='instrument'
          value={instrument}
          required
          onChange={(event) => setInstrument(event.target.value)}
          as='select'
          custom
        >
          <option hidden>Select</option>

          {instruments.map((inst, i) => {
            return (
              <option key={i} value={inst}>
                {inst}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
      {/* <div>
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
              <option hidden>Select</option>

              {instruments.map((inst, i) => {
                return (
                  <option key={i} value={inst}>
                    {inst}
                  </option>
                );
              })}
            </select>
          </label>
        </div> */}

      <Form.Group controlId='formUserName'>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          placeholder='Username'
          type='text'
          name='username'
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Group>

      {/* <div>
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
      </div> */}

      <Form.Group controlId='formPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          placeholder='Password'
          type='password'
          name='password'
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>

      {/* <div>
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
      </div> */}

      {viewInstructorList && (
        <Form.Group controlId='formInstructorIs'>
          <Form.Label>Instructor:</Form.Label>
          <Form.Control
            type='instructor_is'
            name='instructor_is'
            value={instructorIs}
            required
            onChange={(event) => setInstructorIs(event.target.value)}
            as='select'
            custom
          >
            <option hidden>Select</option>
            {teachers.map((teach) => {
              console.log(teach.first_name, teach.last_name);
              return (
                <option key={teach.id} value={teach.id}>
                  {teach.first_name} {teach.last_name}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
      )}

      {/* move to separate component eventually */}
      {/* <div>
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
              <option hidden>Select</option>
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
      </div> */}
      {/* move to separate component eventually */}

      {/* <ToggleButtonGroup
        defaultValue={false}
        type='radio'
        name='radio'
        // value={value}
        // checked={isInstructor === radio.value}
        onChange={(e) => setIsInstructor(e.currentTarget.value)}
      >
        <ToggleButton value={false} onClick={displayInstructorField}>
          Student
        </ToggleButton>
        <ToggleButton value={true}>Teacher</ToggleButton>
      </ToggleButtonGroup> */}

      {/* <Form.Group controlId='formStudentSelect'>
        <Form.Control
          type='radio'
          name='is_instructor'
          value='false'
          required
          onChange={(event) => setIsInstructor(event.target.value)}
        />

        {radios.map((radio, index) => (
          <ToggleButton
            onClick={displayInstructorField}
            key={index}
            type='radio'
            name='radio'
            value={radio.value}
            checked={isInstructor === radio.value}
            onChange={(e) => setIsInstructor(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
        {['radio'].map((type) => (
          <div key={`custom-${type}`} className='radio-btn'>
            <Form.Check
              custom
              type={type}
              id={`custom-${type}`}
              label={`Student ${type}`}
            />

            <Form.Check />
          </div>
        ))}
      </Form.Group> */}

      {/* <ButtonGroup toggle> */}
      {/* {radios.map((radio, index) => (
      //   <ToggleButton
      //     key={index}
      //     type='radio'
      //     name='radio'
      //     value={radio.value}
      //     checked={radioValue === radio.value}
      //     onChange={(e) => setRadioValue(e.currentTarget.value)}
      //   >
      //     {radio.name}
      //   </ToggleButton>
      // ))} */}
      {/* </ButtonGroup> */}

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

      {/* <Form.Group controlId='formTeacher'>
        <Form.Label>First:</Form.Label>
        <Form.Control
          type='radio'
          name='is_instructor'
          value={isInstructor}
          required
          onChange={(event) => setIsInstructor(event.target.value)}
        />
      </Form.Group> */}

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
    </Form>
  );
}

export default RegisterForm;
