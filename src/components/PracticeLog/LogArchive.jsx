import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import moment from 'moment';
import LogDetails from './LogDetails';

import './LogArchive.css';

// react bootstrap!
import { Button, Table, Card } from 'react-bootstrap';

export default function LogArchive() {
  // Reducer Store
  const practiceLog = useSelector((store) => store.practiceLog);
  // const details = useSelector((store) => store.logDetails);
  const user = useSelector((store) => store.user);
  console.log(practiceLog);

  // HOOKS
  const history = useHistory();
  const dispatch = useDispatch();

  if (user.is_instructor != true) {
  useEffect(() => { 
    dispatch({ type: 'FETCH_STUDENT_PRACTICE_LOG' });
  }, []);
}



  // Fetch practice log that is clicked on
  const fetchPracticeLogs = (log) => {
    history.push(`/log/details/${log.id}`);
  };

  function isStudent() {
    if (user.is_instructor === false) {
      return (
        <div>
          <Button onClick={() => history.goBack()}>⬅ Go Back</Button>
          <Card body className='student-archive' border='primary'>
            <h1>Select To View Log</h1>
            <hr />
            <p className='found-logs'>
              Practice logs found: {practiceLog.length}
            </p>
            <Table striped bordered hover variant='secondary' size='sm'>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Topic</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {practiceLog.map((log) => {
                  console.log(`This is ${log.first_name}'s log`);
                  return (
                    <tr key={log.id} value={log.id}>
                      <td>{moment(log.date_of).format('MMMM Do YYYY')}</td>
                      <td>{log.topic}</td>

                      <td>
                        <Button onClick={() => fetchPracticeLogs(log)}>
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
    } else {
      return (
        <div>
          <Button onClick={() => history.goBack()}>⬅ Go Back</Button>
          <Card body className='student-archive' border='primary'>
            <h1>Select To View Log</h1>
            <hr />
            <p className='found-logs'>
              Practice logs found: {practiceLog.length}
            </p>
            <Table striped bordered hover variant='secondary' size='sm'>
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
                        <Button onClick={() => fetchPracticeLogs(log)}>
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
  }

  return <>{isStudent(user.is_instructor)}</>;
}
