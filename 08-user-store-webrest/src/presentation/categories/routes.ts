import { Router } from "express";
import { CategoryController } from "./controller";
import { CategoryService } from "../../services/category.service";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

export class CategoriesRouter {
    static get routes(): Router {
        const router = Router();

        const categoryService = new CategoryService();
        const controller = new CategoryController(categoryService);

        router.get('/', [AuthMiddleware.authRequired], controller.getCategories);
        router.post('/', [AuthMiddleware.authRequired], controller.createCategory);

        return router;
    }
}