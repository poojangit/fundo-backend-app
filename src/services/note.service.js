import HttpStatus from 'http-status-codes'
import Note from '../models/note.models'
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
            message : 'Error creating node'
        }
    }
}