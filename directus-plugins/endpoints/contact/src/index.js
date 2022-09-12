export default (router, { env }) => {
    router.post('/', async (req, res) => {
        const nodemailer = require('nodemailer');

        try {
            const transporter = nodemailer.createTransport({
                pool: env.EMAIL_SMTP_POOL,
                ignoreTLS: env.EMAIL_SMTP_IGNORE_TLS,
                host: env.EMAIL_SMTP_HOST,
                port: env.EMAIL_SMTP_PORT,
                secure: env.EMAIL_SMTP_SECURE,
                auth: {
                    user: env.EMAIL_SMTP_USER,
                    pass: env.EMAIL_SMTP_PASSWORD,
                },
            });

            let info = await transporter.sendMail({
                from: env.EMAIL_FROM,
                to: env.EMAIL_FROM, // Pour envoyer un mail à sa propre boite mail
                subject: req.body.subject,
                text: `Nouveau mail de contact : 
                    De : ${req.body.name} - ${req.body.email}
                    Message : ${req.body.message}
                    ${req.body.company != null ? 'Entreprise : '+req.body.company : ''}
                    ${req.body.company != null ? 'Ecole : '+req.body.company : ''}
                `,
            });
        
            res.status(200).send(info);

        } catch (err) {
            res.status(500).send(err);
        }
    });
};
