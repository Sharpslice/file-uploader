import express from 'express'
import multer from 'multer';
import path from 'path';

import { Request } from 'express';




const files = express.Router();

const upload = multer({dest: path.join( __dirname,'..','..','uploads')})
files.post('/photo/upload',upload.single('random-file'),(req,res)=>{
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log(req.file,req.body)
    res.json({ message: 'Upload successful', file: req.file });
    
})



export default files