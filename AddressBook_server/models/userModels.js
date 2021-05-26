const mongoose=require('mongoose');

const registration = mongoose.Schema(
    {
        firstName: {
            type: String,
            required : [true, "firstname must be provided"]
        },
        lastName: {
            type: String,
            required : [true, "firstname must be provided"]
        },
        email: {
            type: String,
            required : [true, "email must be provided"]
        },
        password: {
            type: String,
            required : [true, "password must be provided"]
        },
        address: {
            type: String,
            required : [true, "address must be provided"]
        },
        state: {
            type: String,
            required : [true, "state must be provided"]
        },
        city: {
            type: String,
            required : [true, "city must be provided"]
        },
        zip: {
            type: String,
            required : [true, "zip must be provided"]
        },
        phonenumber: {
            type: String,
            required : [true, "phonenumber must be provided"]
        },
},
{
    timestamps: true
},
);

const person = mongoose.Schema(
    {
        firstName: {
            type: String,
            required : [true, "firstname must be provided"]
        },
        lastName: {
            type: String,
            required : [true, "firstname must be provided"]
        },
        email: {
            type: String,
            required : [true, "email must be provided"]
        },
        address: {
            type: String,
            required : [true, "address must be provided"]
        },
        state: {
            type: String,
            required : [true, "state must be provided"]
        },
        city: {
            type: String,
            required : [true, "city must be provided"]
        },
        zip: {
            type: String,
            required : [true, "zip must be provided"]
        },
        phonenumber: {
            type: String,
            required : [true, "phonenumber must be provided"]
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required : [true, "phonenumber must be provided"],
            ref : "users"
        },
},
{
    timestamps: true
},
);
exports.registerUser = mongoose.model("users",registration);
exports.person = mongoose.model("person",person);