import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

export default function LogArchive() {
  // const [archive, setArchive] = useState([]);

  // function refreshLog() {
  //   const log = [];
  //   console.log(log);
  //   setArchive((archive) => [...archive, log]);
  // }

  // Reducer Store
  const practiceLog = useSelector((store) => store.practiceLog);
  const details = useSelector((store) => store.logDetails);
  console.log([practiceLog]);

  // HOOKS
  const history = useHistory();
  const dispatch = useDispatch();

  // Render List of Logs by Name, Instrument, and Date
  useEffect(() => {
    dispatch({ type: 'FETCH_PRACTICE_LOG' });
    dispatch({ type: 'FETCH_STUDENT_PRACTICE_LOG' });

    // refreshLog();
  }, []);

  // Fetch practice log that is clicked on
  const fetchPracticeLog = (log) => {
    dispatch({
      type: 'FETCH_PRACTICE_LOG_DETAILS',
      payload: log
    });
    history.push(`details/${details.id}`);
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
                  <td>{log.date_of}</td>

                  <td>
                    <button onClick={() => fetchPracticeLog(log)}>View</button>
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
