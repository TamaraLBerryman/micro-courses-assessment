require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Course = require('./models/Course');

const app = express();

app.use((req, res, next) => {
    console.log(`[HTTP HIT] ${req.method} ${req.url}`);
    next();
});

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/microcourses";

mongoose.connect(mongoURI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

app.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ error: "Course not found" });
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/courses', async (req, res) => {
    console.log('--- START POST REQUEST ---');
    console.log('Received data:', req.body);
    try {
        const newCourse = new Course(req.body);
        const savedCourse = await newCourse.save();
        console.log('Course saved successfully.');
        res.status(201).json(savedCourse);
    } catch (err) {
        console.error('Error saving course:', err.message);
        res.status(400).json({ error: err.message });
    }
});

app.put('/courses/:id', async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json(updatedCourse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/courses/:id', async (req, res) => {
    try {
        const courseId = req.params.id;

        const result = await Course.findByIdAndDelete(courseId);

        if (!result) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '127.0.0.1', () => { // <--- Changed back to 127.0.0.1
    console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
});