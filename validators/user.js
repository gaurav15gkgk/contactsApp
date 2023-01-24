//importing util file for validation
import {
    parameterValidators,
    makeInvalidParametersString
} from '../utils/parameterValidators.js'

//importing specific regex
import {
    onlyCharRegex,
    userNameRegex,
    passwordRegex,
    mongoObjectIdRegex
} from '../utils/commonRegex.js'

//validator for signup
export const signUpValidator  = (req, res, next) => {

    const validParameters = [
        {
            parameter: 'name',
            type: 'string',
            expressionType: 'regex',
            validExpression: onlyCharRegex
        },
       
        {
            parameter: 'userName',
            type: 'string',
            expressionType: 'regex',
            validExpression: userNameRegex
        },
        {
            parameter: 'password',
            type: '',
            expressionType: 'regex',
            validExpression: passwordRegex
        }
    ]

    const inValidParameters = parameterValidators(validParameters, req.body)
       
    if(inValidParameters.length > 0){
        const inValidParametersString = makeInvalidParametersString(inValidParameters)
        return res.status(400).json({
            "error": `${inValidParametersString}`
        })
    }

    next()
}

//validator for signin
export const signInValidator  = (req, res, next) => {

    const validParameters = [
       
        {
            parameter: 'userName',
            type: 'string',
            expressionType: 'regex',
            validExpression: userNameRegex
        },
        {
            parameter: 'password',
            type: '',
            expressionType: 'regex',
            validExpression: passwordRegex
        }
    ]

    const inValidParameters = parameterValidators(validParameters, req.body)
       
    if(inValidParameters.length > 0){
        const inValidParametersString = makeInvalidParametersString(inValidParameters)
        return res.status(400).json({
            "error": `${inValidParametersString}`
        })
    }

    next()
}

//validator for getting single user
export const getUserValidator = (req, res, next) => {
    const validParameters = [
        {
            parameter: 'userId',
            type: '',
            expressionType: 'regex',
            validExpression: mongoObjectIdRegex
        }
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