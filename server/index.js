import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

// initialize app
const app = express();

// middlewares
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(express.json({ limit: '25mb' }));
app.use(cors());
app.use(helmet());
app.use(morgan('common'));

// *** [.env file must be added to .gitignore]
dotenv.config();
const PORT = process.env.PORT || 5000;

/*
 *** [DEVELOPMENT / PRODUCTION]
 *** mongodb connection URL
 */

const CONNECTION_URL = process.env.MONGO_DEV_URL;
// const CONNECTION_URL = process.env.MONGO_URL;

// connect mongodb and listen on PORT
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('connected to mongoDB'))
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port :  ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

// use routes
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

// check API connection
app.get('/', (req, res) => {
  res.send('connected to API ');
});
