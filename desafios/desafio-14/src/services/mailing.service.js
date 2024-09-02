import { createTransport } from "nodemailer";
import config from "../config.js";
import { logger } from "../utils/logger.js";

const transporter = createTransport({
    service: 'gmail',
    port: config.PORT_GMAIL,
    secure: true,
    auth: {
        user: config.EMAIL,
        pass: config.PASSWORD
    }
});

const createMsgRegister = name => 
    `<h1>Hola ${name}, ¡Bienvenido/a al Ecomerce!</h1>`;

const createMsgReset = name => 
    `<p>¡Hola ${name}! Hacé click <a href="http://localhost:8080/updatepass">AQUÍ</a> 
        para restablecer tu contraseña.
    </p>`;

export const sendMail = async (user, service, token = null) => {
    try {
        const { first_name, email } = user;
        let msg = '';
        let subj = '';
        
        if (service === 'register') {
            msg = createMsgRegister(first_name)
            subj = 'Bienvenido/a'
        } else if (service === 'resetPass') {
            msg = createMsgReset(first_name)
            subj = 'Restablecer contraseña'
        }
        
        const gmailOptions = {
            from: config.EMAIL,
            to: email,
            subject: subj,
            html: msg
        };

        await transporter.sendMail(gmailOptions);
        logger.info(`Email enviado ${msg}`);
        if (token) return token;

    } catch (error) {
        throw new Error(error)
    }
}