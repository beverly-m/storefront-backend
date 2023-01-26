import express from 'express';
import { index, show, create } from '../../handlers/users.handlers';

const users = express.Router();

users.get('/', index);
users.get('/:id', show);
users.post('/', create);

export default users;
