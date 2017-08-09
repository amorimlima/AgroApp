const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const HttpStatus = require('http-status');

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
  
    return router;
};
