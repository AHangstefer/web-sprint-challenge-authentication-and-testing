const router = require("express").Router()
const bcrypt = require("bcryptjs")
const User = require("./authModel")
//const {restrict} =require("./authenticate-middleware")
const jwt = require("jsonwebtoken")

//const router= express.Router()

router.post('/register', async (req, res, next) => {
  // implement registration
   try{
        const {username, password} = req.body
        const user = await User.findBy({username})
      

        if(user){
          return res.status(409).json({
            message: "Username is already taken"
          })
        }

        const newUser = await User.add({
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
        //const id = req.params.id
        //const user = await User.findByUserId(id)
        //const oldUser = await User.finditDamn({username})

       // this one is returning the if statement below
       //const oldUser 
        const oldUser = await User.finditDamn({username})
        
        

        if(!oldUser){
          return res.status(401).json({
            message: "Invalid Credentials from login router"
          })
        }

        const passwordValid = await bcrypt.compare(password, oldUser.password)

        if (!passwordValid) {
          return res.status(401).json({
            message: "That's not the password!"
          })
        }


        const token = jwt.sign({
          userID: oldUser.id,
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        res.json({
          message: `Welcome ${oldUser.username}`
        })
  }
  catch(err){
    next(err)
  }
});

module.exports = router;
