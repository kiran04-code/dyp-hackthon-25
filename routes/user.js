
const express = require('express')
const routes = express.Router()
const user = require('../model/user') 
const nodemailer = require('nodemailer');
const getEmailMessage = require('../utils/emailTemplate') // import the function
const axios = require('axios')
const getSMSMessage = require('../utils/smsTemplate') // import the function
require('dotenv').config()


routes.get('/signup', (req, res) => {
    res.render('signup')
})


routes.get('/signin', (req, res) => {
    res.render('signin')
})
routes.get('/Community', (req, res) => {
    res.render('Community')
})
routes.get('/DTaP', (req, res) => {
    res.render('DTaP')
})
routes.get('/influ', (req, res) => {
    res.render('influ')
})
routes.get('/hepatitis', (req, res) => {
    res.render('hepatitis')
})
routes.get('/mmr', (req, res) => {
    res.render('mmr')
})
routes.get('/polio', (req, res) => {
    res.render('polio')
})
routes.get('/hpv', (req, res) => {
    res.render('hpv')
})
routes.get('/map', (req, res) => {
    res.render('map')
})
routes.get('/hospitalDetails', (req, res) => {
    res.render('hospitalDetails')
})
routes.get('/survey', (req, res) => {
    res.render('survey')
})
routes.get('/fa&q', (req, res) => {
    res.render('fa&q')
})


routes.get('/profile', (req, res) => {
    res.render('profile', { user: req.user })
})
routes.get('/about', (req, res) => {
    res.render('about', { user: req.user })
})


routes.post("/signup", async (req, res) => {
   try {
     const { UserName, Number, email, password, age } = req.body
 
     const result = await user.create({
       UserName,
       Number,
       email,
       password,
       age,
     })
 
     console.log(result)
 
     // === Send Email ===
     const transporter = nodemailer.createTransport({
       service: 'gmail',
       port: 465,
       secure: true,
       auth: {
         user: 'lifeshield00001@gmail.com',
         pass: 'dist ldxg ckzp iiur'
       }
     })
 
     const mailOptions = {
       from: 'lifeshield00001@gmail.com',
       to: email,
       subject: 'Registration Successful',
       html: getEmailMessage(age)
     }
 
     await transporter.sendMail(mailOptions)
     console.log('Email sent successfully.')
 
     // === Send SMS ===
     
      const apiKey = process.env.FAST2SMS_API_KEY;  
     const smsData = {
       sender_id: "FSTSMS",
       language: "english",
       route: "q",
       numbers: Number,
       message: getSMSMessage(age, email)
     }
 
     await axios.post("https://www.fast2sms.com/dev/bulkV2", smsData, {
       headers: {
         Authorization: apiKey
       }
     })
 
     console.log('SMS sent successfully.')
 
     return res.redirect('/')
 
   } catch (error) {
     console.error('Signup error:', error)
     return res.render('signup', { error: "Email is not unique or something went wrong." })
   }
 })
// Signin POST route
routes.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body
        const token = await user.matchthetoken(email, password)
        return res.cookie("token", token).redirect('/')
    } catch (error) {
        return res.render('signin', { error: "Incorrect Password!" })
    }
})

// Logout
routes.get('/logout', (req, res) => {
    res.clearCookie("token").redirect('/')
})

module.exports = routes
