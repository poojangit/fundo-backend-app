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