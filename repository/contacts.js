//importing contact model
import ContactModel from '../models/contacts.js'

const contactsPerPage = 20

//repository to save contacts
export const saveContacts = async(files) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contacts = await ContactModel.insertMany(files)
            return resolve({
                code : 200,
                data : null,
                msg : 'Contacts are added successfully'
            })
        } catch (error) {
            console.error(error)
            return reject({
                code : 500,
                data : null,
                msg: "Error in inserting contacts"
            })
        }
    })

}

//repository to fetch the contacts
export const fetchContacts = async (pageNo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contacts = await ContactModel.find()
                                    .limit(contactsPerPage)
                                    .skip((pageNo - 1)*contactsPerPage)
                                    .select('_id name phone email linkedInProfile userId')
            return resolve({
                code : 200,
                data : contacts,
                msg : `Contacts are fetched successfully`
            })
                                    
        } catch (error) {
            console.error(error)
            return reject({
                code : 500,
                data : null,
                msg : `Error in fetching contacts`
            })
        }
    })
}

//repository to fetch the contacts with common userId
export const fetchContactsByUserId = async (pageNo, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contacts = await ContactModel.find({userId : userId})
                                    .limit(contactsPerPage)
                                    .skip((pageNo - 1)*contactsPerPage)
                                    .select('_id name phone email linkedInProfile userId')
            return resolve({
                code : 200,
                data : contacts,
                msg : `Contacts are fetched successfully`
            })
                                    
        } catch (error) {
            console.error(error)
            return reject({
                code : 500,
                data : null,
                msg : `Error in fetching contacts`
            })
        }
    })
}

