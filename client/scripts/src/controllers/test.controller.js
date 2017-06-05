angular
    .module('app')
    .controller('TestController', TestController);

TestController.$inject = ['$scope'];

function TestController($scope) {
    $scope.appName = 'AgroApp';
}
