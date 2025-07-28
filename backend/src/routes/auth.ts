import express from 'express'
import passport from 'passport'
import local from 'passport-local'
const LocalStrategy = local.Strategy
import bcrypt from 'bcryptjs'
import {PrismaClient} from '../../generated/prisma'
import type {User} from '../../generated/prisma'
import { Request, Response } from 'express';
const prisma = new PrismaClient()
const auth = express.Router()


auth.post('signup', async(req:Request,res:Response)=>{
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


passport.use(new LocalStrategy(async (username,password,done)=>{
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

passport.serializeUser((user: User,done)=>{
    done(null,user.id)
})


export default auth;