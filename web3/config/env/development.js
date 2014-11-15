'use strict';

module.exports = {
  db: 'mongodb://localhost/fish-dev',
	debug: 'true',
  mongoose: {
    debug: false
  },
  app: {
    name: 'Nodarium'
  },
  facebook: {
    clientID: 'DEFAULT_APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  twitter: {
    clientID: 'DEFAULT_CONSUMER_KEY',
    clientSecret: 'CONSUMER_SECRET',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  },
  github: {
    clientID: 'DEFAULT_APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  google: {
    clientID: 'DEFAULT_APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  linkedin: {
    clientID: 'DEFAULT_API_KEY',
    clientSecret: 'SECRET_KEY',
    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
  },
  emailFrom: 'mottihoresh@gmail.com', // sender address like ABC <abc@example.com>
  mailer: {
    service: 'Gmail', // Gmail, SMTP
    auth: {
      user: 'mottihoresh@gmail.com',
      pass: 'ke8enkcj'
    }
  }
};
