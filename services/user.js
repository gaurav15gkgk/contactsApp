import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import {
    getUser,
    getUsers,
    addUser,
    checkIfUserExist
} from '../repository/user.js'

dotenv.config()

const saltRound = parseInt(`${process.env.BCRYPT_SALT_ROUNDS}`)
const jwtSecret = process.env.JWT_SECRET

export const signupUserService = (name, userName, password) => {
    return new Promise(async (resolve, reject) => {
        const userPresent = await checkIfUserExist(userName);
        console.log(userPresent)
        if(userPresent.data !== null){
            console.log("User exists already")
           return  reject({
                code : userPresent.code,
                data : null,
                msg : userPresent.msg
            })
        }
      
        try {
            const hashedPassword = bcrypt.hashSync(password, saltRound)
            const newUser = await addUser(name, userName, hashedPassword)
            return resolve(newUser)
        } catch (error) {
            console.log(error)
            return reject({
                code : error.code ? error.code : 500,
                data : null,
                msg : "Problem in saving the password"
            })
        }
    })
}

export const signinUserService = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        const userPresent = await checkIfUserExist(userName);

        if(!userPresent.data) {
            console.log(`User doesn't exist`)
            return reject({
                code : 400,
                data : null,
                msg : userPresent.msg
            })
        }

        try {
            const hashedPassword = userPresent.data.password
            const isUserSame = bcrypt.compareSync(password, hashedPassword)
            if(!isUserSame) return reject({
                code : 400,
                data : null,
                msg : `Password is not correct`
            })

            const {_id, name, userName} = userPresent
            const token = jwt.sign(
                {data :{_id, name, userName}}, 
                jwtSecret, 
                {algorithm: "HS256", expiresIn: '1h'}
            )

            return resolve({
                code : 200,
                data : {
                    token
                },
                msg : `User is authenticated! Welcome`
            })


        } catch (error) {
            console.log(error)
            return reject({
                code : error.code ? error.code : 500,
                data : null,
                msg : error.msg ? error.msg :  "Interval Server error"
            })
        }
    })
}

export const getUsersService = () => {
    return new Promise(async (resolve,reject) => {
        try {
            const usersFound = await getUsers();
            return resolve(usersFound)
        } catch (error) {
            console.log(error)
            return reject({
                code : error.code ? error.code : 500,
                data : null,
                msg : error.msg ? error.msg :  "Interval Server error"
            })
        }
    })
}

export const getUserService = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const userFound = await getUser(userId)
            return resolve(userFound) 
        } catch (error) {
            console.log(error)
            return reject({
                code : error.code ? error.code : 500,
                data : null,
                msg : error.msg ? error.msg :  "Interval Server error"
            })
        }
    })
} 


