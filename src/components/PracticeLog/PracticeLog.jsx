import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './PracticeLog.css';

// react bootstrap!
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PracticeLog() {
  const user = useSelector((store) => store.user);
  const myTeacher = useSelector((store) => store.myTeacher);
  const dispatch = useDispatch();

  // LOCAL STATE
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [topic, setTopic] = useState('');
  const [improvedOn, setImprovedOn] = useState('');
  const [weakPoints, setWeakPoints] = useState('');
  const [questions, setQuestions] = useState('');

  // handle submit of practice log
  // POST to the DB
  const submitPracticeLog = (event) => {
    console.log('in submitPracticeLog');
    event.preventDefault();

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

  return (
    <>
      <Card body border='primary' className='practice-log-container'>
        <h2>What did you practice today, {user.first_name}?</h2>
        <hr />
        <div>
          <h4>Practice Log</h4>
          <Form
            className='practice-log-form'
            onSubmit={submitPracticeLog}
            value={user.id}
          >
            <Form.Group controlId='input-date'>
              <Form.Label>Date:</Form.Label>
              <Form.Control
                placeholder='DD/MM/YYYY'
                type='text'
                name='date'
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </Form.Group>

            <br />

            <Form.Group controlId='input-duration'>
              <Form.Label>
                Duration:
                <Form.Control
                  placeholder='In minutes'
                  type='text'
                  name='duration'
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                />
              </Form.Label>
            </Form.Group>

            <br />

            <Form.Group controlId='input'>
              <Form.Label>What did you practice:</Form.Label>
              <Form.Control
                placeholder='Today, I practiced...'
                type='text'
                name='topic'
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
              />
            </Form.Group>

            <br />

            <Form.Group controlId='input'>
              <Form.Label>What went well:</Form.Label>
              <Form.Control
                placeholder='I have gotten better at...'
                type='text'
                name='improved_on'
                value={improvedOn}
                onChange={(event) => setImprovedOn(event.target.value)}
              />
            </Form.Group>

            <br />

            <Form.Group controlId='input'>
              <Form.Label>What you would like to improve on:</Form.Label>
              <Form.Control
                placeholder='I need to practice...'
                type='text'
                name='weak_points'
                value={weakPoints}
                onChange={(event) => setWeakPoints(event.target.value)}
              />
            </Form.Group>

            <br />

            <Form.Group controlId='text-area'>
              <Form.Label> Questions for {myTeacher.first_name}:</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Ask anything'
                type='text'
                name='questions'
                value={questions}
                onChange={(event) => setQuestions(event.target.value)}
              />
            </Form.Group>

            <br />

            <input className='btn' type='submit' name='submit' value='Save' />
          </Form>
        </div>
      </Card>
    </>
  );
}

export default PracticeLog;
