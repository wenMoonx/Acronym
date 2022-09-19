import { NextFunction, Request, Response } from 'express';
import AcronymService from '@services/acronym.service';
declare class AcronymController {
    acronymService: AcronymService;
    readAcronym: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createAcronym: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateAcronym: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteAcronym: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default AcronymController;
