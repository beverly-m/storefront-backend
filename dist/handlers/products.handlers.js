"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.show = exports.index = void 0;
const product_1 = require("../models/product");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const checkUrlParams_1 = __importDefault(require("./utilities/checkUrlParams"));
const checkPrice_1 = __importDefault(require("./utilities/checkPrice"));
dotenv_1.default.config();
const product = new product_1.ProductStore();
const token_secret = process.env.TOKEN_SECRET;
const index = async (req, res) => {
    try {
        const products = await product.index();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json(`Error retrieving products ${error}`);
    }
};
exports.index = index;
const show = async (req, res) => {
    try {
        const valid_param = (0, checkUrlParams_1.default)(req.params.id);
        if (!valid_param) {
            res.status(400).json(`Invalid URL parameter ${req.params.id}. Only positive integer allowed`);
            return;
        }
        const product_info = await product.show(req.params.id);
        if (product_info === undefined) {
            res.status(404).json(`Product with id ${req.params.id} not found`);
            return;
        }
        res.status(200).json(product_info);
    }
    catch (error) {
        res.status(404).json(`Product with id ${req.params.id} not found`);
    }
};
exports.show = show;
const create = async (req, res) => {
    try {
        jsonwebtoken_1.default.verify(req.body.token, token_secret);
    }
    catch (error) {
        res.status(401).json(`Invalid token ${error}`);
        return;
    }
    try {
        if (!(0, checkPrice_1.default)(req.body.price)) {
            res.status(400).json(`Invalid price ${req.body.price}. Only positive values allowed`);
            return;
        }
        if (!(typeof req.body.name === 'string')) {
            res.status(400).json(`Invalid name ${req.body.name}. Only strings allowed`);
            return;
        }
    }
    catch (error) {
        res.status(400).json(`Invalid price ${req.params.id}. Only numerical values allowed`);
    }
    try {
        const productObj = {
            name: req.body.name,
            price: req.body.price
        };
        const new_product = await product.create(productObj);
        res.status(201).json(new_product);
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
};
exports.create = create;
