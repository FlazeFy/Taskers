const { response } = require('express')
const express = require('express')
const connection = require('../database')
const router = new express.Router()

router.get('/', (req, res) => {
    res.send('Welcome to taskers')
})

//Add reply
router.post('/insertReply/:id', (req, res) => {
    const id = req.params.id; //user id
    const id_comment = req.body.id_comment
    const reply = req.body.reply

    const created_at = new Date()
    const updated_at = new Date()

    connection.query("INSERT INTO " +
        "reply (id, id_user, id_comment, reply, created_at, updated_at) " +
        "VALUES (?, ?, ?, ?, ?, ?)", 
        [null, id, id_comment, reply, created_at, updated_at], (error, rows, fields) => {
        if (error) {
            res.status(400).json({ msg: "Error :" + error })
        } else {
            res.status(200).json({ msg: "Insert Reply Success",status:200, data: rows })
        }
    })
})

module.exports = router