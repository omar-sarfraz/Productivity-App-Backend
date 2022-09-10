import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRouter from './routes/userRouter.js';
import homeRouter from './routes/homeRouter.js';
import auth from './middleware/auth.js';
import verifyToken from "./verify.js";
import getTips from './tips.js'

const app = express();
dotenv.config()

app.use(cors())
app.use(express.json())

app.use('/', userRouter);
app.get('/tips', getTips)
app.use('/home', auth, homeRouter)
app.post('/verify', verifyToken)

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`)))
    .catch((error) => console.error(error))

module.exports = app;