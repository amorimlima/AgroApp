const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const HttpStatus = require('http-status');
const axios = require('axios')

Promise.promisifyAll(fs);

module.exports = (router, app) => {
  const EnderecoDAO = app.get('dao').EnderecoDAO;

  router
    .route('/estado')
    .get((req, res) => {
      const estados = fs.readFileAsync(path.join(__dirname, '../mocks/estados.json'))
        .then((estados) => {
          res.status(HttpStatus.OK);
          res.json(JSON.parse(estados));
        })
        .catch((err) => {
          console.error(err);
          res.status(HttpStatus.UNPROCESSABLE_ENTITY);
        });
    });

  router
    .route('/:estado/cidades')
    .get((req, res) => {
      try {
        axios
          .get('https://gist.githubusercontent.com/letanure/3012978/raw/36fc21d9e2fc45c078e0e0e07cce3c81965db8f9/estados-cidades.json')
          .then(response => response.data.estados)
          .then(estados => estados.filter(estado => estado.sigla === req.params.estado))
          .then(estados => Array.from(estados[0].cidades))
          .then(cidades => res.status(HttpStatus.OK).json(cidades))
          .catch(err => res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY))

      }
      catch(e) {
        res.sendStatus(HttpStatus.UNPROCESSABLE_ENTITY)
      }
    })

    return router;
};
