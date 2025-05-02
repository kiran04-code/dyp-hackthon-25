
const express = require('express')
const routes = express.Router()
const user = require('../model/user') 
const nodemailer = require('nodemailer');
const getEmailMessage = require('../utils/emailTemplate') // import the function
const axios = require('axios')
const getSMSMessage = require('../utils/smsTemplate') // import the function
const getOTPEmailMessage = require('../utils/otp') // import the function
require('dotenv').config()


routes.get('/signup', (req, res) => {
    res.render('signup2')
})

routes.get('/signin', (req, res) => {
    res.render('signin2')
})
routes.get('/communityy', async (req, res) => {
  try {
    // your logic
    res.render('communityy');
  } catch (err) {
    console.error('Route error:', err);
    res.status(500).send('Internal Server Error');
  }
});
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
routes.get('/profile/:id', async(req, res) => {
  const userID = req.params.id
  await user.findByIdAndDelete(userID)
  res.clearCookie("token").redirect("/")
   
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
 
     return res.render('signin2')
 
   } catch (error) {
     console.error('Signup error:', error)
     return res.render('signup2', { error: "Email is not unique or something went wrong." })
   }
 })
// Signin POST route
const otp = Math.floor(1000 + Math.random() * 9000);
routes.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Verify email & password
    const token = await user.matchthetoken(email, password);
    res.cookie("token", token);

    // 4. Send OTP email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: 'lifeshield00001@gmail.com',
        pass: 'dist ldxg ckzp iiur'
      }
    });

    const mailOptions = {
      from: 'lifeshield00001@gmail.com',
      to: email,
      subject: 'Your OTP Code for Login',
      html: getOTPEmailMessage(otp) // this function must return full HTML
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully.');

    // 5. Redirect to OTP entry page
    res.redirect('/otp');

  } catch (error) {
    console.error(error);
    return res.render('signin2', { error: "Incorrect Password!" });
  }
});
// Logout
routes.get('/logout', (req, res) => {
    res.clearCookie("token").redirect('/')
})
routes.get('/profile/edite/:id', async(req, res) => {
  const userid = req.params.id
  const userz =  await user.findById(userid)
  res.render("edit",{users:userz})
   
})
routes.post("/profile/edit/:id",async (req,res)=>{
  const userId = req.params.id;
  console.log(req.body) 
  await user.findByIdAndUpdate(
    { _id: userId },
    {
      UserName: req.body.UserName.trim(), // just in case
      email: req.body.email.trim()
    }
  );
  res.clearCookie("token").redirect("/signin")

})
routes.get('/infouser', (req, res) => {
    res.render('moreinfo')
})
routes.get('/otp', (req, res) => {
    res.render('otp')
})
routes.post("/verify-otp",(req,res)=>{
  try{
    const {otps} = req.body 
    if(otp == otps){
    res.redirect("/")
  }
  else{
    return res.render('otp', { error: "Incorrect OTP!" })
  }
  }catch(error){
    return res.render('otp', { error: "Incorrect OTP!" })
  }
})
module.exports = routes
