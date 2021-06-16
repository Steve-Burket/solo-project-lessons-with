import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function LessonPlanForm() {
  const errors = useSelector((store) => store.errors);
  const teachers = useSelector((store) => store.teachers);
  const students = useSelector((store) => store.students);
  const instruments = useSelector((store) => store.instruments);
  const dispatch = useDispatch();

  console.log('here is a list of instruments', instruments);

  useEffect(() => {
    dispatch({ type: 'FETCH_TEACHERS' });
    dispatch({ type: 'FETCH_INSTRUMENTS' });
  }, []);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [lessonTime, setLessonTime] = useState('');
  const [locationAt, setLocationAt] = useState('');
  const [lessonNotes, setLessonNotes] = useState('');
  const [assignment, setAssignment] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [dueAt, setdueAt] = useState('');
  const [submittedURL, setSubmitteURL] = useState('');
  const [submittedAt, setSubmittedAt] = useState('');
  const [comments, setComments] = useState('');

  console.log(teachers);

  // VIEW INSTRUCTOR FIELD
  // const displayInstructorField = (e) => {
  //   console.log('in displayInstructorField');
  //   setInstructorList(!viewInstructorList);
  // };

  const submitLessonPlan = (event) => {
    event.preventDefault();

    dispatch({
      type: 'LESSON_PLAN',
      payload: {
        first_name: firstName,
        last_name: lastName,
        lesson_time: lessonTime,
        location_at: locationAt,
        lesson_notes: lessonNotes,
        assignment: assignment,
        scheduled_at: scheduledAt,
        due_at: dueAt,
        submitted_url: submittedURL,
        submitted_at: submittedAt,
        submitted_comments: comments
      }
    });
  }; // end submitLessonPlan

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
              <option hidden>Select</option>

              {instruments.map((inst, i) => {
                return (
                  <option key={i} value={inst}>
                    {inst.instrument}
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
      {/* move to separate component eventually */}
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
              {/*Select placeholder attributes not working here for some reason => hidden selected disabled**/}

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
      </div>
      {/* move to separate component eventually */}

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

export default LessonPlanForm;
