OffersService.$inject = [
    '$http'
];

function OffesrService($http) {

    this.getAll = function () {
        return $http.get('/offers');
    };
}

module.exports = OffersService;
