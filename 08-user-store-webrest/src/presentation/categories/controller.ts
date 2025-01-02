import { Request, Response } from "express"
import { CustomError } from "../../domain/errors/custom.error"
import { CategoryService } from "../services/category.service";
import { CreateCategoryDTO } from "../../domain/dtos/categories/create-category.dto";
import { PaginationDTO } from "../../domain/dtos/shared/pagination.dto";

export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        console.log(`${error}`)
        return res.status(500).json({ error: 'Internal Server Error' })
    }

    createCategory = async (req: Request, res: Response) => {
        const [error, categoryDTO] = CreateCategoryDTO.create(req.body);
        if (error) return res.status(400).json({ error });

        this.categoryService.createCategory(categoryDTO!, req.body.user)
            .then(response => res.json({ response }))
            .catch(error => this.handleError(error, res));
    }

    getCategories = async (req: Request, res: Response) => {
        const { page = 1, limit = 15 } = req.query;
        const [error, paginationDTO] = PaginationDTO.create(+page, +limit);
        if (error) res.status(400).json({ error: error });

        this.categoryService.getCategories(paginationDTO!, req.body.user)
            .then(response => res.json({ response }))
            .catch(error => this.handleError(error, res));
    }
}