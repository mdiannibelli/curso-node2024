import { Router } from 'express';
import { AuthRouter } from './auth/routes';
import { CategoriesRouter } from './categories/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    router.use('/api/auth', AuthRouter.routes);
    router.use('/api/categories', CategoriesRouter.routes);



    return router;
  }


}

