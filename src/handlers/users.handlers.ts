import {Request, Response} from 'express'
import { User, UserStore } from '../models/user'
import jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const user = new UserStore()

const token_secret: Secret = (process.env.TOKEN_SECRET as unknown) as Secret

const index = async (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, token_secret)
    } catch (error) {
        console.log(error)
        res.status(400).json(`Invalid token ${error}`)
        return
    }
    try {
        const users = await user.index()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        jwt.verify(req.body.token, token_secret)
    } catch (error) {
        console.log(error)
        res.status(400).json(`Invalid token ${error}`)
        return
    }

    try {
        const user_info = await user.show(req.params.id);
        res.status(200).json(user_info);
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const userObj: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        }
        const new_user = await user.create(userObj);
        const payload = {id: new_user.id, firstname: new_user.firstname, lastname: new_user.lastname}
        const token = jwt.sign({user: payload}, token_secret)
        res.status(200).json({new_user, token: token});
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}

export { index, show, create }
