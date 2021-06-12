const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route lesson plan
 */
router.get('/', (req, res) => {
  // GET route code here
  const queryLessonPlan = `SELECT * FROM "lesson_plan";`;

  pool
    .query(queryLessonPlan)
    .then((result) => {
      console.log(result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error in practice log GET`, err);
      // process the database error
      res.sendStatus(500);
    });
});

/**
 * POST route lesson_plan
 */
router.post('/', (req, res) => {
  // POST route code here

  const {
    instrument_id,
    teacher_id,
    student_id,
    lesson_time,
    location_at,
    lesson_notes,
    assignment,
    scheduled_at,
    due_at,
    submitted_url,
    submitted_at,
    submitted_comments
  } = req.body;

  const queryPracticeLog = `INSERT INTO "lesson_plan" ("instrument_id", "teacher_id", "student_id", "lesson_time", "location_at", "lesson_notes", "assignment", "scheduled_at", "due_at", "submitted_url", "submitted_at", "submitted_comments")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`;
  pool
    .query(queryPracticeLog, [
      instrument_id,
      teacher_id,
      student_id,
      lesson_time,
      location_at,
      lesson_notes,
      assignment,
      scheduled_at,
      due_at,
      submitted_url,
      submitted_at,
      submitted_comments
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Error in lesson_plan POST', err);
    });
});

module.exports = router;
