const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const authConfig = (app) => {
  const Credencial = app.get('models').Usuario;
  const options = {
    secretOrKey: app.get('configs').jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader
  };
  const verify = (payload, done) => {
    Credencial
      .findOne({ where: { usuario: payload.usuario, perfil: payload.perfil }})
      .then((instance) => {
        if (instance) {
          return done(null, {
            usuario: payload.usuario,
            perfil: payload.perfil,
            tipo: usuario.tipo
          });
        }

        return done(null, false);
      })
      .catch(error => {
        console.log(error);
        return done(error, null)
      });
  };
  const strategy = new Strategy(options, verify);

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', app.get('configs').jwt.session)
  };
};

module.exports = authConfig;
