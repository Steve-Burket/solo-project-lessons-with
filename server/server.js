const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const practiceLogRouter = require('./routes/practice_log.router');
const lessonPlanRouter = require('./routes/lesson_plan.router');
const instrumentRouter = require('./routes/instrument.router');
const teacherRouter = require('./routes/teacher.router');
const studentRouter = require('./routes/student.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/practice_log', practiceLogRouter);
app.use('/lesson_plan', lessonPlanRouter);
app.use('/instrument', instrumentRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
