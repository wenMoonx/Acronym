import { NextFunction, Response } from 'express';
import { RequestWithAcronym } from '@interfaces/acronym.interface';
declare const authMiddleware: (req: RequestWithAcronym, res: Response, next: NextFunction) => Promise<void>;
export default authMiddleware;
