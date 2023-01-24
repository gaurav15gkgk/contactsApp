//importing user services
import {
    signinUserService,
    signupUserService,
    getUserService,
    getUsersService
} from '../services/user.js'

//controller for user signup
export const signupController = async(req, res) => {
    try {
        const {name, userName, password} = req.body
        
        const userSignUp = await signupUserService(name, userName, password);
        return res.status(userSignUp.code).json({
            msg : userSignUp.msg
        })
       

    } catch (error) {
        console.error(error)
        return res.status(error.code ? error.code : 500).json({
            "error": error.msg ? error.msg : error
        })
    }
}

//controller for user signin
export const signinController = async (req, res) => {
    try {
        const {userName, password} = req.body
        const userSignIn = await signinUserService(userName, password)
        return res.status(userSignIn.code).json({
            msg: userSignIn.msg,
            data: userSignIn.data
        })
    } catch (error) {
        console.error(error)
        return res.status(error.code ? error.code : 500).json({
            "error": error.msg ? error.msg : error
        })
    }
}

//controller for fetching the users
export const getUsersController = async (req, res) => {
    try {
        const users = await getUsersService()
        return res.status(users.code).json({
            msg: users.msg,
            data : users.data
        })
    } catch (error) {
        console.error(error)
        return res.status(error.code ? error.code : 500).json({
            "error": error.msg ? error.msg : error
        })
    }
}

// controller for fetching the single user
export const getUserController = async (req, res) => {
    try {
        const {userId} = req.query
        const users = await getUserService(userId)
        return res.status(users.code).json({
            msg: users.msg,
            data : users.data
        })
    } catch (error) {
        console.error(error)
        return res.status(error.code ? error.code : 500).json({
            "error": error.msg ? error.msg : error
        })
    }
}