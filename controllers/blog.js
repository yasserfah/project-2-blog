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
const axios=require('axios')
const { title } = require('process')
app.use(express.urlencoded({extended:true}))


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    }
    });
    
    // Create a Multer instance
    const upload = multer({ storage: storage });




    exports.addBlog = (req, res) => {
        const { title, description, author } = req.body;
    
        // Check if req.file is defined before accessing its properties
        if (req.file && req.file.filename) {
            const imageFilename = req.file.filename;
            const newBlog = {
                title: title,
                description: description,
                author: author,
                image: imageFilename
            };
    
            axios.post("http://localhost:8000/blogs", newBlog)
                .then(() => {
                    res.redirect('/dashboard');
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Internal server error.');
                });
        } else {
            res.status(400).send('No file uploaded.'); // Handle the case where no file is uploaded
        }
    }
    
exports.allBlogs=async(req,res)=>{
    let a=await axios.get("http://localhost:8000/blogs")
    const f=a.data
    res.render('allBlogs',{f})
}

    exports.getdashboard=async(req,res)=>{
        let a=await axios.get("http://localhost:8000/blogs")
        const f=await a.data
        
        blog = await f.filter((u)=>u.author == req.firstname)
        // console.log(f)
    
        
        res.render('dashboard',{firstname:req.firstname,image:req.image,blog:blog})
        
    }
