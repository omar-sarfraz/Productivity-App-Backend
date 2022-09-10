import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    try {
        const { password } = req.body;
        let receivedUser = req.body;

        let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(403).json({ message: 'User already Exists' })
        if (receivedUser.password !== receivedUser.confirmPassword) return res.status(403).json({ message: "Password do not match" })

        receivedUser.password = await bcrypt.hash(password, 12)

        receivedUser.timerSettings = {
            focusTime: 1,
            breakTime: 1,
            focus: true,
            secondsLeft: 1 * 60,
            focusTimeSec: 60,
            breakTimeSec: 60,
            isStart: false
        }

        user = await User.create(receivedUser)
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY, { expiresIn: "3h" })
        res.status(200).json({ user, token })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Something went wrong' })
    }
})

userRouter.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) return res.status(403).json({ message: "User does not exist" })

        let isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.status(403).json({ message: "Invalid Credentials" })

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY, { expiresIn: "3h" })
        res.status(200).json({ user, token })
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong', error })
    }
})

userRouter.get('/logout', (req, res) => {
    res.status(200).send('Logout')
})

export default userRouter;