import request from 'supertest';
import { PlatformTest } from '@tsed/common';
import App from '@/app';
import { CreateAcronymDto, updateAcronymDto, deleteAcronymDto } from '@dtos/acronym.dto';
import { Acronym, AcronymGroup } from '@interfaces/acronym.interface';
import AcronymModel from '@models/acronym.model';
import AcronymRoute from '@routes/acronym.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
  PlatformTest.create();
  PlatformTest.reset();
});

describe('Testing Acronyms', () => {
  describe('[GET] /acronym', () => {
    test.only('response statusCode 200 / acronym', async () => {
      const search = 'I was';
      const from = 0;
      const limit = 10;
      const acronyms: Acronym[] = AcronymModel.readFile();
      const findAcronyms: Acronym[] = acronyms.filter(acronym => {
        const key = Object.keys(acronym)[0];
        if (key.search(search) !== -1 || acronym[key].search(search) !== -1) {
          return acronym;
        }
      });
      const result = findAcronyms.slice(Number(from), Number(from) + Number(limit) + 1);
      const acronymRoute = new AcronymRoute();
      const app = new App([acronymRoute]);
      return request(app.getServer())
        .get(`${acronymRoute.path}?from=${from}&limit=${limit}&search=${search}`)
        .expect(200, { data: result, type: 'success' });
    });
  });

  describe('[POST] /acronym', () => {
    test.only('response statusCode 200 / created', async () => {
      const acronymData: CreateAcronymDto = {
        acronym: 'W2be',
        description: 'want to be',
      };
      const acronymRoute = new AcronymRoute();
      const app = new App([acronymRoute]);
      return request(app.getServer())
        .post(`${acronymRoute.path}`)
        .send(acronymData)
        .expect(200, { message: 'A new acronym created.', type: 'success' });
    });
  });

  describe('[PUT] /acronym/:nowAcronym', () => {
    test.only('response statusCode 200 / updated', async () => {
      const token = 'secretKey';
      const nowAcronym = 'W2be';
      const acronymData: updateAcronymDto = {
        newAcronym: 'W2be',
      };
      const acronymRoute = new AcronymRoute();
      const app = new App([acronymRoute]);
      return request(app.getServer())
        .put(`${acronymRoute.path}/${nowAcronym}`)
        .set('Authorization', `Bearer ${token}`)
        .send(acronymData)
        .expect(200, { message: 'The acronym updated successfully.', type: 'success' });
    });
  });

  describe('[DELETE] /acronym/:acronym', () => {
    test.only('response statusCode 200 / deleted', async () => {
      const deleteAcronym = 'W2be';
      const token = 'secretKey';
      const acronymRoute = new AcronymRoute();
      const app = new App([acronymRoute]);
      return request(app.getServer())
        .delete(`${acronymRoute.path}/${deleteAcronym}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200, { message: 'The acronym deleted successfully.', type: 'success' });
    });
  });
});
