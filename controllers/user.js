const User = require('../models/user');

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
        {$set : {   isDonor : true , 
                    isAvailable : req.body.isAvailable, 
                    bloodType : req.body.bloodType, 
                    location : req.body.location,
                    lastDonation : req.body.lastDonation,
                    remarks :  req.body.remarks
                }
        },
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

exports.getAllDonors = (req, res) => {
    User.find({isDonor :  true}).exec(
        (err, donors) => {
            if(err) {
                return res.status(400).json({
                    error : "No donors Found!"
                });
            }
            
            res.json(donors);
        }
    )
}

exports.searchDonor = (req, res) => {
    User.find({isDonor : true, isAvailable : true, bloodType : req.body.bloodType, location : {$regex : new RegExp(`^${req.body.location}`, `i`)}}, function(err, result) {
        if(err){
            console.log(err);
        }else {
            
            let donors = result.map((donor)=>{
                return {
                    'firstName' : donor.firstName,
                    'lastName' : donor.lastName,
                    'phone' : donor.phone,
                    'email' : donor.email,
                    'isAvailable' : donor.isAvailable,
                    'bloodType' : donor.bloodType,
                    'location' : donor.location
                };
            })

            res.json(donors);
        }
    });
}