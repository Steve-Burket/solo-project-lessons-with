const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Route to get teachers only for student registration
router.get('/', (req, res) => {
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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
