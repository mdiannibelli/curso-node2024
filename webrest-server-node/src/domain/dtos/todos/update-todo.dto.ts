export class UpdateTodoDto {
    private constructor(
        public readonly text?: string,
        public readonly completedAt?: Date
    ) {

    }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.text) returnObj.text = this.text;
        if (this.completedAt) returnObj.completedAt = this.completedAt;

        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
        const { text, completedAt } = props;

        let newCompletedAt = completedAt;
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (newCompletedAt.toString() === 'Invalid Date') {
                return ['CompletedAt must be a valid date', undefined];
            }
        }

        return [undefined, new UpdateTodoDto(text, newCompletedAt)]
    }
}