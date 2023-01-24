//importing the csv services
import {
    getCsvFileService,
    getCsvInfoByUserIdService,
    getCsvInfoService
} from '../services/csv.js'

//controller to fetch the csv file
export const getCsvFileController = async (req, res) => {
    try {
        const fileKey = req.params.csvS3Id
        const fileReadStream = await getCsvFileService(fileKey)
        fileReadStream.pipe(res)
    } catch (error) {
        console.error(error)
        return res.status(error.code ? error.code : 500).json({
            data : null,
            msg : error.msg ? error.msg : `Internal Server Error`
        })
    }
}

//controller to fetch csv file info 
export const getCsvInfoController = async (req, res) => {
    try {
        const csvId = req.query.csvId
        const csvInfo = await getCsvInfoService(csvId)
        const {code, data, msg} = csvInfo
        return res.status(code).json({
            data : data,
            msg : msg
        })
    } catch (error) {
        console.error(error)
        return res.status(error.code ? error.code : 500).json({
            data : null,
            msg : error.msg ? error.msg : `Internal Server Error`
        })
    }
}

//controller to fetch csv file info with same user
export const getCsvInfoByUserIdController = async(req, res) => {
    try {
        const userId = req.user._id
        const csvInfo = await getCsvInfoByUserIdService(userId)
        const {code, data, msg} = csvInfo
        return res.status(code).json({
            data : data,
            msg : msg
        })
    } catch (error) {
        console.error(error)
        return res.status(error.code ? error.code : 500).json({
            data : null,
            msg : error.msg ? error.msg : `Internal Server Error`
        })
    }
}