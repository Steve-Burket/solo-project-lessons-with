import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LogArchive from './LogArchive';
import EditLogForm from './EditLogForm';
import moment from 'moment';

export default function LogDetails() {
  const practiceLog = useSelector((store) => store.practiceLog);
  // const logDetails = useSelector((store) => store.logDetails);
  const user = useSelector((store) => store.user);

  // Local State
  const [viewPracticeLogForm, setViewPracticeLogForm] = useState(false);
  const [viewDeleteButton, setViewDeleteButton] = useState(false);

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
    <div>
      {/* <LogArchive /> */}
      <h1>{foundLog.first_name}'s Practice Log</h1>
      <section className='practice-log-container'>
        <div key={foundLog.id}>
          <ul value={foundLog.date_of}>
            <li>
              Date: {moment(foundLog.date_of).format('MMMM Do YYYY')}
              <br />
              <br />
              Duration: {foundLog.practice_length}
              <br />
              <br />
              Topic: {foundLog.topic}
              <br />
              <br />
              Improved on: {foundLog.improved_on}
              <br />
              <br />
              Needs work: {foundLog.weak_points}
              <br />
              <br />
              Questions: {foundLog.questions}
              <br />
              <br />
            </li>
          </ul>
        </div>

        {user.is_instructor === false && (
          <button onClick={displayDeleteButton}>Edit Log</button>
        )}
        {viewDeleteButton && user.is_instructor === false && (
          <button onClick={deleteLog}>Delete Log</button>
        )}
      </section>
      {viewPracticeLogForm && <EditLogForm practiceLog={foundLog} />}
    </div>
  );
}
