const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');
const dotenv = require('dotenv')
const session = require('express-session');

dotenv.config({
  path: path.resolve(__dirname + '/.env')
})

const storage = require('./config/multer')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cadastroRouter = require('./routes/cadastro');
const comicRouter = require('./routes/comic');
const adminRouter = require('./routes/admin');
const ComicController = require('./controller/ComicController');

const app = express();
const uploadsFile = multer({storage : storage});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: "Projeto Integrador - Site HQ", 
    resave: true, 
    saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cadastro', cadastroRouter);
app.use('/comicpage', comicRouter);
app.use('/admin', adminRouter);
app.post('/files', uploadsFile.single('file'), ComicController.storeComic);

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.status(404).render('not-found');
  // next(createError(404));
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