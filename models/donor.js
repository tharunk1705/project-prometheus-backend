const mongoose = require('mongoose');
const {Schema} = mongoose;
const { ObjectId} = Schema;

const donorSchema = new Schema({
    userId : {
        type : ObjectId,
        ref : "User",
        required : true
    },
    firstName : {
        type : ObjectId,
        ref : "User",
    },
    lastName : {
        type : ObjectId,
        ref : "User",
    },
    info : {
        type : String,
        trim : true,
        required : true,
        maxlength : 200
    },
    isAvailable : {
        type : Boolean,
        required : true,
        default : true
    },
    category : {
        type : ObjectId,
        ref : "Category",
    },
    location : {
        type :  String,
        maxlength : 50,
        required : true
    },
    lastDonation : {
        type : Date
    }
},{
    timestamps : true
});

module.exports = mongoose.model("Donor", donorSchema);