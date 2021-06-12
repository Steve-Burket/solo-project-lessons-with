const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('here is the req.user.id: ', req.user.id);

  const queryStudents = `SELECT * FROM "user"
WHERE "user"."instructor_is" = $1;`;
  pool
    .query(queryStudents, [req.user.id])
    .then((result) => {
      console.log('here is the user id: ', req.user.id);

      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error in getting students', err);
      res.sendStatus(500);
    });
});

module.exports = router;
