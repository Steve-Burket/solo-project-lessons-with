import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LogArchive from './LogArchive';
import EditLogForm from './EditLogForm';

export default function LogDetails() {
  const practiceLog = useSelector((store) => store.practiceLog);
  const logDetails = useSelector((store) => store.logDetails);
  const user = useSelector((store) => store.user);

  // Local State
  const [viewPracticeLogForm, setViewPracticeLogForm] = useState(false);
  const [viewDeleteButton, setViewDeleteButton] = useState(false);

  console.log('Here are the log details', logDetails);

  // Hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  // load data on render
  useEffect(() => {
    // target individual log by params ID
    const logID = params;

    // filter through full log list
    // to pull out one that matches the ID
    const foundLog = practiceLog.filter((log) => log.id === logID);

    // condition checking if the found log length
    // is greater than zero dispatch to log details reducer
    if (foundLog.length > 0) {
      dispatch({
        type: 'FETCH_PRACTICE_LOG_DETAILS',
        payload: foundLog[0]
      });
    }
  }, [dispatch]);

  // function to delete a log
  const deleteLog = () => {
    // alert needs to be fixed so it will follow through with
    // delete if alert box is clicked yes
    alert(
      'Are you sure you would like to delete this log? Once deleted it can not be retrieved again.'
    );

    dispatch({
      type: 'DELETE_LOG',
      payload: logDetails.id
    });
    history.push(`/log_archive`);
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

  // function to update a log
  const editLog = () => {
    dispatch({
      type: 'UPDATE_LOG',
      payload: logDetails.id
    });
    history.push(`/details/${logDetails.id}`);
  };

  return (
    <div>
      <LogArchive />
      <h1>{logDetails.first_name}'s Practice Log</h1>
      <section className='practice-log-container'>
        <div key={logDetails.id}>
          <ul value={logDetails.date_of}>
            <li>
              Date: {logDetails.date_of}
              <br />
              <br />
              Duration: {logDetails.practice_length}
              <br />
              <br />
              Topic: {logDetails.topic}
              <br />
              <br />
              Improved on: {logDetails.improved_on}
              <br />
              <br />
              Needs work: {logDetails.weak_points}
              <br />
              <br />
              Questions: {logDetails.questions}
              <br />
              <br />
            </li>
          </ul>
        </div>

        {user.is_instructor === false && (
          <button onClick={editLog} onClick={displayDeleteButton}>
            Edit Log
          </button>
        )}
        {viewDeleteButton && user.is_instructor === false && (
          <button onClick={deleteLog}>Delete Log</button>
        )}
      </section>
      {viewPracticeLogForm && <EditLogForm />}
    </div>
  );
}
