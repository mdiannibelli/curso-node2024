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
        if (!id) throw new Error("id is required");
        if (!text || typeof text !== 'string') throw new Error("invalid text");

        let newCompletedAt;
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (isNaN(newCompletedAt.getTime())) {
                throw "CompletedAt is not a valid date"
            }
        }

        return new TodoEntity(id, text, completedAt);
    }
}