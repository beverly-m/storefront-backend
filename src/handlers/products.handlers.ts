import { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import isValidParam from './utilities/checkUrlParams';
import isValidPrice from './utilities/checkPrice';

dotenv.config();

const product = new ProductStore();

const token_secret: Secret = process.env.TOKEN_SECRET as unknown as Secret;

const index = async (req: Request, res: Response) => {
    try {
        const products = await product.index();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(`Error retrieving products ${error}`);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const valid_param = isValidParam(req.params.id);
        if (!valid_param) {
            res.status(400).json(
                `Invalid URL parameter ${req.params.id}. Only positive integer allowed`
            );
            return;
        }
        const product_info = await product.show(req.params.id);
        if (product_info === undefined) {
            res.status(404).json(`Product with id ${req.params.id} not found`);
            return;
        }
        res.status(200).json(product_info);
    } catch (error) {
        res.status(404).json(`Product with id ${req.params.id} not found`);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, token_secret);
    } catch (error) {
        res.status(401).json(`Invalid token ${error}`);
        return;
    }

    try {
        if (!isValidPrice(req.body.price)) {
            res.status(400).json(
                `Invalid price ${req.body.price}. Only positive values allowed`
            );
            return;
        }

        if (typeof req.body.price === 'string') {
            res.status(400).json(
                `Invalid price ${req.body.price}. Only numerical values allowed`
            );
            return;
        }

        if (!(typeof req.body.name === 'string')) {
            res.status(400).json(
                `Invalid name ${req.body.name}. Only strings allowed`
            );
            return;
        }
    } catch (error) {
        res.status(400).json(
            `Invalid price ${req.params.id}. Only numerical values allowed`
        );
    }

    try {
        const productObj: Product = {
            name: req.body.name,
            price: req.body.price,
        };
        const new_product = await product.create(productObj);
        res.status(201).json(new_product);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};

export { index, show, create };
