const { DonorRequest, Request} = require('../models/request');

exports.createRequest = (req, res) => {
    req.body.request.user = req.profile;
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
