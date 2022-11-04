const { response } = require('express')
const express = require('express')
const connection = require('../database')
const router = new express.Router()

router.get('/', (req, res) => {
    res.send('Welcome to taskers')
})

//Get all comment
router.get('/getAllArchive/:id', (req, res) => {
    const id = req.params.id; //user id
    connection.query('SELECT * FROM archive WHERE id_user = '+ id +' order by updated_at', (error, rows, fields) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).json({ msg: rows.length + " Data retrived", status: 200, data: rows })
        }
    })
})

module.exports = router