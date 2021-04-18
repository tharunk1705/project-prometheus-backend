const mongoose = require('mongoose');
const {Schema} = mongoose;
const {ObjectId}  = Schema;

const DonorRequestSchema = new Schema({
    requestedDonor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    isAccepted : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
});

const DonorRequest = mongoose.model("DonorRequest", DonorRequestSchema);

const RequestSchema = new Schema({
    donors : [DonorRequestSchema],
    request_id : {},
    isFulfilled : {
        type : Boolean,
        default : false
    },
    location : String
}, {
    timestamps : true
});

const Request = mongoose.model("Request", RequestSchema);

module.exports = {Request, DonorRequest};