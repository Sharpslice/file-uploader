import express from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs'
import {PrismaClient} from '../../generated/prisma'
import { Request, Response } from 'express';
const prisma = new PrismaClient()
const auth = express.Router()

export interface User{
    id: number
    username: string
}

export interface authenticatedRequest extends Request{
    user:User
}

auth.post('/signup', async(req:Request,res:Response)=>{
    const {username,password} = req.body;

    const hashPassword = await bcrypt.hash(password,10);
    try{
        await prisma.users.create({
            data: {
                username:username,
                password: hashPassword
            }
        })
        res.status(201).json({message:'successful'})
    }catch(error:any)
    {
        res.status(500).json({message: error.message})
    }
    
})


passport.use(new LocalStrategy(async (username:string,password:string,done)=>{
    try{
        const user = await prisma.users.findUnique({
            where: {username: username}
        })
        if(!user) return done(null,false, {message:"incorrect username"})

        const hashPassword = await bcrypt.hash(password,10);

        const isMatch = await bcrypt.compare(password,hashPassword);
        if(!isMatch) return done(null,false,{message:"incorrect password"})
        
        return done(null,user)



    }catch(error)
    {
        return done(error)
    }
}))

passport.serializeUser((user: any,done)=>{
    done(null,user.id)
})
passport.deserializeUser(async(id:number,done)=>{
    try{
        const user = await prisma.users.findUnique({
            where :{id}
        })
        done(null,user)
    }catch(error:any){
        done(error)
    }
})
auth.get('/checkauth',(req,res,next)=>{
    if(req.isAuthenticated()){
        console.log('user is authenticateed')
        res.status(200).json({user: req.user,message:'authenticated'})
    }
    else{
        res.status(500).json({message:"not authenticated"})
        console.log('user not authenticated')
    }
})
auth.post('/login',(req,res,next)=>{
    passport.authenticate('local',(error:any,user: Express.User | false,info:String)=>{
        req.logIn(user, (err: any) => {
            if (err) {
                console.log('login error')
                return next(err);
            }
            res.status(200).json({message:"success"});
            });
    })
    (req,res,next);
})
export default auth;