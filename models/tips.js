import mongoose from 'mongoose';

const tipsSchema = mongoose.Schema({
    text: String
})

const Tips = mongoose.model('Tip', tipsSchema);
export default Tips;