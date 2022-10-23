import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//authorize the user
//POST call
//Public access
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  //find the user with this email
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

//get user profile
//GET call
//Private access
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('No user found')
  }
})

//create a new user
//POST call
//Public access
const registerNewUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const user = await User.findOne({ email })

  if (user) {
    res.status(400)
    throw new Error('Bad request, email already exists')
  } else {
    const createdUser = await User.create({
      name,
      email,
      password,
    })

    if (createdUser) {
      res.status(201).json({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  }
})

export { authUser, getUserProfile, registerNewUser }
