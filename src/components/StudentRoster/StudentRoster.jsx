import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './StudentRoster.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function StudentRoster(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const students = useSelector((store) => store.students);
  const practiceLog = useSelector((store) => store.practiceLog);
  
  const dispatch = useDispatch();

  // useEffect to render student list
  useEffect(() => {
    dispatch({ type: 'FETCH_STUDENTS' });
  }, []);

  console.log(students);

  const [heading, setHeading] = useState('Student Roster');

  // const instruments = ['Guitar'];

  // View student's list of practice log
  const viewPracticeLogs = (e) => {
    // we want to target the student clicked on
    // by ID and render the logs that belong to them
     dispatch({
       type: 'FETCH_PRACTICE_LOG_DETAILS',
      //  payload: log
     });
     history.push(`details/${practiceLog.id}`);

  };

  return (
    <div>
      <h2>{heading}</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Instrument</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            return (
              <tr key={student.id}>
                <td>
                  {student.first_name} {student.last_name}
                </td>
                <td>{student.instrument}</td>
                <td>
                  <button key={practiceLog.id} onClick={(e) => viewPracticeLogs(e)}>
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StudentRoster;
