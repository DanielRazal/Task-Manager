const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const handleErrors = require("../errors/handleErrors");
const Task = require("../models/task");

// Getting all
router.get('/', asyncHandler(async (req, res) => {
    try {
        const tasks = await Task.find().populate('list');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}));

// Creating one
router.post('/', asyncHandler(async (req, res) => {
    const task = new Task(req.body);
    try {
        const newTask = await task.save();
        res.status(201).json({ newTask, message: `The ${Task.modelName} has been successfully added` });
    } catch (err) {
        handleErrors(err, res);
    }
}));


// Deleting All
router.delete('/', asyncHandler(async (req, res) => {
    try {
        await Task.deleteMany({});
        res.json({ message: `Deleted all ${Task.modelName} records` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}));

// Getting One
router.get('/:id', asyncHandler(async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('list');
        if (!task) {
            return res.status(404).json({ message: `Cannot find ${Task.modelName} with id ${req.params.id}` });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}));

// Deleting One
router.delete('/:id', asyncHandler(async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndRemove(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: `Cannot find ${Task.modelName} with id ${req.params.id}` });
        }
        const itemName = deletedTask.name;
        res.json({ message: `Deleted ${Task.modelName} with name ${itemName}` });
    } catch (err) {
        ``
        res.status(500).json({ message: err.message });
    }
}));

// Updating One
router.patch('/:id', asyncHandler(async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: `Cannot find ${Task.modelName} with id ${req.params.id}` });
        }
        Object.assign(task, req.body);
        const updatedTask = await task.save();
        res.json({ updatedTask, message: `The ${Task.modelName} has been successfully updated` });
    } catch (err) {
        handleErrors(err, res);
    }
}));

// Getting all tasks by listId
router.get('/ByList/:id', async (req, res) => {
    try {
        const listId = req.params.id;
        const tasks = await Task.find({ list: listId });

        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;