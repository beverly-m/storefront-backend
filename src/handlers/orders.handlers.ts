import { Request, Response } from "express";
import { OrderStore } from "../models/order";
import jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const order = new OrderStore()

const token_secret: Secret = (process.env.TOKEN_SECRET as unknown) as Secret

const show = async (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, token_secret)
    } catch (error) {
        console.log(error)
        res.status(400).json(`Invalid token ${error}`)
        return
    }

    try {
        const product_info = await order.show(req.params.user_id);
        res.status(200).json(product_info);
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}

export {show}