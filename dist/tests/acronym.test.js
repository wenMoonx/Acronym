"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _supertest = _interopRequireDefault(require("supertest"));
const _common = require("@tsed/common");
const _app = _interopRequireDefault(require("../app"));
const _acronymModel = _interopRequireDefault(require("../models/acronym.model"));
const _acronymRoute = _interopRequireDefault(require("../routes/acronym.route"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
afterAll(async ()=>{
    await new Promise((resolve)=>setTimeout(()=>resolve(), 1000));
    _common.PlatformTest.create();
    _common.PlatformTest.reset();
});
describe('Testing Acronyms', ()=>{
    describe('[GET] /acronym', ()=>{
        test.only('response statusCode 200 / acronym', async ()=>{
            const search = 'I was';
            const from = 0;
            const limit = 10;
            const acronyms = _acronymModel.default.readFile();
            const findAcronyms = acronyms.filter((acronym)=>{
                const key = Object.keys(acronym)[0];
                if (key.search(search) !== -1 || acronym[key].search(search) !== -1) {
                    return acronym;
                }
            });
            const result = findAcronyms.slice(Number(from), Number(from) + Number(limit) + 1);
            const acronymRoute = new _acronymRoute.default();
            const app = new _app.default([
                acronymRoute
            ]);
            return (0, _supertest.default)(app.getServer()).get(`${acronymRoute.path}?from=${from}&limit=${limit}&search=${search}`).expect(200, {
                data: result,
                type: 'success'
            });
        });
    });
    describe('[POST] /acronym', ()=>{
        test.only('response statusCode 200 / created', async ()=>{
            const acronymData = {
                acronym: 'W2be',
                description: 'want to be'
            };
            const acronymRoute = new _acronymRoute.default();
            const app = new _app.default([
                acronymRoute
            ]);
            return (0, _supertest.default)(app.getServer()).post(`${acronymRoute.path}`).send(acronymData).expect(200, {
                message: 'A new acronym created.',
                type: 'success'
            });
        });
    });
    describe('[PUT] /acronym/:nowAcronym', ()=>{
        test.only('response statusCode 200 / updated', async ()=>{
            const token = 'secretKey';
            const nowAcronym = 'W2be';
            const acronymData = {
                newAcronym: 'W2be'
            };
            const acronymRoute = new _acronymRoute.default();
            const app = new _app.default([
                acronymRoute
            ]);
            return (0, _supertest.default)(app.getServer()).put(`${acronymRoute.path}/${nowAcronym}`).set('Authorization', `Bearer ${token}`).send(acronymData).expect(200, {
                message: 'The acronym updated successfully.',
                type: 'success'
            });
        });
    });
    describe('[DELETE] /acronym/:acronym', ()=>{
        test.only('response statusCode 200 / deleted', async ()=>{
            const deleteAcronym = 'W2be';
            const token = 'secretKey';
            const acronymRoute = new _acronymRoute.default();
            const app = new _app.default([
                acronymRoute
            ]);
            return (0, _supertest.default)(app.getServer()).delete(`${acronymRoute.path}/${deleteAcronym}`).set('Authorization', `Bearer ${token}`).expect(200, {
                message: 'The acronym deleted successfully.',
                type: 'success'
            });
        });
    });
});

//# sourceMappingURL=acronym.test.js.map