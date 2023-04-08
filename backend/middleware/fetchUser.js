var jwt = require('jsonwebtoken');
const JWT_SECRET = 'deep123'


const fetchUser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token')
    if (!token) {
        // 401 status code is for access denied 
        res.status(401).send({ error: 'Please authenticate using a valid token 1' })

    }

    try {
        // verifing wether token is correct or not if it is correct we will append that user id (data) to the req.user
        const data = jwt.verify(token, JWT_SECRET)
        // appending user id in req.user
        req.user = data.user
        
        next()

    } catch (error) {
        res.status(401).send({ error: 'Please authenticate using a valid token 2' })

    }
}


module.exports = fetchUser