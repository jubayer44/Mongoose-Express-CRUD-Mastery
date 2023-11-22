import express from 'express';
import cors from 'cors';
import { userRoute } from './app/modules/user/user.route';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoute);

app.get('/', (req, res) => {
  res.send('Server is running');
});

export default app;
