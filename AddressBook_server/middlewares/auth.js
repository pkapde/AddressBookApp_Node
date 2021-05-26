const jwt = require('jsonwebtoken');

exports.checkToken = (request, response, next) => {
    try {
        //console.log(request,"token is here");
        let tokens = request.headers['token'];
        //console.log(tokens,"token getting");
        if (tokens == undefined || tokens == null) {
            throw 'No token available'
        } else {
            jwt.verify(tokens, 'secret', (error, data) => {
                if (error) {
                    return response.status(401).send(error);
                } else {
                    next();
                }
            })
        }
    } catch (error) {
        next(error);
    }
}