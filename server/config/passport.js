const LocalStrategy    = require('passport-local').Strategy;
const GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
const User             = require('../api/models/user.model');
const configAuth       = require('./auth');
const session          = require('express-session');

const jwt              = require('jsonwebtoken');
const config           = require('./config');


module.exports = function(app, passport) {
    var token;
    var emailLogged = '';
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({
        secret: config.secret,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));

    passport.serializeUser(function(user, done) {
        token = jwt.sign({ username: user.name, email: user.email}, config.secret, {expiresIn: '24h'});
        console.log("TOKENTOKENTOKENTOKENTOKENTOKENTOKENTOKEN");
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
    },
    function(token, refreshToken, profile, done) {
        console.log(profile);
        User.findOne({ 'google.id' : profile.id }, function(err, user) {
            if (err)
                done(err);
            if (user) {
                //LOGIN USER
                emailLogged = user.email;
                done(null, user);
            } else {
                var newUser = new User();
                newUser.google.id    = profile.id;
                newUser.google.token = token;
                newUser.name  = profile.displayName;
                newUser.email = profile.emails[0].value;
                emailLogged = newUser.email;

                newUser.save(function(err) {
                    if (err)
                        throw err;

                    token = jwt.sign({ username: newUser.name, email: newUser.email}, config.secret, {expiresIn: '24h'});
                    return done(null, newUser);
                });
            }
        });
    }));

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    
    // the callback after google has authenticated the user
    app.get('/auth/google/callback', passport.authenticate('google'), (req,res)=>{
        res.redirect(`/login?email=${emailLogged}&token=${token}`);
    });



    return passport;
};
