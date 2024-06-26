const Task = require('../model/Task')

const taskController = {}

taskController.createTask = async (req, res) =>{
    try{
        const {task, isComplete} = req.body;
        const {userId} = req;
        const newTask = await Task.create({ task, isComplete, author : userId});
        console.log("newtask",newTask)
        res.status(200).json({status:'ok',data: newTask});
    }catch(err){
        res.status(400).json({status:'fail',error: err})
    }    
}

taskController.getTask = async (req, res) =>{
    try{
        const taskList = await Task.find({}).populate("author");

        res.status(200).json({status:'ok',data: taskList});
    }catch(err){
        res.status(400).json({status:'fail',error: err})
    }    
}

taskController.getTaskstatus = async (req, res) =>{
    try{
        const { status } = req.params;
        const tasks = await Task.find({ status });
        res.status(200).json({status:'ok',data: tasks});
    }catch(err){
        res.status(400).json({status:'fail',error: err})
    }    
}

taskController.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { task, isComplete } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, { task, isComplete }, { new: true, runValidators: true });
        if (!updatedTask) {
            return res.status(404).json({ status: 'fail', message: 'Task not found' });
        }
        res.status(200).json({ status: 'ok', data: updatedTask });  
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err });
    }
}

taskController.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ status: 'fail', message: 'Task not found' });
        }
        res.status(200).json({ status: 'ok', message: 'Task deleted successfully' });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err });
    }
}

taskController.clearAllTasks = async (req, res) => {
    try {
        await Task.deleteMany({});
        res.status(200).json({ status: 'ok', message: 'All tasks cleared successfully' });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err });
    }
};


module.exports = taskController;