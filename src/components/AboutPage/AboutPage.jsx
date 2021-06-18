import React from 'react';
import './AboutPage.css';

import Card from 'react-bootstrap/Card';
// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className='container'>
      <Card body border='info' className='about-container'>
        <div>
          <h1>About LessonsWith</h1>
          <hr/>
          <br/>
          <p>
            Founded in 2021, LessonsWith was created out of the need for a
            teacher to connect with students. There are many resources on the
            web for a teacher to connect with a student but this site is
            intended to be a one-stop-shop for all needs in helping a student
            reach their musical goals.
            <br />
            <br />
            At LessonsWith, top-notch education is our goal and we want to
            provide the resources a teacher needs to help assist their students
            in learning. There is a Practice Log feature for a student to fill
            out and submit to the teacher as a way to track progress. Once
            submitted, a student can go to the Log Archive to view all of the
            their logs. A teacher has a Student Roster where they can see all of
            the students and select a student to see their details. In future
            versions, there will be a Lesson Plan feature where the teacher can
            create a schedule and assignments for the student. It is our aim, to
            help faciliate in connecting you with your aspirations!
            <br />
            <br />
            Play on!
            <br />- Steve Burket, founder
          </p>
        </div>
      </Card>
    </div>
  );
}

export default AboutPage;
