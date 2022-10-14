const { response } = require('express')
const express = require('express')
const connection = require('../database')
const router = new express.Router()

router.get('/', (req, res) => {
    res.send('Welcome to taskers')
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

//Delete comment
router.put('/deleteComment', (req, res) => {
    const id = req.body.id_comment

    connection.query("DELETE FROM " +
        "comment WHERE id = ? ",
        [id], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Delete Success",status:200, data: rows })
        }
    })
})

module.exports = router