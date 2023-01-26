"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = void 0;
const order_1 = require("../models/order");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const checkUrlParams_1 = __importDefault(require("./utilities/checkUrlParams"));
dotenv_1.default.config();
const order = new order_1.OrderStore();
const token_secret = process.env.TOKEN_SECRET;
const show = async (req, res) => {
    try {
        jsonwebtoken_1.default.verify(req.body.token, token_secret);
    }
    catch (error) {
        res.status(401).json(`Invalid token ${error}`);
        return;
    }
    try {
        const valid_param = (0, checkUrlParams_1.default)(req.params.user_id);
        if (!valid_param) {
            res.status(400).json(`Invalid URL parameter ${req.params.user_id}. Only positive integer allowed`);
            return;
        }
        const product_info = await order.show(req.params.user_id);
        res.status(200).json(product_info);
    }
    catch (error) {
        res.status(404).json(`Order with id ${req.params.user_id} not found`);
    }
};
exports.show = show;
