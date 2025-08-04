import HttpStatus from 'http-status-codes'
import bcrypt from 'bcrypt'
import User from '../models/user.model'
import jwt from 'jsonwebtoken'
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

export const userLogin = async({email, password}) => {
    try {
        const checkUser = await User.findOne({
                email : email
        })
        console.log("User email ", checkUser);
        if(!checkUser){
            return {
                code : HttpStatus.NOT_FOUND,
                data : [],
                message : "no user found"
            }
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, checkUser.password)
        if(!isMatch) {
            return {
                code : HttpStatus.UNAUTHORIZED,
                data : [],
                message : "Invalid Credentials"
            }
        }
        const token = jwt.sign({ email: checkUser.email, id : checkUser._id }, process.env.ACCESS_TOKEN_KEY);

        // return success
        return {
            code : HttpStatus.OK,
            data : {
                id : checkUser._id,
                email: checkUser.email,
                token : token
            },
            message : "Login successful and token generated"
        }
    }
    //login error catch
    catch (error) {
        console.error(error)
        return  {
            code : HttpStatus.INTERNAL_SERVER_ERROR,
            data : [],
            message : "Error occured during login"
        }
    }
}