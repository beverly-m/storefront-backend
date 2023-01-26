"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_handlers_1 = require("../../handlers/products.handlers");
const products = express_1.default.Router();
products.get('/', products_handlers_1.index);
products.get('/:id', products_handlers_1.show);
products.post('/', products_handlers_1.create);
exports.default = products;
