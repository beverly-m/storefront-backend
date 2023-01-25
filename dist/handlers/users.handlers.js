"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.show = exports.index = void 0;
const user_1 = require("../models/user");
const user = new user_1.UserStore();
const index = async (req, res) => {
    try {
        const users = await user.index();
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(400);
    }
};
exports.index = index;
const show = async (req, res) => {
    try {
        const user_info = await user.show(req.params.id);
        res.status(200).json(user_info);
    }
    catch (error) {
        console.log(error);
        res.status(400);
    }
};
exports.show = show;
const create = async (req, res) => {
    try {
        const new_user = await user.create(req.body);
        res.status(200).json(new_user);
    }
    catch (error) {
        console.log(error);
        res.status(400);
    }
};
exports.create = create;
