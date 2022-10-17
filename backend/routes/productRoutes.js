import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productsModel.js'

const router = express.Router()

//get all the products
//GET call
//Public access
router.get(
  '/',
  asyncHandler(async (req, res) => {
    res.json(await Product.find({}))
  })
)

//get product by id
//GET call
//Public access
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

export default router
