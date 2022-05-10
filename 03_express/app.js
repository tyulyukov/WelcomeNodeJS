let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let multer = require('multer')

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let studentsRouter = require('./routes/students');
let portfoliosRouter = require('./routes/portfolios');
let mediaConverterRouter = require('./routes/helpers/media-converter');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) =>{
    cb(null, Date.now() + '-' + file.originalname);
  }
});
app.use(multer({storage:storageConfig}).single("image"));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students', studentsRouter);
app.use('/api/portfolios', portfoliosRouter);
app.use('/media', mediaConverterRouter);

let mongoose = require("mongoose")
let connectionString = "mongodb+srv://tyulyukov:buDFZ4ws9ShY3rw7@cluster0.docye.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) { console.error(err) } )

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
