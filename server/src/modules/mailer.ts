import { createTransport,  } from 'nodemailer';
import { resolve } from 'path';
const hbs = require('nodemailer-express-handlebars');

export const transport = createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,

    auth: {
      user: "53a24531190590",
      pass: "f243a288efb4ff"
    }
  });
  

