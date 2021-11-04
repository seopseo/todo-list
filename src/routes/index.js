const express = require('express')
const router = express.Router()
const todo = require('./todo')
const word = require('./word')


//하위 처리 로직 todo
router.use('/todos', todo) // api/todos
router.use('/words', word) // /api/word


module.exports = router
 