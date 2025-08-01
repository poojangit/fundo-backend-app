import User from '../models/user.model'

export const newUser = async(body) => {
    const data = await User.create(body)
    return data 
}