import { Validator } from "../../../config/validators";

export class CreateProductDTO {
    constructor(
        public readonly name: string,
        public readonly available: boolean = true,
        public readonly price: number,
        public readonly user: string,
        public readonly category: string,
        public readonly description?: string
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateProductDTO?] {
        const { name, available, price, user, category, description = "" } = object;
        let availableBoolean = available;

        if (typeof name !== 'string') return ['Missing name'];
        if (typeof price !== 'number') return ['Missing price'];
        if (!user) return ['Missing user'];
        if (!Validator.isMongoId(user)) return ['Invalid user id'];
        if (!category) return ['Missing category'];
        if (!Validator.isMongoId(category)) return ['Invalid category id'];
        if (typeof description !== 'string') return ['Missing description'];

        if (typeof available !== 'boolean') {
            availableBoolean = (available === 'true') ? true : false
        } else {
            return ['Missing available and must be true or false'];
        }

        return [undefined, new CreateProductDTO(name, availableBoolean, price, user, category, description)];
    }
}