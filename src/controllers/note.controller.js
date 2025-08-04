import * as noteService from "../services/note.service"

export const createNote = async(req, res) => {
    const result = await noteService.createNote(req.body)
    res.status(result.code).json({
        code : result.code,
        data : result.data,
        message : result.message
    })
}