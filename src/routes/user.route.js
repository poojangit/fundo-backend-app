import express from 'express'
import * as userController from '../controllers/user.controller'
import { newUserValidator } from '../validators/user.validation'

const router = express.Router()

router.post('', newUserValidator, userController.newUser)

export default router