const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware');

/**
 * GET route for practice log
 */
router.get(`/`, (req, res) => {
  // GET route code here
  const queryPracticeLog = `SELECT * FROM "user"
JOIN "practice_log" ON "practice_log"."user_id" = "user"."id"
WHERE "user"."instructor_is" = $1;`;

  pool
    .query(queryPracticeLog, [req.user.id])
    .then((result) => {
      // console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error in practice log GET`, err);
      // process the database error
      res.sendStatus(500);
    });
});

/**
 * GET route for student's view of practice log
 */
router.get(`/student`, (req, res) => {
  // GET route code here
  const queryPracticeLog = `SELECT * FROM "user"
JOIN "practice_log" ON "practice_log"."user_id" = "user"."id"
WHERE "user"."id" = $1;`;

  pool
    .query(queryPracticeLog, [req.user.id])
    .then((result) => {
      // console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error in practice log GET`, err);
      // process the database error
      res.sendStatus(500);
    });
});

/**
 * POST route practice log
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log('POSTing practice log: ', req.body);

  const user_id = req.user.id;
  const date_of = req.body.date_of;
  const practice_length = req.body.practice_length;
  const topic = req.body.topic;
  const improved_on = req.body.improved_on;
  const weak_points = req.body.weak_points;
  const questions = req.body.questions;

  const queryPracticeLog = `INSERT INTO "practice_log" ("user_id", "date_of", "practice_length", "topic", "improved_on", "weak_points", "questions")
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "user_id";`;
  pool
    .query(queryPracticeLog, [
      user_id,
      date_of,
      practice_length,
      topic,
      improved_on,
      weak_points,
      questions
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Error in practice log POST', err);
    });
});

// PUT router to allow edit of practice log
router.put('/student', (req, res) => {
  const updatedPracticeLog = req.body;
  console.log('Here is the updated log:', req.body);
  

  const queryText = `UPDATE "practice_log"
  SET date_of = $1, practice_length = $2, topic = $3, improved_on = $4, weak_points = $5, questions = $6
  WHERE id = $7;`;

  const queryValues = [ 
    updatedPracticeLog.date_of,  // $1
    updatedPracticeLog.practice_length, // $2
    updatedPracticeLog.topic, //$ 3
    updatedPracticeLog.improved_on, // $4
    updatedPracticeLog.weak_points, // $5
    updatedPracticeLog.questions, // $6
    updatedPracticeLog.id // $7
  ];

  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error completing SELECT log query', err);
      res.sendStatus(500);
    });
});

// DELETE a practice log
router.delete('/:id', (req, res) => {
  pool
    .query('DELETE FROM "practice_log" WHERE id=$1', [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error DELETE /practice_log', error);
      res.sendStatus(500);
    });
});

module.exports = router;
