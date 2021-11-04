const mongoose= require('mongoose')
const todo = require('./Todo')

const userSchema = mongoose.Schema({ // 스키마 정의
    name: { type: String, required: true, trim: true },
    age: {type: Number, default: 0 },
    email: { type: String, required: true, trim: true, match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Should be a vaild email address!"] },
    todos: { type: [todo], required: true }
})

const User = mongoose.model('User', userSchema) //스키마로부터 생성된 모델 객체
module.exports = User;