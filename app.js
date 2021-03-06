const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require('body-parser')

const app = express();
const port = 3000;

//Tell Express.js where to find your Javascript files.
// parse application/json
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Mount routers
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(port, () => console.log(`Expressjs-Validator listening on port ${port}!`));

module.exports = app;
