const mongoose = require('mongoose');
const {Schema} = mongoose;
const {ObjectId}  = Schema;

const DonorRequestSchema = new Schema({
    donor : {
        type : ObjectId,
        ref : "Donor"
    },
    firstName : {
        type : ObjectId,
        ref : "User"
    },
    lasttName : {
        type : ObjectId,
        ref : "User"
    },
    isRequested : {
        type : Boolean,
        required : true
    }
},{
    timestamps : true
});

const DonorRequest = mongoose.model("DonorRequest", DonorRequestSchema);

const RequestSchema = new Schema({
    donors : [DonorRequestSchema],
    request_id : {},
    isAccepted : {type : Boolean},
    location : String
}, {
    timestamps : true
});

const Request = mongoose.model("Request", RequestSchema);

module.exports = {Request, DonorRequest};