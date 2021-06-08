import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './StudentRoster.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function StudentRoster(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const users = useSelector((store) => store.users);
  const [heading, setHeading] = useState('Student Roster');
  const [addStudent, setAddStudent] = useState('');

  const studentList = ['Johnny Smith', 'Owen Goodman', 'John Johnson'];
  const studentInstrument = ['Guitar'];

  // ADD A STUDENT
  const addStudentForm = (e) => {

  }

  return (
    <div>
      <h2>{heading}</h2>
      <button onClick={addStudentForm}>+ Add Student</button>
      {/* Will eventually move Form to it's own Component*/}
      <form></form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Instrument</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {studentList.map((student, i, k) => {
              return (
                <tr>
                  <td key={i}>{student}</td>
                  {studentInstrument.map((instrument, j) => {
                    return <td key={j}>{instrument}</td>;
                  })}
                  <td>
                    <button key={k}>View</button>
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
