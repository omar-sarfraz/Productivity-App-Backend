import Tips from './models/tips.js';

export default async function getTips(req, res) {
    try {
        let tips = await Tips.find({})
        res.status(200).json({ tips: tips })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}