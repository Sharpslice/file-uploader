import express, {Request,Response} from 'express';
import session from 'express-session';
import passport from 'passport'
import auth from './routes/auth';
import cors from 'cors';

import {PrismaSessionStore} from '@quixo3/prisma-session-store';
import {PrismaClient} from '../generated/prisma';
const app = express();
const authRoute = auth;
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdFunction:undefined,
            dbRecordIdIsSessionId: false,
        }

    ) as any

}))
app.use(passport.session());
app.use('/auth',authRoute);


app.listen(3000,()=>{
    console.log('App is now listening on port ',3000)
})