import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default function verifyToken(req, res) {
    try {
        let { token } = req.body
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.SECRET_KEY)

            return res.status(200).json({ ok: true })
        } else if (token) {
            decodedData = jwt.decode(token)

            return res.status(200).json({ ok: true })
        }

        return res.status(403).json({ ok: false })
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong' })
    }
}