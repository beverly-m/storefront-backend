import { Request, Response } from "express";
import { OrderStore } from "../models/order";

const order = new OrderStore()

const show = async (req: Request, res: Response) => {
    try {
        const product_info = await order.show(req.params.user_id);
        res.status(200).json(product_info);
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}

export {show}