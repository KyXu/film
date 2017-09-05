var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var serveStatic = require('serve-static')
var port = process.env.PORT || 3000
var bodyParser = require('body-parser')
var app = express()
var dbUrl = 'mongodb://localhost:27017/LWsample'

mongoose.connect(dbUrl)
console.log('MongoDB connection success!');


app.set('views', './app/views/pages')
app.set('view engine','jade')
app.use(express.static(path.join(__dirname, 'public')))
app.use(require('body-parser').urlencoded({ extended: true }))
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(session({
  secret: 'LWFlooring',
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  })
}))

var logger = require('morgan')
if ('development' === app.get('env')){
  app.set('showStackError', true)
  app.use(logger(':method :url :status'))
  app.locals.pretty = true
  mongoose.set('debug', true)
}

require('./config/routes')(app)

app.locals.moment = require('moment')
app.listen(port)

console.log('LWFlooring started on port: ' + port)
