//importing contacts services
import {
    saveCsvFileService,
    getContactsByUserIdService,
    getContactsService
} from '../services/contacts.js'

//controller to upload the contract
export const uploadContactController = async(req, res) => {
    try {
        const file = req.file
        const userId = req.user._id
        const saveCsvFileInfo = await saveCsvFileService(file, userId)
    
        return res.status(saveCsvFileInfo.code).json({
            "data" : saveCsvFileInfo.data,
            "msg": saveCsvFileInfo.msg
        })
    } catch (error) {
        console.error(error)
        return res.status(error.code ? error.code : 500).json({
            data : null,
            msg : error.msg ? error.msg : `Internal Server Error`
        })
    }
}

//controller to fetch the contacts with pagination
export const getContactsController = async (req, res) => {
    try {
        const pageNo = req.query.pageNo
        const contacts = await getContactsService(pageNo)
        const {code , data, msg} = contacts
        return res.status(code).json({
            data,
            msg
        })
    } catch (error) {
        console.error(error)
        return res.status(error.code ? error.code : 500).json({
            data : null,
            msg : error.msg ? error.msg : `Internal Server Error`
        })
    }
}

//controller to fetch the contacts with same userId
export const getContactsByUserIdController = async (req, res) => {
    try {
        const pageNo = req.query.pageNo
        const userId = req.user._id
        const contacts = await getContactsByUserIdService(pageNo, userId)
        const {code , data, msg} = contacts
        return res.status(code).json({
            data,
            msg
        })
    } catch (error) {
        console.error(error)
        return res.status(error.code ? error.code : 500).json({
            data : null,
            msg : error.msg ? error.msg : `Internal Server Error`
        })
    }
}

