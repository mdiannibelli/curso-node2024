import { Router } from 'express';
import { AuthRouter } from './auth/routes';
import { CategoriesRouter } from './categories/routes';
import { ProductsRoutes } from './products/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    router.use('/api/auth', AuthRouter.routes);
    router.use('/api/categories', CategoriesRouter.routes);
    router.use('/api/products', ProductsRoutes.routes)



    return router;
  }


}

