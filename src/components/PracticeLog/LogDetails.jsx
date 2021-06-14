import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import LogArchive from './LogArchive';

export default function LogDetails() {
  const practiceLog = useSelector((store) => store.practiceLog);
  const logDetails = useSelector((store) => store.logDetails);

  console.log(logDetails);

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
     dispatch({ type: 'FETCH_PRACTICE_LOG' });
  }, []);

  return (
    <div>
      <LogArchive />
      <h1>{logDetails.first_name}'s Practice Log</h1>
      <section>
        <div key={logDetails.id}>
          <ul className='practice-log-container' value={logDetails.date_of}>
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
      </section>
    </div>
  );
}
