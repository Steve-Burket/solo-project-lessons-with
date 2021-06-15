import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function EditLogForm(props) {
  const user = useSelector((store) => store.user);
  // const logDetails = useSelector((store) => store.logDetails);
  const logDetails = props.practiceLog;
  const dispatch = useDispatch();
  const history = useHistory();

  // LOCAL STATE
  const [date, setDate] = useState(
    moment(logDetails.date_of).format('MM/DD/YYYY')
  );
  const [duration, setDuration] = useState(logDetails.practice_length);
  const [topic, setTopic] = useState(logDetails.topic);
  const [improvedOn, setImprovedOn] = useState(logDetails.improved_on);
  const [weakPoints, setWeakPoints] = useState(logDetails.weak_points);
  const [questions, setQuestions] = useState(logDetails.questions);

  console.log(
    'Here is the practice length',
    logDetails.practice_length,
    duration
  );

  // handle edit of practice log
  // PUT to the DB
  const updatePracticeLog = (event) => {
    console.log('practice duration: ', duration);
    event.preventDefault();

    alert('Your Practice Log has been updated');

      dispatch({
        type: 'UPDATE_LOG',
        payload: {
          date_of: date,
          practice_length: duration,
          topic: topic,
          improved_on: improvedOn,
          weak_points: weakPoints,
          questions: questions,
          id: logDetails.id
        }
      });

    // clear input fields
    setDate('');
    setDuration('');
    setTopic('');
    setImprovedOn('');
    setWeakPoints('');
    setQuestions('');

    // bring back to archive view
    history.push(`/log/archive`);
  }; // end handle submit

  return (
    <>
      <h2>What would you like to edit, {user.first_name}?</h2>
      <div className='practice-log'>
        <h3>Practice Log</h3>
        <form onSubmit={updatePracticeLog} value={logDetails.id}>
          <label htmlFor='date'>
            Date:
            <input
              placeholder='DD/MM/YYYY'
              type='text'
              name='date'
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>
          <br />
          <label htmlFor='duration'>
            Duration:
            <input
              type='text'
              name='duration'
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
            />
            minutes
          </label>
          <br />
          <label htmlFor='topic'>
            What did you practice:
            <br />
            <input
              placeholder={logDetails.topic}
              type='text'
              name='topic'
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
            />
          </label>
          <br />
          <label htmlFor='improved_on'>
            What went well:
            <br />
            <input
              placeholder={logDetails.improved_on}
              type='text'
              name='improved_on'
              value={improvedOn}
              onChange={(event) => setImprovedOn(event.target.value)}
            />
          </label>
          <br />
          <label htmlFor='weak_points'>
            What you would like to improve on:
            <input
              placeholder={logDetails.weak_points}
              type='text'
              name='weak_points'
              value={weakPoints}
              onChange={(event) => setWeakPoints(event.target.value)}
            />
          </label>
          <br />
          <label htmlFor='questions'>
            Questions for your teacher:
            <input
              placeholder={logDetails.questions}
              type='text'
              name='questions'
              value={questions}
              onChange={(event) => setQuestions(event.target.value)}
            />
          </label>
          <br />
          <input className='btn' type='submit' name='submit' value='Save' />
          <input className='btn' type='cancel' name='cancel' defaultValue='Cancel' onClick={() => history.push(`/log/details/${logDetails.id}`)}/>
        </form>
      </div>
    </>
  );
}

export default EditLogForm;
