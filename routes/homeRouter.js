import express from 'express';
import User from '../models/user.js';

const homeRouter = express.Router();

homeRouter.get('/timer', async (req, res) => {
    try {
        if (!req.userId) res.status(403).json({ message: 'You are not authenticated' })

        const user = await User.findById(req.userId)
        const timerSettings = user.timerSettings
        res.status(200).json({ timerSettings })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Something went wrong' })
    }

})

homeRouter.post('/timer', async (req, res) => {
    try {
        if (!req.userId) return res.status(403).json({ message: 'You are not authenticated' })

        const user = await User.findById(req.userId)
        user.timerSettings = req.body;
        user.save();
        res.status(200).json({ timerSettings: user.timerSettings })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Something went wrong' })
    }
})

homeRouter.get('/list', async (req, res) => {
    try {
        if (!req.userId) res.status(403).json({ message: 'You are not authenticated' })

        const user = await User.findById(req.userId)
        const toDoList = user.toDoList
        res.status(200).json({ toDoList })
    }
    catch (error) {
        res.status(500).send({ message: 'Something went wrong' })
    }
})

homeRouter.post('/list', async (req, res) => {
    try {
        if (!req.userId) return res.status(403).json({ message: 'You are not authenticated' })

        const user = await User.findById(req.userId)
        user.toDoList = req.body;
        user.save();
        res.status(200).json({ toDoList: user.toDoList })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Something went wrong' })
    }
})

homeRouter.get('/notes', async (req, res) => {
    try {
        if (!req.userId) return res.status(403).json({ message: 'You are not authenticated' })

        const user = await User.findById(req.userId)
        const notes = user.notes
        res.status(200).json({ notes })
    }
    catch (error) {
        res.status(500).send({ message: 'Something went wrong' })
    }
})

homeRouter.post('/notes', async (req, res) => {
    try {
        if (!req.userId) res.status(403).json({ message: 'You are not authenticated' })

        const user = await User.findById(req.userId)
        user.notes = req.body;
        user.save();
        res.status(200).json({ notes: user.notes })
    }
    catch (error) {
        res.status(500).send({ message: 'Something went wrong' })
    }
})

homeRouter.get('/saved', async (req, res) => {
    try {
        if (!req.userId) return res.status(403).json({ message: 'You are not authenticated' })

        const user = await User.findById(req.userId)
        const saved = user.saved
        res.status(200).json({ notes })
    }
    catch (error) {
        res.status(500).send({ message: 'Something went wrong' })
    }
})

homeRouter.post('/saved', async (req, res) => {
    try {
        if (!req.userId) res.status(403).json({ message: 'You are not authenticated' })

        const user = await User.findById(req.userId)
        user.saved = req.body;
        user.save();
        res.status(200).json({ saved: user.saved })
    }
    catch (error) {
        res.status(500).send({ message: 'Something went wrong' })
    }
})

export default homeRouter;