"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var index_routes_1 = __importDefault(require("./routes/index.routes"));
var app = (0, express_1["default"])();
var address = '0.0.0.0:3000';
// app.use(cors)
app.use(body_parser_1["default"].json());
app.use(index_routes_1["default"]);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports["default"] = app;
