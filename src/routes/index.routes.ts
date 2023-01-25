import express, { Request, Response } from 'express'
import users from './api/users.routes';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

routes.use('/users', users)

export default routes

