import express from 'express';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;
import { authRouter, postRouter } from './routers/index.js';

const app = express();

app.use(express.json()); // mojem pasrit' json
app.use('/auth', authRouter);

const start = async () => {
   try {
      await mongoose.connect('mongodb+srv://qwer12:380638132867@cluster0.ozuitzx.mongodb.net/market?retryWrites=true&w=majority').then(() => console.log('DB is ok'));
      app.listen(PORT, () => console.log(`Server started to PORT ${PORT}`));
   }
   catch (error) {
      console.log(error);
   }
};

start();