const express = require("express")

const Names = require("./name-model")

const server = express()

server.use(express.json())

server.get("/", (req,res) => {
    res.status(200).json({api: "up"})
})

server.get("/names", (req,res) => {
    Names.get()
    .then(name => {
        res.status(200).json(name)
    })
    .catch (err => {
        res.status(500).json({Error: err.message})
    })
})

server.post("/names", (req,res) => {
    newName = req.body

    Names.insert(newName)
    .then(name => {
        res.status(201).json({message: "Success"})
    })
    .catch(error => {
        res.status(500).json({Error: error.message})
    })
})

server.delete("/names/:id", (req, res) => {
    const {id} = req.params

    Names.remove(id)
    .then(deleted => {
        res.status(201).json({message: "deleted"})
    })
    .catch (error => {
        res.status(500).json({Error: error.message})
    })

})

module.exports = server