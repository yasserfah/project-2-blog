const express=require('express')
const app=express()
const multer = require("multer")
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
const auth = require('C:/Users/admin/Downloads/code/day31/security-review-day4/auth')
var cookies = require("cookie-parser");
const fs = require('fs')
app.use(express.json())
app.use(express.static('uploads'))
app.use(express.static('public'))
secret='secret'
const methodOverride = require('method-override')
const saltRounds = 10;
app.use(bodyParser.urlencoded({
    extended: true
}));
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

app.use(cookies());
app.set('view engine', 'ejs');
const secretKey = 'your-secret-key'
const axios = require("axios")



// middlewares
app.use(express.json())
app.use(express.static('uploads'))
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))


app.use(cookies());
//view engine:ejs
app.set('view engine', 'ejs');
app.use(express.json())


//router
const userRouter = require('./routes/routes');
app.use('/',userRouter)
app.get('/delete/:id',(req,res)=>{
    axios.delete(`http://localhost:8000/blogs/${req.params.id}`)
    res.redirect('/dashboard')
})

app.get('/edit/:id' , async(req,res) =>{
    try{
        const blogId = req.params.id
        const response = await axios.get(`http://localhost:8000/blogs/${blogId}`)
        const blog = response.data
        res.render('edit',{ blog })

    }catch(error){
        res.status(500).send('server problem')
    }
})

app.put('/edit/:id' , upload.single('image'),async (req,res)=>{
    try {
        const  blogId = req.params.id
        const updatedData = req.body
        if(req.file){
            updatedData.image = req.file.filename
        }
        await axios.patch(`http://localhost:8000/blogs/${blogId}`,updatedData)
        res.redirect('/dashboard')
    } catch (error) {
        res.status(500).send('hada error f edit put')
    }
})
app.get('/logout',(req,res)=>{
    res.clearCookie('token_auth')
    res.redirect('/register')

})


















app.listen(5000,function(){
    console.log('server running on port 5000');
})
