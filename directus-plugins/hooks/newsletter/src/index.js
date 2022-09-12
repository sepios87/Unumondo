export default ({ action }, { services, exceptions }) => {
    const { MailService, ItemsService } = services;
    const { ServiceUnavailableException } = exceptions;

    action(
        'items.create',
        async (
            { key: itemId, collection },
            { database: knex, schema, accountability }
        ) => {
            if (collection == 'mails') {
                const mailService = new MailService({ schema });

                const serviceMail = new ItemsService(collection, {
                    knex,
                    schema,
                    accountability,
                });

                const serviceAdherent = new ItemsService(
                    'adherents_newsletters',
                    { knex, schema }
                );

                try {
                    const adherents = await serviceAdherent.readByQuery({});

                    const mail = await serviceMail.readOne(itemId);

                    // Faire plutot un boucle avec url de desabonnement personnalisé a l'evnoie de mail avec l'id de l'adeherent
                    // const adherentsMailList = adherents.map(e => e.mail).join(',');

                    if (mail.status == 'published') {
                        adherents.forEach((adherent) => {
                            mailService.send({
                                // to: adherentsMailList,
                                to: adherent.mail,
                                subject: mail.objet,
                                template: {
                                    name: 'newsletters',
                                    data: {
                                        contenu: mail.contenu,
                                        hash: adherent.hash,
                                        mail: adherent.mail
                                    },
                                },
                            });
                        });
                    }
                } catch (error) {
                    throw new ServiceUnavailableException(error);
                }
            }
        }
    );

    // Pour update on utilise keys (avec un S)
    action(
        'items.update',
        async (
            { keys: itemId, collection },
            { database: knex, schema, accountability }
        ) => {
            if (collection == 'mails') {
                const mailService = new MailService({ schema });

                const serviceMail = new ItemsService(collection, {
                    knex,
                    schema,
                    accountability,
                });

                const serviceAdherent = new ItemsService(
                    'adherents_newsletters',
                    { knex, schema }
                );

                try {
                    const adherents = await serviceAdherent.readByQuery({});

                    const adherentsMailList = adherents
                        .map((e) => e.mail)
                        .join(',');

                    const mail = await serviceMail.readOne(itemId);

                    if (mail.status == 'published') {
                        await mailService.send({
                            to: adherentsMailList,
                            subject: mail.objet,
                            template: {
                                name: 'newsletters',
                                data: {
                                    contenu: mail.contenu,
                                },
                            },
                        });
                    }
                } catch (error) {
                    throw new ServiceUnavailableException(error);
                }
            }
        }
    );
};
