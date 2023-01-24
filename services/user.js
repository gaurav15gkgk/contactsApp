//importing libraries
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

// importing user repository
import {
    getUser,
    getUsers,
    addUser,
    checkIfUserExist
} from '../repository/user.js'

dotenv.config()

const saltRound = parseInt(`${process.env.BCRYPT_SALT_ROUNDS}`)
const jwtSecret = process.env.JWT_SECRET

//service to signup the user
export const signupUserService = (name, userName, password) => {
    return new Promise(async (resolve, reject) => {

        //checking if user exists or not
        const userPresent = await checkIfUserExist(userName);
        
        // if present cant signup will throw error
        if(userPresent.data !== null){
          
           return  reject({
                code : userPresent.code,
                data : null,
                msg : userPresent.msg
            })
        }
      
        // if not present signup the user
        try {
            //hashing the password
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

//service to signIn the user
export const signinUserService = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        //checking if the user exists or not
        const userPresent = await checkIfUserExist(userName);

        if(!userPresent.data) {
            console.log(`User doesn't exist`)
            return reject({
                code : 400,
                data : null,
                msg : userPresent.msg
            })
        }

        // if exists then checking the password
        try {
            const hashedPassword = userPresent.data.password
            const isUserSame = bcrypt.compareSync(password, hashedPassword)
            if(!isUserSame) return reject({
                code : 400,
                data : null,
                msg : `Password is not correct`
            })

            //if password is correct then generating the token
            const {_id, name, userName} = userPresent.data
            console.log('userpresent', userPresent)
            const token = jwt.sign(
                {_id : _id,name : name, userName: userName }, 
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

//service to fetch the users 
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

//service to fetch a signle user
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


