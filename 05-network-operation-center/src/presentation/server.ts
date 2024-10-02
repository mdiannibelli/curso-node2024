import { CheckService } from "../domain/use-cases/checks/checkService"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImplementation } from "../infrastructure/repositories/log-impl.repository"
import { CronService } from "./cron/cronService"

const fileSystemRepository = new LogRepositoryImplementation(
    new FileSystemDatasource()
)

export class Server {
    public static start() {
        console.log("Server started...")

        CronService.createJob(
            '* * * * * *',
            () => {
                new CheckService(
                    () => console.log("success"),
                    (error) => console.log(error),
                    fileSystemRepository
                    
                ).execute('https://google.com')
                //new CheckService().execute('http://localhost:3000')
            }
        )
    }
}