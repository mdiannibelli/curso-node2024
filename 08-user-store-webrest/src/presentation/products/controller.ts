import { Request, Response } from "express";
import { ProductsService } from "../services/products.service";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateProductDTO } from "../../domain/dtos/products/create-product.dto";
import { PaginationDTO } from "../../domain/dtos/shared/pagination.dto";

export class ProductController {
    constructor(
        private readonly productService: ProductsService
    ) { }

    private handleError(error: unknown, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        console.log(`${error}`)
        return res.status(500).json({ error: 'Internal Server Error' })
    }

    getProducts = (req: Request, res: Response) => {
        const { page = 1, limit = 15 } = req.query;
        const [err, paginationDTO] = PaginationDTO.create(+page, +limit);
        if (err) return res.status(401).json({ err });

        this.productService.getProducts(paginationDTO!, req.body.user)
            .then(response => res.json({ response }))
            .catch(err => this.handleError(err, res))
    }

    createProduct = (req: Request, res: Response) => {
        const [err, productDTO] = CreateProductDTO.create({ //! Send id from req.body
            ...req.body,
            user: req.body.user.id
        });
        if (err) return res.status(401).json({ err });

        this.productService.createProduct(productDTO!)
            .then(response => res.json({ response }))
            .catch(err => this.handleError(err, res));
    }
}