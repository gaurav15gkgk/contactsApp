//importing libraries
import express from 'express'

//importing the csv controllers
import {
    getCsvFileController,
    getCsvInfoByUserIdController,
    getCsvInfoController
} from '../controllers/csv.js'

//importing the csv validators
import {
    getCsvFileValidator,
    getCsvInfoValidator
} from '../validators/csv.js'

//importing the middleware to authenticate the middleware
import {
    authenticateUser
} from '../utils/middleware.js'

const router = express.Router()

//route to fetch csv file 
router.get('/file/:csvS3Id',getCsvFileValidator,  authenticateUser, getCsvFileController)

//route to fetch all csv files
router.get('/info', getCsvInfoValidator, authenticateUser, getCsvInfoController)

//route to fetch csv with common user
router.get('/by/userId', authenticateUser, getCsvInfoByUserIdController)

export default router


