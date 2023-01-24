//importing the libraries
import fs from 'fs'
import util from 'util'

//importing contacts repostiory
import {
    saveContacts,
    fetchContacts,
    fetchContactsByUserId
} from '../repository/contacts.js'

//importing util to read the csv file
import {
    readCsvFile
} from '../utils/csvParser.js'

//importing util for uploading the file to s3
import {
    uploadFile,
} from '../utils/s3.js'

//importing repository to save csv file info
import {
    saveCsvInfo,
} from '../repository/csv.js'

const unlinkSync = util.promisify(fs.unlink)

//service to save the csv file details and upload it
export const saveCsvFileService = async (file , userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            //reading csv file and extracting the data
            const csvData = await readCsvFile(file, userId)

            //saving the csv contacts
            const saveContactsInfo = await saveContacts(csvData)

            //upload the file to s3
            const s3UploadInfo = await uploadFile(file)

            //save the uploaded file details
            const csvFileInfo = await saveCsvInfo(s3UploadInfo.Key, userId)

            //deleting file from the server created by multer
            await unlinkSync(file.path)
    
            return resolve({
                code : 200,
                data : null,
                msg : 'csv file uploaded successfully'
            })
        } catch (error) {
            console.error(error)
            return reject({
                code : error.code ? error.code : 500,
                data : null,
                msg : error.msg ? error.msg : `Internal Server Error`
            })
        }
    })
}

//service to fetch the contacts with pagination
export const getContactsService = async (pageNo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contacts = await fetchContacts(pageNo)
            return resolve(contacts)
        } catch (error) {
            console.error(error)
            return reject(error)
        }
    })
}

//service to fetch the single contacts with common userId with pagination
export const getContactsByUserIdService = async (pageNo, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contacts = await fetchContactsByUserId(pageNo,userId)
            return resolve(contacts)
        } catch (error) {
            console.error(error)
            return reject(error)
        }
    })
}





