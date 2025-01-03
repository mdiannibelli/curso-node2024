import mongoose from "mongoose";

export class Validator {
    static isMongoId(id: string) {
        return mongoose.isValidObjectId(id);
    }
}