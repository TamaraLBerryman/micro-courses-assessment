const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    cost: {
        type: Number,
        required: false
    },
    modules: [
        {
            title: { type: String },
            description: { type: String }
        }
    ]
});

module.exports = mongoose.model('Course', courseSchema);