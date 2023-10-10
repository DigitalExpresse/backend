import nodemailer from 'nodemailer';
import handlebars from 'handlebars';

import { ERROR_EMAIL_NOT_SENT } from "@utils/messages/error_message";
import { restaurantName } from "@utils/restaurantInfo";
import {EmailType} from "@root/email-template/EmailType";

export class Mailer {
    async sendEmail<T extends keyof typeof EmailType>(
        email: string,
        emailType: typeof EmailType[keyof typeof EmailType],
        dataForHtmlVarsTemplate: typeof emailType.vars.additionalDataForHtmlVars,
    ) : Promise<void> {

        try {

            const compiledHtmlTemplate = this.compileTemplate(emailType.template);
            const renderedHtmlWithVars = this.renderHtmlWithVars(compiledHtmlTemplate, {
                ...dataForHtmlVarsTemplate, ...emailType.vars.defaultDataForHtmlVar
            });

            const transporter = await this.createTransporter();

            const mailOptions = this.createMailOptions(
                email,
                emailType.destinationType,
                emailType.vars.subjectEmail,
                renderedHtmlWithVars
            );

            await transporter.sendMail(mailOptions, (err: any, info: { messageId: any; }) => {
                if (err) {
                    throw new Error(ERROR_EMAIL_NOT_SENT.message);
                } else {
                    console.log("Message sent: %s", info.messageId);
                }
            });

        } catch (e) {
            throw new Error(ERROR_EMAIL_NOT_SENT.message);
        }
    }

    private compileTemplate(templateContent: string) {
        return handlebars.compile(templateContent);
    }

    private renderHtmlWithVars<T>(templateHtml: handlebars.TemplateDelegate, data: T): string {
        return templateHtml(data);
    }

    private async createTransporter(): nodemailer.Transporter {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
                clientId: process.env.OAUTH_CLIENT_ID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                accessToken: process.env.OAUTH_ACCESS_TOKEN,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            },
        });
    }

    private createMailOptions(email: string, destinataireType, subject: string, html: string) {

        if(destinataireType === "admin") {
            return {
                from: `"DigitalXpress 👻" <${process.env.MAIL_USERNAME}>`,
                to: process.env.MAIL_USERNAME,
                subject: subject,
                html: html,
            };
        }
        else if(destinataireType === "client") {

            console.log("email: ", email);

            return {
                from: `"${restaurantName} 👻" <${process.env.MAIL_USERNAME}>`,
                to: email,
                subject: subject,
                html: html,
            };

        }
    }
}
