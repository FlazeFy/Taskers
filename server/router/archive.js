const { response } = require('express')
const express = require('express')
const connection = require('../database')
const router = new express.Router()

router.get('/', (req, res) => {
    res.send('Welcome to taskers')
})

//Get all archive
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

router.get('/getAllArchiveRel/:id', (req, res) => {
    const id = req.params.id; //user id
    connection.query('SELECT archive_relation.id, archive.id as id_archive, task.id as id_task, archive.archive_name ' +
        'FROM archive_relation JOIN archive ON archive.id = archive_relation.id_archive ' +
        'JOIN task ON task.id = archive_relation.id_task WHERE archive_relation.id_user = ' + id + ' ' +
        'ORDER BY archive_relation.created_at DESC', (error, rows, fields) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).json({ msg: rows.length + " Data retrived", status: 200, data: rows })
        }
    })
})

//Add archive
router.post('/insertArchive', (req, res) => {
    const archiveName = req.body.archiveName
    const id_user = req.body.id_key

    const created_at = new Date()
    const updated_at = new Date()

    //Validate name.
    connection.query("SELECT * FROM archive WHERE id_user = "+ id_user +" AND archive_name = '"+ archiveName +"'", (errorCheck, check, fields) => {
        if (errorCheck) {
            res.status(400).json({ msg: "Error :" + errorCheck })
        } else if(check.length == 0){
            //If name is available.
            connection.query("INSERT INTO " +
                "archive (id, id_user, archive_name, created_at, updated_at) " +
                "VALUES (?, ?, ?, ?, ?)", 
                [null, id_user, archiveName, created_at, updated_at], (error, rows, fields) => {
                if (error) {
                    res.status(400).json({ msg: "Error :" + error })
                } else {
                    res.status(200).json({ msg: "Insert Archive Success",status:200, data: rows })
                }
            })
        } else {
            res.status(200).json({ msg: "Insert Archive Failed, please use unique archive name",status:200, data: check })
        }
    })
})

module.exports = router