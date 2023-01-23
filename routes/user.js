import express from 'express'

import {
    signUpValidator,
    signInValidator,
    getUserValidator
} from '../validators/user.js'

import {
    signupController,
    signinController,
    getUsersController,
    getUserController
} from '../controllers/user.js'

const router = express.Router()

router.post('/signup', signUpValidator, signupController)
router.post('/signin', signInValidator, signinController)
router.get('/one', getUserValidator, getUserController)
router.get('/users', getUsersController)

export default router