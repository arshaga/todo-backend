import express from 'express'
import {   getUser,postUser,addUser, deleteUser,updatetUser, forgotPass} from '../controllers/user.js'
import { login ,logout} from '../controllers/auth.js'
import { checkToken } from '../utils/checkAuth.js'
const router = express.Router()

router.post('/login',login)
router.post('/logout',logout)
router.post('/addUser', addUser)
router.delete('/delete.user/:id', deleteUser)
router.put('/putuser/',checkToken,updatetUser)
router.post('/reg',postUser)
router.get('/getuser',checkToken,getUser)
router.post('/forgotPass',forgotPass)

export default router;