require('dotenv').config();
const express = require("express")
const app = express()
const port = 8006
const path = require("path")
const {connectDB} = require("./connnectionDB")
const router = require('./routes/user')
const routers = require('./routes/chat')
const {chekauth} = require('./middleware/auth')
const cookieParser = require('cookie-parser')
const chat = require('./model/chat')
app.set("view engine","ejs")

app.set("views",path.resolve("./views"))
app.use(express.static(path.resolve("./public")));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(chekauth('token'))



connectDB(process.env.MONGO_URI).then(()=>{
    console.log("DB Connected!")
}).catch((err)=>{
    console.log("DB Connection Failed!")
    console.log(err)
})

app.get("/",(req,res)=>{
    res.render("index",{user:req.user})
})
app.get('/Community', async (req, res) => {
    const result = await chat.find({})
        .populate('createdBy', '  UserName') // Populate 'name' field from user
        .sort({ createdAt: 1 });

    res.render('community', { result, user: req.user });
});
app.use('/',router)
app.use('/',routers)
app.listen(port,(req,res)=>{
    console.log(`Server is Runing ON Port ${port}`)
})
