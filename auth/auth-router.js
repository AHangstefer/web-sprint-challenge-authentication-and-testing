const express = require("express")
const bcrypt = require("bcryptjs")
const model = require("./authModel")
const {restrict} =require("./authenticate-middleware")
const jwt = require("jsonwebtoken")

const router= express.Router()

router.post('/register', async (req, res, next) => {
  // implement registration
   try{
        const {username, password} = req.body
        const user = await model.findBy(username)

        if(user){
          return res.status(409).json({
            message: "Username is already taken"
          })
        }

        const newUser = await model.add({
          username,
          password: await bcrypt.hash(password,10)
        })

        res.status(201).json(newUser)

  }
  catch(err){
    next(err)
  }
    
});

router.post('/login', async (req, res, next) => {
  // implement login
  try{

        const {username, password} = req.body
        const user = await model.findBy(username)

        if(!user){
          return res.status(401).json({
            message: "Invalid Credentials from login router"
          })
        }

        const passwordValid = await bcrypt.compare(password, user.password)

        if (!passwordValid) {
          return res.status(401).json({
            message: "That's not the password!"
          })
        }

        const token = jwt.sign({
          userID: user.indexOf,
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        res.json({
          message: `Welcome ${user.username}`
        })
  }
  catch(err){
    next(err)
  }
});

module.exports = router;
