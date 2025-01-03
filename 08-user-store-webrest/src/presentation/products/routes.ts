import { Router } from "express";
import { ProductController } from "./controller";
import { ProductsService } from "../services/products.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ProductsRoutes {

    static get routes(): Router {
        const router = Router();
        const productsService = new ProductsService();
        const productController = new ProductController(productsService);
        router.get('/', AuthMiddleware.authRequired, productController.getProducts);
        router.post('/', AuthMiddleware.authRequired, productController.createProduct);

        return router;
    }
}