import { envs } from "../../config/envs";
import { randomBetween0AndX } from "../../utils/random-num";
import { CategoryModel } from "../mongo/models/category.model";
import { ProductModel } from "../mongo/models/product.model";
import { UserModel } from "../mongo/models/user.model";
import { MongoDatabase } from "../mongo/mongo-database";
import { seedData } from "./data";

(async () => {
    await MongoDatabase.connect({
        mongoDbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    });

    await main();

    await MongoDatabase.disconnect();
})();


async function main() {
    await Promise.all([
        UserModel.deleteMany(),
        CategoryModel.deleteMany(),
        ProductModel.deleteMany()
    ]);

    // Users
    const users = await UserModel.insertMany(seedData.users);

    // Categories
    const categories = await CategoryModel.insertMany(seedData.categories.map(category => {
        return {
            ...category,
            user: users[randomBetween0AndX(seedData.users.length - 1)]._id
        }
    }));

    // Products
    const products = await ProductModel.insertMany(seedData.products.map(product => {
        return {
            ...product,
            category: categories[randomBetween0AndX(seedData.categories.length - 1)]._id,
            user: users[randomBetween0AndX(seedData.users.length - 1)]._id
        }
    }))

    console.log('Seed Executed!');
}