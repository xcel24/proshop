import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import decodeToken from '../utils/verifyToken.js'

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = decodeToken(token)
      req.user = await User.findById(decoded._id).select('-password')
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
  next()
})

export default protect
