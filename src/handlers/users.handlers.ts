import {Request, Response} from 'express'
import { UserStore } from '../models/user'

const user = new UserStore()

const index = async (req: Request, res: Response) => {
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
        const user_info = await user.show(req.params.id);
        res.status(200).json(user_info);
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const new_user = await user.create(req.body);
        res.status(200).json(new_user);
    } catch (error) {
        console.log(error)
        res.status(400)
    }
}

export { index, show, create }
