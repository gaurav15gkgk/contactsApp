//importing from the csv model
import CsvModel from '../models/csv.js'

// repository to save the csv file info
export const saveCsvInfo = async (s3Key, userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const newCsvInfo = new CsvModel({
                s3Key : s3Key,
                userId : userId
            })
    
            await newCsvInfo.save()
            return resolve({
                code : 200,
                data : null,
                msg : `csv file details updated`
            })
        } catch (error) {
            console.error(error)
            return reject({
                code : 500,
                data : null,
                msg : `Error occurred in saving csv file info`
            })
        }
    })
    
}

//repository to get the csv file info
export const getCsvInfo = async(csvId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const csvFile = await CsvModel.findById(csvId)
            return resolve({
                code : 200,
                data : csvFile,
                msg : `csv file info restored`
            })
        } catch (error) {
            console.error(error)
            return reject({
                code : 500,
                data : null,
                msg : `Error occurred in fetching csv file info`
            })
        }
    })
    
}

// repository to get the csv file info with common userId
export const getCsvInfoByUserId = async(userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const csvFiles = await CsvModel.find({userId})
            return resolve({
                code : 200,
                data : csvFiles,
                msg : `csv file info restored`
            })
        } catch (error) {
            console.error(error)
            return reject({
                code : 500,
                data : null,
                msg : `Error occurred in fetching csv file info`
            })
        }
    })
    
}