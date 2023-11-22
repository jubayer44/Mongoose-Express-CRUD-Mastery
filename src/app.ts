import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoute } from './app/modules/user/user.route';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

export default app;
