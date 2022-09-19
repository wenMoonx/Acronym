import AcronymController from '@controllers/acronym.controller';
import { Routes } from '@interfaces/routes.interface';
declare class AcronymRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    acronymController: AcronymController;
    constructor();
    private initializeRoutes;
}
export default AcronymRoute;
