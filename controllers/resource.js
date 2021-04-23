const Resource = require('../models/resource');

exports.createResource = (req, res) => {
    const resource = new Resource(req.body);
    resource.save((err, newResource) => {
        if(err) {
            return res.status(400).json({
                error : "Failed to create resource!"
            });
        }
        res.json({newResource});
    });
}

exports.getAllResources = (req, res) => {
    Resource.find({isFulfilled :  false}).exec(
        (err, resources) => {
            if(err) {
                return res.status(400).json({
                    error : "No resource Found!"
                });
            }
            
            res.json(resources);
        }
    );
}

exports.getMyResources = (req, res) => {
    Resource.find({providerUserId : req.profile._id}).exec(
        (err, resources) => {
            if(err) {
                return res.status(400).json({
                    error : "No resource Found!"
                });
            }
            
            res.json(resources);
        }
    );
}