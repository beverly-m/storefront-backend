"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var orders_handlers_1 = require("../../handlers/orders.handlers");
var orders = express_1["default"].Router();
orders.get('/:user_id', orders_handlers_1.show);
exports["default"] = orders;
