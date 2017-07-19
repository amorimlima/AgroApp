const perfilRoute = (router, app) => {
  const PerfilDAO = app.get('dao').PerfilDAO;
  console.log(PerfilDAO);

  router.get('/disponivel', (req, res) => {
    const perfilDAO = new PerfilDAO(app.get('models').Perfil);
    perfilDAO
      .getAll()
      .then((perfilList) => {
        const list = perfilList.data
          .map(perfil => perfil.get({ plain: true }))
          .filter(perfil => perfil.id !== 1);

        res.status(perfilList.statusCode);
        res.json(list);
      });
  });

  return router;
}

module.exports = perfilRoute;
