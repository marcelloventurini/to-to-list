import { Request, Response } from 'express'
import Task, { ITask } from '../models/task.js'
import mongoose, { FilterQuery } from 'mongoose'

class TaskController {
  static async getTasks(_: Request, res: Response): Promise<void> {
    try {
      const tasks = await Task.find()
      res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json({ message: 'Failed to get tasks.' })
    }
  }

  static async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid ID format.' })
        return
      }

      const task = await Task.findById(id)

      if (!task) {
        res.status(404).json({ message: 'ID not found.' })
      } else {
        res.status(200).json(task)
      }

    } catch (error) {
      res.status(500).json({ message: 'Failed to get tasks.' })
    }
  }

  static async createTask(req: Request, res: Response): Promise<void> {
    try {
      const taskDetails: ITask = req.body
      const newTask = await Task.create(taskDetails)

      res.status(200).json({ message: 'Task successfully created.', newTask })
    } catch (error) {
      res.status(500).json({ message: 'Failed to create new task.' })
    }
  }

  static async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid ID format.' })
        return
      }

      const taskDetails: ITask = req.body
      const updatedTask = await Task.findByIdAndUpdate(id, taskDetails, { new: true })

      if (!updatedTask) {
        res.status(404).json({ message: 'ID not found.' })
      } else {
        res.status(200).json({ message: 'Task successfully updated.', updatedTask })
      }

    } catch (error) {
      res.status(500).json({ message: 'Failed to update task.' })
    }
  }

  static async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid ID format.' })
        return
      }

      const deletedTask = await Task.findByIdAndDelete(id)

      if (!deletedTask) {
        res.status(404).json({ message: 'ID not found.' })
      } else {
        res.status(200).json({ message: 'Task successfully deleted.' })
      }

    } catch (error) {
      res.status(500).json({ message: 'Failed to delete task.' })
    }
  }

  static async search(req: Request, res: Response): Promise<void> {
    try {
      const { title } = req.query
      const regex = new RegExp(title as string, 'i')
      const tasks = await Task.find({ title: regex })

      if (tasks.length === 0) {
        res.status(404).json({ message: 'Task not found.' })
        return
      }

      res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json({ message: 'Failed to find task.' })
    }
  }

  static async filter(req: Request, res: Response): Promise<void> {
    try {
      const { status, priority } = req.query
      const search: FilterQuery<ITask> = {}

      if (status) search.status = status
      if (priority) search.priority = priority

      const tasks = await Task.find(search)

      res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json({ message: 'Failed to find task.' })
    }
  }
}

export default TaskController
