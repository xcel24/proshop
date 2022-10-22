import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '30d',
  })
}

export default generateToken
