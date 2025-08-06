import express from 'express'
import * as userController from '../controllers/user.controller'
import { newUserValidator } from '../validators/user.validation'

const router = express.Router()

router.post('', newUserValidator, userController.newUser)

router.post('/login', userController.userLogin )
router.post('/forgotPassword', userController.forgotPass)
router.post('/resetPassword', userController.resetPass)

export default router