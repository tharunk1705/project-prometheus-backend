const Resource = require('../models/resource');

exports.getResourceById = (req, res, next, id) => {
    Resource.findById(id).exec((err, resource) => {
        if( err || !resource) {
            return res.status(400).json({
                error : "Resource Not Found!"
            });
        }
        req.resource = resource;
        next();
    })
}

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

exports.deleteResource = (req, res) => {
    
    const resource = req.resource;
    resource.remove((err, resource) => {
        if(err) {
            return res.status(400).json({
                error : "Failed to Remove Category!"
            });
        }
        res.json({
            message : `Successfully deleted ${resource.resourceName}`
        });
    })
}