const userService = require('../services/userServices');

exports.registerUser = (request, response) => {
    request.checkBody("firstName", "First name can not be empty").notEmpty().isAlpha().isLength({ min: 2 });
    request.checkBody("lastName", "Last name can not be empty").notEmpty().isAlpha();
    request.checkBody("email", "Mail id can not be empty").notEmpty().isEmail();
    request.checkBody("password", "Password can not be empty").notEmpty();
    request.checkBody("address", "Address can not be empty").notEmpty().isAlpha();
    request.checkBody("state", "State can not be empty").notEmpty().isAlpha();
    request.checkBody("city", "City can not be empty").notEmpty().isAlpha();
    request.checkBody("phonenumber", "phone name can not be empty").notEmpty();
    request.checkBody("zip", "zipCode can not be empty").notEmpty();
    
    const error = request.validationErrors();

    if (error)
        response.status(422).send(error);
    else {
        userService.userRegistration(request, (error, data) => {
            if (error) {
                response.status(500).send(error);
            } else {
                let responseData = { message: "User Added Successfully !!", Data: data };
                response.status(200).send(responseData);
            }
        })
    }
}

exports.loginUser = (request, response) => {
    request.checkBody("email", "Mail id can not be empty").notEmpty().isEmail();
    request.checkBody("password", "Password can not be empty").notEmpty();

    const error = request.validationErrors();

    if (error)
        response.status(422).send(error);
    else {
        userService.loginUser(request, (error, data) => {
            if (error) {
                response.status(500).send(error);
            } else {
                let responseData = { message: "User login Successfully !!", response: data };
                response.status(200).send(responseData);
            }
        })
    }

}

exports.addContact = (request, response) => {
    request.checkBody("firstName", "First name can not be empty").notEmpty().isAlpha().isLength({ min: 2 });
    request.checkBody("lastName", "last name can not be empty").notEmpty().isAlpha().isLength({ min: 2 });
    request.checkBody("email", "Mail id can not be empty").notEmpty().isEmail();
    request.checkBody("address", "Address can not be empty").notEmpty().isAlpha();
    request.checkBody("state", "State can not be empty").notEmpty().isAlpha();
    request.checkBody("city", "City can not be empty").notEmpty().isAlpha();
    request.checkBody("phonenumber", "phone name can not be empty").notEmpty();
    request.checkBody("zip", "zipCode can not be empty").notEmpty();
    request.checkBody("userId", "id can not be empty").notEmpty();
    const error = request.validationErrors();

    if (error)
        response.status(422).send(error);
    else {
        userService.addContact(request, (error, data) => {
            if (error) {
                response.status(500).send(error);
            } else {
                let responseData = { message: "User Added Successfully !!" };
                response.status(200).send(responseData);
            }
        })
    }
};

exports.getContacts = (request, response) => {
    const error = request.validationErrors();
    console.log(request.headers['userid']);
    if (error)
        response.status(422).send(error);
    else {
        userService.getContacts(request, (error, data) => {
            if (error) {
                response.status(500).send(error);
            } else {
                let responseData = { message: "All Contacts !!", data: data };
                response.status(200).send(responseData);
            }
        })
    }
}
exports.updateContact = (request, response) => {
    const error = request.validationErrors();
    if (error) {
        response.status(422).send(error);
    } else {
        let contactDetails = {
            "name": request.body.name,
            "email": request.body.email,
            "phonenumber": request.body.phonenumber,
            "address": request.body.address,
            "state": request.body.state,
            "city": request.body.city,
            "zip": request.body.zip,
            "userId": request.body.userId
        }
        userService.updateContact(request, contactDetails, (error, data) => {
            if (error) {
                response.status(500).send(error);
            } else {
                console.log(contactDetails)
                let dataReponse = {
                    message: "Successfully Updated !!!"
                };
                response.status(200).send(dataReponse);
            }
        })
    }
}
exports.deleteContact = (request, response) => {
    const error = request.validationErrors();
    if (error) {
        response.status(422).send(error);
    } else {
        userService.deleteContact(request, (error, data) => {
            if (error) {
                response.status(500).send(error);
            } else {
                let responseData = { message: "Contact Deleted Sucessfully!!" };
                response.status(200).send(responseData);
            }
        })
    }
}