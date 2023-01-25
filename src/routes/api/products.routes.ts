import express from 'express'
import { index, show, create } from '../../handlers/products.handlers'

const products = express.Router()

products.get('/', index)
products.get('/:id', show)
products.get('/', create)

export default products;