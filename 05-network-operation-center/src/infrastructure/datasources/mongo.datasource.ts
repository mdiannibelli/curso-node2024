import { LogModel } from "../../data/mongo/models/log.model";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogSeverityLevel, LogEntity } from "../../domain/entities/log.entity";

export class MongoDatasource implements LogDataSource {
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel
        });
        return logs.map(mongoLog => LogEntity.fromObject(mongoLog));
    }
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        await newLog.save();
        console.log("Mongo Log created", newLog._id);
    }
}