export default (router, { services }) => {
    const { ItemsService } = services;

    router.get('/:mail&:hash', async (req, res) => {
		const adherentService = new ItemsService('adherents_newsletters', { schema: req.schema });
		const adherent = (await adherentService.readByQuery({
			filter: {
				"mail": {
					"_eq" : req.params.mail
				}
			}
		}))[0];
		if (adherent.hash == req.params.hash) {
			adherentService.deleteOne(adherent.id);
			res.send(`Votre email ${req.params.mail} a été supprimé des newsletters`);
		}
        res.status(404).send('Probleme lors de la suppression');
    });
};
