import HttpStatus from 'http-status-codes'
import bcrypt from 'bcrypt'
import User from '../models/user.model'

const saltRounds = 10
//Create new User
export const newUser = async(body) => {
    try {
        // check if user already exists
        const checkUser = await User.findOne({
        email : body.email
    })
    if(checkUser){
        return {
            code : HttpStatus.CONFLICT,
            data : [],
            message : "User already exists"
        }
    }
    //hash password 
    const hashedPass = await bcrypt.hash(body.password, saltRounds)

    const data = await User.create({
        ...body,
        password: hashedPass
    })

    return {
        code : HttpStatus.CREATED,
        data,
        message : "User created successfully!"
    }
    } catch(error) {
        console.error(error);
        return {
            code : HttpStatus.INTERNAL_SERVER_ERROR,
            data : [],
            message : "Error occured while creating user"
        } 
    }
}