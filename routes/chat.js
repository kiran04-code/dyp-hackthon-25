const express = require("express")

const routers = express.Router()

const chat = require('../model/chat')

routers.post('/community', async (req, res) => {
    const { message } = req.body
    console.log(message)
    await chat.create({
        message,
        createdBy: req.user._id
    })
    res.redirect('/community')
})

module.exports = routers
