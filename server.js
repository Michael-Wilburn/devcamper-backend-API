const colors = require('colors');
const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./middleware/logger');
const morgan = require('morgan');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

//Routes files
const bootcamps = require('./routes/bootcamps');

const app = express();

//Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// app.use(logger);

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5002;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.rainbow
  );
});

//Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});
