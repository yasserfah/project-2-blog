const express=require('express')
var session = require('express-session')
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
secret='cat'
isauthenticated=false


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
app.use(express.json())
const secretKey = 'your-secret-key'
const axios = require("axios")
const router = express.Router()


exports.register=(req,res)=>{
    res.render('../views/login')}
    exports.postregister=(req,res)=>{
        const {fname,password} = req.body
        const image = req.file.filename
        console.log(image)
        axios.post('http://localhost:8000/users',{username:fname,password:password,image:image})
        res.redirect('/login')
    }
    exports.getlogin=(req,res)=>{
        res.render('login')
    }
    exports.postlogin=async (req,res)=>{    
        let a =await axios.get("http://localhost:8000/users")
        const f=await a.data
        console.log(f)
        const {fname,password} = req.body
        const user = f.find(u=>u.username==fname)
        console.log(user)
        if(!user){
            return res.send('user not found')
        }
        if(user.password !== password){
            return res.send('password incorrect')
        }
        isauthenticated=true
        const token = jwt.sign({firstname:user.username,image:user.image},secret)
       res.cookie('token_auth',token)
       res.redirect('/dashboard')
    }
    const logger =(req,res,next)=>{
        const token = req.cookies.token_auth
        if(!token){
            return res.redirect('/register')
        }
        const decoded = jwt.verify(token,secret)
        const {firstname,image } = decoded
        req.firstname = firstname
        req.image = image
    
        next()}
    
    