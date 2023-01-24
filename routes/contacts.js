//importing the libraries
import multer from 'multer'
import express from 'express'

//importing contacts controllers
import {
    uploadContactController,
    getContactsController,
    getContactsByUserIdController
} from '../controllers/contacts.js'

//importing the middleware to authenticate the user
import {
    authenticateUser
} from '../utils/middleware.js'

//importing the contacts validators
import {
    uploadFileValidator,
    getContactValidator
} from '../validators/contacts.js'

const upload = multer({ dest: 'uploads/' })

const router = express.Router()

//route to upload the csv file
router.post('/upload', upload.single('docs'), uploadFileValidator, authenticateUser, uploadContactController)

//route to fetch the contacts with pagination
router.get('/all',getContactValidator, authenticateUser,  getContactsController)

//route to fetch the contacts with common userId
router.get('/by/userId', authenticateUser, getContactsByUserIdController)



export default router





