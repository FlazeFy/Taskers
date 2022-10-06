const { response } = require('express')
const express = require('express')
const connection = require('../database')
const router = new express.Router()

router.get('/', (req, res) => {
    res.send('Welcome to taskers')
})

//Get all assigned tasks
router.get('/getAllTask', (req, res) => {
    connection.query('SELECT task.id, task.id_user, task_assigne, task_title, task_desc, task_url, task_check, task_prize, task_tag, due_date, task.created_at, task.updated_at,  CASE WHEN comment.id_task = task.id THEN count(1) ELSE 0 END AS total_comment FROM task left JOIN comment on task.id = comment.id_task GROUP by task.id', (error, rows, fields) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).json({ msg: rows.length + " Data retrived", status: 200, data: rows })
        }
    })
})

//Get all comment
router.get('/getAllComment', (req, res) => {
    connection.query('SELECT * FROM comment order by created_at', (error, rows, fields) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).json({ msg: rows.length + " Data retrived", status: 200, data: rows })
        }
    })
})

//Add new tasks
router.post('/insertTask/:id', (req, res) => {
    const id = req.params.id;
    const title = req.body.title
    const desc = req.body.desc

    //Check empty validator
    var check = null;
    if(req.body.check != null){
        check = JSON.stringify(req.body.check)
    }

    //Tag empty validator
    var tag = null;
    if(req.body.tag != null){
        tag = JSON.stringify(req.body.tag)
    }

    //Prize empty validator
    var prize = null;
    if ((req.body.prize != null)||(req.body.prize != "")){
        prize = req.body.prize
    } 

    const created_at = new Date()
    const updated_at = new Date()

    //Task assigne is id user only and task url is null for now.

    connection.query("INSERT INTO " +
        "task (id, id_user, task_assigne, task_title, task_desc, task_url, task_check, task_prize, task_tag, created_at, updated_at) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [null, id, id, title, desc, null, check, prize, tag, created_at, updated_at], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Insert Tasks Success",status:200, data: rows })
        }
    })
})

//Add comment
router.post('/insertComment/:id', (req, res) => {
    const id = req.params.id; //user id
    const id_task = req.body.id_task
    const comment = req.body.comment

    const created_at = new Date()
    const updated_at = new Date()

    connection.query("INSERT INTO " +
        "comment (id, id_user, id_task, comment, created_at, updated_at) " +
        "VALUES (?, ?, ?, ?, ?, ?)", 
        [null, id, id_task, comment, created_at, updated_at], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Insert Comment Success",status:200, data: rows })
        }
    })
})

//Update task description
router.put('/updateDesc', (req, res) => {
    const desc = req.body.desc
    const id = req.body.id
    const updated_at = new Date()

    connection.query("UPDATE " +
        "task SET task_desc = ?, updated_at = ? " +
        "WHERE id = ? ",
        [desc, updated_at, id], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Update Success",status:200, data: rows })
        }
    })
})

//Edit comment
router.put('/editComment/:id', (req, res) => {
    const id = req.params.id; //id_comment
    const comment = req.body.comment

    const updated_at = new Date()

    connection.query("UPDATE " +
        "comment SET comment = ?, updated_at = ? " +
        "WHERE id = ? ",
        [comment, updated_at, id], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Update Success",status:200, data: rows })
        }
    })
})


//Update task prize
router.put('/updatePrize', (req, res) => {
    const prize = req.body.prize
    const id = req.body.id
    const updated_at = new Date()

    connection.query("UPDATE " +
        "task SET task_prize = ?, updated_at = ? " +
        "WHERE id = ? ",
        [prize, updated_at, id], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Update Success",status:200, data: rows })
        }
    })
})

//Update task title
router.put('/updateTitle', (req, res) => {
    const title = req.body.title
    const id = req.body.id
    const updated_at = new Date()

    connection.query("UPDATE " +
        "task SET task_title = ?, updated_at = ? " +
        "WHERE id = ? ",
        [title, updated_at, id], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Update Success",status:200, data: rows })
        }
    })
})

//Update task check
router.put('/updateCheck', (req, res) => {
    const check = JSON.stringify(req.body.check)
    const id = req.body.id
    const updated_at = new Date()

    connection.query("UPDATE " +
        "task SET task_check = ?, updated_at = ? " +
        "WHERE id = ? ",
        [check, updated_at, id], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Update Success",status:200, data: rows })
        }
    })
})

//Update task due date
router.put('/updateDueDate', (req, res) => {
    const due_date = req.body.due_date
    const id = req.body.id_task
    const updated_at = new Date()

    connection.query("UPDATE " +
        "task SET due_date = ?, updated_at = ? " +
        "WHERE id = ? ",
        [due_date, updated_at, id], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Update Success",status:200, data: rows })
        }
    })
})

//Delete & add task tag
router.put('/deleteTag', (req, res) => {
    //Tag empty validator
    var tag = null;
    if(req.body.tag_old != null){
        tag = JSON.stringify(req.body.tag_old)
    }

    const id = req.body.id_task
    const updated_at = new Date()

    connection.query("UPDATE " +
        "task SET task_tag = ?, updated_at = ? " +
        "WHERE id = ? ",
        [tag, updated_at, id], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Update Success",status:200, data: rows })
        }
    })
})

//Delete task
router.put('/deleteTask', (req, res) => {
    const id = req.body.id

    connection.query("DELETE FROM " +
        "task WHERE id = ? ",
        [id], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Delete Success",status:200, data: rows })
        }
    })
})

//Delete task check
router.put('/deleteCheck', (req, res) => {
    //Check empty validator
    var check = null;
    if(req.body.check_old != null){
        check = JSON.stringify(req.body.check_old)
    }

    const id = req.body.id_task
    const updated_at = new Date()

    connection.query("UPDATE " +
        "task SET task_check = ?, updated_at = ? " +
        "WHERE id = ? ",
        [check, updated_at, id], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Update Success",status:200, data: rows })
        }
    })
})

module.exports = router