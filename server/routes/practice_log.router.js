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
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error in practice log GET`, err);
      // process the database error
      res.sendStatus(500);
    });
});

/**
 * GET route for practice log
 */
router.get(`/student`, (req, res) => {
  // GET route code here
  const queryPracticeLog = `SELECT * FROM "user"
JOIN "practice_log" ON "practice_log"."user_id" = "user"."id"
WHERE "user"."id" = $1;`;

  pool
    .query(queryPracticeLog, [req.user.id])
    .then((result) => {
      console.log(result.rows);
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

module.exports = router;
