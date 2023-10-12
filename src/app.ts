import express, { Request, Response } from 'express'
import cors from 'cors'

import routers from './app/routes'
import httpStatus from 'http-status'
import globalErrorHandler from './app/middleware/globalErrorHandler'

const app = express()

app.use(cors())

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
