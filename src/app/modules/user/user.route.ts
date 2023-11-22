import express from 'express';
import { studentController } from './user.controller';
const route = express.Router();

route.post('/', studentController.createUser);

export const userRoute = route;
