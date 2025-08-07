import express from 'express'
import * as noteController from '../controllers/note.controller'
import { userAuth } from '../middlewares/auth.middleware';
import { noteValidator } from '../validators/note.validation';
const router = express.Router()

router.post('/', noteValidator , userAuth ,noteController.createNote)
router.get('/', userAuth, noteController.getAllNotes)
router.put('/:id', userAuth, noteController.updateNote)
router.get('/:id' , userAuth, noteController.getNoteById)
router.delete('/:id', userAuth, noteController.deleteNoteById)
router.patch('/color/:id', userAuth, noteController.changeColor)
router.patch('/isArchive/:id', userAuth, noteController.archiveNote)
router.patch('/trash/:id', userAuth,  noteController.trashNote)

export default router;