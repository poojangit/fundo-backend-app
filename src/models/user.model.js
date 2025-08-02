import { Schema , model} from "mongoose";

const userSchema = new Schema(
    {
        firstName : {
            type: String,
            required: true,
            trim: true
        },
        lastName : {
            type: String,
            trim: true
        },
        email : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password : {
            type: String,
            required: true
        }
    },
    {
        timestamps : true
    }
)

export default model('User', userSchema)