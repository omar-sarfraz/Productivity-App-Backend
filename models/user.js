import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    timerSettings: {
        focusTime: {
            type: Number,
            default: 50
        },
        breakTime: {
            type: Number,
            default: 10
        },
        focus: {
            type: Boolean,
            default: true
        },
        secondsLeft: {
            type: Number,
            default: 3000
        },
        focusTimeSec: {
            type: Number,
            default: 3000
        },
        breakTimeSec: {
            type: Number,
            default: 600
        },
        isStart: {
            type: Boolean,
            default: false
        }
    },
    toDoList: [{
        text: String,
        checked: Boolean
    }],
    notes: [{
        title: String,
        text: String
    }],
    saved: [{
        text: String
    }]
},
    {
        timeStamps: true
    });

const User = mongoose.model('User', userSchema);
export default User;