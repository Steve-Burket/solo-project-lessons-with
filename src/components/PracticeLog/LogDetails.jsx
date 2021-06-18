import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LogArchive from './LogArchive';
import EditLogForm from './EditLogForm';
import moment from 'moment';
import './LogDetails.css';

// react bootstrap!
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';

export default function LogDetails() {
  const practiceLog = useSelector((store) => store.practiceLog);
  const user = useSelector((store) => store.user);

  // Local State
  const [viewPracticeLogForm, setViewPracticeLogForm] = useState(false);
  const [viewDeleteButton, setViewDeleteButton] = useState(false);
  const [open, setOpen] = useState(false);

  // Hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  console.log('here are the params:', params);

  const foundLog = practiceLog.find((log) => {
    console.log(log);
    console.log(params.logID);
    return log.id === Number(params.logID);
  });

  console.log('here is the found log:', foundLog);

  // function to delete a log
  const deleteLog = () => {
    // alert needs to be fixed so it will follow through with
    // delete if alert box is clicked yes

    let remove = confirm(
      'Are you sure you would like to delete this log? Once deleted it can not be retrieved again.'
    );
    if (remove == true) {
      dispatch({
        type: 'DELETE_LOG',
        payload: foundLog.id
      });
      history.push(`/log/archive`);
    } else {
      return;
    }
  };

  // Conditionally render VIEW Practice Log Form
  const displayPracticeLogForm = (e) => {
    console.log('in displayPracticeLogForm');
    setViewPracticeLogForm(!viewPracticeLogForm);
  };

  // VIEW Delete Log Button
  const displayDeleteButton = (e) => {
    displayPracticeLogForm();
    console.log('in displayDeleteButton');
    setViewDeleteButton(!viewDeleteButton);
  };

  if (!foundLog) {
    return <h1>loading...</h1>;
  }
  return (
    <>
      <div>
        {/* <LogArchive /> */}
        <Button onClick={() => history.goBack()}>⬅ Go Back</Button>

        <Card
          class='row align-items-center'
          class='col-md-8 offset-md-2'
          body
          className='log-details-container'
          border='primary'
        >
          <h1>{foundLog.first_name}'s Practice Log</h1>

          <hr />

          <div key={foundLog.id}>
            <ul value={foundLog.date_of}>
              <li>
                Date:
                <br />
                {moment(foundLog.date_of).format('MMMM Do YYYY')}
                <br />
                <br />
                Duration:
                <br />
                {foundLog.practice_length} minutes
                <br />
                <br />
                Topic:
                <br />
                {foundLog.topic}
                <br />
                <br />
                Improved on:
                <br />
                {foundLog.improved_on}
                <br />
                <br />
                Needs work:
                <br />
                {foundLog.weak_points}
                <br />
                <br />
                Questions:
                <br />
                {foundLog.questions}
              </li>
            </ul>
          </div>
          {user.is_instructor === false && (
            <Button
              onClick={(() => setOpen(!open), displayDeleteButton)}
              aria-controls='show-edit-form'
              aria-expanded={open}
            >
              Edit Log
            </Button>
          )}
          {viewDeleteButton && user.is_instructor === false && (
            <Button onClick={deleteLog}>Delete Log</Button>
          )}
        </Card>
        {viewPracticeLogForm && <EditLogForm practiceLog={foundLog} />}
      </div>
    </>
  );
}
