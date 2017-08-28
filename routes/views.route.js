module.exports = (router, app) => {
  router.get('/inicio', (req, res) => {
    res.render('inicio', { strings: app.get('strings') });
  });

  router.get('/busca', (req, res) => {
    res.render('busca', { strings: app.get('strings') });
  });

  router.get('/cadastro/:step', (req, res) => {
    res.render('cadastro', { strings: app.get('strings'), step: req.params.step });
  });

  router.get('/meus-produtos', (req, res) => {
    res.render('meus_produtos', { strings: app.get('strings') });
  });

  router.get('/oferta', (req, res) => {
    res.render('oferta');
  });

  router.get('/favoritos', (req, res) => {
    res.render('favoritos', { strings: app.get('strings') });
  });

  return router;
};
