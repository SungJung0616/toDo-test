const express = require("express");
const authController = require("../controller/auth.controller");
const taskController = require("../controller/task.controller");
const router = express.Router();

router.post('/', authController.authenticate,taskController.createTask);

router.get('/',taskController.getTask);

router.get('/status/:status',taskController.getTaskstatus);

router.delete('/clear', taskController.clearAllTasks);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);



module.exports = router;