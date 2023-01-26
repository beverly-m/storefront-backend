import {Request, Response} from 'express'
import { Product, ProductStore } from '../models/product'
import jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const product = new ProductStore();

const token_secret: Secret = (process.env.TOKEN_SECRET as unknown) as Secret

const index = async (req: Request, res: Response) => {
    try {
        const products = await product.index()
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const product_info = await product.show(req.params.id);
        res.status(200).json(product_info);
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, token_secret)
    } catch (error) {
        console.log(error)
        res.status(400).json(`Invalid token ${error}`)
        return
    }
    try {
        const productObj: Product = {
            name: req.body.name,
            price: req.body.price
        }
        const new_product = await product.create(productObj);
        res.status(200).json(new_product);

    } catch (error) {
        console.log(error)
        res.status(400)
    }
}

export { index, show, create }