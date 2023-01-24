//importing libraries
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

// middleware to authenticate the user with jwt
export const authenticateUser = async(req, res, next) => {
    try {
        //accessing the headers
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if(token === null || token === undefined) return res.status(401).json({"msg": "Not authorized request"})

        //verifying with jwt token
        jwt.verify(token,JWT_SECRET , (err, user) => {
            if(err) return res.status(403).json({"msg": "Token expired"})
            
            req.user = user
            next()
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Internal Server error"
        })
    }
}