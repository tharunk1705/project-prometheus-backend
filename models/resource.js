const mongoose = require('mongoose');
const {Schema} = mongoose;


const resourceSchema = new Schema({
    resourceName : {
        type : String,
        required : true
    },
    resourceProvider : {
        type : String,
        required : true,
    },
    location : {
        type : String,
        required : true,
    },
    contactNumber : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    units : {
        type : String,
        required : true
    },
    isFulfilled : {
        type : Boolean,
        default : false
    },
    providerUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}, {
    timestamps : true
});

// const ResourceCollectionSchema = new Schema({
//     resources : [ResourceSchema]
// }, {
//     timestamps : true
// })

module.exports = mongoose.model("Resource", resourceSchema);
