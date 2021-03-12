const User = require('../models/user');
const Donor = require('../models/donor');

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if( err || !user) {
            return res.status(400).json({
                error : "USER NOT FOUND!"
            });
        }

        req.profile = user;
        next();
    });

};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;

    return res.json(req.profile);
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true, useFindAndModify : false},
        (err, user) => {
            if(err) {
                return res.status(400).json({
                    error : "You are not authorized for this!"
                })
            }

            user.encry_password = undefined;
            user.salt = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            
            res.json(user);
        }

    );
};

exports.signupAsDonor = (req, res) => {

    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : { isDonor : true}},
        {new : true, useFindAndModify : false},
        (err, user) => {
            if(err) {
                return res.status(400).json({
                    error : "You are not authorized for this!"
                })
            }
            user.encry_password = undefined;
            user.salt = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user);
        }

    );
    const donor = new Donor(req.body);
    // donor.userId = id;
    donor.save( (err, donor) => {
        if(err) {
            console.log(err);
            return res.status(400).json( {
                err : "Not able to save donor in the DB"
            });
        }
        res.json({
            id : donor._id
        });
    })
};