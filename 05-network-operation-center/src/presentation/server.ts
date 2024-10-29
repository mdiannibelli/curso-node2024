import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/checkService"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImplementation } from "../infrastructure/repositories/log-impl.repository"
import { CronService } from "./services/cron/cronService"

import 'dotenv/config';
import { EmailService } from "./services/email/emailService";
import { SendLogsEmail } from "../domain/use-cases/email/send-logs";
import { MongoDatasource } from "../infrastructure/datasources/mongo.datasource";

const logRepository = new LogRepositoryImplementation(
    //new FileSystemDatasource()
    new MongoDatasource()
)

export class Server {
    public static start() {
        console.log(`Server started at port ${envs.PORT}...`);

        //! With EmailService
        //const emailService = new EmailService();
        //emailService.sendEmail({
        //    to: 'vectorgamer406@gmail.com',
        //    subject: 'Logs del Sistema',
        //    htmlBody: `
        //        <h3>Logs del sistema</h3>
        //        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque hendrerit sollicitudin. Pellentesque gravida velit non tortor tempus interdum. Quisque ullamcorper, elit in varius commodo, tellus ex rhoncus enim, ac mattis turpis lectus quis tortor. Vivamus lacinia accumsan vestibulum. Sed ultricies dolor enim, ut scelerisque arcu efficitur finibus. Curabitur maximus sem sapien, et hendrerit turpis consectetur eget. Fusce bibendum magna ac velit ornare tempor. Donec tincidunt felis ac elit mollis, eget bibendum mauris faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lobortis risus ut nisi fringilla, eu vestibulum justo elementum. Morbi imperdiet laoreet lectus, et elementum lacus fringilla in. Sed fermentum tempor ultricies. Phasellus elementum nisl at neque tristique, vitae posuere nulla mollis. Vivamus quis lectus ac purus eleifend finibus. Nam ut massa aliquam, ornare libero sed, rutrum mi. Donec justo orci, aliquam tincidunt mattis non, viverra consequat nulla.</p>
        //        <p>Ver logs adjuntos</p>
        //    `
        //})

        //emailService.sendEmailWithFileSystemLogs(['vectorgamer406@gmail.com', 'dioneldeveloper@gmail.com'])

        //! With use case
        const emailService = new EmailService();
        new SendLogsEmail(emailService, logRepository).execute(['vectorgamer406@gmail.com', 'dioneldeveloper@gmail.com'])

        CronService.createJob(
            '* * * * * *',
            () => {
                new CheckService(
                    () => console.log("success"),
                    (error) => console.log(error),
                    logRepository

                ).execute('https://google.com')
            }
        )
    }
}