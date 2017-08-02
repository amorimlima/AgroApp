const viewsRoute = (router, app) => {
  router.get('/inicio', function(req, res) {
    res.render('inicio', { strings: app.get('strings') });
  });

  router.get('/busca', function(req, res) {
    res.render('search', { strings: app.get('strings') });
  });

  router.get('/cadastro/:step', function(req, res) {
    res.render('cadastro', { strings: app.get('strings'), step: req.params.step });
  });

  router.get('/meus-produtos', function(req, res) {
    res.render('meus_produtos', { strings: app.get('strings') });
  });

  return router;
}

module.exports = viewsRoute;
