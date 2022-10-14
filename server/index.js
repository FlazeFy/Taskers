const express = require('express')
const cors = require('cors')

//Router
const router_tasks = require('./router/tasks')
const router_comment = require('./router/comment')
const router_reply = require('./router/reply')

const app = express()
const port = process.env.PORT || 9000

app.use(cors())
app.use(express.json())

app.use(router_tasks)
app.use(router_comment)
app.use(router_reply)

app.listen(port, () => {
    console.log('Taskers API is running')
})