const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const flash = require('connect-flash');
const session = require('express-session');
const {database} = require('./keys');
const mysqlstore = require('express-mysql-session');
const passport = require('passport');

const app = express();
require('./lib/passport');

app.set('port', process.env.PORT || 4000);

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

app.use(session({
    secret: 'cloudnodejssession',
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

app.use(require('./routes/index'));
app.use(require('./routes/authentications'));
app.use('/files', require('./routes/files'));

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});