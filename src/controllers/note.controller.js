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

export const deleteNoteById = async (req, res) => {
    try {
        const id = req.params.id
        const result = await noteService.deleteNoteById(id)
        res.status(result.code).json({
            code : result.code,
            data : result.data,
            message : result.message
        })
    } catch (error) {
        console.log(error)
    }
}

export const changeColor = async(req, res) => {
    try {
    const id = req.params.id
    const {color} = req.body
    const userId = req.body.createdBy
    const result = await noteService.changeColor(id, color, userId)
    res.status(result.code).json({
            code : result.code,
            data : result.data,
            message : result.message
        })
    }
    catch(error) {
        console.log("Error occured : " + error);
    }
}

export const archiveNote = async(req, res) => {
    try {
        const id = req.params.id
        const {isArchive} = req.body
        const userId = req.body.createdBy
        const result = await noteService.archiveNote(id, isArchive, userId)
        res.status(result.code).json({
            code : result.code,
            data : result.data,
            message : result.message
        })
    } catch(error) {
        console.error("Error in Archive controller: " , error);  
    }
}

export const trashNote = async(req, res) => {
  try {
  const id = req.params.id
  const { isTrash } = req.body
  const userId = req.body.createdBy
  const result = await noteService.trashNote(id, isTrash, userId)
  res.status(result.code).json({
    code : result.code,
    data : result.data,
    message : result.message
  })
} catch(error){
  console.log("Error in trash note controller : " + error);
  
}
}

