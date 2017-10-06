module.exports = (router, app) => {
  const strings = app.get('strings');

  router.get('/inicio', (req, res) =>
    res.render('inicio', { strings }));

  router.get('/busca', (req, res) =>
    res.render('busca', { strings }));

  router.get('/cadastro/:step', (req, res) =>
    res.render('cadastro', { strings, step: req.params.step }));

  router.get('/meus-produtos', (req, res) =>
    res.render('meus_produtos', { strings }));

  router.get('/perfil', (req, res) =>
    res.render('perfil', { strings }));

  router.get('/favoritos', (req, res) =>
    res.render('favoritos', { strings }));

  router.get('/dados-cadastrais', (req, res) =>
    res.render('dados_cadastrais', { strings }));

  router.get('/editar-dados-pessoais', (req, res) =>
    res.render('editar_dados_perfil', { strings }))

  return router;
};
