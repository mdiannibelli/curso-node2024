import { CheckService } from "../domain/use-cases/checks/checkService"
import { CronService } from "./cron/cronService"

export class Server {
    public static start() {
        console.log("Server started...")

        CronService.createJob(
            '* * * * * *',
            () => {
                new CheckService(
                    () => console.log("success"),
                    (error) => console.log(error)
                ).execute('https://google.com')
                //new CheckService().execute('http://localhost:3000')
            }
        )
    }
}