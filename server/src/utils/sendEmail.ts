import { transport } from '../modules/mailer';
import { getTemplate } from '../utils/getTemplates';

export const sendEmail = (data) => {
    transport.sendMail({
        to: data.to,
        from: data.from,
        subject: data.subject, 
        html: getTemplate(data.templateEmailName, data.templateEmailReplacements)
    }, (error) => {
        console.log("It was not possible to send the email. " + error.message);
    });
}