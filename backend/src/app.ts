import express, {Request,Response} from 'express';
import session from 'express-session';
import passport from 'passport'
import auth from './routes/auth';
const app = express();
const authRoute = auth;
app.use(express.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,

}))

app.use('/',authRoute);


app.listen(3000,()=>{
    console.log('App is now listening on port ',3000)
})