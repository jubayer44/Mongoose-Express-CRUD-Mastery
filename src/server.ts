import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

const PORT = 5000;

async function server() {
  try {
    await mongoose.connect(config.dbUrl as string);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${config.port}`); // eslint-disable-line
    });
  } catch (error) {
    console.log(error); // eslint-disable-line
  }
}

server().catch((err) => console.log(err)); // eslint-disable-line
