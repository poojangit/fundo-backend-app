import {model, Schema} from 'mongoose'

const noteSchema = new Schema(
    {
        title : {
            type : String,
            required : true,
            trim : true
        },
        description : {
            type : String,
            trim : true
        },
        createdBy : {
            type : Schema.Types.ObjectId,
            ref : 'User',
            required : true
        },
        color : {
            type : String,
        },
        isArchive : {
            type : Boolean,
            default : false
        },
        isTrash : {
            type : Boolean,
            default : false
        }
    }, 
    {
        timestamps : true
    }
)

export default model('Note', noteSchema)