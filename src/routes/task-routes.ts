import express from 'express'
import TaskController from '../controllers/task-controller'

const router = express.Router()

router.get('/tasks', TaskController.getTasks)
router.get('/tasks/search', TaskController.search)
router.get('/tasks/filter', TaskController.filter)
router.get('/tasks/:id', TaskController.getTaskById)
router.post('/tasks', TaskController.createTask)
router.put('/tasks/:id', TaskController.updateTask)
router.delete('/tasks/:id', TaskController.deleteTask)

export default router
