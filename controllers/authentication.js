const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    // https://jwt.io/
    // sub object and iat (issued at time)
    console.log(timestamp);
    console.log(config.secret);

    const token = jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
    console.log(token);

    return token;
}

exports.signin = function(req, res, next) {
    // user has already their email and password, just needs a token
    res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide email and password' })
    }
    // Check if the user with the given email exists
    User.findOne({ email: email }, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        
        // If exists, return a error
        if (existingUser) {
            // status code 422 -> unprocessable entity
            return res.status(422).send({ error: 'Email is in use'});
        } 
        // If not, create and save user record
        const user = new User({
            email: email,
            password: password
        });
        // save the record in the DB
        user.save(function(err) {
            if (err) {
                return next(err);
            }
            // respond request indicating that the user was created successfully
            res.json({ token: tokenForUser(user) });
        });
    });
}
