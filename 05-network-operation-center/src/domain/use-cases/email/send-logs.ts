import { EmailService } from "../../../presentation/services/email/emailService";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogsEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}

export class SendLogsEmail implements SendLogsEmailUseCase {

    constructor(private readonly emailService: EmailService, private readonly logRepository: LogRepository) {
    }

    async execute(to: string | string[]) {
        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            if (!sent) throw new Error("Email can not send");

            const log = new LogEntity({
                message: 'Email sent sucessful!',
                level: LogSeverityLevel.low,
                origin: 'send-logs.ts'
            })
            this.logRepository.saveLog(log)
            return true;
        } catch (error) {
            const log = new LogEntity({
                message: 'Email can not send',
                level: LogSeverityLevel.high,
                origin: 'send-logs.ts'
            })
            this.logRepository.saveLog(log)
            return false;
        }
    }
}