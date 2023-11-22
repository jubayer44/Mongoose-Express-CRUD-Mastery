import express from 'express';
import { studentController } from './user.controller';
const route = express.Router();

route.post('/', studentController.createUser);
route.get('/', studentController.getAllUser);

export const userRoute = route;
