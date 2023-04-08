const express = require('express');
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');


const JWT_SECRET = 'deep123'

// Route1 - create a user using : Post '/api/auth/createuser', No login required

router.post('/createuser', [

  // Checking that value of name must be minimum 3 charector
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 cheractor').isLength({ min: 5 }),

], async (req, res) => {
  let success = false

  // Checking if user have send values in our above assigned format
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  try {
    // Check weather the user with the same email already exist.
    let userData = await User.findOne({ email: req.body.email });
    if (userData) {
      return res.status(400).json({success, error: 'Sorry user with the same email already exist' })

    }
    const salt = await bcrypt.genSalt(10)
    secPass = await bcrypt.hash(req.body.password, salt)
    // Create a new user
    userData = await User.create({

      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })

    const data = {
      userData: {
        id: userData._id
      }
    }
    // signing and converting userId into auth token using jsonwebtoken
    const authToken = jwt.sign(data, JWT_SECRET)
    success = true
    res.json({success, authToken })
    // res.json(userData)
  } catch (error) {
    console.log(error)
    // sending 500 error code if some error occured
    res.status(500).send( success, 'some error occured')
  }

})

//Route 2 -  User Login : api/auth/login - no login require
router.post('/login', [

  // Checking that value of name must be minimum 3 charector
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 cheractor').exists({}),
], async (req, res) => {
  let success = false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body
  try {
    let userData = await User.findOne({ email })
    if (!userData) {
      return res.status(400).json({success, error: 'Please try to login with correct credentials' })
    }
    const passwordCompare = await bcrypt.compare(password, userData.password)
    if (!passwordCompare) {
    success = false

      return res.status(400).json({success,  error: 'Please try to login with correct credentials' })
    }

    const data = {
      user: {
        id: userData._id
      }
    }
    success = true
    const authToken = jwt.sign(data, JWT_SECRET)
    res.json({success, authToken })

  } catch (error) {
    console.log(error)
    // sending 500 error code if some error occured
    res.status(500).send('some error occured')

  }
}



)

// Route 3 - Get logedin User Details using  Post '/api/auth/getusre'. login required
router.post('/getuser', fetchUser, async (req, res) => {

  try {
    let userId = req.user.id
    const userData = await User.findById({_id: userId}).select("-password")
    res.send(userData)
  } catch (error) {
    console.log(error)
    // sending 500 error code if some error occured
    res.status(500).send('some error occured')

  }
})
module.exports = router