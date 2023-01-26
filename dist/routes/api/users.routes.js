"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var users_handlers_1 = require("../../handlers/users.handlers");
var users = express_1["default"].Router();
users.get('/', users_handlers_1.index);
users.get('/:id', users_handlers_1.show);
users.post('/', users_handlers_1.create);
exports["default"] = users;
