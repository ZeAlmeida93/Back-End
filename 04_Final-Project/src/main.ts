import express from 'express';
import dotenv from 'dotenv';
import movieRouter from './routers/movieRouter.js';
import cors from 'cors';


dotenv.config();

const PORT = process.env.PORT || 7878;

const app = express();

app.use(cors({
   origin: '*'
}))

app.use(express.json());
app.use('api', movieRouter)

const startApp = async () => {
  try {
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
