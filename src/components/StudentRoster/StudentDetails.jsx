import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import './StudentDetails.css';

import { Card, Table, Button } from 'react-bootstrap';

import './StudentRoster.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function StudentRoster(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const students = useSelector((store) => store.students);
  const practiceLog = useSelector((store) => store.practiceLog);
  const details = useSelector((store) => store.logDetails);

  console.log('here are the logs from the store:', practiceLog);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  // Find the student with the matching ID from the URL
  const foundStudent = students.find(
    (student) => student.id === Number(params.studentID)
  );

  // Bail out early if there is no student loaded yet
  // add a react spinner stretch goal
  if (!foundStudent) {
    return <h1>loading...</h1>;
  }

  // Show student info
  const foundLogs = practiceLog.filter(
    (log) => log.user_id === Number(foundStudent.id)
  );

  // view practice logs that belong to that student
  // push to route /log/details/:logID
  const viewPracticeLogs = (theLog) => {
    history.push(`/log/details/${theLog.id}`);
  };

  console.log('here are the found logs:', foundLogs);
  return (
    <>
      <Card body className='contact-info-container' border='info'>
        <h3 stlye={{ textDecoration: 'underline' }}>Contact Info</h3>
        <p>
          Phone #{<br />}
          {foundStudent.phone_number}
          {<br />}
          Email
          {<br />}
          {foundStudent.email}
        </p>
      </Card>

      <Card body border='primary' className='practice-log-archive-container'>
        <h1>
          {foundStudent.first_name} {foundStudent.last_name}
        </h1>
        <h5>{foundStudent.instrument}</h5>
        <hr />
        <div>
          <p className='found-logs'>Practice logs found: {foundLogs.length}</p>
          <Table
            striped
            bordered
            hover
            variant='secondary'
            size='sm'
            className='student-details-archive-table'
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {foundLogs.map((log) => {
                console.log(`This is ${log.first_name}'s log`);
                return (
                  <tr key={log.id} value={log.id}>
                    <td>{moment(log.date_of).format('MMMM Do YYYY')}</td>

                    <td>
                      <Button onClick={() => viewPracticeLogs(log)}>
                        View
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Card>
      <Button onClick={() => history.goBack()}>⬅ Go Back</Button>
    </>
  );
}

export default StudentRoster;
