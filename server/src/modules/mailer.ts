import { createTransport,  } from 'nodemailer';
import { mailerConfig } from '../config/mailerConfig';


export const transport = createTransport(mailerConfig);
