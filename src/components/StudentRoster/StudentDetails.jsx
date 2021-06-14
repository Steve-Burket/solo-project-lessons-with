import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PracticeLog from '../PracticeLog/PracticeLog';

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

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  // Find the student with the matching ID from the URL
  const foundStudent = students.find(
    (student) => student.id === Number(params.studentID)
  );

  // Bail out early if there is no student loaded yet
  if (!foundStudent) {
    return <h1>loading...</h1>;
  }

  // Show student info
  const foundLogs = practiceLog.filter(
    (log) => log.user_id === Number(foundStudent.id)
  );

  console.log('here are the found logs:', foundLogs);
  return (
    <>
      <h1>Student Details: {foundStudent.id}</h1>
      {foundLogs.length} practice logs found:
      <div>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Instrument</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {practiceLog.map((log) => {
              console.log(`This is ${log.first_name}'s log`);
              return (
                <tr key={log.id} value={log.id}>
                  <td>
                    {log.first_name} {log.last_name}
                  </td>
                  <td>{log.instrument}</td>
                  <td>{moment(log.date_of).format('MMMM Do YYYY')}</td>

                  <td>
                    <button onClick={() => viewPracticeLogs(log)}>View</button>
                  </td>
                </tr>
              );
            })} */}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StudentRoster;
