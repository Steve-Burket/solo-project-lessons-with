const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for instruments
 */
router.get('/', (req, res) => {
  // GET route code here
  const queryInstruments = `SELECT * FROM "instruments" ORDER BY "instrument";`;

  pool
    .query(queryInstruments)
    .then((result) => {
      console.log(result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`Error in instruments GET`, err);
      // process the database error
      res.sendStatus(500);
    });
});

/**
 * POST route for instrument
 */
router.post('/practice-log', (req, res) => {
  // POST route code here
  const instrument = req.body.instrument;

  const queryInstruments = `INSERT INTO "instruments" ("instrument")
  VALUES ($1) RETURNING "instrument";`;
  pool
    .query(queryInstruments, [instrument])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Error in practice log POST', err);
    });
});

module.exports = router;
