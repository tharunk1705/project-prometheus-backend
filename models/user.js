const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName : {
        type : String,
        required : true,
        maxlength : 32,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        maxlength : 32,
        trim : true
    },
    email : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    userInfo : {
        type : String,
        trim : true
    },
    encry_password : {
        type : String,
        required : true
    },
    salt : String,
    role : {
        type : Number,
        default : 0
    },
    phone : {
        type : Number,
        required : true,
        trim : true
    },
    isDonor : {
        type : Boolean,
        default : false
    },
    isAvailable : {
        type : Boolean,
        default :  false
    },
    requests : {
        type : Array,
        default : []
    },
    bloodType : {
        type : String,
    },
    location : {
        type : String
    },
    lastDonation : {
        type : Date
    },
    donations : {
        type : Array,
        default : []
    },
    remarks : {
        type : String,
        maxlength : 200
    }
},{
    timestamps : true
});

userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })

userSchema.methods = {

    authenticate : function(plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },

    securePassword : function(plainpassword) {
        if(!plainpassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        } catch (err) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);