import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import routers from './app/routes'
import httpStatus from 'http-status'
import globalErrorHandler from './app/middleware/globalErrorHandler'

const app = express()
 

// Configure CORS
const allowedOrigins = ['http://localhost:3000']; // Update this with your frontend's URL(s)

app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is in the allowed list or is undefined (for same-origin requests)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow credentials (cookies)
  })
);

app.use(cookieParser());
//  parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// application routes
app.use('/api/v1/', routers)

// global Error Handler
app.use(globalErrorHandler)

// api not found Error handler
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'NOT FOUND',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API NOT FOUND',
      },
    ],
  })
})

export default app
