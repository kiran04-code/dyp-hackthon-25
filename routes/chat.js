const express = require("express")

const routers = express.Router()

const chat = require('../model/chat')

routers.post('/communityy', async (req, res) => {
    const { message } = req.body
    await chat.create({
        message,
        createdBy: req.user._id
    })
    res.redirect('/communityy')
})

module.exports = routers
