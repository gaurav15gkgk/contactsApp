//importing libraries
import express from 'express'

//importing validators
import {
    signUpValidator,
    signInValidator,
    getUserValidator
} from '../validators/user.js'

//importing controllers
import {
    signupController,
    signinController,
    getUsersController,
    getUserController
} from '../controllers/user.js'

const router = express.Router()

// router for user signup
router.post('/signup', signUpValidator, signupController)

//router for user login
router.post('/signin', signInValidator, signinController)

//router for get the single user
router.get('/one', getUserValidator, getUserController)

//router for getting all the users
router.get('/users', getUsersController)

export default router