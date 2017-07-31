const authRoute = (router, app) => {
  const Email = app.get('models').Email;

  router.post('/', (req, res) => {

    Email.findOne({
      where: { email: req.body.email },
      include: [
        { model: app.get('models').Usuario },
        { model: app.get('models').Credencial, include: [
          { model: app.get('models').Perfil }
        ] },
      ]
    })
    .then((email) => res.json(email))
    .catch(error => console.log(error));
      
  });

  return router;
}

module.exports = authRoute;
