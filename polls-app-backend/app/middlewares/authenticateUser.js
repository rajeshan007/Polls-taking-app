const jwt = require('jsonwebtoken')
const authenticateUser = async (req, res, next) => {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({ errors: "auth failed" })
    }
    try {
        const tokenData = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = tokenData
        next()
    } catch (e) {
        res.status(401).json({ errors: "invalid token" })
    }
}


module.exports = {
    authenticateUser
} 