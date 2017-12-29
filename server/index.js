const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')
const moment = require('moment');
const plaid = require('plaid');

const {Institution, Token} = require('./db/models');

// const {Token} = require('./db/models');
module.exports = app


// var PLAID_CLIENT_ID ='5a39e7cfefe64e7803074b58';
// var PLAID_SECRET = '33148810212bdb98f09993a25f4457';
// var PLAID_PUBLIC_KEY = 'f74fcf55c0b94e51b2e5a3912667b0';
// var PLAID_ENV = 'development';

const PLAID_CLIENT_ID='5a39e7cfefe64e7803074b58';
const PLAID_SECRET='33148810212bdb98f09993a25f4457';
const PLAID_PUBLIC_KEY='f74fcf55c0b94e51b2e5a3912667b0';
const PLAID_ENV='sandbox';
/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
// var ACCESS_TOKEN = null
// var PUBLIC_TOKEN = null;
// var ITEM_ID = null
// Access Token: access-development-9a9b74a2-e1c4-47f2-a1a5-4a1937fd98dc
// Item ID: yk1okzoNraU0jvey5woqIzRqEkzLxzHgqZjp9

// ACCESS_TOKENs = 'access-development-061f521a-63c1-4ef4-b9bd-e84d17fbd8cc'
// ITEM_IDs = '48v8MRrVQLikoQo11ozgcq6r4ZOKRgsrKeYQg'

// Initialize the Plaid client
var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
);

if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) =>
  db.models.user.findById(id)
    .then(user => done(null, user))
    .catch(done))

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // compression middleware
  app.use(compression())

  // session middleware with passport
  app.use(session({
    secret: process.env.SESSION_SECRET || 'my best friend is Cody',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  // auth and api routes
  app.post('/', function(request, response, next) {
    response.json({
      PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
      PLAID_ENV: PLAID_ENV,
    });
  });

  app.post('/get_access_token', function(request, response, next) {
    const {publicToken, user}  = request.body;
    console.log('PUBLIC_TOKEN, is ---------------------', publicToken)
    console.log('user is ---------------------', user)
    let accessToken = null;
    let itemId = null;
    client.exchangePublicToken(publicToken, function(error, tokenResponse) {
      if (error != null) {
        var msg = 'Could not exchange public_token!';
        console.log(msg + '\n' + error);
        return response.json({
          error: msg
        });
      }
          accessToken = tokenResponse.access_token;
          itemId = tokenResponse.item_id;
          client.getItem(accessToken, function(error, itemResponse) {
            if (error != null) {
              console.log(JSON.stringify(error));
              return response.json({
                error: error
              });
            } else {
              client.getInstitutionById(itemResponse.item.institution_id, function(err, instRes) {
                if (err != null) {
                  var msg = 'Unable to pull institution information from the Plaid API.';
                  console.log(msg + '\n' + error);
                  return response.json({
                    error: msg
                  });
                } else {

                  Institution.findOrCreate({
                    where: {
                      id: instRes.institution.institution_id,
                      name: instRes.institution.name
                    }
                  })
                    .then(()=>{
                      Token.findOrCreate({
                        where: {
                          accessToken,
                          itemId,
                          userId: user.id,
                          institutionId: itemResponse.item.institution_id
                        }
                      })
                      .spread((createdToken, createBool)=>{
                        console.log('createdToken is ------------', createdToken);
                        response.status(200).end();
                      })
                    })
                }
              })
            }
      })
      })

})

  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

const syncDb = () => db.sync()

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  sessionStore.sync()
    .then(syncDb)
    .then(createApp)
    .then(startListening)
  } else {
    createApp()
  }
