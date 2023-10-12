import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodEffects } from 'zod'
const validationRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      return next()
    } catch (err) {
      next(err)
    }
  }

export default validationRequest
