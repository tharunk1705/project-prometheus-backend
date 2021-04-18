const { DonorRequest, Request} = require('../models/request');

exports.requestDonor = (req, res) => {
    const requestedDonor = new DonorRequest(req.body.donor);
    requestedDonor.save((err, donor) => {
        if(err) {
            return res.status(400).json({
                error : "Failed to request!"
            });
        }
        res.json(donor);
    })
}

exports.createRequest = (req, res) => {
    const request = new Request(req.body.request);
    request.save((err, request) => {
        if(err) {
            return res.status(400).json({
                error : "Failed to save request in DB!"
            });
        }
        res.json(request);
    })
}
