import { CategoryModel } from "../data/mongo/models/category.model";
import { CreateCategoryDTO } from "../domain/dtos/categories/create-category.dto";
import { PaginationDTO } from "../domain/dtos/shared/pagination.dto";
import { UserEntity } from "../domain/entities/user.entity";
import { CustomError } from "../domain/errors/custom.error";

export class CategoryService {
    constructor() { }

    public async createCategory(categoryDTO: CreateCategoryDTO, user: UserEntity) {
        const categoryExists = await CategoryModel.findOne({ name: categoryDTO.name });
        if (categoryExists) throw CustomError.badRequest("Category already exists!");
        try {
            const newCategory = await CategoryModel.create({
                available: categoryDTO.available,
                name: categoryDTO.name,
                user: user.id
            });
            await newCategory.save();
            return {
                id: newCategory.id,
                name: newCategory.name,
                available: newCategory.available
            }
        } catch (error) {
            throw CustomError.internalServer(`Internal server error: ${error}`);
        }
    }

    public async getCategories(paginationDTO: PaginationDTO, user: UserEntity) {
        try {
            const [total, categories] = await Promise.all([
                CategoryModel.countDocuments({ user: user.id, available: true }),
                CategoryModel.find({ user: user.id, available: true })
                    .skip((paginationDTO.page - 1) * paginationDTO.limit)
                    .limit(paginationDTO.limit)
            ]);

            if (!categories) throw CustomError.badRequest('Categories not found!');

            const next = paginationDTO.page + 1;
            const previous = paginationDTO.page - 1 !== 0 ? paginationDTO.page - 1 : null;

            return {
                page: paginationDTO.page,
                limit: paginationDTO.limit,
                total: total,
                next: `/api/categories?page=${next}&limit=${paginationDTO.limit}`,
                previous: `/api/categories?page=${previous}&limit=${paginationDTO.limit}`,

                categories: categories.map(category => ({
                    id: category.id,
                    name: category.name,
                    available: category.available
                }))
            }
        } catch (error) {
            throw CustomError.internalServer(`Internal server error: ${error}`);
        }
    }
}