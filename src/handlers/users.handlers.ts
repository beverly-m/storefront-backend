import { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import isValidParam from './utilities/checkUrlParams';

dotenv.config();

const user = new UserStore();

const token_secret: Secret = process.env.TOKEN_SECRET as unknown as Secret;

const index = async (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, token_secret);
    } catch (error) {
        res.status(401).json(`Invalid token ${error}`);
        return;
    }
    try {
        const users = await user.index();
        res.status(200).json(users);
    } catch (error) {
        res.status(400);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, token_secret);
    } catch (error) {
        res.status(401).json(`Invalid token ${error}`);
        return;
    }

    try {
        const valid_param = isValidParam(req.params.id);
        if (!valid_param) {
            res.status(400).json(
                `Invalid URL parameter ${req.params.id}. Only positive integer allowed`
            );
            return;
        }
        const user_info = await user.show(req.params.id);
        if (user_info === undefined) {
            res.status(404).json(`User with id ${req.params.id} not found`);
            return;
        }
        res.status(200).json(user_info);
    } catch (error) {
        res.status(500);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        if (!(typeof req.body.firstname === 'string')) {
            res.status(400).json(
                `Invalid firstname ${req.body.firstname}. Only strings allowed`
            );
            return;
        }
        if (!(typeof req.body.lastname === 'string')) {
            res.status(400).json(
                `Invalid lastname ${req.body.lastname}. Only strings allowed`
            );
            return;
        }
        if (!(typeof req.body.password === 'string')) {
            res.status(400).json(
                `Invalid password ${req.body.password}. Only strings allowed`
            );
            return;
        }

        const userObj: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        const new_user = await user.create(userObj);
        const payload = {
            id: new_user.id,
            firstname: new_user.firstname,
            lastname: new_user.lastname,
        };
        const token = jwt.sign({ user: payload }, token_secret);
        res.status(201).json({ new_user, token: token });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};

export { index, show, create };
