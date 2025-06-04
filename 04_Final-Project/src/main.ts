import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import movieRouter from './routers/movieRouter.js';
import userRouter from './routers/userRouter.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';

dotenv.config();

const PORT = process.env.PORT || 7989;
const app = express();

app.use(fileUpload());
app.use(express.static('static'));
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api', movieRouter);
app.use('/auth', userRouter);

const startApp = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(String(process.env.MONGO_URI));
    console.log('Succssefully connected to DB');

    app.listen(PORT, () => {
      if (process.env.NODE_ENV === 'prod') {
        console.log(`server is running in production mode on port ${PORT}`);
      } else {
        console.log(`server is running in development mode on port ${PORT}`);
      }
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('Error connecting to database', err.message);
    }
  }
};

startApp();
