const { response } = require('express')
const express = require('express')
const connection = require('../database')
const router = new express.Router()

router.get('/', (req, res) => {
    res.send('Welcome to taskers')
})

//Get all assigned tasks
router.get('/getAllTask', (req, res) => {
    connection.query('SELECT * FROM task ORDER BY created_at DESC', (error, rows, fields) => {
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
    const prize = req.body.prize
    const check = req.body.check
    const tag = req.body.tag
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

module.exports = router