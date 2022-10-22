import asyncHandler from 'express-async-handler'
import Product from '../models/productsModel.js'

//get all the products
//GET call
//Public access
const getProducts = asyncHandler(async (req, res) => {
  res.json(await Product.find({}))
})

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProductById, getProducts }
