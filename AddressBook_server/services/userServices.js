const { request, response } = require("express");
const model = require("../models/userModels");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.userRegistration = (request, callback) => {
    try {
        model.registerUser.findOne({ "email": request.body.email }, (error, user) => {
            if (user)
                callback("Email already exist!!");
            else {
                let userDetails;

                bcrypt.hash(request.body.password, 10, (error, encrypted) => {
                    console.log("Encrypted pwd:" + encrypted);
                    userDetails = new model.registerUser({
                        "firstName": request.body.firstName,
                        "lastName": request.body.lastName,
                        "email": request.body.email,
                        "password": encrypted,
                        "address": request.body.address,
                        "state": request.body.state,
                        "city": request.body.city,
                        "phonenumber": request.body.phonenumber,
                        "zip": request.body.zip
                        
                    })
                    userDetails.save()
                        .then(user => {
                            callback(null, user);
                        })
                        .catch(err => {
                            callback(err);
                        })
                });
            }
        })
    } catch (err) {
        callback(err);
    }
}

exports.loginUser = (request, callback) => {
    let response = {};
    model.registerUser.findOne({ "email": request.body.email }, (error, user) => {
        if (user) {
            bcrypt.compare(request.body.password, user.password, (error, encrypted) => {
                if (!encrypted) {
                    response = { message: "Password not matched!!" };
                    callback(response);
                } else {
                    const token = jwt.sign({
                        email: request.body.email,
                        userID: request.body._id
                    }, 'secret', { expiresIn: "6000s" });
                    console.log("Token" + token);
                    response.firstName = user.firstName;
                    response.lastName = user.lastName;
                    response.userID = user._id;
                    response.email = request.body.email;
                    response.token = token;
                    callback(null, response);
                }
            })
        } else {
            response = { message: "User not found!!" };
            callback(response);
        }
    });
}

exports.addContact = (request, callback) => {
    let response = {};
    model.person.findOne({ "email": request.body.email }, (error, contact) => {
        if (contact) {
            response = { message: "Email Already exist!!" };
            callback(response);
        } else {
            let contactDetails;
            contactDetails = new model.person({
                "firstName": request.body.firstName,
                "lastName": request.body.lastName,
                "email":request.body.email,
                "phonenumber": request.body.phonenumber,
                "address": request.body.address,
                "state": request.body.state,
                "city": request.body.city,
                "zip": request.body.zip,
                "userId": request.body.userId
            })
            contactDetails.save()
                .then(contact => {
                    callback(null, contact);
                })
                .catch(error => {
                    callback(error);
                })
        }
    })
}

exports.getContacts = (request, callback) => {
    let id = request.headers['userid'];
    console.log("id" + id);
    let contacts = [];
    model.person.find({ userId: id }, (error, data) => {
        if (error) {
            callback(error);
        } else {
            callback(null, data);
        }
    });
}

exports.updateContact = (request, data, callback) => {
    let id = request.headers['userid'];
    console.log("Data:" + data.userID);
    console.log(id);
    model.person.findByIdAndUpdate(id, data)
        .then(updatedData => {
            callback(null, updatedData);
        })
        .catch(error => {
            callback(error);
        })
}

exports.deleteContact = (request, callback) => {
    let requestEmail = request.params.userEmail;
    try {
        model.person.findOne({ email: requestEmail }, (error, contact) => {
            if (!contact) {
                let responseData = { Message: "Contact not found for provided email" };
                callback(responseData);
            } else {
                model.personModel.deleteOne({
                        email: requestEmail
                    })
                    .then(deletedContact => {
                        // response.send({ message: 'Contact Deleted Sucessfully! ' });
                        callback(null, deletedContact);
                    })
                    .catch(err => {
                        callback(err);
                    })
            }
        });
    } catch (err) {
        callback(err);
    }
}