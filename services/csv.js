//importing csv repositories
import {
    getCsvInfo,
    getCsvInfoByUserId
} from '../repository/csv.js'

//importint the util to fetch the file from s3
import {
    getFile
} from '../utils/s3.js'

//service to fetch the csv file from s3
export const getCsvFileService = async(fileKey) => {
    return new Promise(async(resolve, reject) => {
        try {
            const fileReadStream = await getFile(fileKey)
            return resolve(fileReadStream)
            
        } catch (error) {
            console.error(error)
            return reject({
                code : 500,
                data : null,
                msg : "Internal server error"
            })
        }
    })
}

//service to fetch the csv file info
export const getCsvInfoService = async(csvId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const csvFetched = await getCsvInfo(csvId)
            return resolve(csvFetched)
        } catch (error) {
            console.error(error)
            return reject(error)
        }
    })
}

//service to fetch the csv file info for same user
export const getCsvInfoByUserIdService = async(userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const csvFetched = await getCsvInfoByUserId(userId)
            return resolve(csvFetched)
        } catch (error) {
            console.error(error)
            return reject(error)
        }
    })
}


