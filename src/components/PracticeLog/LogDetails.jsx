import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function LogDetails() {
    const practiceLog = useSelector((store) => store.practiceLog);


    return (
      <div>
        <h1>Practice Log {practiceLog.id}</h1>
        <section>
          <div key={practiceLog.id}>
            <ul className='practice-log-container' value={practiceLog.date_of}>
              {practiceLog.map((log, i) => {
                return (
                  <li key={i}>
                    Date: {log.date_of}
                    <br />
                    <br />
                    Duration: {log.practice_length}
                    <br />
                    <br />
                    Topic: {log.topic}
                    <br />
                    <br />
                    Improved on: {log.improved_on}
                    <br />
                    <br />
                    Needs work: {log.weak_points}
                    <br />
                    <br />
                    Questions: {log.questions}
                    <br />
                    <br />
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    );
}


// {
//   viewLog && (
//     <div>
//       <ul
//         className='practice-log-container'
//         key={practiceLog.id}
//         value={practiceLog.id}
//       >
//         {practiceLog.map((log, i) => {
//           return (
//             <li key={i}>
//               Date: {log.date_of}
//               <br />
//               <br />
//               Duration: {log.practice_length}
//               <br />
//               <br />
//               Topic: {log.topic}
//               <br />
//               <br />
//               Improved on: {log.improved_on}
//               <br />
//               <br />
//               Needs work: {log.weak_points}
//               <br />
//               <br />
//               Questions: {log.questions}
//               <br />
//               <br />
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }