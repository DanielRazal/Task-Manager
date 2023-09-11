const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a Name to the List.'],
        minlength: [3, 'List Name must be at least 3 characters.'],
        maxlength: [50, 'List Name cannot exceed 50 characters.'],
        trim: true,
    },
});

module.exports = mongoose.model('List', ListSchema);