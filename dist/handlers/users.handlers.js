"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.show = exports.index = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const checkUrlParams_1 = __importDefault(require("./utilities/checkUrlParams"));
dotenv_1.default.config();
const user = new user_1.UserStore();
const token_secret = process.env.TOKEN_SECRET;
const index = async (req, res) => {
    try {
        jsonwebtoken_1.default.verify(req.body.token, token_secret);
    }
    catch (error) {
        res.status(401).json(`Invalid token ${error}`);
        return;
    }
    try {
        const users = await user.index();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400);
    }
};
exports.index = index;
const show = async (req, res) => {
    try {
        jsonwebtoken_1.default.verify(req.body.token, token_secret);
    }
    catch (error) {
        res.status(401).json(`Invalid token ${error}`);
        return;
    }
    try {
        const valid_param = (0, checkUrlParams_1.default)(req.params.id);
        if (!valid_param) {
            res.status(400).json(`Invalid URL parameter ${req.params.id}. Only positive integer allowed`);
            return;
        }
        const user_info = await user.show(req.params.id);
        if (user_info === undefined) {
            res.status(404).json(`User with id ${req.params.id} not found`);
            return;
        }
        res.status(200).json(user_info);
    }
    catch (error) {
        res.status(500);
    }
};
exports.show = show;
const create = async (req, res) => {
    try {
        if (!(typeof req.body.firstname === 'string')) {
            res.status(400).json(`Invalid firstname ${req.body.firstname}. Only strings allowed`);
            return;
        }
        if (!(typeof req.body.lastname === 'string')) {
            res.status(400).json(`Invalid lastname ${req.body.lastname}. Only strings allowed`);
            return;
        }
        if (!(typeof req.body.password === 'string')) {
            res.status(400).json(`Invalid password ${req.body.password}. Only strings allowed`);
            return;
        }
        const userObj = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };
        const new_user = await user.create(userObj);
        const payload = { id: new_user.id, firstname: new_user.firstname, lastname: new_user.lastname };
        const token = jsonwebtoken_1.default.sign({ user: payload }, token_secret);
        res.status(201).json({ new_user, token: token });
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
};
exports.create = create;
