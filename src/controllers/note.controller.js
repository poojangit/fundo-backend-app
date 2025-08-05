import * as noteService from '../services/note.service';

export const createNote = async (req, res) => {
  try {
    const result = await noteService.createNote(req.body);
    res.status(result.code).json({
      code: result.code,
      data: result.data,
      message: result.message
    });
  } catch (error) {
    console.log('Error Occured : ' + error);
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const result = await noteService.getAllNotes(req.body);
    res.status(result.code).json({
      code: result.code,
      data: result.data,
      message: result.message
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await noteService.updateNote(id, req.body);
    res.status(result.code).json({
      code: result.code,
      data: result.data,
      message: result.message
    });
  } catch (error) {
    console.log('Error occured : ' + error);
  }
};

export const getNoteById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await noteService.getNoteById(id);
    res.status(result.code).json({
      code: result.code,
      data: result.data,
      message: result.message
    });
  } catch (error) {
    console.log(error);
  }
};
