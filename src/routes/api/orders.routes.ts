import express from 'express';
import { show } from '../../handlers/orders.handlers';

const orders = express.Router();

orders.get('/:user_id', show);

export default orders;
