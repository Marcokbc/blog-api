import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "yup";

export const validateSchema =
  (schema: ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err: any) {
      res.status(400).json({ errors: err.errors });
    }
  };
