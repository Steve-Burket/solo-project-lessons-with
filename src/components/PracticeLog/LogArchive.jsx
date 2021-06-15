import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import moment from 'moment';
import LogDetails from './LogDetails';

export default function LogArchive() {
  // Reducer Store
  const practiceLog = useSelector((store) => store.practiceLog);
  // const details = useSelector((store) => store.logDetails);
  const user = useSelector((store) => store.user);
  console.log(practiceLog);
  // console.log('here are the log details:', details);

  // HOOKS
  const history = useHistory();
  const dispatch = useDispatch();
  // const params = useParams();

  // Fetch practice log that is clicked on
  const fetchPracticeLogs = (log) => {
    // dispatch({
    //   type: 'FETCH_PRACTICE_LOG_DETAILS',
    //   payload: log
    // });
    history.push(`/log/details/${log.id}`);
  };

  return (
    <>
      <h1>Select To View Log</h1>
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
            {practiceLog.map((log) => {
              console.log(`This is ${log.first_name}'s log`);
              return (
                <tr key={log.id} value={log.id}>
                  <td>
                    {log.first_name} {log.last_name}
                  </td>
                  <td>{log.instrument}</td>
                  <td>{moment(log.date_of).format('MMMM Do YYYY')}</td>

                  <td>
                    <button onClick={() => fetchPracticeLogs(log)}>View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
