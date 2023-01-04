const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser')
mongoose.set('strictQuery', true);

dotenv.config({path : './config.env'})
require('./db/conn');
app.use(express.json())
app.use(cookieParser())
// const User = require('./model/userSchema');
app.use(require ('./router/auth'))

const PORT = process.env.PORT || 8000;



// app.get('/',(req,res)=>{
//     res.send(`Hello from the server`)
// });

// app.get('/about',middleware,(req,res)=>{
//     // res.cookie("jwttoken","test");
//     res.send(`Hello from the about`)
// });

// app.get('/contact',(req,res)=>{
//     res.send(`Hello from the contact`)
// });
// app.get('/signin',(req,res)=>{
//     res.send(`Hello from the signin`)
// });
// app.get('/signup',(req,res)=>{
//     res.send(`Hello from the signup`)
// });


// step 3 for deploy on heroko 

if(process.env>NODE_ENV === "production")
{
    app.use(express.static("client/build"));
}
app.listen(PORT,()=>{
    console.log(`Your app is running on port no ${PORT}`);
})