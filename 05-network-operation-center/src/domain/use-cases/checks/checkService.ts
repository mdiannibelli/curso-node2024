import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = ((error: string) => void) | undefined;


export class CheckService implements CheckServiceUseCase {
    private successCallback: SuccessCallback;
    private errorCallback: ErrorCallback;
    private logRepository: LogRepository

    constructor(successCallback: SuccessCallback, errorCallback: ErrorCallback, logRepository: LogRepository) {
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        this.logRepository = logRepository;
    }

    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }

            this.logRepository.saveLog(new LogEntity(`Service ${url} working`, LogSeverityLevel.low))
            this.successCallback && this.successCallback()
            //console.log(`${url} is ok`)
            return true;
        } catch (error) {
            //console.log(`${error}`)
            this.logRepository.saveLog(new LogEntity(`${error}`, LogSeverityLevel.high))
            this.errorCallback && this.errorCallback(`${error}`)
            return false;
        }
    }
}