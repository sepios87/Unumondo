const stripe = require('stripe')(
    'sk_test_51KOMk2ApFYENeqSh7ZuNmsNJAsLfFjsyreRTL2ZEgu1tbym7IhHX5mdDlfd5GS0yYoVKr4BS1ludz5i5QXBSnPFR00S9tul0RS'
);

export default (router) => {
    router.post('/', async (req, res) => {
        try {
            const intent = await stripe.paymentIntents.create({
                amount: req.body.amount*100, //Convertir en euros
                currency: 'eur',
                automatic_payment_methods: {enabled: true},
            });
            res.status(200).json({client_secret: intent.client_secret});
        } catch (err) {
            res.status(400).json({ message: err });
        }
    });
};
