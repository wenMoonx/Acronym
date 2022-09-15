import { NextFunction, Request, Response } from 'express';
import { Path, Accept, GET, POST, QueryParam } from 'typescript-rest';
import { SwaggerTags, ResponseProduces } from 'typescript-swagger';

import { CreateAcronymDto } from '@dtos/acronym.dto';
import AcronymService from '@services/acronym.service';
@Path('/acronym')
class AcronymController {
  public acronymService = new AcronymService();

  @GET
  @SwaggerTags('adiministrative', 'department1')
  public readAcronym = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { from = 0, limit = 10, search = '' } = req.query;
      const { acronyms, isOnly } = await this.acronymService.readAcronym(from as number, limit as number, search as string);

      res.setHeader('isOnly', isOnly.toString());
      res.status(200).json({
        data: acronyms,
        type: 'success',
      });
    } catch (error) {
      next(error);
    }
  };

  public createAcronym = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const acronymData: CreateAcronymDto = req.body;
      const isSuccess = await this.acronymService.createAcronym(acronymData.acronym, acronymData.description);
      if (isSuccess) {
        res.status(200).json({
          message: 'A new acronym created.',
          type: 'success',
        });
      } else {
        res.status(200).json({
          message: 'Try again.',
          type: 'failed',
        });
      }
    } catch (error) {
      next(error);
    }
  };

  public updateAcronym = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const nowAcronym: string = req.params.nowAcronym;
      const newAcronym: string = req.body.newAcronym;
      const newDescription: string = req.body.newDescription;
      const isSuccess = await this.acronymService.updateAcronym(nowAcronym, newAcronym, newDescription);
      if (isSuccess) {
        res.status(200).json({
          message: 'The acronym updated successfully.',
          type: 'success',
        });
      } else {
        res.status(200).json({
          message: 'Try again.',
          type: 'failed',
        });
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteAcronym = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const acronym: string = req.params.acronym;
      const isSuccess = await this.acronymService.deleteAcronym(acronym);
      if (isSuccess) {
        res.status(200).json({
          message: 'The acronym deleted successfully.',
          type: 'success',
        });
      } else {
        res.status(200).json({
          message: 'Try again.',
          type: 'failed',
        });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default AcronymController;
