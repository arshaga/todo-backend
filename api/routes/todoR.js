import express from 'express'

import {  getTask,posttodo , updatettodo} from '../controllers/todo.js'
import { checkToken } from '../utils/checkAuth.js'

const router = express.Router()


router.post('/additem',checkToken, posttodo)
router.put('/update/:id', checkToken, updatettodo)
router.get('/gettask',checkToken, getTask)


export default router;
