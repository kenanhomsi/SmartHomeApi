
require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const helmet=require('helmet');
const cros=require('cors');
const xss=require('xss-clean');

//consectdb
const connectDB=require('./db/connect')
//routers
const authenticationUser=require('./middleware/authentication')
const authRouter=require('./routes/auth');
const ServicesRouter=require('./routes/services')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



app.use(express.json());
app.use(helmet());
app.use(cros());
app.use(xss());



// routes
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/',authenticationUser,ServicesRouter);
// app.use('/api/v1/jobs',authenticationUser,JobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 10000;
app.get('/', (req, res) => {
  res.send('Hello World!')
})

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  } catch (error) {
    console.log(error);
  }
};

start();
