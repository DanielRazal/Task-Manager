const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const List = require('../models/list');

// Getting all
router.get('/', asyncHandler(async (req, res) => {
    try {
        const lists = await List.find().populate('user');
        res.json(lists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}));

// Getting all by id
router.get('/:id', asyncHandler(async (req, res) => {
    try {
        const list = await List.findById(req.params.id).populate('user');
        if (!list) {
            return res.status(404).json({ message: `Cannot find ${List.modelName} with id ${req.params.id}` });
        }
        res.json(list);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}));


// Creating one
router.post('/', asyncHandler(async (req, res) => {
    const list = new List(req.body);
    try {
        const newList = await list.save();
        res.status(201).json({ newList, message: "The list has been successfully added" });
    } catch (err) {
        if (err.errors) {
            const errorMessages = [];
            for (const key in err.errors) {
                if (err.errors.hasOwnProperty(key)) {
                    errorMessages.push(err.errors[key].message);
                }
            }
            res.status(400).json({ message: errorMessages });
        } else {
            res.status(400).json({ message: err.message });
        }
    }
}));


// Deleting All
router.delete('/', asyncHandler(async (req, res) => {
    try {
        await List.deleteMany({});
        res.json({ message: `Deleted all ${List.modelName} records` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}));

// Getting One
router.get('/:id', asyncHandler(async (req, res) => {
    try {
        const list = await List.findById(req.params.id).populate('user');
        if (!list) {
            return res.status(404).json({ message: `Cannot find ${List.modelName} with id ${req.params.id}` });
        }
        res.json(list);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}));

// Deleting One
router.delete('/:id', asyncHandler(async (req, res) => {
    try {
        const deletedList = await List.findByIdAndRemove(req.params.id);
        if (!deletedList) {
            return res.status(404).json({ message: `Cannot find ${List.modelName} with id ${req.params.id}` });
        }
        res.json({ message: `Deleted ${List.modelName} with id ${req.params.id}` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}));

// Updating One
router.patch('/:id', asyncHandler(async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        if (!list) {
            return res.status(404).json({ message: `Cannot find ${List.modelName} with id ${req.params.id}` });
        }
        Object.assign(list, req.body);
        const updatedList = await list.save();
        res.json(updatedList);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}));

module.exports = router;