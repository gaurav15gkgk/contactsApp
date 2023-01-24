//importing util file for validation
import {
    parameterValidators,
    makeInvalidParametersString
} from '../utils/parameterValidators.js'

//importing specific regex
import {
    onlyNumberRegex
} from '../utils/commonRegex.js'

//validator for csv file upload
export const uploadFileValidator  = (req, res, next) => {

    const validParameters = [
        {
            parameter: 'file',
            type: 'object',
            expressionType: 'typeof',
            validExpression: ''
        }
    ]

    const inValidParameters = parameterValidators(validParameters, req)
       
    if(inValidParameters.length > 0){
        const inValidParametersString = makeInvalidParametersString(inValidParameters)
        return res.status(400).json({
            "error": `${inValidParametersString}`
        })
    }

    next()
}

//validator for fetching the contacts with pagination
export const getContactValidator = (req, res, next) => {

    const validParameters = [
       
        {
            parameter: 'pageNo',
            type: 'number',
            expressionType: 'regex',
            validExpression: onlyNumberRegex
        },
       
    ]

    const inValidParameters = parameterValidators(validParameters, req.query)
       
    if(inValidParameters.length > 0){
        const inValidParametersString = makeInvalidParametersString(inValidParameters)
        return res.status(400).json({
            "error": `${inValidParametersString}`
        })
    }

    next()
}

