"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var orders_routes_1 = __importDefault(require("./api/orders.routes"));
var products_routes_1 = __importDefault(require("./api/products.routes"));
var users_routes_1 = __importDefault(require("./api/users.routes"));
var routes = express_1["default"].Router();
routes.get('/', function (req, res) {
    res.send('Hello World!');
});
routes.use('/users', users_routes_1["default"]);
routes.use('/products', products_routes_1["default"]);
routes.use('/orders', orders_routes_1["default"]);
exports["default"] = routes;
