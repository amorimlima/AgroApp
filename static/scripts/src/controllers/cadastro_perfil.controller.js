function CadastroPerfilController(
  $rootScope,
  $location,
  PersistenceService,
  usuario,
  credencial) {

  // Models
  this.usuario = usuario || { tipo: '' };
  this.credencial = credencial || { perfil: null, senha: '' };
  
  this.voltar = () => {
    PersistenceService.clearSessionItems();
    return $location.url('/');  
  };

  this.avancar = () => {
    PersistenceService.setSessionItem('usuario', JSON.stringify(this.usuario));
    PersistenceService.setSessionItem('credencial', JSON.stringify(this.credencial));

    return $location.url('/registro/credencial');
  };
}

CadastroPerfilController.$inject = [
  '$rootScope',
  '$location',
  'PersistenceService'
];

module.exports = CadastroPerfilController;
