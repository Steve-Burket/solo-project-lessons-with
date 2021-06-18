import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './StudentRoster.css';

// table from react bootstrap
import { Table, Card, Button } from 'react-bootstrap';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function StudentRoster(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const students = useSelector((store) => store.students);
  const practiceLog = useSelector((store) => store.practiceLog);

  const dispatch = useDispatch();
  const history = useHistory();

  console.log(students);

  // const instruments = ['Guitar'];

  // View student's list of practice log
  const viewStudentDetails = (studentID) => {
    // we want to target the student clicked on
    // by ID and render the logs that belong to them
    // dispatch({
    //   type: 'FETCH_PRACTICE_LOG',
    //    payload: studentId
    // });
    history.push(`/student/details/${studentID}`);
  };

  return (
    <div>
      <Card body className='student-roster' border='primary'>
        <h2>Student Roster</h2>
        <hr/>
        <Table striped bordered hover variant='secondary' size='sm'>
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
                    <Button onClick={() => viewStudentDetails(student.id)}>
                      View
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

export default StudentRoster;
