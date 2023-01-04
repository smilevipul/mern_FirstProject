const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("../db/conn");
const User = require("../model/userSchema");
const authenticate = require('../middleware/authenticate')


router.get("/", (req, res) => {
  res.send(`Hello from the  auth server`);
});

// --------------promise method -----------------

// router.post("/register", (req, res) => {
//   // console.log(req.body);
//   // res.json({message : req.body})

//   const { name, email, phone, work, password, cpassword } = req.body;
//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "Please filled properly" });
//   }

//   User.findOne({ email: email }).then((userExist) => {
//     if (userExist) {
//       return res.status(422).json({ error: "User already exist" });
//     }

//     const user = new User({ name, email, phone, work, password, cpassword });

//     user.save().then(() => {
//         res.status(201).json({ message: "user registered successfully" });
//       }).catch((error) => {
//         res.status(500).json({ error: "Failed to registered" });
//       });
//     }).catch(error=>{
//     console.log(error);});
// });

// ---------asyc await method----------------------------------------------------

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please filled properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "User already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password did not matched" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      // here password bcryption middleware
      await user.save();
      res.status(201).json({ message: "user registerd successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

//signin

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Plz field the data" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken",token,{
        expires:new Date(Date.now()+ 25892000000),
        httpOnly:true
      })

      if (!isMatch) {
        res.status(400).json({ error: "invalid pass" });
      } else {
        res.status(200).json({ message: "user login successfully" });
      }
    } else {
      res.status(400).json({ error: "invalid credietial" });
    }
  } catch (error) {
    console.log(error);
  }
});


//about us page

router.get('/about',authenticate,(req,res)=>{
    // res.send(`Hello from the about`)
    res.send(req.rootUser);
});

router.get('/contact',authenticate,(req,res)=>{
  res.send(req.rootUser);
});


// get data for home and contact us page 
router.get('/getData',authenticate,(req,res)=>{
  res.send(req.rootUser);
})

router.post('/contact',authenticate,async(req,res)=>{
  try {
    const {name,email,phone,message} = req.body;

    if(!name || !email || !phone || !message)
    {
      console.log("error in contact form");
      return res.json({error : "plz filled data properly"})

    }

    const userContact = await User.findOne({_id:req.userID});

    if(userContact){
      const userMessage = await userContact.addMessage(name,email,phone,message);
      await userContact.save();
      res.status(201).json({message : " User contact successfully"});
    }
  } catch (error) {
    console.log(error);
  }
    
});

router.get('/logout',(req,res)=>{
  console.log("User logout successfully");
  res.clearCookie('jwtoken',{path : '/'});
  res.status(200).send(`User Logout`)
});

module.exports = router;
