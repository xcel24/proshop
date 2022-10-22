import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

//error handler for inavlid routes
app.use(notFound)

//custom error handler
app.use(errorHandler)

const PORT = process.env.PORT || 4500

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} with env ${process.env.NODE_ENV}`)
})
