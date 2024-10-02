import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImplementation implements LogRepository {
    private logDatasource: LogDataSource;

    constructor(logDatasource: LogDataSource) {
         this.logDatasource = logDatasource
    }

    async saveLog(log: LogEntity): Promise<void> {
        return this.logDatasource.saveLog(log);
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severityLevel);
    }
    
}