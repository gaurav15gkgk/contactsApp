import UserModel from '../models/user.js'

export const getUsers = async () => {
    try {
        const usersFound = await UserModel.find().select('_id name userName')
        return {
            code : 200,
            data : usersFound,
            msg : "Users found successfully"
        }
    } catch (error) {
        console.log(`Error in fetching the users`)
        console.error(error)
        return {
            code : 500,
            data : null,
            msg : "Error in fetching the users"
        }
    }
}


export const getUser = async(userId) => {
    try {
        const userFound = await UserModel.findById(userId).select('_id name userName')
        return {
            code : 200,
            data : userFound,
            msg : "User found successfully"
        }
    } catch (error) {
        console.log(`Error in fetching the user`)
        console.error(error)
        return {
            code : 500,
            data : null,
            msg : "Error in fetching the user"
        }
    }
}

export const addUser = async(name, userName, password) => {
    try {
        const newUser = UserModel({
            name: name,
            userName : userName,
            password : password
        })

        await newUser.save()
        return {
            code : 201,
            data : null,
            msg : "User saved successfully"
        }
    } catch (error) {
        console.log(`Error in adding the user`)
        console.error(error)
        return {
            code : 500,
            data : null,
            msg : "Error in adding the user"
        }
    }
}

export const checkIfUserExist = async(userName) => {
    try {
        const userFound = await UserModel.findOne({userName: userName})
        return {
            code : userFound ? 400 : 200,
            data : userFound ,
            msg : `${userFound ? `Username exists already`: `Cant find the user`}`
        }
    } catch (error) {
        console.log(`Error in fetching the user`)
        console.error(error)
        return {
            code : 500,
            data : null,
            msg : "Error in fetching the user"
        }
    }
}

