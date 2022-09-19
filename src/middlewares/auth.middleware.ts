import { NextFunction, Response } from 'express';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithAcronym } from '@interfaces/acronym.interface';

const authMiddleware = async (req: RequestWithAcronym, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    if (Authorization) {
      const secretKey: string = SECRET_KEY;

      if (secretKey === Authorization) {
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
