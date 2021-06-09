const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/practice-log', (req, res) => {
  // POST route code here
  const user_id = req.body.user_id;
  const date_of = req.body.date_of;
  const practice_length = req.body.practice_length;
  const topic = req.body.topic;
  const improved_on = req.body.improved_on;
  const weak_points = req.body.weak_points;
  const questions = req.body.questions

  const queryPracticeLog = `INSERT INTO "practice_log" ("user_id", "date_of", "practice_length", "topic", "improved_on", "weak_points", "questions")
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "user_id";`;
  pool.query(queryPracticeLog, [user_id, date_of, practice_length, topic, improved_on, weak_points, questions])
  .then(() => res.sendStatus(201))
  .catch((err) => {
      console.log('Error in practice log POST', err);
      
  })
});

module.exports = router;
