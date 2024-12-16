import { Router } from "express";
import { TodosRoutes } from "./todos/routes";

export class AppsRoutes {

    static get routes(): Router {
        const router = Router();

        router.use('/api/todos', TodosRoutes.routes);

        return router;
    }
}