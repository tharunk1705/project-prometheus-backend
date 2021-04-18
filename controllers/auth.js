const User = require("../models/user");
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");


exports.signup = (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({
            error : errors.array()[0].msg,
            param : errors.array()[0].param
        })
    }

    const user = new User(req.body);
    user.save( (err, user) => {
        if(err) {
            return res.status(400).json( {
                error : "Not able to save user in the DB"
            });
        }

        res.json({
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            phone : user.phone,
            id : user._id,
            isDonor : user.isDonor
        });
    })
};

exports.signin = (req, res) => {
    const errors = validationResult(req);

    const {email, password} = req.body;

    if(!errors.isEmpty()) {
        return res.status(422).json({
            error : errors.array()[0].msg
        });
    }

    User.findOne({email}, (err,user) => {
        if(err || !user) {
            return res.status(400).json({
                error : "User Not Found"
            })
        }

        if(!user.authenticate(password)) {
            return res.status(401).json({
                error : "Email and Password doesn't match"
            });
        }
        const token = jwt.sign( {_id : user._id}, process.env.SECRET);
        // put token ins user's cookie
        res.cookie("token", token, {expire : new Date() + 9999});
        // Response to the Front-end
        const { _id, firstName, lastName, email, phone, role, isDonor} = user;
        return res.json( {token, user : { _id, firstName, lastName, email, phone, role, isDonor}});
        
    });

    

};

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message : "User Signed-out"
    });
};


//protected routed
exports.isSignedIn =  expressJwt({
    secret : process.env.SECRET,
    userProperty : "auth"
});

// Custom Middleware
exports.isAuthenticated = (req, res, next) => {

    console.log(req.profile, req.auth);
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;

    if(!checker) {
        return res.status(403).json({
            error : "ACCESS DENIED!!"
        });
    }

    next();
}

exports.isAdmin = (req, res, next) => {

    if(req.profile.role === 0) {
        return res.status(403).json({
            error : "You are not a Admin, ACCESS DENIED!"
        });
    }

    next();
}


