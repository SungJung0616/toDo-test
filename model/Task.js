const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = Schema({
    task:{
        type:String,
        require:true
    },
    isComplete: {
        type: Boolean,
        default: false
    },
},{timestamps:true})

const Task = mongoose.model("Task",taskSchema);

module.exports = Task;