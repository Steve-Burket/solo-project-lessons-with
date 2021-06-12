import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

export default function LogArchive() {
  // Reducer Store
  const practiceLog = useSelector((store) => store.practiceLog);
  console.log(practiceLog);

  // HOOKS
  const history = useHistory();
  const dispatch = useDispatch();

  // Render List of Logs by Date
  useEffect(() => {
    dispatch({ type: 'FETCH_PRACTICE_LOG' });
    dispatch({ type: 'FETCH_STUDENT_PRACTICE_LOG' });
  }, []);

  // Fetch practice log that is clicked on
  const fetchPracticeLog = (log) => {
    dispatch({
      type: 'FETCH_PRACTICE_LOG_DETAILS',
      payload: log
    });
    history.push(`details/${practiceLog.id}`);
  };

  return (
    <>
      <h1>Select a Date To View Log</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {practiceLog.map((log, i) => {
              console.log(log.id);
              return (
                <tr key={i} value={practiceLog.id}>
                  <td>
                    {log.first_name} {log.last_name}
                  </td>
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
