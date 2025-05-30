import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import usersRouter from './api/users';
import moviesRouter from './api/movies';
import actorsRouter from './api/actors';
import authenticate from './authenticate';
import './db';
import cors from 'cors';



const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
  console.error(err.stack);
};


const app = express();

app.use(cors());

const port = process.env.PORT;

app.use(express.json());

app.use('/api/users', usersRouter);

app.use('/api/movies', moviesRouter); 

app.use('/api/actors', actorsRouter);

app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});


