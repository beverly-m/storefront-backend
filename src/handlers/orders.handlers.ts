import { Request, Response } from 'express';
import { OrderStore } from '../models/order';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import isValidParam from './utilities/checkUrlParams';

dotenv.config();

const order = new OrderStore();

const token_secret: Secret = process.env.TOKEN_SECRET as unknown as Secret;

const show = async (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, token_secret);
    } catch (error) {
        res.status(401).json(`Invalid token ${error}`);
        return;
    }

    try {
        const valid_param = isValidParam(req.params.user_id);
        if (!valid_param) {
            res.status(400).json(
                `Invalid URL parameter ${req.params.user_id}. Only positive integer allowed`
            );
            return;
        }
        const product_info = await order.show(req.params.user_id);
        res.status(200).json(product_info);
    } catch (error) {
        res.status(404).json(`Order with id ${req.params.user_id} not found`);
    }
};

export { show };
