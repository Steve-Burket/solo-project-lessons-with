const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// Route to get teachers. only for student registration
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryTeachers = `SELECT * FROM "user"
WHERE "is_instructor" = true;`;
  pool
    .query(queryTeachers)
    .then((result) => {
      console.log('here are the teachers: ', result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error in getting teachers', err);
      res.sendStatus(500);
    });
});

// returns all students with the current user being their instructor
router.get('/roster', rejectUnauthenticated, (req, res) => {
  console.log('here is the teachers ID: ', req.user.id);
  
  const queryTeachers = `SELECT * FROM "user"
WHERE "user"."instructor_is" = $1;`;
  pool
    .query(queryTeachers, [req.user.id])
    .then((result) => {
      console.log('here are the students: ', result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error in getting students', err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
