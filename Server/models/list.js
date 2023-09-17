const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a Name to the List.'],
        minlength: [3, 'List Name must be at least 3 characters.'],
        maxlength: [30, 'List Name cannot exceed 30 characters.'],
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const List = mongoose.model('List', listSchema);

module.exports = List;
