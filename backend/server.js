const express = require('express')
const app = express()

const products = require('./data/products')

app.get('/', (req, res) => {
  res.send('API running...')
})

app.get('/api/products', (req, res) => {
  res.send(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

app.listen(4500, () => {
  console.log(`Server started on 4500`)
})
