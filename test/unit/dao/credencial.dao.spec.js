const CredencialDAO = require('../../../dao').CredencialDAO;

describe('CredencialDAO', () => {
  const Credencial = {
    findOne: td.function()
  };
  const Email = {};
  const Perfil = {}
  let credencialDAO = null;

  beforeEach(() => {
    credencialDAO = new CredencialDAO(Credencial, Email, Perfil);
  });

  it('#getToAuth deveria retornar as credenciais com email, perfil e usuario', (done) => {
    const payload = { email: 'usuario@mail.com', senha: 'p455w0rd' };

    td.when(Credencial.findOne({
      include: [
        { model: Email, as: 'email', where: { email: payload.email } }
      ]
    }));
  });
});