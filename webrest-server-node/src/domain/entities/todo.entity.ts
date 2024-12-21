import { CustomError } from "../errors/custom.error";

export class TodoEntity {
    constructor(
        public id: number,
        public text: string,
        public completedAt?: Date | null
    ) {

    }

    get isCompleted() {
        return !!this.completedAt;
    }

    public static fromJson(object: { [key: string]: any }) {
        const { id, text, completedAt } = object;
        if (!id) throw new CustomError("id is required", 400);
        if (!text || typeof text !== 'string') throw new CustomError("invalid text");

        let newCompletedAt;
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (isNaN(newCompletedAt.getTime())) {
                throw new CustomError("CompletedAt is not a valid date", 400)
            }
        }

        return new TodoEntity(id, text, completedAt);
    }
}