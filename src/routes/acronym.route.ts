import { Router } from 'express';
import AcronymController from '@controllers/acronym.controller';

import { CreateAcronymDto, updateAcronymDto, deleteAcronymDto } from '@dtos/acronym.dto';
import { Routes } from '@interfaces/routes.interface';

import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

class AcronymRoute implements Routes {
  public path = '/acronym';
  public router = Router();
  public acronymController = new AcronymController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.acronymController.readAcronym);
    this.router.post(`${this.path}`, validationMiddleware(CreateAcronymDto, 'body'), this.acronymController.createAcronym);
    this.router.put(`${this.path}/:nowAcronym`, authMiddleware, validationMiddleware(updateAcronymDto, 'body'), this.acronymController.updateAcronym);
    this.router.delete(
      `${this.path}/:acronym`,
      authMiddleware,
      validationMiddleware(deleteAcronymDto, 'params'),
      this.acronymController.deleteAcronym,
    );
  }
}

export default AcronymRoute;
