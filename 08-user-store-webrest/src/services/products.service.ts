import { ProductModel } from "../data/mongo/models/product.model";
import { CreateProductDTO } from "../domain/dtos/products/create-product.dto";
import { PaginationDTO } from "../domain/dtos/shared/pagination.dto";
import { UserEntity } from "../domain/entities/user.entity";
import { CustomError } from "../domain/errors/custom.error";

export class ProductsService {
    public async getProducts(paginationDTO: PaginationDTO, user: UserEntity) {
        const { limit, page } = paginationDTO;
        try {
            const [total, products] = await Promise.all([
                ProductModel.countDocuments({ user: user.id, available: true }),
                ProductModel.find({ user: user.id, available: true })
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .populate('user')
            ])

            if (!products) throw CustomError.badRequest("Products not found!");


            const next = page + 1;
            const previous = page - 1 !== 0 ? page - 1 : null;

            return {
                page: page,
                limit: limit,
                total: total,

                next: `/api/products?page=${next}&limit=${limit}`,
                previous: `/api/products?page=${previous}&limit=${limit}`,

                products: products
            }
        } catch (error) {

        }
    }

    public async createProduct(productDTO: CreateProductDTO) {
        const productsExists = await ProductModel.findOne({ name: productDTO.name });
        if (productsExists) throw CustomError.badRequest("Product already exits");
        try {
            const product = await ProductModel.create(productDTO);
            return product;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}