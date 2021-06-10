import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './PracticeLog.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PracticeLog() {
  const practiceLog = useSelector((store) => store.practiceLog);
  console.log(practiceLog);

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // LOCAL STATE
  const [heading, setHeading] = useState('Functional Component');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [topic, setTopic] = useState('');
  const [improvedOn, setImprovedOn] = useState('');
  const [weakPoints, setWeakPoints] = useState('');
  const [questions, setQuestions] = useState('');

  // handle submit of practice log
  // POST to the DB
  const submitPracticeLog = (e) => {
    console.log('in submitPracticeLog');
    e.preventDefault();

    dispatch({
      type: 'SUBMIT_PRACTICE_LOG',
      payload: {
        date_of: date,
        practice_length: duration,
        topic: topic,
        improved_on: improvedOn,
        weak_points: weakPoints,
        questions: questions
      }
    });

    // clear input fields
    setDate('');
    setDuration('');
    setTopic('');
    setImprovedOn('');
    setWeakPoints('');
    setQuestions('');
  }; // end handle submit

  useEffect(() => {
    dispatch({ type: 'FETCH_PRACTICE_LOG' });
  }, []);

  const fetchPracticeLog = (log) => {
    dispatch({
      type: 'FETCH_PRACTICE_LOG',
      payload: log
    });
  };

  return (
    <>
      <div>
        <div>
          <h4>View Practice Log</h4>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {practiceLog.map((log, i) => {
                console.log(log.date_of);
                return (
                  <tr>
                    <td key={i}>{log.date_of}</td>
                    <td>
                      <button value={log.user_id} onClick={() => fetchPracticeLog(log)}>
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className='practice-log-container'>{JSON.stringify(practiceLog)}</div>
        
        {/* <table>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
        </table> */}
      </div>
      <div className='practice-log'>
        <h3>Practice Log</h3>
        <form onSubmit={submitPracticeLog} value={user.id}>
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
              placeholder='Duration'
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
              placeholder='Practiced'
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
              placeholder='What has gotten easier'
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
              placeholder='Needs practice?'
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
              placeholder='Ask anything'
              type='text'
              name='questions'
              value={questions}
              onChange={(event) => setQuestions(event.target.value)}
            />
          </label>
          <br />
          <input className='btn' type='submit' name='submit' value='Save' />
        </form>
      </div>
    </>
  );
}

export default PracticeLog;
