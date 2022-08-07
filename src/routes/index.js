const express = require("express")
const api = express.Router()
const TaskController = require("../controllers/task.js")

api.get("/task", TaskController.getTasks)
api.get("/task/remaining-tasks-amount", TaskController.countRemainingTasks)
api.get("/task/active-tasks-amount", TaskController.countActiveTasks)
api.get("/task/status/:status", TaskController.getTasksByStatus)
api.get("/task/id/:taskId", TaskController.getTask)
api.post("/task", TaskController.createTask)
api.put("/task/update/:taskId/:status", TaskController.modifyTaskStatus) 
api.delete("/task/id/:taskId", TaskController.deleteTask)

module.exports = api