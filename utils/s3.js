//importing the libraries
import S3 from 'aws-sdk/clients/s3.js'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'

dotenv.config()

const bucketName = process.env.AWS_S3_BUCKET_NAME
const bucketRegion = process.env.AWS_S3_BUCKET_REGION
const accessKey = process.env.IAM_ACCESS_KEY
const secretAccessKey = process.env.IAM_SECRET_ACCESS_KEY

//creating a new instance for s3
const s3 = new S3({
    region: bucketRegion,
    accessKeyId : accessKey,
    secretAccessKey : secretAccessKey
})

//function to upload the file to s3 bucket
export const uploadFile = async(file) => {
    const fileReadStream = fs.createReadStream(file.path)
    const uploadParams = {
        Bucket : bucketName,
        Body : fileReadStream,
        Key : uuidv4(),
        
    }

    return s3.upload(uploadParams).promise()
}

//function to fetch the file from s3 bucket
export const getFile = async(fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket : bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}

