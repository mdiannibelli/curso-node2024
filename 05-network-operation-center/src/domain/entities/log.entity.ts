export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string;
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt?: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const { level, message, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = (json: string): LogEntity => {
        const { message, createdAt, level } = JSON.parse(json);
        if (!message) throw new Error("Message is required");
        if (!level) throw new Error("Level is required");

        const log = new LogEntity({
            message: message,
            level: level,
            createdAt: createdAt,
            origin: 'log.entity.ts'
        })
        log.createdAt = new Date(createdAt);

        return log;
    }
}