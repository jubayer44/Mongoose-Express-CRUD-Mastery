import express from 'express';
import { studentController } from './user.controller';
const route = express.Router();

route.post('/', studentController.createUser);
route.get('/', studentController.getAllUser);
route.get('/:userId', studentController.getSingleUser);

export const userRoute = route;
