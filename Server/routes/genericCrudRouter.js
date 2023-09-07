const express = require('express')
const router = express.Router()
const asyncHandler = require("../helpers/asyncHandler");


function createGenericCrudRouter(Model) {

    // Getting all
    router.get('/', asyncHandler(async (req, res) => {
        try {
            const items = await Model.find();
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }));

    // Creating one
    router.post('/', asyncHandler(async (req, res) => {
        const item = new Model(req.body);
        try {
            const newItem = await item.save();
            res.status(201).json(newItem);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }));

    // Deleting All
    router.delete('/', asyncHandler(async (req, res) => {
        try {
            await Model.deleteMany({});
            res.json({ message: `Deleted all ${Model.modelName} records` });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }));

    // Getting One
    router.get('/:id', asyncHandler(async (req, res) => {
        try {
            const item = await Model.findById(req.params.id);
            if (!item) {
                return res.status(404).json({ message: `Cannot find ${Model.modelName} with id ${req.params.id}` });
            }
            res.json(item);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }));

    // Deleting One
    router.delete('/:id', asyncHandler(async (req, res) => {
        try {
            const deletedItem = await Model.findByIdAndRemove(req.params.id);
            if (!deletedItem) {
                return res.status(404).json({ message: `Cannot find ${Model.modelName} with id ${req.params.id}` });
            }
            res.json({ message: `Deleted ${Model.modelName} with id ${req.params.id}` });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }));

    // Updating One
    router.patch('/:id', asyncHandler(async (req, res) => {
        try {
            const item = await Model.findById(req.params.id);
            if (!item) {
                return res.status(404).json({ message: `Cannot find ${Model.modelName} with id ${req.params.id}` });
            }
            Object.assign(item, req.body);
            const updatedItem = await item.save();
            res.json(updatedItem);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }));

    return router;
}

module.exports = createGenericCrudRouter;