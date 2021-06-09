import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './StudentRoster.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function StudentRoster(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const users = useSelector((store) => store.users);
  const dispatch = useDispatch();

  const [heading, setHeading] = useState('Student Roster');
  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLasttName] = useState('');
  const [studentInstrument, setStudentInstrument] = useState('');
  const [viewAddForm, setAddForm] = useState(false);
  // const [studentList, setStudentList] = useState('');

  const studentList = ['Johnny Smith', 'Owen Goodman', 'John Johnson'];
  const instruments = ['Guitar'];

  // VIEW ADD A STUDENT FORM
  const displayAddStudentForm = (e) => {
    console.log('in displayAddStudentForm');
    setAddForm(!viewAddForm);
  };

  // handle submit to save student to roster
  // take in fields of First name, Last name
  // and Instrument
  const handleSubmit = (event) => {
    event.preventDefault();

    let addStudent = {
      studentFirstName,
      studentLastName,
      studentInstrument
    };

    // studentList = addStudent;

    // clear inpust fields
    setStudentFirstName('');
    setStudentLasttName('');
    setStudentInstrument('');
  };

  return (
    <div>
      <h2>{heading}</h2>
      <button onClick={displayAddStudentForm}>+ Add Student</button>
      {/* Will eventually move Form to it's own Component*/}
      <div>
        {viewAddForm && (
          <form onSubmit={handleSubmit}>
            <input
              placeholder='First name'
              value={studentFirstName}
              onChange={(e) => setStudentFirstName(e.target.value)}
            />
            <input
              placeholder='Last name'
              value={studentLastName}
              onChange={(e) => setStudentLasttName(e.target.value)}
            />
            <input
              placeholder='Instrument'
              value={studentInstrument}
              onChange={(e) => setStudentInstrument(e.target.value)}
            />
            <input type='submit' value='Save' />
          </form>
        )}
      </div>
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
                {instruments.map((instrument, j) => {
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
