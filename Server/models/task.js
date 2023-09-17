const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a Name to the List.'],
        minlength: [3, 'List Name must be at least 3 characters.'],
        maxlength: [30, 'List Name cannot exceed 30 characters.'],
        trim: true,
    },
    isDone: {
        type: Boolean,
        default: false
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: true,
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
