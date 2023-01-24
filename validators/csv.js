import {
    parameterValidators,
    makeInvalidParametersString
} from '../utils/parameterValidators.js'

import {
    mongoObjectIdRegex
} from '../utils/commonRegex.js'

export const getCsvFileValidator  = (req, res, next) => {

    const validParameters = [
        {
            parameter: 'csvS3Id',
            type: 'string',
            expressionType: 'typeof',
            validExpression: mongoObjectIdRegex
        }
    ]

    const inValidParameters = parameterValidators(validParameters, req.params)
       
    if(inValidParameters.length > 0){
        const inValidParametersString = makeInvalidParametersString(inValidParameters)
        return res.status(400).json({
            "error": `${inValidParametersString}`
        })
    }

    next()
}


export const getCsvInfoValidator = (req, res, next) => {

    const validParameters = [
       
        {
            parameter: 'csvId',
            type: 'number',
            expressionType: 'regex',
            validExpression: mongoObjectIdRegex
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

