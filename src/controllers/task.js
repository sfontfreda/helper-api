const Task = require("../models/task.js")

/**
* Get all tasks in the database.
* @returns   {Object}  HTTP Rensponse containing all the existing tasks in the database or an error satuts.
*/
function getTasks(req, res)  {
    console.log(`🔍 Finding all tasks`)
    Task.find()
        .then((tasks) => res.send( { tasks }))
        .catch ((err) => (res.status(500).send(`There was an error when trying to retrieve the data. ERROR: ${err}`))) 
}

/**
* Get total number of tasks in READY status, to see the total of remaining tasks in the queue. 
* @return   {Number}  Amount of entries which state is REMAINING.
*/
function countRemainingTasks(req, res) {
    console.log(`🔍 Counting all tasks in ready state`)
    Task.count({status:"ready"})
        .then((tasks) => res.send({tasks}))
        .catch((err) => (res.status(500).send(`There was an error when trying to retrieve the data. ERROR: ${err}`))) 
    }

/**
* Get total number of tasks in RESERVED status, to see the total of remaining tasks in the queue.
* @return   {Number}  Amount of entries which state is RESERVED.
*/
function countActiveTasks(req, res) {
    console.log(`🔍 Counting all tasks in reserved state`)
    Task.count({status:"reserved"})
        .then((tasks) => res.send({tasks}))
        .catch((err) => (res.status(500).send(`There was an error when trying to retrieve the data. ERROR: ${err}`))) 
    }

/**
* Get detailed information in JSON format about tasks filtering by status (ready or reserved).
* @param    {Object} Request    Request containing the value of the status to filter tasks by (ready, reserved or delay).
* @return   {Object}            HTTP Rensponse containing all the matching tasks in the database or an error status.
*/
function getTasksByStatus(req, res) {
    let status = req.params.status
    console.log(`🔍 Finding all tasks in ${status} state`)
    Task.find({status:status}, (err, resp) => {
        if (err) res.status(500).send({message: `Could not retrieve the entries. ERROR: ${err}`})
        res.send({resp})
    })

}

/**
* Get detailed information in JSON format from the unique task matching the task ID.
* @param    {Object} Request    Request containing the value of the ID of the Task the information will be retrived from.
* @return   {Object}            HTTP Rensponse containing all the information about the specified Task or an error status.
*/
function getTask(req, res) {
    let taskId = req.params.taskId
    console.log(`🔍 Finding the task with ID ${taskId}`)
    Task.findById(taskId)
        .then((task) => res.send({task}))
        .catch((err) => (res.status(500).send(`There was an error when trying to retrieve the data. ERROR: ${err}`))) 
}

/**
* Send information to create a record in the database.
* @param    {Object} Request   Request containing the values of the entry to be created.
* @return   {Object}           HTTP Rensponse containing all the information about the specified Task or an error status.
*/
function createTask(req, res) {
    let newTask = new Task() 
    newTask.status = req.body.status
    newTask.MTId = req.body.MTId
    newTask.filename = req.body.filename

    // Checking if the data in the Post request is complete and valid
    if (["ready", "reserved", "delayed"].includes(newTask.status) && newTask.MTId >= 0 && newTask.filename ) {
        console.log(`✏️ Creating a new task`)
        newTask.save((err, taskStored) => {
            if (err) res.status(500).send({message: `Could not store the new entry. ERROR: ${err}`})
            res.send({message: `New entry created for task ${taskStored._id}`})
            }) 
        }
    }

/**
* Modify the already existing database record to change the task status via URL parameters.
* @param    {Object} Request    Request containing the ID of the task to be modified and the new status for the task.
* @return   {Object}            HTTP Response containing the updated task or an error code.
*/
function modifyTaskStatus(req, res) {
    let taskId = req.params.taskId
    let newSatus = req.params.status
    console.log(`📝 Modifying task with ID ${taskId}, updating status to ${newSatus}`)
    Task.findByIdAndUpdate(taskId, {$set: {status: newSatus}}, (err, response) => {
        if (err)  return  res.status(500).send(`Error updating the task, ERROR: ${err}`)
        res.send({task : response})      
    })
}

/**
* Delete a single existing task record in the database.
* @param    {Object} Request    Request containing the ID of the task to be deleted.
* @return   {Object}            HTTP Response containing a success or error message.
*/
function deleteTask(req, res) {
    let taskId = req.params.taskId
    console.log(`🗑️  Deleting the task with ID ${taskId}`)
    Task.findById(taskId, (err, task) => {
        if (err) return res.status(404).send("Task not found in the database, meaning it has either been completed or it has never existed.")
        task.remove()
            .then( () => res.send(`Task with ID ${taskId} deleted`))
            .catch((err) => res.status(404).send("Task not found in the database, could not be removed"))
        })
    }

// Exporting API functions
module.exports = {
    getTasks,
    countRemainingTasks,
    countActiveTasks,
    getTasksByStatus,
    getTask,
    createTask,
    modifyTaskStatus,
    deleteTask
}