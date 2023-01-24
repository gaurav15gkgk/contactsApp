//importing libraries
import csv from 'csv-parser'
import fs from 'fs'

// function to read from the csv file
export const readCsvFile = async (file, userId) => {
    return new Promise((resolve, reject) => {
        try {
            let csvContents = []
            fs.createReadStream(file.path)
            .pipe(csv())
            .on('data', (data) => csvContents.push({...data, userId}))
            .on('end', () => {
                console.log("csvContents ", csvContents.length)
                return  resolve(csvContents)
            })
        } catch (error) {
            console.error(error)
            return reject({
                data: [],
                msg : "Error in reading Csv file",
                code : 500
            })
        } 
    })
}