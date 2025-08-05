import * as noteService from "../services/note.service"

export const createNote = async(req, res) => {
    const result = await noteService.createNote(req.body)
    res.status(result.code).json({
        code : result.code,
        data : result.data,
        message : result.message
    })
}

export const getAllNotes = async(req, res) => {
    const result = await noteService.getAllNotes(req.body)
    res.status(result.code).json({
        code : result.code,
        data : result.data,
        message : result.message
    })
}

export const updateNote = async(req, res) => {
    const id = req.params.id
    const result = await noteService.updateNote( id , req.body)
    res.status(result.code).json({
        code : result.code,
        data : result.data,
        message : result.message
    })
}