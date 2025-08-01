import express from 'express'
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';




const files = express.Router();
const uploadsDirectory = path.join( __dirname,'..','..','uploads')

const upload = multer({dest:uploadsDirectory})
files.use('/uploads',express.static(uploadsDirectory))
files.get('/directory',(req,res)=>{
    console.log('hello')
    fs.readdir(uploadsDirectory,(err,files)=>{
        if(err) {
            console.log('fail')
        }
            
           
            console.log('success!')
        res.json({files,error:'none'})
    })
})





files.post('/photo/upload',upload.single('random-file'),(req,res)=>{
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log(req.file,req.body)
    res.json({ message: 'Upload successful', file: req.file });
    
})



export default files