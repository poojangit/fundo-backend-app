import express from 'express'
import * as noteController from '../controllers/note.controller'
import { userAuth } from '../middlewares/auth.middleware';
const router = express.Router()

router.post('/', userAuth ,noteController.createNote)
router.get('/', userAuth, noteController.getAllNotes)
router.put('/:id', userAuth, noteController.updateNote)


export default router;