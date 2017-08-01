class CredentialRegisterController {
  constructor(
    $rootScope,
    $location,
    Storage,
    usuario,
    credencial,
    email) {

    this.tipo = storage.getSessionItem('tipo');
    this.email = storage.getSessionItem('email') || '';
    this.senha = storage.getSessionItem('senha') || '';

    this.usuario = usuario || $location.url('/registro/perfil');
    this.credencial = credencial || $location.url('/registro/perfil');
    this.email = email || { email: '' };
  }

  goBack() {
    return $location.url('/registro/perfil');
  }

  goToPersonData(type) {
    storage.setSessionItem('email', this.email);
    storage.setSessionItem('senha', this.senha);
    return $location.url(`/registro/${type}`);
  }
}

CredentialRegisterController.$inject = [
  '$rootScope',
  '$location',
  'PersistenceService'
];

module.exports = CredentialRegisterController;
