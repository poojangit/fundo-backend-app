import HttpStatus from 'http-status-codes'
import Note from '../models/note.models'

// CRUD operation on notes

//Create Note
export const createNote = async (noteBody) => {
    try {
        const note = await Note.create(noteBody)
        return {
            code : HttpStatus.CREATED,
            data : note,
            message : 'Note created successfully!!'
        }
    } catch(error) {
        console.error("Error creating note: ", error)
        return {
            code : HttpStatus.INTERNAL_SERVER_ERROR,
            data : [],
            message : 'Error creating note'
        }
    }
}

//Get all Notes

export const getAllNotes = async() => {
    try {
        const notes = await Note.find()
        return {
            code : HttpStatus.OK,
            data : notes,
            message : "Notes fetched successfully!!"
        }
    }
    catch(error) {
        return {
            code : HttpStatus.INTERNAL_SERVER_ERROR,
            data: [],
            message : 'Error fetching notes'
        }
    }
}

//Update note by id

export const updateNote = async (id, noteBody)=> {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            noteBody, 
            {
                new : true   //returns the updated document
            }
        )
        if(!updatedNote){
            return {
                code :  HttpStatus.NOT_FOUND,
                data : [],
                message : 'Note not found'
            }
        }

        return  {
            code : HttpStatus.OK,
            data : updatedNote,
            message : 'Note Updated Successfully!!'
        }
    }
    catch(error) {
        console.error("\n Error Updating note: ", error)
        return {
            code : HttpStatus.INTERNAL_SERVER_ERROR,
            data : [],
            message : 'Error updating note'
        }
    }
}

//get note by id

export const getNoteById = async(id) => {
    try {
        const note = await Note.findById(id)
        if(!note) {
            return {
                code : HttpStatus.NOT_FOUND,
                data : [],
                messsage : "Note not found"
            }
        }
        return {
            code : HttpStatus.OK,
            data : note,
            message : "Note fetched successfully!"
        }
    }
    catch (error) {
        console.log("Error while fetching the details : " + error);
        return {
            code : HttpStatus.INTERNAL_SERVER_ERROR,
            data : [],
            message : "Error fetching note"
        }
    }
}

//Delete note by id
export const deleteNoteById = async(id) => {
    try {
        const note = await Note.findByIdAndDelete(id)
        if(!note) {
            return {
                code : HttpStatus.NOT_FOUND,
                data : [],
                message : "Note not found!"
            }
        }
        return {
            code : HttpStatus.OK,
            data : note,
            message : "Note Deleted Successfully!!"
        }
    } catch(error) {
        console.log("Error while deleting a note" + error);
        return {
            code : HttpStatus.BAD_REQUEST,
            data : [],
            message : "Error deleting note"
        }
    }
}

//Change Color

export const changeColor = async( id, color, userId) => {
    console.log(userId);
    
    try {
        if(!color || !id){
            return {
                code : HttpStatus.BAD_REQUEST,
                data : [],
                message : "Please provide valid color and id"
            }
        }
    
        const note = await Note.findOneAndUpdate(
            { _id: id, createdBy: userId },
            {color : color},
            {new : true} //Returns the updated note
        )
        if(!note){
            return {
                code : HttpStatus.NOT_FOUND,
                data : [],
                message : "Note not found or you don't have permission"
            }
        }
        return {
            code : HttpStatus.OK,
            data : note ,
            message : "Color changed successfully!!"
        }
    } catch (error) {
        console.log("Error while changing the color : " + error.message);
        return {
            code : HttpStatus.INTERNAL_SERVER_ERROR,
            data : [],
            message : "Unable to change the color"
        }
    }
}

//Archive note

export const archiveNote = async(id, isArchive, userId) => {
    console.log(isArchive);
    try {
        if(!id){
            return {
                code : HttpStatus.BAD_REQUEST,
                data : [],
                message : "Please provide a valid note ID"
            }
        }
        const note = await Note.findOneAndUpdate(
            {_id : id, createdBy : userId},
            {isArchive : isArchive},
            {new : true}
        )
        if(!note){
            return {
                code : HttpStatus.NOT_FOUND,
                data : [],
                message : "Note not found or you don't have permission"
            }
        }
        return {
            code : HttpStatus.OK,
            data : note,
            message : "Note Archived successfully"
        }
    } catch(error){
        console.error("Error updating isArchive: ", error.message)
        return {
            code : HttpStatus.INTERNAL_SERVER_ERROR,
            data : [],
            message : "Unable to update isArchive"
        }
    }
}

//Trash note

export const trashNote = async(id, isTrash, userId) => {
    console.log(isTrash);
    try {
        if(!id) {
            return {
                code : HttpStatus.BAD_REQUEST,
                data : [],
                message : "Please provide a valid Note Id"
            }
        }
        const note = await Note.findOneAndUpdate(
            {_id : id, createdBy: userId},
            {isTrash : isTrash},
            {new : true}
        )
        if(!note) {
            return {
                code : HttpStatus.NOT_FOUND,
                data : [],
                message : "Note not found or yu=ou don't have permission"
            }
        }
        return {
            code : HttpStatus.OK,
            data : note,
            message : "Note added to trash successfully"
        }
    } catch(error){
        console.error("Error updating isTrash: " , error.message)
        return {
            code : HttpStatus.INTERNAL_SERVER_ERROR,
            data : [],
            message : "Unable to update isTrash"
        }
    }
}