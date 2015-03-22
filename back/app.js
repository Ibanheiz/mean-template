var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var compress = require('compression');
var multipart = require('connect-multiparty');
var helmet = require('helmet');
var load = require('express-load');
var partials = require('./modules/expose/partials');
var expose = require('./modules/expose/index');
var routes = require('./modules/main/routes');
var expose = require('./modules/expose/index');
var app = express();
var api = {};

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(compress());
app.use(express.static(path.join(__dirname, '../front')));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(helmet());
app.use(helmet.xframe());
app.use(helmet.xssFilter());
app.use(helmet.nosniff());
app.disabled('x-powered-by');
app.use(multipart({uploadDir: '/back'}));
app.set('views', path.join(__dirname, '/modules'));
app.set('view engine', 'jade');
app.use('/', routes);
app.use('/expose', expose);
app.use('/partials', partials);
//app.use('/api/users',api.users);
// TODO criar página de erro 404
app.get('*', function(req, res, next) {
  res.render('main/views/index');
});

load('user', {cwd: 'back/modules'})
  .into(app);

module.exports = app;
