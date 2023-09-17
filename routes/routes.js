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
const {register,postregister,getlogin,postlogin} = require('../controllers/user')
const {addBlog,allBlogs,getdashboard}=require('../controllers/blog')
let isauthenticated=false
const authenticated=(req,res,next)=>{
  const token = req.cookies.token_auth
  if (token){
    res.redirect('/dashboard')
  }
  else(res.redirect('/register'))
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
    next()
    }
    
    
router.post('/addBlog',upload.single('image'),addBlog)

router.get('/allBlogs',allBlogs)
router.get('/register',register)
router.post('/register',upload.single('image'),postregister)
router.get('/login',getlogin)
router.post('/login',postlogin)
router.get('/dashboard',logger,getdashboard)

module.exports= router