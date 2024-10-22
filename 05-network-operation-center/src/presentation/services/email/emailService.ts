import nodemailer from 'nodemailer';
import { envs } from '../../../config/plugins/envs.plugin';
import { LogRepository } from '../../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../../domain/entities/log.entity';

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement[]
}

interface Attachement {
    filename: string
    path: string
}

export class EmailService {
    private transported = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options: SendEmailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachements = [] } = options
        try {
            const sentInformation = await this.transported.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements
            })
            //console.log(sentInformation);
            return true;
        } catch (error) {
            //console.log(error)
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = `
                <h3>Logs del sistema - NOC</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque hendrerit sollicitudin. Pellentesque gravida velit non tortor tempus interdum. Quisque ullamcorper, elit in varius commodo, tellus ex rhoncus enim, ac mattis turpis lectus quis tortor. Vivamus lacinia accumsan vestibulum. Sed ultricies dolor enim, ut scelerisque arcu efficitur finibus. Curabitur maximus sem sapien, et hendrerit turpis consectetur eget. Fusce bibendum magna ac velit ornare tempor. Donec tincidunt felis ac elit mollis, eget bibendum mauris faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec lobortis risus ut nisi fringilla, eu vestibulum justo elementum. Morbi imperdiet laoreet lectus, et elementum lacus fringilla in. Sed fermentum tempor ultricies. Phasellus elementum nisl at neque tristique, vitae posuere nulla mollis. Vivamus quis lectus ac purus eleifend finibus. Nam ut massa aliquam, ornare libero sed, rutrum mi. Donec justo orci, aliquam tincidunt mattis non, viverra consequat nulla.</p>
                <p>Ver logs adjuntos</p>
            `
        const attachements: Attachement[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' }
        ]

        return this.sendEmail({
            to, subject, attachements, htmlBody
        });
    }
}