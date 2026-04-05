const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');
const BillingSchema = new mongoose.Schema({
    shipmentDetails: {
        address: { type: String, required: true },
        phone: { type: String, required: false},
        city: { type: String, required: true },
        
    },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, default: 'Paid' },
    paymentReceipt: { type: String },  // If you want to save the Stripe receipt URL
    date: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin:{type:Boolean, default:false},
    uuid:{ type: String,
        default: uuidv4, // Automatically assign UUID when a new user is created
        unique: true},
        phoneNumber: { type:String, default: '' },
        gender: {type:String, default: ''},
        dob:{type:String, default: ''},
        location:{type:String, default: ''},
        alternatePhone:{type:String, default: ''},
    cart:{
        type:[
            {
                productId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'Product'
                },
                quantity:{
                    type:Number,
                    default:1
                }
            }
        ],
        default:[]
    },
    URL: { type: String, default: '' },
    billing: [BillingSchema],
});
const User = mongoose.model('User', UserSchema);
module.exports = User;