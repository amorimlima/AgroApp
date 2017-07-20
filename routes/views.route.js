const viewsRoute = (router, app) => {
  router.get('/login', function(req, res) {
    res.render('login', { strings: app.get('strings') });
  });

  router.get('/search', function(req, res) {
    res.render('search', { strings: app.get('strings') });
  });

  router.get('/register', function(req, res) {
    res.render('register', { strings: app.get('strings') });
  })

  return router;
}

module.exports = viewsRoute;
